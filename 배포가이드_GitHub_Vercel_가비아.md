# Elab Company 웹사이트 배포 액션 플랜

**대상 산출물:** Manus 체크포인트 `manus-webdev://2fd52614` (v3.3)
**경로:** GitHub → Vercel → 가비아(Gabia) `elabcompany.com`
**예상 총 소요 시간:** 약 35–60분 (DNS 전파 대기 시간 별도)
**작성:** Manus AI · 2026-04-29

---

## 0. 시작하기 전에 — 핵심 사실 세 가지

본격적인 작업에 들어가기 전, 의사 결정의 근거가 되는 사실 세 가지를 먼저 정리합니다. 이 세 가지가 명확해야 다음 단계가 흔들리지 않습니다.

> **1) 본 프로젝트는 정적 사이트입니다.** React 19 + Vite로 빌드되며, 백엔드 API·데이터베이스는 사용하지 않습니다. 따라서 Vercel의 **Static Hosting** 모드만으로 충분히 운영 가능하고, 별도의 서버 함수(Edge/Serverless)도 필요하지 않습니다.
>
> **2) 빌드 산출물 경로가 비표준입니다.** Vite 설정상 사이트 root가 `client/`이고 빌드 결과는 `dist/public/`에 생성됩니다. Vercel이 자동으로 감지하지 못할 가능성이 있으므로, 저장소 루트에 **`vercel.json`을 한 개 추가**해 명시적으로 지정합니다.
>
> **3) 가비아 도메인은 네임서버를 그대로 둔 채 DNS 레코드만 추가하는 방식이 가장 안전합니다.** 네임서버를 Vercel로 이전하는 방식은 가비아의 메일·기타 서비스를 함께 쓰실 가능성을 고려할 때 권장하지 않습니다. 본 가이드는 **레코드 추가 방식**으로 진행합니다.

배포 경로는 다음과 같이 두 트랙을 함께 비교한 후, 사용자가 명시하신 GitHub + Vercel + 가비아 트랙을 단계별로 안내하는 구조입니다.

---

## 1. 두 가지 호스팅 옵션 비교

배포 의사 결정의 근거가 되도록 옵션을 표로 비교합니다.

| 항목 | 옵션 A · Manus 기본 호스팅 | 옵션 B · GitHub + Vercel + 가비아 |
|---|---|---|
| **소요 시간** | 약 5분 (Publish 버튼 한 번) | 약 35–60분 + DNS 전파 |
| **배포 트리거** | Manus UI 내 Publish 버튼 | `git push` → 자동 빌드 |
| **도메인** | `xxx.manus.space` 자동 부여, 커스텀 도메인 바인딩 가능 | `elabcompany.com` 직접 연결 |
| **소스코드 소유** | Manus 내부 보관 | GitHub 저장소(귀하 소유) |
| **CI/CD 자유도** | Manus가 관리 | Vercel 빌드 로그·롤백·프리뷰 브랜치 활용 가능 |
| **외부 협업 용이성** | 제한적 | GitHub 기반 협업 표준 |
| **비용** | Manus 플랜 내 포함 | Vercel Hobby(무료) + 가비아 도메인 연 갱신비 |

사용자께서는 GitHub과 Vercel을 이미 활성화하셨고 도메인도 확보하신 상태이므로, **옵션 B가 장기적으로 정답**입니다. 다만 옵션 A로 먼저 임시 URL(예: `elab.manus.space`)을 띄워두면, Vercel 작업이 끝날 때까지 클라이언트 미팅·소상공인 데모용으로 즉시 활용할 수 있습니다.

따라서 본 가이드의 권장 순서는 다음과 같습니다.

> **임시 공개 → GitHub Export → Vercel 배포 → 가비아 DNS 연결 → 검증 → 임시 URL 폐기**

---

## 2. 사전 준비 체크리스트

작업을 시작하기 전, 아래 다섯 가지를 손에 두고 시작하시기 바랍니다.

| 항목 | 필요 조치 | 비고 |
|---|---|---|
| GitHub 계정 | 로그인 상태 확인 | Organization을 쓰실 경우 owner 권한 필요 |
| Vercel 계정 | GitHub OAuth로 로그인 권장 | Hobby 플랜 무료 |
| 가비아 My가비아 로그인 | 도메인 관리 → DNS 관리 메뉴 진입 | 본인 인증(휴대폰/공동인증서) 준비 |
| `elabcompany.com` 보유 확인 | My가비아 → 도메인 → 보유 도메인 | 만료일도 함께 확인 |
| Manus 체크포인트 | `manus-webdev://2fd52614` 최신 상태 | 본 가이드 기준 v3.3 |

