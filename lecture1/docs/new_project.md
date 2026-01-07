# 새로운 React 프로젝트 세팅 가이드 (백업 복사 방식)

이 문서는 AI가 백업 템플릿을 사용하여 새로운 React 프로젝트를 빠르게 세팅하는 방법을 설명합니다.

## 사용자 요청 예시
```
{프로젝트명}으로 새로운 프로젝트 하나 세팅해줘
```

## AI가 수행해야 하는 작업 순서

### 1. 백업 템플릿 존재 확인
```bash
# _template_settings 디렉토리 존재 확인
ls -la | grep _template_settings

# 템플릿이 없는 경우, 사용자에게 안내:
# "백업 템플릿이 없습니다. 먼저 기본 프로젝트를 생성하고 백업을 만들어주세요."
```

### 2. 템플릿 복사 및 기본 설정
```bash
# 1. 백업 템플릿을 새 프로젝트명으로 복사 (OS별 명령어)

# Windows (PowerShell):
Copy-Item -Path "_template_settings" -Destination "{프로젝트명}" -Recurse

# macOS/Linux:
cp -r _template_settings {프로젝트명}

# 2. 프로젝트 디렉토리로 이동
cd {프로젝트명}
```

### 3. package.json 프로젝트명 수정
```bash
# PowerShell 방식 (Windows 권장):
(Get-Content package.json) -replace '"name": ".*?"', '"name": "{프로젝트명}"' | Set-Content package.json

# sed 방식 (Linux/macOS):
sed -i '' 's/"name": ".*"/"name": "{프로젝트명}"/' package.json

# 또는 jq 사용 (크로스 플랫폼):
jq '.name = "{프로젝트명}"' package.json > temp.json && mv temp.json package.json

# 수정 확인:
cat package.json | grep '"name"'
```

### 4. 기본 정리 작업
```bash
# 1. node_modules는 유지 (설치 시간 단축을 위해)
# - 백업 템플릿의 node_modules에는 이미 최신 MUI 패키지가 설치되어 있음
# - 복사된 node_modules를 그대로 사용하여 npm install 시간 단축

# 2. package-lock.json 유지 (정확한 버전 고정을 위해)
# - 백업 템플릿과 동일한 패키지 버전 사용

# 3. 불필요한 파일 정리
rm -rf .git  # 기존 git 히스토리 제거 (필요시)
```

### 5. 패키지 확인 및 업데이트 (선택사항)
```bash
# 설치된 패키지 확인
npm ls

# 필요시 특정 패키지만 업데이트
npm update @mui/material @mui/icons-material

# 또는 모든 패키지 최신화 (주의: 호환성 문제 가능)
npm update
```

### 6. 개발 서버 테스트
```bash
# 개발 서버 백그라운드 실행 (OS별 명령어)

# Linux/macOS:
timeout 10 npm run dev &
sleep 5
# 로그 확인: "Local: http://localhost:xxxx/" 메시지 확인

# Windows PowerShell:
# Step 1: 백그라운드로 npm 실행
$process = Start-Process npm -ArgumentList "run", "dev" -PassThru -WindowStyle Hidden
Start-Sleep -Seconds 5

# Step 2: 포트 확인 (Vite 기본 포트: 5173)
netstat -ano | findstr ":5173"

# Step 3: 프로세스 종료 (중요: Claude Code는 절대 건드리지 않음!)
# 개발 서버만 정확히 종료
Stop-Process -Id $process.Id -Force

# 종료 확인
tasklist | findstr "node.exe"
```

**중요: 포트 충돌 시 vite.config.js에서 다른 포트 설정**
```javascript
// vite.config.js
export default {
  server: {
    port: 5174  // 또는 다른 포트
  }
}
```

### 7. 프로젝트 구조 확인
```bash
# 디렉토리 구조 확인
tree src/ -I node_modules

# 또는 간단히
ls -R src/

# 예상 구조:
# src/
# ├── components/
# │   ├── common/
# │   ├── ui/
# │   └── landing/
# ├── pages/
# ├── hooks/
# ├── utils/
# ├── theme.js
# ├── main.jsx
# ├── App.jsx
# └── index.css
```

