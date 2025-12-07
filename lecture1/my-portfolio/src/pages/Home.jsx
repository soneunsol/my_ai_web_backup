/**
 * Home 페이지 - 오로라 테마
 *
 * Props: 없음
 *
 * 주요 기능:
 * - 오로라 애니메이션 히어로 섹션
 * - Canvas 기반 별 파티클 시스템
 * - About Me, Projects 페이지로의 네비게이션
 * - Contact 섹션
 * - 반응형 레이아웃
 */
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import AuroraCanvas from '../components/landing/AuroraCanvas';
import ContactSection from '../components/landing/ContactSection';

function Home() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section - 오로라 환영 */}
      <Box
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* 오로라 캔버스 배경 */}
        <AuroraCanvas />

        {/* 히어로 콘텐츠 */}
        <Container
          maxWidth="md"
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            py: 4
          }}
        >
          {/* 타이핑 애니메이션 헤드라인 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Box
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                mb: 3,
                color: '#FFFFFF',
                textShadow: '0 0 30px rgba(196, 161, 255, 0.6), 0 0 60px rgba(196, 161, 255, 0.4)',
                letterSpacing: '0.02em',
                lineHeight: 1.4,
                minHeight: { xs: '200px', md: '280px' }
              }}
            >
              <TypeAnimation
                sequence={[
                  '안녕하세요,',
                  500,
                  '안녕하세요,\n디자인을 즐기는',
                  500,
                  '안녕하세요,\n디자인을 즐기는\n프론트엔드 개발자',
                  500,
                  '안녕하세요,\n디자인을 즐기는\n프론트엔드 개발자\n손은솔입니다',
                  1000
                ]}
                wrapper="div"
                speed={50}
                style={{
                  whiteSpace: 'pre-line',
                  display: 'block'
                }}
              />
            </Box>
          </motion.div>

          {/* 서브 헤드라인 (순차 등장) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5, ease: 'easeOut' }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                fontWeight: 400,
                mb: 6,
                color: '#E0D4FF',
                lineHeight: 1.8,
                textShadow: '0 0 20px rgba(196, 161, 255, 0.3)'
              }}
            >
              즐겁게 만들고, 행복하게 전달합니다
            </Typography>
          </motion.div>

          {/* CTA 버튼 (순차 등장) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4, ease: 'easeOut' }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Button
                component={Link}
                to="/about"
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #C4A1FF 0%, #A8D8FF 100%)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  boxShadow: '0 0 30px rgba(196, 161, 255, 0.5)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #E0D4FF 0%, #C4E8FF 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 0 40px rgba(196, 161, 255, 0.7)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                About Me
              </Button>

              <Button
                component={Link}
                to="/projects"
                variant="outlined"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  border: '2px solid rgba(196, 161, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(196, 161, 255, 0.1)',
                  '&:hover': {
                    border: '2px solid #C4A1FF',
                    background: 'rgba(196, 161, 255, 0.2)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 0 30px rgba(196, 161, 255, 0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Projects
              </Button>
            </Box>
          </motion.div>

          {/* 스크롤 인디케이터 */}
          <Box
            onClick={scrollToNext}
            sx={{
              position: 'absolute',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 100%': {
                  transform: 'translateX(-50%) translateY(0)'
                },
                '50%': {
                  transform: 'translateX(-50%) translateY(10px)'
                }
              }
            }}
          >
            <KeyboardArrowDownIcon
              sx={{
                fontSize: '3rem',
                color: '#C4A1FF',
                filter: 'drop-shadow(0 0 10px rgba(196, 161, 255, 0.6))'
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <ContactSection />
    </Box>
  );
}

export default Home;
