"""
Build Elab Company brand assets from the official mark.

Outputs into client/public/:
- favicon.ico   (16/32/48)
- favicon-32.png
- apple-touch-icon.png   (180x180)
- icon-192.png, icon-512.png
- og-image.png           (1200x630 — editorial press cover)
- og-image.jpg

Design language: Editorial Studio Press
- Bone Paper    #F4F1EA
- Deep Ink Navy #0F1B2D
- Bone Dark     #E9E4D6
- Ink Haze      rgba(15,27,45,0.55)

Typography (must match the live site):
- Fraunces 500/600  → display wordmark
- JetBrains Mono    → editorial metadata strips
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import random

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "scripts" / "fonts"
SRC_MARK = ROOT / "client" / "src" / "assets" / "brand" / "elab-mark-ink@2x.png"
OUT = ROOT / "client" / "public"
OUT.mkdir(parents=True, exist_ok=True)

BONE = (244, 241, 234, 255)
BONE_DARK = (215, 209, 193, 255)
INK = (15, 27, 45, 255)
INK_SOFT = (15, 27, 45, 180)
INK_HAZE = (15, 27, 45, 120)

FONT_DISPLAY = FONTS / "fraunces-v38-latin-600.ttf"
FONT_DISPLAY_LIGHT = FONTS / "fraunces-v38-latin-500.ttf"
FONT_MONO = FONTS / "JetBrainsMono-Medium.ttf"
FONT_MONO_REG = FONTS / "JetBrainsMono-Regular.ttf"

# ---------------------------------------------------------------------------
# Favicon set
# ---------------------------------------------------------------------------
mark = Image.open(SRC_MARK).convert("RGBA")
mw, mh = mark.size


def render_icon(size: int, padding_ratio: float = 0.16) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), BONE)
    inner = int(size * (1 - 2 * padding_ratio))
    aspect = mw / mh
    target_h = inner
    target_w = int(target_h * aspect)
    if target_w > inner:
        target_w = inner
        target_h = int(target_w / aspect)
    mark_scaled = mark.resize((target_w, target_h), Image.LANCZOS)
    ox = (size - target_w) // 2
    oy = (size - target_h) // 2
    canvas.paste(mark_scaled, (ox, oy), mark_scaled)
    return canvas


favicon_16 = render_icon(16, padding_ratio=0.08)
favicon_32 = render_icon(32, padding_ratio=0.12)
favicon_48 = render_icon(48, padding_ratio=0.14)
apple_180 = render_icon(180, padding_ratio=0.18)
icon_192 = render_icon(192, padding_ratio=0.18)
icon_512 = render_icon(512, padding_ratio=0.20)

favicon_32.save(OUT / "favicon-32.png", "PNG")
apple_180.save(OUT / "apple-touch-icon.png", "PNG")
icon_192.save(OUT / "icon-192.png", "PNG")
icon_512.save(OUT / "icon-512.png", "PNG")
favicon_16.save(
    OUT / "favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[favicon_32, favicon_48],
)
print("favicon set ->", OUT)

# ---------------------------------------------------------------------------
# OG image — 1200 x 630
# ---------------------------------------------------------------------------
W, H = 1200, 630
og = Image.new("RGBA", (W, H), BONE)
draw = ImageDraw.Draw(og, "RGBA")

# --- vertical side gutters (subtle editorial grid) ---------------------
gutter = 80
# top and bottom thin rules
rule_top_y = 86
rule_bot_y = H - 92

def rule(y: int, color=BONE_DARK, width: int = 1, inset: int = gutter):
    draw.rectangle([(inset, y), (W - inset, y + width - 1)], fill=color)

# paper grain (gentle)
random.seed(2026)
for _ in range(5500):
    x = random.randint(0, W - 1)
    y = random.randint(0, H - 1)
    a = random.randint(3, 8)
    draw.point((x, y), fill=(15, 27, 45, a))

rule(rule_top_y)
rule(rule_bot_y)

# --- type loaders -------------------------------------------------------
def tt(path, size):
    return ImageFont.truetype(str(path), size)

mono_xs = tt(FONT_MONO, 15)
mono_sm = tt(FONT_MONO, 16)
mono_md = tt(FONT_MONO, 17)
display_lg = tt(FONT_DISPLAY, 56)
display_sm = tt(FONT_DISPLAY_LIGHT, 28)


def spaced(text: str, tracking: float = 0.22, font=None):
    """Render letter-spaced uppercase by drawing one glyph at a time and
    returning (width, height) for positioning.  Tracking is multiplier on
    glyph width."""
    # we render to a helper image to measure/compose
    gap_em = int(font.size * tracking)
    widths = [int(draw.textlength(ch, font=font)) for ch in text]
    total_w = sum(widths) + gap_em * (len(text) - 1)
    return total_w, gap_em, widths


def draw_spaced(xy, text, font, fill, tracking=0.22):
    x0, y = xy
    gap_em = int(font.size * tracking)
    for ch in text:
        draw.text((x0, y), ch, font=font, fill=fill)
        x0 += int(draw.textlength(ch, font=font)) + gap_em


# --- TOP STRIP ---------------------------------------------------------
top_y = 48

meta_left = "EST. 2025 — JEONJU, KOREA"
meta_right = "ISSUE 01 · 2026"
draw.text((gutter, top_y), meta_left, font=mono_sm, fill=INK)
tw_right = draw.textlength(meta_right, font=mono_sm)
draw.text((W - gutter - tw_right, top_y), meta_right, font=mono_sm, fill=INK)

# centred sub-meta just above the top rule
sub = "AI  ·  CREATIVE  ·  STUDIO"
sw = draw.textlength(sub, font=mono_sm)
draw.text(((W - sw) / 2, top_y + 2), sub, font=mono_sm, fill=INK_SOFT)

# --- CENTRAL MARK ------------------------------------------------------
mark_h = 280
mark_w = int(mark_h * (mw / mh))
mark_big = mark.resize((mark_w, mark_h), Image.LANCZOS)
mx = (W - mark_w) // 2
my = (H - mark_h) // 2 - 26
og.paste(mark_big, (mx, my), mark_big)

# --- WORDMARK UNDER MARK ----------------------------------------------
wordmark = "ELAB   COMPANY"
wm_w = draw.textlength(wordmark, font=display_lg)
wm_y = my + mark_h + 30
draw.text(((W - wm_w) / 2, wm_y), wordmark, font=display_lg, fill=INK)

# letter-spaced caption under wordmark (matches the live Hero caption)
caption_text = "E L A B   C O M P A N Y"
cap_w = draw.textlength(caption_text, font=mono_xs)
draw.text(((W - cap_w) / 2, wm_y + 78), caption_text, font=mono_xs, fill=INK_HAZE)

# --- BOTTOM STRIP ------------------------------------------------------
bottom_y = H - 56
bl_left = "ELABCOMPANY.COM"
bl_right = "AI · CREATIVE · STRATEGY"
draw.text((gutter, bottom_y), bl_left, font=mono_md, fill=INK)
br_w = draw.textlength(bl_right, font=mono_md)
draw.text((W - gutter - br_w, bottom_y), bl_right, font=mono_md, fill=INK)

# small centred slogan at bottom
slogan = "본업만으로 충분합니다"
# Pretendard is preferred for Korean but is not bundled; we skip slogan
# rather than fall back to a glyph-less font and produce tofu boxes.

# Save
og.convert("RGB").save(OUT / "og-image.png", "PNG", optimize=True)
og.convert("RGB").save(OUT / "og-image.jpg", "JPEG", quality=92, optimize=True)
print("og image ->", OUT / "og-image.png")