## 완료 후 사용자에게 제공할 정보

1. **생성된 프로젝트 구조**
2. **설치된 패키지 목록**
3. **개발 서버 접속 URL**
4. **사용 가능한 기능들**:
   - MUI 테마 프로바이더 적용 완료
   - React Router 설치 완료
   - 기본 디렉토리 구조 생성 완료
   - CssBaseline 적용 완료

---

## ⚠️ 중요: 프로젝트 세팅 이후 개발 작업 규칙

**프로젝트 세팅이 완료된 후 추가적인 개발 작업을 진행할 때는 다음 규칙을 준수해야 함:**

1. **AI는 자동으로 `npm run dev`를 실행하지 않음**
   - 프로젝트 세팅 시에만 서버 테스트 진행
   - 세팅 완료 후에는 사용자가 직접 개발 서버를 실행해야 함

2. **개발 서버 실행은 사용자 책임**
   - 컴포넌트 생성, 수정, 추가 기능 개발 시 AI는 코드 작성만 담당
   - 개발 서버 실행 및 테스트는 사용자가 직접 수행

3. **코드 작성 완료 후 안내**
   - AI는 코드 작성 완료 후 "개발 서버를 실행하여 확인해보세요" 형태로 안내
   - 자동으로 서버를 실행하거나 프로세스를 관리하지 않음

이 규칙을 통해 AI가 불필요한 프로세스를 실행하는 것을 방지하고, 사용자가 개발 환경을 직접 제어할 수 있도록 함.

---

## 주의사항 및 문제 해결

### Windows 환경에서 발생할 수 있는 문제들

1. **node_modules 복사 권한 문제**:
   - node_modules는 삭제하지 않고 유지하는 것이 원칙
   - 복사 과정에서 권한 문제가 발생할 수 있음
   - PowerShell Copy-Item 사용 시 대부분 해결됨

2. **복사 명령어 차이**:
   - Windows: PowerShell Copy-Item 사용
   - macOS/Linux: cp -r 사용

3. **node_modules 손상 시 대처**:
   - 복사 과정에서 node_modules가 손상된 경우에만 재설치
   - `npm install` 실행하여 재설치

### 오류 발생 시 대응 방법

1. **권한 오류**: 관리자 권한으로 터미널 실행
2. **경로 오류**: 백슬래시(\) 사용 확인 (Windows)
3. **명령어 오류**: OS에 맞는 명령어 사용 확인

---

## GitHub 백업 및 배포 설정 (선택사항)

**이 섹션은 사용자가 '깃허브에 백업해줘' 또는 '깃page로 배포해줘' 명령을 사용하려는 경우 적용됩니다.**

### 사전 요구사항: GitHub MCP + GitHub CLI 설치

GitHub 관련 작업을 원활하게 수행하려면 다음 두 가지를 설치해야 합니다:

#### 1. GitHub CLI (gh) 설치

**Windows (권장: winget 사용):**
```bash
# winget으로 GitHub CLI 설치
winget install --id GitHub.cli

# 설치 확인
gh --version
```

**Windows (대안: Chocolatey):**
```bash
choco install gh
```

**macOS (Homebrew):**
```bash
brew install gh
```

**Linux (Debian/Ubuntu):**
```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

**GitHub CLI 인증:**
```bash
# GitHub 로그인 (브라우저 인증 방식)
gh auth login

# 인증 선택:
# - GitHub.com 선택
# - HTTPS 선택
# - Login with a web browser 선택
# - 브라우저에서 인증 완료

# 인증 확인
gh auth status
```

#### 2. GitHub MCP 서버 설치 (Claude Code용)

**Claude Code 설정 파일 수정:**

Windows 경로: `%APPDATA%\Claude\claude_desktop_config.json`
macOS 경로: `~/Library/Application Support/Claude/claude_desktop_config.json`

**설정 파일 내용:**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_personal_access_token_here"
      }
    }
  }
}
```