---

## 3. STEP 1 — Manus에서 GitHub로 코드 내보내기

### 3.1 Manus UI에서 Export 실행

Manus 우측 Management UI 패널을 열고 **Settings → GitHub** 서브패널로 이동합니다. "Export to a new repository"를 선택한 뒤 다음 정보를 입력합니다.

| 입력 항목 | 권장 값 | 이유 |
|---|---|---|
| Owner | 본인 GitHub 계정 또는 Elab Organization | 향후 협업 시 Org 권장 |
| Repository name | `elab-company-web` | 프로젝트 식별 용이 |
| Visibility | **Private** | 브랜드 자산·미공개 카피 보호 |
| Default branch | `main` | Vercel 표준 |

Export 버튼을 누르면 Manus가 자동으로 새 저장소를 생성하고 현재 체크포인트의 전체 파일 트리를 push합니다. 완료까지 약 30–60초가 소요됩니다.

### 3.2 저장소에 추가해야 할 파일 한 개

본 프로젝트는 빌드 출력 경로가 비표준(`dist/public/`)이므로, Vercel 자동 감지가 실패할 수 있습니다. **저장소 루트에 `vercel.json`을 한 개 추가**해야 합니다.

GitHub 웹 UI에서 `Add file → Create new file`을 누르고 파일명에 `vercel.json`을 입력한 뒤 아래 내용을 붙여넣으십시오.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist/public",
  "installCommand": "pnpm install --frozen-lockfile=false",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

각 항목의 의미는 다음과 같습니다.

> - **`buildCommand`** — Manus가 작성한 `package.json`의 `build` 스크립트를 호출합니다. 이 스크립트는 Vite 빌드 후 esbuild로 서버 파일도 함께 묶지만, 정적 호스팅이므로 서버 파일은 사용되지 않고 Vite 결과물만 배포됩니다.
> - **`outputDirectory`** — Vite 설정(`vite.config.ts` 라인 220)에 명시된 경로 `dist/public`을 그대로 지정합니다.
> - **`installCommand`** — `pnpm-lock.yaml`이 정확히 일치하지 않을 가능성에 대비해 `frozen-lockfile=false`로 두어 첫 빌드 안정성을 확보합니다. 첫 배포가 성공하면 `--frozen-lockfile=true`로 바꿔 빌드 결정성을 높이는 것을 권장합니다.
> - **`framework: null`** — Vercel이 React/Vite 프리셋을 강제로 적용하지 않도록 합니다. Manus의 비표준 root(`client/`)와 충돌을 방지합니다.
> - **`rewrites`** — wouter SPA 라우팅 대비. 모든 경로를 `index.html`로 폴백하여 새로고침 시 404를 방지합니다.

커밋 메시지는 `chore: add Vercel deployment config`로 두시고 main 브랜치에 직접 커밋하시면 됩니다.

---

## 4. STEP 2 — Vercel에 GitHub 저장소 연결

### 4.1 New Project 생성

Vercel 대시보드(`vercel.com/new`)에서 **Import Git Repository**를 선택하고, GitHub 권한 승인 후 방금 생성한 `elab-company-web`을 선택합니다.

### 4.2 프로젝트 설정 — 화면별 입력

Import 화면에서 아래 표에 맞춰 정확히 입력해 주십시오. Vercel이 자동으로 채워주는 값과 다를 수 있으니 한 번 더 확인이 필요합니다.

| Vercel 설정 항목 | 입력 값 | 비고 |
|---|---|---|
| Project Name | `elab-company-web` | URL prefix가 됨 |
| Framework Preset | **Other** | `vercel.json`이 우선 적용됨 |
| Root Directory | `./` (저장소 루트) | `client/`로 바꾸지 마시오 |
| Build Command | (비워두기) | `vercel.json`의 `buildCommand` 사용 |
| Output Directory | (비워두기) | `vercel.json`의 `outputDirectory` 사용 |
| Install Command | (비워두기) | `vercel.json`의 `installCommand` 사용 |
| Node.js Version | **22.x** | `package.json`의 pnpm 호환 |

### 4.3 환경 변수 등록

