# Elab Company 웹사이트 디자인 브레인스토밍

## 프로젝트 컨텍스트
- L2 회사: 이랩컴퍼니 (전북 기반 AI Creative Studio)
- 레퍼런스: harkenic.com/en/ — 일본 anthropological 브랜딩 스튜디오
- 컨셉: AI Creative Studio (텍스트로 명시 X, 톤·구성으로 체감)
- 톤: 전문적 · 확장적 · 가능성 · 미니멀 · 딥 네이비 계열
- 금지: Haru+ 언급, 퍼플/따뜻함, 사이버, 네온, 배달앱 미학
- 핵심 카피: "AI가 크리에이티브를 만나면, 보이지 않던 가치가 드러납니다."

---

<response>
<text>
**아이디어 1: Editorial Studio Press (선정안)**

* **Design Movement**: Swiss/International Typographic Style와 일본 인쇄 미학(印刷美学)의 교차점. Harken의 "두꺼운 본문 + 점선 구분자" DNA를 계승하되, 컬러를 sand beige가 아닌 **Ink Navy on Bone Paper**로 치환한다. 종이 위에 활자가 눌린 듯한 무게감.

* **Core Principles**:
  1. **Editorial Rigor** — 모든 요소는 신문/저널의 인덱스처럼 위계가 명확하다.
  2. **Restrained Density** — 여백은 사치가 아니라 호흡이다. 한 화면당 핵심 정보 1~2개.
  3. **Material Weight** — 활자가 얇지 않다. Display는 두텁고, body는 정직하다.
  4. **Linework as Architecture** — 점선이 아닌 가는 실선(hairline rule)이 섹션을 분절한다.

* **Color Philosophy**:
  - Background: `#F4F1EA` (Bone Paper, 종이 결의 노이즈 텍스처)
  - Foreground: `#0F1B2D` (Deep Ink Navy, 인쇄된 활자)
  - Accent: `#1F3A5F` (Subdued Navy, 본문 보조)
  - Hairline: `#0F1B2D` 12% opacity
  → Haru+ 퍼플과 완전 분리. "조용한 유능함"의 시각화.

* **Layout Paradigm**:
  - **3-column editorial grid**: 좌측 인덱스(P1, P2…) + 중앙 본문 + 우측 메타데이터(태그, 연도)
  - Hero는 좌측 정렬 (Harken 그대로). 화면 우측에 큰 화살표 또는 추상 비주얼 루프.
  - 풀페이지 스냅 X, 자연스러운 세로 스크롤. 섹션마다 hairline rule.

* **Signature Elements**:
  1. **Section Index Marker**: `P1`, `P2` 식의 번호와 `1/4` 분수 표기 (Harken 차용·재해석).
  2. **Hairline Rule + 구두점 시리즈**: 점선이 아닌 ────────────── (실선) 또는 짧은 dash 시리즈로 섹션 경계.
  3. **Dual Language Caption**: 한글 본문 + 영문 메타("Creative studio based in Jeonju") 병기.

* **Interaction Philosophy**:
  - 마우스를 따라가는 커서 X. 빠르고 정직한 페이드 인.
  - 호버는 텍스트의 무게(weight) 변화 또는 hairline 색 변화로만 표현.
  - "조용한 유능함" — 인터랙션이 자랑하지 않는다.

* **Animation**:
  - Intersection Observer 기반 페이드 인 (translateY 8px → 0, opacity 0 → 1, duration 700ms, ease-out).
  - Hero 추상 비주얼: SVG/Canvas로 그린 "느린 선의 호흡" — 가는 실선 3~4개가 천천히 길어졌다 줄어드는 루프 (8초 사이클).
  - Hairline rule이 스크롤 진입 시 좌→우로 그려지는 애니메이션 (scaleX 0 → 1, transform-origin: left).
  - 키워드(Capability)는 한 줄씩 stagger(80ms)로 입장.

* **Typography System**:
  - Display: **Fraunces** (variable serif, opsz로 크기별 시각 보정. Harken의 본문 두께감을 계승하되 더 현대적 정제)
  - Body 한글: **Pretendard** (가독성 + 모던)
  - Mono/Meta: **JetBrains Mono** (P1, 1/4, 연도 등 메타데이터)
  - 위계: Display 96px (Hero) / 56px (Section title) / 18px Body / 13px Mono Meta