**GitHub Personal Access Token 생성:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic) 클릭
3. 필요한 권한 선택:
   - `repo` (모든 저장소 접근)
   - `workflow` (GitHub Actions 워크플로우)
   - `admin:org` (조직 관리, 필요시)
4. Generate token 클릭
5. 생성된 토큰을 복사하여 설정 파일의 `GITHUB_PERSONAL_ACCESS_TOKEN`에 입력

**Claude Code 재시작:**
- 설정 파일 저장 후 Claude Code 완전히 종료
- Claude Code 재실행

**MCP 연결 확인:**
```bash
# Claude Code에서 다음 명령으로 확인 (AI에게 요청)
# "GitHub MCP가 연결되었는지 확인해줘"
```

### 사용 가능한 명령어

#### 명령어 1: "깃허브에 백업해줘"

**AI가 수행하는 작업:**

1. **Git 저장소 초기화 (필요시):**
```bash
# Git 초기화
git init

# 현재 상태 확인
git status
```

2. **원격 저장소 확인 또는 생성:**
```bash
# 원격 저장소 확인
git remote -v

# 원격 저장소가 없는 경우:
# GitHub MCP를 사용하여 새 저장소 생성
# (AI가 자동으로 처리)
```

3. **변경사항 커밋 및 푸시:**
```bash
# 모든 변경사항 추가
git add .

# 커밋 메시지 작성
git commit -m "Backup: $(date '+%Y-%m-%d %H:%M:%S')"

# GitHub에 푸시
git push origin main
```

**사용 예시:**
```
사용자: 깃허브에 백업해줘
AI: 현재 변경사항을 확인하고 GitHub에 백업하겠습니다.
    [git status 실행]
    [변경된 파일 목록 표시]
    [git add, commit, push 실행]
    백업 완료! 커밋 해시: abc123
    GitHub 저장소: https://github.com/username/repo
```

#### 명령어 2: "깃page로 배포해줘"

**AI가 수행하는 작업:**

1. **Vite 빌드 설정 확인 (vite.config.js):**
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/repository-name/', // GitHub Pages 저장소명
  build: {
    outDir: 'dist'
  }
});
```

2. **프로젝트 빌드:**
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 확인
ls -la dist/
```

3. **GitHub Pages 배포 스크립트 (package.json):**
```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

4. **gh-pages 패키지 설치 (필요시):**
```bash
npm install --save-dev gh-pages
```

5. **GitHub Pages 배포:**
```bash
# GitHub Pages에 배포
npm run deploy

# 또는 gh-pages 직접 실행
npx gh-pages -d dist
```

6. **GitHub Pages 설정 확인:**
```bash
# GitHub CLI로 Pages 설정 확인
gh api repos/{owner}/{repo}/pages

# 또는 GitHub MCP를 통해 설정 확인
# (AI가 자동으로 처리)
```

**배포 완료 후 접속 URL:**
```
https://{username}.github.io/{repository-name}/
```

**사용 예시:**
```
사용자: 깃page로 배포해줘
AI: GitHub Pages에 배포하겠습니다.
    [vite.config.js의 base 경로 확인/수정]
    [npm run build 실행]
    [dist 폴더 생성 확인]
    [gh-pages로 배포]
    배포 완료!
    접속 URL: https://username.github.io/my-project/