Manus 템플릿이 `client/index.html`에 분석 스크립트(`%VITE_ANALYTICS_ENDPOINT%/umami`)를 삽입해 두었습니다. 환경 변수가 없으면 빌드 시 빈 문자열로 치환되어 *작동하지 않는 분석 스크립트 태그*가 남습니다. 동작에는 지장이 없으나, 콘솔 경고를 줄이려면 두 변수를 비워둔 채로라도 등록해 두십시오.

| Environment Variable | Value | 적용 환경 |
|---|---|---|
| `VITE_ANALYTICS_ENDPOINT` | (공란 또는 자체 Umami URL) | Production, Preview, Development |
| `VITE_ANALYTICS_WEBSITE_ID` | (공란 또는 자체 Umami site ID) | Production, Preview, Development |

추후 자체 분석을 도입하실 의향이 있으시면, Plausible/Umami/Google Analytics 중 하나를 골라 별도 설정해 드리겠습니다.

### 4.4 첫 배포 실행

**Deploy** 버튼을 누르면 Vercel이 자동으로 빌드를 시작합니다. 빌드 로그는 다음 순서로 출력되어야 정상입니다.

> 1. `Cloning github.com/<owner>/elab-company-web` (약 5초)
> 2. `Running "pnpm install"` (약 60–90초, 의존성 다수)
> 3. `Running "pnpm run build"` (약 30–45초, Vite + esbuild)
> 4. `Build completed in dist/public` (약 1–2초)
> 5. `Deployment complete: https://elab-company-web-xxxxxxx.vercel.app`

총 약 2–3분 후, Vercel이 `https://<project>-<hash>.vercel.app` 형태의 임시 URL을 부여합니다. 이 URL로 접속해 헤더·Hero 마크·About·Capability·Projects·Contact·Footer가 모두 정상 표시되는지 확인하십시오.

### 4.5 빌드 실패 시 대응 매트릭스

| 증상 | 원인 | 조치 |
|---|---|---|
| `pnpm: command not found` | Vercel이 npm 사용 중 | 프로젝트 Settings → General → Install Command를 `corepack enable && pnpm install`로 강제 |
| `Cannot find module '@/...'` | alias 미인식 | `vite.config.ts`의 alias가 빌드 시점에 적용되는지 확인. 일반적으로 자동 동작 |
| `outDir not found` | `vercel.json` 누락 | STEP 1.2의 `vercel.json`이 저장소 루트에 있는지 확인 |
| 빈 화면(404) | SPA 라우팅 폴백 누락 | `vercel.json`의 `rewrites` 블록 확인 |

---

## 5. STEP 3 — 가비아 도메인 `elabcompany.com` 연결

### 5.1 Vercel에서 도메인 등록

Vercel 프로젝트 → **Settings → Domains** 메뉴에서 `elabcompany.com`을 입력하고 Add 버튼을 누릅니다. Vercel은 두 가지 도메인을 함께 추가하는 것을 권장합니다.

| 도메인 | 용도 |
|---|---|
| `elabcompany.com` | Apex(루트) 도메인 — 메인 |
| `www.elabcompany.com` | www 서브도메인 — 자동 리다이렉트 |

추가 직후 Vercel은 도메인 검증을 위해 **DNS 레코드 두 종류**를 안내합니다. 정확한 값은 Vercel 화면에서 그대로 복사하셔야 하지만, 일반적으로 다음과 같습니다.

| Type | Host | Value (예시) | 용도 |
|---|---|---|---|
| `A` | `@` (Apex) | `76.76.21.21` | Apex → Vercel |
| `CNAME` | `www` | `cname.vercel-dns.com.` | www → Vercel |

> **주의:** Vercel이 안내하는 IP/CNAME 값을 *그대로* 사용하십시오. 위 표는 일반적인 예시이며, 실제 값은 Vercel 화면 기준입니다. 가비아 입력 시 마지막 마침표(`.`)는 자동으로 처리되므로 빼셔도 무방합니다.

### 5.2 가비아 DNS 레코드 추가

My가비아에 로그인한 뒤 다음 경로를 따라가십시오.

> **My가비아 → 서비스 관리 → 도메인 → 관리 → DNS 정보 → DNS 설정**

DNS 설정 화면 상단의 "레코드 수정" 또는 "DNS 레코드 추가" 버튼을 누르고, 다음 두 레코드를 추가합니다.

| 레코드 1 (Apex 도메인) |  |
|---|---|
| 타입 | `A` |
| 호스트 | `@` |
| 값/위치 | `76.76.21.21` (Vercel이 안내한 값) |
| TTL | `600` |