</text>
<probability>0.07</probability>
</response>

<response>
<text>
**아이디어 2: Generative Atelier (보류)**

* **Design Movement**: Bauhaus 후기 + 제너레이티브 아트(Casey Reas, Refik Anadol). "AI Creative Studio"를 비주얼로만 암시.
* **Core Principles**: 알고리즘적 좌표계, 좌우 비대칭, 노이즈 그라디언트, 기하학적 모티프.
* **Color Philosophy**: Charcoal `#161616` 배경 + Ivory `#EAE6DD` 텍스트 + Cobalt `#2541B2` 단일 액센트.
* **Layout Paradigm**: 화면을 좌(고정 인덱스)·우(스크롤 콘텐츠)로 분할한 좌우 비대칭. Hero는 풀스크린 generative canvas.
* **Signature Elements**: WebGL/Canvas 기반 점·선 파티클 루프 / 좌하단 좌표계 인디케이터 / 그리드 위 떠다니는 키워드.
* **Interaction Philosophy**: 마우스 위치에 반응하는 파티클, 키워드 호버 시 분산.
* **Animation**: noise field, particle drift, lerp 기반 부드러운 좌표 추적.
* **Typography System**: Söhne Mono + Söhne Buch + Pretendard.

→ 보류 사유: 브리핑이 "미니멀, 빠른 구현 우선, 커스텀 커서 삭제"를 명시. Haru+ 따뜻함과의 분리는 좋으나 "AI Creative Studio를 텍스트로 쓰지 않음"이라는 원칙을 시각적으로 너무 직설적으로 외친다.
</text>
<probability>0.04</probability>
</response>

<response>
<text>
**아이디어 3: Quiet Architecture (보류)**

* **Design Movement**: 브루털리즘 건축 사진집 + Kinfolk 매거진. 거대한 여백과 작은 텍스트, 흑백 사진 한 장.
* **Core Principles**: 극단적 여백, 단일 사진의 압도적 존재감, 텍스트는 캡션 크기.
* **Color Philosophy**: Off-white `#FAFAF7` + Concrete grey `#3A3A38`. 액센트 없음.
* **Layout Paradigm**: 한 섹션 = 한 화면 = 한 이미지 + 한 문장. 풀페이지 스냅 강조.
* **Signature Elements**: 정사각형 사진 프레임, 좌하단 캡션, 우상단 페이지 번호.
* **Animation**: 거의 없음. 이미지 ken-burns 슬로우 줌만.
* **Typography System**: Times New Roman (의도적 클래식) + Pretendard.

→ 보류 사유: 브리핑이 "풀페이지 스냅 아님"을 명시. 또한 "추상 비주얼 루프"를 요구하므로 사진 의존 컨셉은 부적합.
</text>
<probability>0.03</probability>
</response>

---

## 최종 선정: 아이디어 1 — Editorial Studio Press

**선정 근거**:
1. Harken의 DNA(섹션 인덱스, 분수 표기, 좌측 정렬 거대 본문, 점선 구분자)를 충실히 계승하면서, 점선을 **실선(hairline)**으로 치환하라는 브리핑 PART 5의 명시적 요구를 정확히 반영.
2. "딥 네이비 + 본 페이퍼"는 로고 추출 컬러 가이드(딥 네이비 계열) + Haru+ 퍼플과의 분리라는 두 조건을 동시 충족.
3. "AI Creative Studio"를 텍스트로 쓰지 않고, **타이포·구성·여백의 절제된 무게감**으로 체감하게 만든다는 PART 1 원칙에 정확히 부합.
4. 미니멀·빠른 구현·인터랙션 절제라는 PART 5 사양을 거스르지 않음.

**지킬 것**:
- Bone Paper `#F4F1EA` 배경에 Deep Ink Navy `#0F1B2D` 활자.
- Fraunces (Display) + Pretendard (한글 본문) + JetBrains Mono (메타) 3종 타이포 시스템.
- 모든 섹션 경계는 hairline rule (실선) + 좌→우 그려지는 진입 애니메이션.
- 섹션 인덱스 P1~P5와 분수 표기 (1/5, 2/5…)로 인덱스 감각 유지.
- Hero는 로고 + 추상 SVG 선 루프 (캔버스 또는 SVG, 8초 사이클).
- 추가 텍스트·팀 섹션·숫자 카운터 일체 금지.
