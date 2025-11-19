# GitHub Actions를 통한 Netlify 배포 가이드

이 프로젝트는 GitHub Actions를 사용하여 자동으로 빌드하고 Netlify에 배포됩니다.
Netlify의 빌드 크레딧을 사용하지 않고 GitHub Actions의 무료 크레딧을 활용합니다.

## 설정 단계

### 1. Netlify Personal Access Token 생성

1. [Netlify Personal Access Tokens 페이지](https://app.netlify.com/user/applications#personal-access-tokens)에 접속
2. "New access token" 버튼 클릭
3. 토큰 설명 입력 (예: "GitHub Actions Deploy")
4. "Generate token" 클릭
5. **생성된 토큰을 복사** (한 번만 표시됩니다!)

### 2. GitHub Secrets 설정

1. GitHub 저장소 페이지로 이동: https://github.com/soneunsol/my-portfolio
2. Settings → Secrets and variables → Actions 클릭
3. "New repository secret" 버튼 클릭
4. 다음 두 개의 secret 추가:

#### Secret 1: NETLIFY_AUTH_TOKEN
- Name: `NETLIFY_AUTH_TOKEN`
- Value: 위에서 생성한 Netlify Personal Access Token

#### Secret 2: NETLIFY_SITE_ID
- Name: `NETLIFY_SITE_ID`
- Value: `62b2910b-0578-4c08-a5a1-1715bba901e6`

### 3. 배포 테스트

설정이 완료되면:
1. 코드를 main 브랜치에 푸시
2. GitHub Actions 탭에서 워크플로우 실행 확인
3. 빌드 및 배포 완료 후 https://my-portfolio-template-2025.netlify.app 확인

## 작동 방식

- **main 브랜치에 푸시** → 자동으로 프로덕션 배포
- **Pull Request 생성** → 프리뷰 배포 생성
- **빌드 시간**: GitHub Actions 사용 (Netlify 크레딧 소비 없음)
- **배포만**: Netlify 사용

## 참고사항

- GitHub Actions 무료 플랜: 월 2,000분
- 빌드 시간은 약 1-2분 소요
- Netlify는 배포만 담당하므로 빌드 크레딧을 절약할 수 있습니다
