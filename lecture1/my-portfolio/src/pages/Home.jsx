/**
 * Home 페이지
 *
 * Props: 없음
 *
 * 주요 기능:
 * - 간단한 소개 텍스트 제공
 * - About Me, Projects 페이지로의 네비게이션 버튼
 * - Contact 섹션 (이메일, SNS 링크, 방명록)
 * - 네온 옐로우 컬러를 활용한 시각적 강조
 * - 반응형 레이아웃
 */
import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ContactSection from '../components/landing/ContactSection';

function Home() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
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
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 2
              }}
            >
              Welcome to My Portfolio
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: '#666666',
                mb: 4,
                lineHeight: 1.8
              }}
            >
              안녕하세요! 이곳은 저의 포트폴리오 웹사이트입니다.
              <br />
              상세한 자기소개와 프로젝트 작품들을 확인하실 수 있습니다.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#FAFAFA',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
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
                    About Me
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666666',
                      mb: 3,
                      lineHeight: 1.6
                    }}
                  >
                    About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.
                  </Typography>
                  <Button
                    component={Link}
                    to="/about"
                    variant="contained"
                    sx={{
                      backgroundColor: '#CFFF00',
                      color: '#000000',
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#E4FF1A',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 0 20px rgba(207, 255, 0, 0.5)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    자세히 보기
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#FAFAFA',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
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
                    Projects
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666666',
                      mb: 3,
                      lineHeight: 1.6
                    }}
                  >
                    Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
                  </Typography>
                  <Button
                    component={Link}
                    to="/projects"
                    variant="contained"
                    sx={{
                      backgroundColor: '#CFFF00',
                      color: '#000000',
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#E4FF1A',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 0 20px rgba(207, 255, 0, 0.5)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    프로젝트 보기
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <ContactSection />
    </Box>
  );
}

export default Home;