| 레코드 2 (www 서브도메인) |  |
|---|---|
| 타입 | `CNAME` |
| 호스트 | `www` |
| 값/위치 | `cname.vercel-dns.com` |
| TTL | `600` |

저장 시 가비아가 "기존 레코드를 덮어쓸 수 있습니다"라는 경고를 표시할 수 있습니다. **기존에 다른 호스팅(예: 가비아 호스팅, 카페24 등)에 연결된 A 레코드가 있다면 반드시 삭제**한 뒤 새 레코드를 저장해야 합니다. 이메일(`MX`) 레코드는 건드리지 마십시오.

### 5.3 DNS 전파 대기

레코드 저장 후 **DNS 전파에는 일반적으로 10분에서 최대 24시간**이 소요됩니다. 가비아의 경우 통상 30분 이내 전파됩니다. 전파 상태는 다음 두 가지 방법으로 확인 가능합니다.

> **방법 1 — 터미널에서 dig 명령**
> ```bash
> dig elabcompany.com +short
> dig www.elabcompany.com +short
> ```
> Apex는 `76.76.21.21`, www는 `cname.vercel-dns.com.`이 출력되면 전파 완료입니다.
>
> **방법 2 — 웹 도구**
> [`dnschecker.org`](https://dnschecker.org/#A/elabcompany.com)에서 도메인을 입력하면 전 세계 DNS 서버의 전파 상태를 한눈에 볼 수 있습니다.

### 5.4 SSL 인증서 자동 발급

DNS 전파가 완료되면 Vercel이 **Let's Encrypt SSL 인증서를 자동으로 발급**합니다(별도 비용·설정 없음). Vercel Domains 화면에서 `elabcompany.com`과 `www.elabcompany.com` 옆에 녹색 체크 표시와 "Valid Configuration"이 나타나면 완료입니다. 일반적으로 DNS 전파 후 1–3분 이내에 발급됩니다.

---

## 6. STEP 4 — 검증 체크리스트

배포 완료 후 아래 9가지 항목을 순서대로 확인하시기 바랍니다.

| # | 검증 항목 | 확인 방법 | 통과 기준 |
|---|---|---|---|
| 1 | HTTPS 접속 | 브라우저에 `https://elabcompany.com` | 자물쇠 아이콘 + 사이트 정상 로드 |
| 2 | www 리다이렉트 | `https://www.elabcompany.com` 접속 | apex로 자동 redirect |
| 3 | HTTP→HTTPS | `http://elabcompany.com` 접속 | https로 자동 redirect |
| 4 | Hero 마크 | 첫 화면 | 잉크 색 마크 정상 표시 |
| 5 | 폰트 로드 | About 섹션의 Fraunces serif 확인 | 한글은 Pretendard, 영문은 Fraunces |
| 6 | 이미지 | About의 Plate I 산맥 사진 | 정상 표시 |
| 7 | 모바일 | 모바일 디바이스/Chrome DevTools | 4개 섹션 모두 정상 |
| 8 | 콘솔 경고 | DevTools Console | 빨간 에러 0건 (회색 분석 스크립트 경고는 무시) |
| 9 | 인덱싱 | `curl -I https://elabcompany.com` | `200 OK` 응답 |

---

## 7. STEP 5 — 운영 단계 권장 설정

배포가 끝났다고 작업이 끝난 것은 아닙니다. 운영 단계로 넘어가기 전 다음 세 가지를 설정해 두면 후속 작업이 가벼워집니다.

### 7.1 자동 배포 트리거 확인

Vercel은 기본적으로 GitHub `main` 브랜치에 push되는 모든 커밋을 Production으로 자동 배포합니다. PR을 만드시면 별도의 **Preview 환경**(`<branch-name>-elab-company-web.vercel.app`)이 자동 생성되어, 디자인 수정·카피 변경을 라이브 사이트에 반영하기 전에 미리 검토할 수 있습니다. 향후 협업자가 늘어날 경우 이 워크플로우가 표준이 됩니다.

### 7.2 환경별 변수 분리

현재는 분석 변수만 등록되어 있지만, 추후 Email 수신용 폼(예: Resend, Formspree)이나 CMS(예: Sanity, Contentful)를 도입하실 경우 Vercel의 환경 변수 시스템(Production/Preview/Development 분리)을 적극 활용하시기 바랍니다.

### 7.3 가비아 자동 갱신

가비아 도메인은 **자동 갱신을 켜두지 않으면 만료 시 사이트가 일시적으로 내려갈 수 있습니다.** My가비아 → 도메인 관리 → 자동 결제/자동 갱신 설정을 반드시 ON으로 두십시오. 도메인 만료 7일 전·1일 전·당일 알림 메일이 함께 오도록 설정하시면 더 안전합니다.

---

## 8. 자주 발생하는 문제 — FAQ

> **Q1. 배포 후 사이트가 빈 화면입니다.**
> A. `vercel.json`의 `outputDirectory`가 `dist/public`인지, `rewrites`가 정상적으로 등록되어 있는지 확인하십시오. Vercel 대시보드에서 Deployments → 최신 배포 → Functions/Logs를 확인하면 단서가 보입니다.

> **Q2. 가비아 DNS 저장 시 "이미 등록된 레코드입니다" 경고가 나옵니다.**
> A. 기존 A 레코드(가비아 기본 파킹 페이지나 다른 호스팅)가 충돌하는 경우입니다. 기존 A 레코드를 먼저 삭제하시고 Vercel 값을 새로 추가하시면 됩니다.

> **Q3. SSL 인증서가 발급되지 않습니다.**
> A. DNS 전파가 완료되지 않은 상태일 가능성이 큽니다. `dig` 명령으로 A 레코드가 `76.76.21.21`로 보일 때까지 기다리신 뒤, Vercel Domains 화면에서 "Refresh"를 눌러 보십시오.

> **Q4. www와 apex 중 어느 쪽을 메인으로 두는 게 좋습니까?**
> A. 모던 트렌드는 **apex(`elabcompany.com`)를 메인**으로 하고 www를 redirect 처리하는 것입니다. Vercel Domains에서 `elabcompany.com`을 "Primary"로 지정하시면 자동으로 www가 redirect 됩니다.

> **Q5. Manus 임시 URL은 언제 폐기하나요?**
> A. `elabcompany.com`이 정상적으로 동작하고 SEO 인덱싱(약 1–2주)이 안정화된 후에 Manus의 Settings → General → Visibility에서 비공개로 전환하시면 됩니다. 미리 폐기하시면 임시로 공유한 링크가 끊깁니다.

---

## 9. 작업 체크리스트 — 한눈에

다음 9개 항목을 순서대로 체크하시면 배포가 완료됩니다.

- [ ] **STEP 0** — Manus UI에서 Publish 버튼으로 임시 URL 발급 (선택)
- [ ] **STEP 1.1** — Manus → Settings → GitHub → Export to `elab-company-web` (Private)
- [ ] **STEP 1.2** — GitHub 저장소 루트에 `vercel.json` 추가 후 main 커밋
- [ ] **STEP 2.1** — Vercel `vercel.com/new` → Import GitHub repo
- [ ] **STEP 2.2** — Framework: Other / Build·Install·Output 모두 비움 / Node 22.x
- [ ] **STEP 2.3** — 환경 변수 `VITE_ANALYTICS_ENDPOINT`·`VITE_ANALYTICS_WEBSITE_ID` 등록 (값 공란 가능)
- [ ] **STEP 2.4** — Deploy → 임시 URL `*.vercel.app`에서 사이트 정상 동작 확인
- [ ] **STEP 3.1** — Vercel Domains에서 `elabcompany.com` + `www.elabcompany.com` 추가
- [ ] **STEP 3.2** — 가비아 DNS에 A 레코드(`@` → 76.76.21.21) + CNAME(`www` → cname.vercel-dns.com) 추가
- [ ] **STEP 3.3** — DNS 전파 확인(`dig elabcompany.com +short`) + SSL 자동 발급 확인
- [ ] **STEP 4** — 9개 검증 체크리스트 모두 통과
- [ ] **STEP 5.3** — 가비아 도메인 자동 갱신 ON

---

## 10. 마무리

본 가이드는 사용자께서 보유하신 인프라(GitHub Pro/Free + Vercel Hobby + 가비아 도메인) 조합에서 가장 안전한 경로를 따릅니다. 가장 흔한 실패 지점은 두 곳입니다 — **`vercel.json` 누락**과 **가비아 기존 A 레코드 미삭제**. 이 두 가지만 챙기시면 나머지는 Vercel과 Let's Encrypt가 자동으로 처리합니다.

가이드대로 진행하시다 막히는 지점이 있으시면, 막힌 단계 번호와 화면 캡처(또는 에러 메시지)를 보내주십시오. 즉시 그 단계만 집중적으로 도와드리겠습니다.

— Manus AI