```

### GitHub Actions 자동 배포 (선택사항)

**자동 배포 워크플로우 설정:**

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**GitHub Pages 설정 (저장소 설정에서):**
1. GitHub 저장소 → Settings → Pages
2. Source: GitHub Actions 선택
3. 자동으로 배포 워크플로우 실행

**장점:**
- `main` 브랜치에 푸시할 때마다 자동 배포
- 수동으로 `npm run deploy` 실행 불필요
- CI/CD 파이프라인 구축

### 문제 해결

**1. GitHub CLI 인증 실패:**
- `gh auth login` 다시 실행
- Personal Access Token 권한 확인
- 방화벽/프록시 설정 확인

**2. GitHub MCP 연결 실패:**
- Claude Code 설정 파일 경로 확인
- Personal Access Token 유효성 확인
- Claude Code 재시작

**3. GitHub Pages 404 오류:**
- `vite.config.js`의 `base` 경로가 저장소명과 일치하는지 확인
- GitHub Pages 설정에서 Source가 올바른지 확인
- 빌드 파일이 `dist` 폴더에 제대로 생성되었는지 확인

**4. 배포 후 빈 페이지:**
- 브라우저 콘솔에서 에러 확인
- `index.html`의 리소스 경로 확인
- `base` 경로 설정 재확인

---

## Supabase + GitHub Actions 배포 시 추가 설정 (선택사항)

**이 섹션은 사용자가 Supabase와 GitHub Pages를 사용한 배포를 요청한 경우에만 적용됩니다.**

### 배경: Supabase 무료 플랜 자동 일시정지 방지

Supabase 무료 플랜은 **7일 동안 활동이 없으면 프로젝트가 자동으로 일시정지**됩니다.
이를 방지하기 위해 GitHub Actions의 Scheduled Workflow를 사용하여 주기적으로 데이터베이스에 ping을 보냅니다.

### Step 1: Supabase에 Health Check 테이블 생성

**Supabase Dashboard → SQL Editor**에서 다음 쿼리 실행:

```sql
-- 헬스체크 전용 테이블 생성
CREATE TABLE health_check (
  id SERIAL PRIMARY KEY,
  last_ping TIMESTAMP DEFAULT NOW()
);

-- 초기 데이터 삽입
INSERT INTO health_check (id) VALUES (1);

-- RLS(Row Level Security) 활성화
ALTER TABLE health_check ENABLE ROW LEVEL SECURITY;

-- 익명 읽기 허용 정책 (ANON_KEY로 접근 가능)
CREATE POLICY "Allow anonymous read" ON health_check
  FOR SELECT USING (true);
```

### Step 2: GitHub Actions 워크플로우 디렉토리 생성

프로젝트 루트에 GitHub Actions 디렉토리 생성:

```bash
# 프로젝트 루트에서 실행
mkdir -p .github/workflows
```

### Step 3: Scheduled Workflow 파일 생성

`.github/workflows/supabase-keep-alive.yml` 파일 생성:

```yaml
name: Supabase Keep Alive

on:
  schedule:
    # 주 3회 실행 (월, 수, 금 오전 9시 UTC = 오후 6시 KST)
    # 최대 간격 3일로 7일 제한 안전하게 회피
    - cron: '0 9 * * 1,3,5'
  workflow_dispatch:  # 수동 실행 가능

jobs:
  ping-supabase:
    runs-on: ubuntu-latest

    steps:
      - name: Ping Supabase Health Check
        run: |
          response=$(curl -s -w "\n%{http_code}" \
            "${{ secrets.SUPABASE_URL }}/rest/v1/health_check?select=id&limit=1" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}")

          http_code=$(echo "$response" | tail -n1)
          body=$(echo "$response" | head -n-1)

          echo "Response: $body"
          echo "HTTP Code: $http_code"

          if [ "$http_code" -eq 200 ]; then
            echo "Supabase ping successful at $(date -u +%Y-%m-%dT%H:%M:%SZ)"
          else
            echo "Supabase ping failed with HTTP $http_code"
            exit 1
          fi
```

### Step 4: GitHub Secrets 설정

**GitHub 저장소 → Settings → Secrets and variables → Actions**에서 추가:

| Secret Name | 값 |
|-------------|-----|
| `SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**환경변수 값 확인 방법:**
- Supabase Dashboard → Project Settings → API
- `Project URL` → `SUPABASE_URL`
- `Project API keys` → `anon public` → `SUPABASE_ANON_KEY`

