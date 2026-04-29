# elabcompany.com 도메인 연결 가이드

> 목표: 가비아에서 확보한 `elabcompany.com`을 Vercel에 연결하여 현재 `elab-company-web.vercel.app`에 배포된 사이트가 `https://elabcompany.com`과 `https://www.elabcompany.com` 양쪽에서 열리도록 합니다.
> 소요 시간: 설정 5분 + DNS 전파 대기 10분~수 시간 (한국 가비아 기준 평균 30분 이내).

---

## 1단계. Vercel에서 도메인 등록

1. [vercel.com](https://vercel.com) 로그인 → `elab-company-web` 프로젝트 진입.
2. 상단 **Settings** 탭 → 좌측 메뉴 **Domains** 클릭.
3. 입력창에 `elabcompany.com` 입력 → **Add** 클릭.
4. Vercel이 권장하는 구성 옵션이 팝업됩니다. **"Add elabcompany.com and redirect www to it"** 옵션을 선택하면 `www`가 자동으로 루트로 리다이렉트됩니다 (권장).
5. 화면에 다음 두 가지가 표시됩니다. **이 값들을 그대로 가비아에 입력**합니다.

| 레코드 유형 | 호스트 이름 | 값(Value) | 비고 |
|:---:|:---|:---|:---|
| **A** | `@` (또는 빈칸) | `76.76.21.21` | 루트 도메인용 |
| **CNAME** | `www` | `cname.vercel-dns.com` | www 서브도메인용 |

> Vercel이 표시하는 실제 값을 우선합니다. 위는 2026년 4월 기준 Vercel 표준값이며 계정·지역에 따라 다른 값이 안내될 수 있습니다.

---

## 2단계. 가비아 DNS 설정

1. [가비아 마이가비아](https://my.gabia.com) 로그인.
2. 상단 **서비스 관리** → **도메인 통합관리툴** 진입.
3. `elabcompany.com` 우측 **관리** 버튼 클릭.
4. 좌측 **DNS 정보** → **DNS 설정** 탭으로 이동.
5. 기존 레코드 중 `@` 호스트의 A 레코드, `www`의 CNAME 레코드가 있다면 모두 삭제합니다 (가비아 기본 포워딩·파킹 레코드).
6. **레코드 추가** 클릭 후 아래 두 줄을 입력합니다.

| 타입 | 호스트 | 값 / 위치 | TTL |
|:---:|:---:|:---|:---:|
| A | `@` | `76.76.21.21` | `3600` |
| CNAME | `www` | `cname.vercel-dns.com.` | `3600` |

> CNAME 값 끝의 마침표(.)는 가비아 인터페이스에 따라 자동으로 붙거나 필요할 수 있습니다. 에러가 나면 마침표를 빼고 다시 저장하세요.

7. **저장** 클릭.

---

## 3단계. DNS 전파 대기 및 Vercel 검증

1. 1~30분 후 Vercel **Settings → Domains** 화면에서 `elabcompany.com` 옆의 경고 아이콘이 사라지고 **Valid Configuration**으로 바뀌는지 확인합니다.
2. 확인되면 Vercel이 **자동으로 SSL 인증서(Let's Encrypt)를 발급**합니다. 수동 작업 불필요.
3. 브라우저에서 `https://elabcompany.com` 접속 → 사이트가 정상 표시되면 완료.

> DNS 전파 진행 상황은 아래 명령으로 확인 가능합니다 (본인 터미널에서 실행):
> ```bash
> dig elabcompany.com +short
> dig www.elabcompany.com +short
> ```
> `76.76.21.21`과 Vercel CNAME이 반환되면 전파 완료입니다.

---

## 4단계. 연결 후 체크리스트

- [ ] `https://elabcompany.com` 열람 → 홈페이지 정상 표시 (로고 포함)
- [ ] `https://www.elabcompany.com` → `https://elabcompany.com`으로 자동 리다이렉트
- [ ] 자물쇠 아이콘(SSL) 정상 표시
- [ ] 모바일 브라우저에서도 동일하게 표시
- [ ] Vercel 대시보드 **Domains**에 초록색 체크마크

---

## 문제 해결

| 증상 | 원인 / 조치 |
|:---|:---|
| Vercel에서 **Invalid Configuration** | 가비아 DNS 값 오타 여부 확인. 특히 A 레코드 값이 `76.76.21.21` 맞는지, CNAME 값이 `cname.vercel-dns.com`인지. |
| 24시간 지나도 전파 안 됨 | 가비아 네임서버가 `ns.gabia.co.kr` / `ns1.gabia.co.kr`로 되어 있는지 확인. 다른 네임서버(예: Cloudflare)를 쓰고 있다면 그쪽에서 레코드를 걸어야 함. |
| 접속은 되는데 "사이트 연결이 비공개로 설정"되어 있지 않음 경고 | SSL 발급 완료 전. 10~20분 후 재시도. |
| `www`만 열리고 루트는 안 열림 | Vercel Domains에서 `elabcompany.com`이 **Primary**로 설정돼 있는지, 가비아 A 레코드가 `@`에 대해 걸려 있는지 확인. |

---

## 참고 정보

- 현재 프로덕션 배포: `https://elab-company-web.vercel.app`
- GitHub 저장소: `leejeonghoon0668/elab-company-web` (Private)
- 최종 커밋: `c0c9fd7` — `fix(logo): bundle official mark via import so Vite emits it into dist/public/assets (Vercel-safe)`
- Vercel 빌드 설정: `vercel.json` (outputDirectory = `dist/public`)
