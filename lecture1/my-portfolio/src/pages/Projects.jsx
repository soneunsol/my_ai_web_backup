/**
 * Projects 페이지
 *
 * Props: 없음
 *
 * 주요 기능:
 * - 포트폴리오 작품 목록 (추후 개발 예정)
 * - 프로젝트 카드 형태로 구성
 * - 네온 옐로우 컬러를 활용한 호버 효과
 * - 반응형 그리드 레이아웃
 */
import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material';

function Projects() {
  const projectPlaceholders = [
    { id: 1, title: 'Project 1', description: '첫 번째 프로젝트 설명이 들어갈 예정입니다.' },
    { id: 2, title: 'Project 2', description: '두 번째 프로젝트 설명이 들어갈 예정입니다.' },
    { id: 3, title: 'Project 3', description: '세 번째 프로젝트 설명이 들어갈 예정입니다.' }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2
            }}
          >
            Projects
          </Typography>
          <Box
            sx={{
              width: '60px',
              height: '4px',
              backgroundColor: '#CFFF00',
              mb: 3
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: '#666666',
              lineHeight: 1.8
            }}
          >
            포트폴리오 작품들이 들어갈 예정입니다.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {projectPlaceholders.map((project) => (
            <Grid key={project.id} item xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#FAFAFA',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    borderTop: '3px solid #CFFF00'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666666',
                      lineHeight: 1.8,
                      mb: 2
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#999999',
                      fontSize: '0.9rem'
                    }}
                  >
                    프로젝트 상세 정보, 기술 스택, 링크 등이 추가될 예정입니다.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 6,
            p: 4,
            backgroundColor: '#F8F8F8',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              mb: 2
            }}
          >
            더 많은 프로젝트 준비 중
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666666',
              lineHeight: 1.8
            }}
          >
            추가 프로젝트가 계속 업데이트될 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Projects;
