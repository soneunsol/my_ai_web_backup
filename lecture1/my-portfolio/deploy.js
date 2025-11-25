const { NetlifyAPI } = require('netlify');
const fs = require('fs');
const path = require('path');

async function deploy() {
  try {
    // Netlify 인증 토큰 가져오기 (CLI 설정에서)
    const configPath = path.join(require('os').homedir(), '.netlify', 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const accessToken = config.users?.[0]?.auth?.token || config.userId;

    if (!accessToken) {
      console.error('Netlify 인증 토큰을 찾을 수 없습니다.');
      console.log('netlify login 명령어로 먼저 로그인해주세요.');
      process.exit(1);
    }

    const client = new NetlifyAPI(accessToken);

    // 1. 새 사이트 생성
    console.log('새 Netlify 사이트 생성 중...');
    const site = await client.createSite({
      body: {
        name: `my-portfolio-${Date.now()}`,
      }
    });

    console.log(`사이트 생성 완료: ${site.name}`);
    console.log(`사이트 ID: ${site.id}`);
    console.log(`URL: ${site.ssl_url || site.url}`);

    // 2. .netlify/state.json 파일 생성
    const netlifyDir = path.join(__dirname, '.netlify');
    if (!fs.existsSync(netlifyDir)) {
      fs.mkdirSync(netlifyDir, { recursive: true });
    }

    const stateFile = path.join(netlifyDir, 'state.json');
    fs.writeFileSync(stateFile, JSON.stringify({ siteId: site.id }, null, 2));
    console.log('.netlify/state.json 파일 생성 완료');

    console.log('\n이제 다음 명령어로 배포할 수 있습니다:');
    console.log('netlify deploy --prod --dir=dist');

  } catch (error) {
    console.error('오류 발생:', error.message);
    if (error.status === 401) {
      console.log('\n인증 오류입니다. netlify logout 후 netlify login을 다시 시도해주세요.');
    }
    process.exit(1);
  }
}

deploy();
