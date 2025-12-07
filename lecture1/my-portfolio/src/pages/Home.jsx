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
import { useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Modal, IconButton, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CloseIcon from '@mui/icons-material/Close';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import AuroraCanvas from '../components/landing/AuroraCanvas';
import ContactSection from '../components/landing/ContactSection';

function Home() {
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // 스킬 데이터
  const skills = [
    {
      name: 'HTML',
      description: '웹의 뼈대를 만듭니다',
      level: '下',
      detail: 'HTML5 시맨틱 태그를 활용하여 구조적이고 접근성 높은 웹 페이지를 작성합니다.',
      experience: 'sbs아카데미에서 기초부터 학습하여 다양한 웹 페이지 구조를 이해하고 있습니다.'
    },
    {
      name: 'CSS',
      description: '아름다운 스타일을 입힙니다',
      level: '下',
      detail: 'CSS3, Flexbox, Grid를 활용한 반응형 레이아웃 디자인과 애니메이션 효과를 구현합니다.',
      experience: 'MUI를 사용한 컴포넌트 스타일링과 테마 커스터마이징 경험이 있습니다.'
    },
    {
      name: 'JavaScript',
      description: '생명을 불어넣습니다',
      level: '下',
      detail: 'ES6+ 문법을 활용한 모던 JavaScript 개발과 DOM 조작, 이벤트 처리를 수행합니다.',
      experience: '비동기 처리, Promise, async/await를 활용한 데이터 통신을 구현하고 있습니다.'
    },
    {
      name: 'React',
      description: '컴포넌트로 세상을 만듭니다',
      level: '下',
      detail: 'React Hooks를 활용한 함수형 컴포넌트 개발과 상태 관리를 수행합니다.',
      experience: 'React Router, MUI를 활용한 SPA 개발 경험과 Supabase 연동 프로젝트를 진행했습니다.'
    },
    {
      name: 'Node.js',
      description: '서버와 대화합니다',
      level: '下',
      detail: 'Node.js 기반 백엔드 개발의 기초를 이해하고 API 통신을 구현합니다.',
      experience: 'Express를 활용한 간단한 REST API 개발 경험이 있습니다.'
    }
  ];

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
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

      {/* Developer's Menu (Skills) Section */}
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
            background: 'radial-gradient(ellipse at 50% 50%, rgba(196, 161, 255, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* 섹션 타이틀 */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <RestaurantMenuIcon
              sx={{
                fontSize: '3.5rem',
                color: '#C4A1FF',
                mb: 2,
                filter: 'drop-shadow(0 0 15px rgba(196, 161, 255, 0.6))'
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontFamily: '"Playfair Display", "Noto Serif KR", serif',
                fontWeight: 700,
                mb: 2,
                color: '#FFFFFF',
                textShadow: '0 0 20px rgba(196, 161, 255, 0.5)'
              }}
            >
              Developer's Menu
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontStyle: 'italic',
                color: '#B8B8D0',
                mb: 1
              }}
            >
              Today's Special
            </Typography>
            <Box
              sx={{
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 50%, #FFC4E8 100%)',
                mx: 'auto',
                boxShadow: '0 0 10px rgba(196, 161, 255, 0.6)'
              }}
            />
          </Box>

          {/* 스킬 메뉴 목록 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '900px', mx: 'auto' }}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  onClick={() => handleSkillClick(skill)}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.08) 0%, rgba(168, 216, 255, 0.08) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(196, 161, 255, 0.3)',
                    boxShadow: '0 4px 20px rgba(196, 161, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.2) 0%, rgba(168, 216, 255, 0.2) 100%)',
                      borderColor: '#C4A1FF',
                      transform: 'translateX(12px)',
                      boxShadow: '0 8px 30px rgba(196, 161, 255, 0.4)',
                      '& .skill-dots': {
                        animation: 'sparkle 1s infinite'
                      }
                    },
                    '@keyframes sparkle': {
                      '0%, 100%': { opacity: 0.5 },
                      '50%': { opacity: 1 }
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 3,
                        flexWrap: 'wrap'
                      }}
                    >
                      {/* 스킬 이름 */}
                      <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 200px' } }}>
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: { xs: '1.5rem', md: '1.8rem' },
                            fontWeight: 700,
                            color: '#FFFFFF',
                            fontFamily: '"Playfair Display", "Noto Serif KR", serif',
                            textShadow: '0 0 10px rgba(196, 161, 255, 0.3)'
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
                          borderBottom: '3px dotted rgba(196, 161, 255, 0.5)',
                          minWidth: '80px',
                          display: { xs: 'none', md: 'block' },
                          transition: 'opacity 0.3s ease'
                        }}
                      />

                      {/* 숙련도 (기울임체) */}
                      <Box sx={{ minWidth: '80px', textAlign: 'right' }}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: { xs: '1.4rem', md: '1.6rem' },
                            fontStyle: 'italic',
                            fontWeight: 700,
                            color: '#C4A1FF',
                            fontFamily: '"Playfair Display", "Noto Serif KR", serif',
                            textShadow: '0 0 10px rgba(196, 161, 255, 0.5)'
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
                        mt: 2,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        color: '#E0D4FF',
                        fontStyle: 'italic',
                        lineHeight: 1.6
                      }}
                    >
                      "{skill.description}"
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* 메뉴판 푸터 */}
          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: '2px dashed rgba(196, 161, 255, 0.3)',
              textAlign: 'center'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#B8B8D0',
                fontStyle: 'italic',
                fontSize: '0.95rem',
                display: 'block',
                mb: 1
              }}
            >
              * 숙련도: 上(상) 中(중) 下(하)
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#B8B8D0',
                fontSize: '0.9rem'
              }}
            >
              클릭하시면 상세 정보를 확인하실 수 있습니다
            </Typography>
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
      <ContactSection />
    </Box>
  );
}

export default Home;
