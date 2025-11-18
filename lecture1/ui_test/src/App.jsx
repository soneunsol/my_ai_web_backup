import { Box, Container, Typography } from '@mui/material';

/**
 * UI Test 프로젝트 메인 App 컴포넌트
 * 16개 UI 섹션을 순차적으로 추가할 수 있는 구조
 */
function App() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: { xs: 2, md: 4 }
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 프로젝트 타이틀 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2
            }}
          >
            UI Test 프로젝트
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'text.secondary'
            }}
          >
            16개 UI 요소를 순차적으로 추가할 준비가 완료되었습니다
          </Typography>
        </Box>

        {/* UI 섹션들이 여기에 순차적으로 추가됩니다 */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          {/* 섹션 1부터 16까지 여기에 추가 예정 */}
        </Box>
      </Container>
    </Box>
  );
}

export default App;
