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
 * - Context API를 통한 데이터 연동
 */
import { useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Modal, IconButton, Chip, LinearProgress, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import AuroraCanvas from '../components/landing/AuroraCanvas';
import FloatingTechKeywords from '../components/landing/FloatingTechKeywords';
import ContactSection from '../components/landing/ContactSection';
import LoadingIndicator from '../components/common/LoadingIndicator';
import ErrorMessage from '../components/common/ErrorMessage';
import { usePortfolio } from '../contexts/PortfolioContext';

function Home() {
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Context에서 홈 데이터 가져오기
  const { homeData, loading, error } = usePortfolio();
  const skills = homeData.skills;

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setSkillModalOpen(true);
  };

  const handleSkillModalClose = () => {
    setSkillModalOpen(false);
    setSelectedSkill(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section - 업그레이드 버전 */}
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

        {/* 떠다니는 기술 키워드 배경 */}
        <FloatingTechKeywords />

        {/* 히어로 콘텐츠 */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,
            py: { xs: 4, md: 8 }
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' },
              gap: { xs: 4, md: 8 },
              alignItems: 'center'
            }}
          >
            {/* 왼쪽: 프로필 섹션 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3
                }}
              >
                {/* 프로필 이미지 */}
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: '200px', md: '280px' },
                    height: { xs: '200px', md: '280px' },
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '5px solid rgba(196, 161, 255, 0.5)',
                    boxShadow: '0 0 40px rgba(196, 161, 255, 0.6), inset 0 0 20px rgba(196, 161, 255, 0.2)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 60px rgba(196, 161, 255, 0.8), inset 0 0 30px rgba(196, 161, 255, 0.3)',
                      borderColor: '#C4A1FF'
                    },
                    transition: 'all 0.4s ease'
                  }}
                >
                  <Box
                    component="img"
                    src={homeData.basicInfo.photo}
                    alt={homeData.basicInfo.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* 빛나는 테두리 애니메이션 */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #C4A1FF, #A8D8FF, #FFC4E8, #C4A1FF)',
                      backgroundSize: '300% 300%',
                      animation: 'gradientRotate 4s ease infinite',
                      zIndex: -1,
                      '@keyframes gradientRotate': {
                        '0%': { backgroundPosition: '0% 50%' },
                        '50%': { backgroundPosition: '100% 50%' },
                        '100%': { backgroundPosition: '0% 50%' }
                      }
                    }}
                  />
                </Box>

                {/* 기술 스택 뱃지 */}
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    justifyContent: 'center',
                    maxWidth: '300px'
                  }}
                >
                  {skills.slice(0, 4).map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <Chip
                        label={skill.name}
                        icon={<Box sx={{ fontSize: '1.2rem' }}>{skill.icon}</Box>}
                        sx={{
                          background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.3) 0%, rgba(168, 216, 255, 0.3) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(196, 161, 255, 0.5)',
                          color: '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          px: 1,
                          py: 2.5,
                          height: 'auto',
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.5) 0%, rgba(168, 216, 255, 0.5) 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 15px rgba(196, 161, 255, 0.4)'
                          },
                          transition: 'all 0.3s ease',
                          '& .MuiChip-icon': {
                            color: '#C4A1FF',
                            fontSize: '1.2rem'
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>

            {/* 오른쪽: 타이핑 애니메이션 + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {/* 타이핑 애니메이션 헤드라인 */}
                <Box
                  sx={{
                    fontSize: { xs: '2rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 3,
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #C4A1FF 50%, #A8D8FF 100%)',
                    backgroundSize: '200% auto',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradientShift 5s ease infinite',
                    textShadow: 'none',
                    letterSpacing: '0.02em',
                    lineHeight: 1.3,
                    minHeight: { xs: '160px', md: '230px' },
                    '@keyframes gradientShift': {
                      '0%': { backgroundPosition: '0% center' },
                      '50%': { backgroundPosition: '100% center' },
                      '100%': { backgroundPosition: '0% center' }
                    }
                  }}
                >
                  <TypeAnimation
                    sequence={[
                      '안녕하세요,',
                      500,
                      '안녕하세요,\nAI와 함께 성장하는',
                      500,
                      '안녕하세요,\nAI와 함께 성장하는\n차세대 프론트엔드 개발자',
                      500,
                      '안녕하세요,\nAI와 함께 성장하는\n차세대 프론트엔드 개발자\n손은솔입니다',
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

                {/* 서브 헤드라인 (순차 등장) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.5, ease: 'easeOut' }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.4rem' },
                      fontWeight: 400,
                      mb: 4,
                      color: '#E0D4FF',
                      lineHeight: 1.8,
                      textShadow: '0 0 20px rgba(196, 161, 255, 0.3)'
                    }}
                  >
                    매일 배우고, 끊임없이 성장합니다
                  </Typography>

                  {/* 추가 설명 */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1.1rem' },
                      color: '#B8B8D0',
                      lineHeight: 1.6,
                      mb: 5,
                      maxWidth: '500px',
                      mx: { xs: 'auto', md: 0 }
                    }}
                  >
                    사용자 경험을 최우선으로 생각하며, 디자인과 개발의 조화를 추구합니다.
                    React와 최신 웹 기술로 아름답고 직관적인 웹 애플리케이션을 만듭니다.
                  </Typography>
                </motion.div>

                {/* CTA 버튼 (순차 등장) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 4, ease: 'easeOut' }}
                >
                  {/* 주요 CTA 버튼들 */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      flexWrap: 'wrap',
                      mb: 3
                    }}
                  >
                    {/* Primary CTA - 프로젝트 보기 */}
                    <Button
                      component={Link}
                      to="/projects"
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #C4A1FF 0%, #A8D8FF 100%)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        px: 6,
                        py: 2,
                        fontSize: '1.2rem',
                        borderRadius: '35px',
                        boxShadow: '0 10px 35px rgba(196, 161, 255, 0.6)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                          transition: 'left 0.5s ease'
                        },
                        '&:hover': {
                          background: 'linear-gradient(135deg, #E0D4FF 0%, #C4E8FF 100%)',
                          transform: 'translateY(-5px) scale(1.08)',
                          boxShadow: '0 15px 45px rgba(196, 161, 255, 0.8)',
                          '&::before': {
                            left: '100%'
                          }
                        },
                        transition: 'all 0.4s ease'
                      }}
                    >
                      프로젝트 보기 🚀
                    </Button>

                    {/* Secondary CTA - 연락하기 */}
                    <Button
                      onClick={() => scrollToSection('contact-section')}
                      variant="outlined"
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 600,
                        px: 5,
                        py: 2,
                        fontSize: '1.1rem',
                        borderRadius: '35px',
                        border: '2px solid rgba(196, 161, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(196, 161, 255, 0.1)',
                        '&:hover': {
                          border: '2px solid #C4A1FF',
                          background: 'rgba(196, 161, 255, 0.3)',
                          transform: 'translateY(-4px) scale(1.05)',
                          boxShadow: '0 8px 30px rgba(196, 161, 255, 0.5)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      연락하기 ✉️
                    </Button>

                    {/* Tertiary CTA - About Me */}
                    <Button
                      component={Link}
                      to="/about"
                      variant="text"
                      sx={{
                        color: '#E0D4FF',
                        fontWeight: 600,
                        px: 4,
                        py: 2,
                        fontSize: '1rem',
                        borderRadius: '35px',
                        '&:hover': {
                          background: 'rgba(196, 161, 255, 0.15)',
                          color: '#FFFFFF',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      About Me →
                    </Button>
                  </Box>

                  {/* 소셜 링크 아이콘 */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#B8B8D0',
                        fontSize: '0.9rem',
                        mr: 1
                      }}
                    >
                      소셜 링크:
                    </Typography>

                    {/* GitHub */}
                    <Tooltip title="GitHub 프로필" arrow>
                      <IconButton
                        component="a"
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.2) 0%, rgba(168, 216, 255, 0.2) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(196, 161, 255, 0.3)',
                          color: '#FFFFFF',
                          width: '48px',
                          height: '48px',
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.4) 0%, rgba(168, 216, 255, 0.4) 100%)',
                            borderColor: '#C4A1FF',
                            transform: 'translateY(-4px) rotate(5deg)',
                            boxShadow: '0 8px 25px rgba(196, 161, 255, 0.5)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <GitHubIcon sx={{ fontSize: '1.5rem' }} />
                      </IconButton>
                    </Tooltip>

                    {/* LinkedIn */}
                    <Tooltip title="LinkedIn 프로필" arrow>
                      <IconButton
                        component="a"
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.2) 0%, rgba(168, 216, 255, 0.2) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(196, 161, 255, 0.3)',
                          color: '#FFFFFF',
                          width: '48px',
                          height: '48px',
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(168, 216, 255, 0.4) 0%, rgba(196, 161, 255, 0.4) 100%)',
                            borderColor: '#A8D8FF',
                            transform: 'translateY(-4px) rotate(-5deg)',
                            boxShadow: '0 8px 25px rgba(168, 216, 255, 0.5)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <LinkedInIcon sx={{ fontSize: '1.5rem' }} />
                      </IconButton>
                    </Tooltip>

                    {/* Email */}
                    <Tooltip title="이메일 보내기" arrow>
                      <IconButton
                        component="a"
                        href="mailto:your.email@example.com"
                        sx={{
                          background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.2) 0%, rgba(255, 196, 232, 0.2) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(196, 161, 255, 0.3)',
                          color: '#FFFFFF',
                          width: '48px',
                          height: '48px',
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(255, 196, 232, 0.4) 0%, rgba(196, 161, 255, 0.4) 100%)',
                            borderColor: '#FFC4E8',
                            transform: 'translateY(-4px) scale(1.1)',
                            boxShadow: '0 8px 25px rgba(255, 196, 232, 0.5)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <EmailIcon sx={{ fontSize: '1.5rem' }} />
                      </IconButton>
                    </Tooltip>

                    {/* 이력서 다운로드 (선택사항) */}
                    <Tooltip title="이력서 다운로드" arrow>
                      <IconButton
                        component="a"
                        href="/resume.pdf"
                        download
                        sx={{
                          background: 'linear-gradient(135deg, rgba(168, 255, 196, 0.2) 0%, rgba(168, 216, 255, 0.2) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(196, 161, 255, 0.3)',
                          color: '#FFFFFF',
                          width: '48px',
                          height: '48px',
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(168, 255, 196, 0.4) 0%, rgba(168, 216, 255, 0.4) 100%)',
                            borderColor: '#A8FFC4',
                            transform: 'translateY(-4px) rotate(10deg)',
                            boxShadow: '0 8px 25px rgba(168, 255, 196, 0.5)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <DescriptionIcon sx={{ fontSize: '1.5rem' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Box>

          {/* 스크롤 인디케이터 - 개선 버전 */}
          <Box
            onClick={scrollToNext}
            sx={{
              position: 'absolute',
              bottom: 30,
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              animation: 'bounce 2s ease-in-out infinite',
              '&:hover': {
                '& .scroll-text': {
                  color: '#FFFFFF'
                },
                '& .scroll-icon': {
                  transform: 'scale(1.2)',
                  color: '#FFFFFF'
                }
              },
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
            <Typography
              className="scroll-text"
              variant="caption"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#E0D4FF',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textShadow: '0 0 10px rgba(196, 161, 255, 0.5)',
                transition: 'color 0.3s ease'
              }}
            >
              Scroll Down
            </Typography>
            <KeyboardArrowDownIcon
              className="scroll-icon"
              sx={{
                fontSize: '3rem',
                color: '#C4A1FF',
                filter: 'drop-shadow(0 0 10px rgba(196, 161, 255, 0.6))',
                transition: 'all 0.3s ease'
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* About Me Section - 홈 탭 전용 */}
      <Box
        sx={{
          width: '100%',
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #0A0E27 0%, #1A1F3A 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontFamily: '"Playfair Display", "Noto Serif KR", serif',
                  fontWeight: 700,
                  mb: 2,
                  color: '#FFFFFF',
                  textShadow: '0 0 30px rgba(196, 161, 255, 0.6)',
                  letterSpacing: '0.05em'
                }}
              >
                About Me
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontStyle: 'italic',
                  color: '#B8B8D0',
                  mb: 3
                }}
              >
                나에 대해서 ✨
              </Typography>
              <Box
                sx={{
                  width: '120px',
                  height: '5px',
                  background: 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 50%, #FFC4E8 100%)',
                  mx: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0 0 15px rgba(196, 161, 255, 0.8)'
                }}
              />
            </Box>
          </motion.div>

          {/* 로딩 상태 */}
          {loading && <LoadingIndicator message="데이터를 불러오는 중..." />}

          {/* 에러 상태 */}
          {error && <ErrorMessage message={error} />}

          {/* 정상 상태: About Me 카드 */}
          {!loading && !error && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 4,
                mb: 6
              }}
            >
              {homeData.sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.1) 0%, rgba(168, 216, 255, 0.1) 100%)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(196, 161, 255, 0.3)',
                    borderRadius: '20px',
                    height: '100%',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: '#C4A1FF',
                      boxShadow: '0 12px 32px rgba(196, 161, 255, 0.4)'
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: '1.5rem', md: '1.8rem' },
                        fontWeight: 700,
                        mb: 3,
                        color: '#FFFFFF',
                        textShadow: '0 0 15px rgba(196, 161, 255, 0.4)'
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        color: '#E0D4FF',
                        lineHeight: 1.8
                      }}
                    >
                      {section.summary}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
              ))}
            </Box>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                component={Link}
                to="/about"
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
                    background: 'rgba(196, 161, 255, 0.25)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(196, 161, 255, 0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                더 알아보기 →
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Developer's Menu (Skills) Section - 업그레이드 버전 */}
      <Box
        sx={{
          width: '100%',
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #0A0E27 0%, #1A1F3A 50%, #2D3250 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(196, 161, 255, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(168, 216, 255, 0.08) 0%, transparent 60%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* 섹션 타이틀 */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <RestaurantMenuIcon
                sx={{
                  fontSize: '4rem',
                  color: '#C4A1FF',
                  mb: 3,
                  filter: 'drop-shadow(0 0 20px rgba(196, 161, 255, 0.8))',
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                  }
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontFamily: '"Playfair Display", "Noto Serif KR", serif',
                  fontWeight: 700,
                  mb: 2,
                  color: '#FFFFFF',
                  textShadow: '0 0 30px rgba(196, 161, 255, 0.6)',
                  letterSpacing: '0.05em'
                }}
              >
                Developer's Menu
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontStyle: 'italic',
                  color: '#B8B8D0',
                  mb: 3
                }}
              >
                Today's Special ✨
              </Typography>
              <Box
                sx={{
                  width: '120px',
                  height: '5px',
                  background: 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 50%, #FFC4E8 100%)',
                  mx: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0 0 15px rgba(196, 161, 255, 0.8)'
                }}
              />
            </motion.div>
          </Box>

          {/* 스킬 메뉴 목록 - 업그레이드 디자인 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '1000px', mx: 'auto' }}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card
                  onClick={() => handleSkillClick(skill)}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.1) 0%, rgba(168, 216, 255, 0.1) 100%)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid rgba(196, 161, 255, 0.3)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(196, 161, 255, 0.2)',
                    cursor: 'pointer',
                    overflow: 'visible',
                    position: 'relative',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.25) 0%, rgba(168, 216, 255, 0.25) 100%)',
                      borderColor: '#C4A1FF',
                      transform: 'translateX(15px) scale(1.02)',
                      boxShadow: '0 12px 48px rgba(196, 161, 255, 0.5)',
                      '& .skill-icon': {
                        transform: 'scale(1.2) rotate(10deg)',
                        filter: 'drop-shadow(0 0 15px rgba(196, 161, 255, 0.8))'
                      },
                      '& .skill-dots': {
                        animation: 'sparkle 1s infinite'
                      },
                      '& .level-bar': {
                        '& .MuiLinearProgress-bar': {
                          animation: 'glow 1.5s ease-in-out infinite'
                        }
                      }
                    },
                    '@keyframes sparkle': {
                      '0%, 100%': { opacity: 0.4 },
                      '50%': { opacity: 1 }
                    },
                    '@keyframes glow': {
                      '0%, 100%': { boxShadow: '0 0 10px rgba(196, 161, 255, 0.5)' },
                      '50%': { boxShadow: '0 0 20px rgba(196, 161, 255, 1)' }
                    }
                  }}
                >
                  {/* 카테고리 뱃지 */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: 20,
                      px: 2,
                      py: 0.5,
                      background: 'linear-gradient(135deg, #C4A1FF 0%, #A8D8FF 100%)',
                      borderRadius: '20px',
                      boxShadow: '0 4px 12px rgba(196, 161, 255, 0.5)',
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}
                    >
                      {skill.category}
                    </Typography>
                  </Box>

                  <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 3,
                        flexWrap: 'wrap',
                        mb: 3
                      }}
                    >
                      {/* 스킬 아이콘 + 이름 */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: { xs: '1 1 100%', md: '0 1 250px' } }}>
                        <Box
                          className="skill-icon"
                          sx={{
                            fontSize: '3rem',
                            transition: 'all 0.4s ease',
                            filter: 'drop-shadow(0 0 10px rgba(196, 161, 255, 0.5))'
                          }}
                        >
                          {skill.icon}
                        </Box>
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: { xs: '1.6rem', md: '2rem' },
                            fontWeight: 700,
                            color: '#FFFFFF',
                            fontFamily: '"Playfair Display", "Noto Serif KR", serif',
                            textShadow: '0 0 15px rgba(196, 161, 255, 0.4)'
                          }}
                        >
                          {skill.name}
                        </Typography>
                      </Box>

                      {/* 점선 */}
                      <Box
                        className="skill-dots"
                        sx={{
                          flex: 1,
                          borderBottom: '3px dotted rgba(196, 161, 255, 0.6)',
                          minWidth: '100px',
                          display: { xs: 'none', md: 'block' },
                          transition: 'opacity 0.3s ease'
                        }}
                      />

                      {/* 숙련도 (기울임체) */}
                      <Box sx={{ minWidth: '100px', textAlign: 'right' }}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: { xs: '1.6rem', md: '1.8rem' },
                            fontStyle: 'italic',
                            fontWeight: 700,
                            color: '#C4A1FF',
                            fontFamily: '"Playfair Display", "Noto Serif KR", serif',
                            textShadow: '0 0 15px rgba(196, 161, 255, 0.6)'
                          }}
                        >
                          {skill.level}
                        </Typography>
                      </Box>
                    </Box>

                    {/* 설명 */}
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        fontSize: { xs: '1.05rem', md: '1.15rem' },
                        color: '#E0D4FF',
                        fontStyle: 'italic',
                        lineHeight: 1.7,
                        pl: { xs: 0, md: '4.5rem' }
                      }}
                    >
                      "{skill.description}"
                    </Typography>

                    {/* 레벨바 */}
                    <Box
                      className="level-bar"
                      sx={{
                        pl: { xs: 0, md: '4.5rem' }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.85rem',
                            color: '#B8B8D0',
                            fontWeight: 600
                          }}
                        >
                          숙련도 레벨
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.85rem',
                            color: '#C4A1FF',
                            fontWeight: 700
                          }}
                        >
                          {skill.levelValue}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={skill.levelValue}
                        sx={{
                          height: '10px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(196, 161, 255, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: '10px',
                            background: 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 50%, #FFC4E8 100%)',
                            boxShadow: '0 0 10px rgba(196, 161, 255, 0.5)',
                            transition: 'all 0.4s ease'
                          }
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* 메뉴판 푸터 - 더 알아보기 버튼 추가 */}
          <Box
            sx={{
              mt: 8,
              pt: 5,
              borderTop: '2px dashed rgba(196, 161, 255, 0.4)',
              textAlign: 'center'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#B8B8D0',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  display: 'block',
                  mb: 2
                }}
              >
                * 숙련도: 上(상) 中(중) 下(하) | 클릭하시면 상세 정보를 확인하실 수 있습니다
              </Typography>

              <Button
                component={Link}
                to="/about"
                variant="outlined"
                sx={{
                  mt: 2,
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
                    background: 'rgba(196, 161, 255, 0.25)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(196, 161, 255, 0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                전체 스킬 및 상세 정보 보기 →
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* 스킬 상세 모달 */}
      <Modal
        open={skillModalOpen}
        onClose={handleSkillModalClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '90%', sm: '550px' },
            maxHeight: '85vh',
            overflow: 'auto',
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.98) 0%, rgba(45, 50, 80, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            border: '3px solid #C4A1FF',
            borderRadius: '20px',
            boxShadow: '0 0 60px rgba(196, 161, 255, 0.7)',
            p: { xs: 3, md: 5 }
          }}
        >
          {/* 닫기 버튼 */}
          <IconButton
            onClick={handleSkillModalClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#C4A1FF',
              '&:hover': {
                background: 'rgba(196, 161, 255, 0.2)',
                transform: 'rotate(90deg)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedSkill && (
            <Box>
              {/* 스킬 이름 */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  color: '#FFFFFF',
                  textShadow: '0 0 25px rgba(196, 161, 255, 0.6)',
                  fontFamily: '"Playfair Display", "Noto Serif KR", serif'
                }}
              >
                {selectedSkill.name}
              </Typography>

              {/* 숙련도 */}
              <Chip
                label={`숙련도: ${selectedSkill.level}`}
                sx={{
                  mb: 4,
                  background: 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  px: 2,
                  py: 2.5,
                  height: 'auto',
                  boxShadow: '0 0 20px rgba(196, 161, 255, 0.5)'
                }}
              />

              {/* 설명 */}
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: '1.2rem',
                  fontStyle: 'italic',
                  color: '#E0D4FF',
                  lineHeight: 1.7,
                  p: 3,
                  background: 'rgba(196, 161, 255, 0.1)',
                  borderRadius: '12px',
                  borderLeft: '4px solid #C4A1FF'
                }}
              >
                "{selectedSkill.description}"
              </Typography>

              {/* 상세 내용 */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    mb: 2,
                    color: '#C4A1FF',
                    textShadow: '0 0 10px rgba(196, 161, 255, 0.4)'
                  }}
                >
                  상세 내용
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: '#E0D4FF',
                    fontSize: '1.05rem'
                  }}
                >
                  {selectedSkill.detail}
                </Typography>
              </Box>

              {/* 경험 */}
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    mb: 2,
                    color: '#C4A1FF',
                    textShadow: '0 0 10px rgba(196, 161, 255, 0.4)'
                  }}
                >
                  학습 및 프로젝트 경험
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: '#E0D4FF',
                    fontSize: '1.05rem'
                  }}
                >
                  {selectedSkill.experience}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Contact Section */}
      <Box id="contact-section">
        <ContactSection />
      </Box>
    </Box>
  );
}

export default Home;