### Step 5: 배포 및 확인

```bash
# GitHub에 푸시
git add .
git commit -m "Add Supabase keep-alive workflow"
git push origin main
```

**배포 후 확인:**
1. GitHub 저장소 → Actions 탭에서 `Supabase Keep Alive` 워크플로우 확인
2. 수동 실행 테스트: Actions → Supabase Keep Alive → Run workflow
3. 실행 로그에서 "Supabase ping successful" 메시지 확인

### 스케줄 설정 참고

Cron 표현식 `0 9 * * 1,3,5` 의미:
- `0` - 0분
- `9` - 오전 9시 (UTC)
- `*` - 매일
- `*` - 매월
- `1,3,5` - 월요일(1), 수요일(3), 금요일(5)

**결과:** 매주 월, 수, 금 오전 9시 UTC (한국 시간 오후 6시)에 실행
**효과:** 최대 간격 3일로 7일 제한 안전하게 회피

### 문제 해결

**1. Workflow가 실행되지 않는 경우:**
- GitHub Actions → 해당 워크플로우 → Run workflow로 수동 실행 테스트
- 저장소가 60일 이상 비활성 상태면 스케줄 워크플로우가 비활성화됨
- `.github/workflows/` 경로가 정확한지 확인

**2. Supabase 연결 오류:**
- `SUPABASE_URL`과 `SUPABASE_ANON_KEY` 값 재확인
- Supabase RLS 정책이 올바른지 확인
- `health_check` 테이블이 존재하는지 확인

**3. Secrets 접근 오류:**
- GitHub Secrets가 정확히 설정되었는지 확인
- Secret 이름에 오타가 없는지 확인 (대소문자 구분)
- Fork된 저장소에서는 Secrets 접근이 제한될 수 있음

**4. HTTP 401/403 에러:**
- `SUPABASE_ANON_KEY` 값이 올바른지 확인
- Supabase 프로젝트가 일시정지 상태가 아닌지 확인

### 비용 안내

- **Supabase 무료 플랜**: 이 방법으로 계속 무료 사용 가능
- **GitHub Actions 무료 플랜**: 월 2,000분 실행 시간 (Public 저장소는 무제한)
- **이 설정의 월 사용량**: 약 12회 × 1분 이하 = 무료 범위 내

---

## 전체 프로세스 요약

### 기본 프로젝트 세팅:
1. 백업 템플릿 확인
2. 템플릿 복사
3. package.json 수정
4. 개발 서버 테스트
5. 사용자에게 안내

### GitHub 백업 및 배포 (선택사항):
1. **사전 설치:**
   - GitHub CLI 설치 및 인증 (`gh auth login`)
   - GitHub MCP 서버 설치 (Claude Code 설정 파일 수정)
   - Personal Access Token 생성 및 설정

2. **"깃허브에 백업해줘" 명령:**
   - Git 저장소 초기화 확인
   - 원격 저장소 확인/생성
   - 변경사항 커밋 및 푸시

3. **"깃page로 배포해줘" 명령:**
   - vite.config.js의 base 경로 설정
   - 프로젝트 빌드 (`npm run build`)
   - gh-pages 패키지 설치 (필요시)
   - GitHub Pages 배포 (`npm run deploy`)

4. **GitHub Actions 자동 배포 (선택):**
   - `.github/workflows/deploy.yml` 생성
   - GitHub Pages 설정에서 Source를 GitHub Actions로 변경

### Supabase + GitHub Actions 배포 (선택사항):
1. Supabase health_check 테이블 생성
2. `.github/workflows/supabase-keep-alive.yml` 파일 생성
3. GitHub Secrets 설정 (SUPABASE_URL, SUPABASE_ANON_KEY)
4. GitHub에 푸시 및 워크플로우 확인

이 가이드를 따르면 프로젝트 세팅부터 백업, 배포, 유지관리까지 완벽하게 자동화할 수 있습니다.
