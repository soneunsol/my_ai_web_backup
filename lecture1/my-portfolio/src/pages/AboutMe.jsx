/**
 * AboutMe 페이지 - 오로라 테마
 *
 * Props: 없음
 *
 * 주요 기능:
 * - 기본 정보 카드 (프로필, 이름, 학력, 전공, 경력)
 * - 콘텐츠 섹션 탭 (개발 스토리, 개발 철학, 개인적 이야기)
 * - showInHome 속성으로 홈 페이지 표시 여부 관리
 * - 오로라 테마 디자인 (연보라 그라디언트, 별 모티브)
 * - 반응형 디자인
 * - Context API를 통한 전역 상태 관리
 */
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Tabs,
  Tab,
  Chip,
  Modal,
  IconButton
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { usePortfolio } from '../contexts/PortfolioContext';
import SkillsSection from '../components/landing/SkillsSection';

function AboutMe() {
  const [currentTab, setCurrentTab] = useState(0);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Context에서 데이터 가져오기
  const { aboutMeData } = usePortfolio();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
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
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, md: 8 },
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
          background: 'radial-gradient(ellipse at 50% 20%, rgba(196, 161, 255, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* 페이지 타이틀 */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
              color: '#FFFFFF',
              textShadow: '0 0 20px rgba(196, 161, 255, 0.5)'
            }}
          >
            About Me
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '5px',
              background: 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 50%, #FFC4E8 100%)',
              mx: 'auto',
              boxShadow: '0 0 10px rgba(196, 161, 255, 0.6)'
            }}
          />
        </Box>

        {/* 기본 정보 섹션 */}
        <Card
          sx={{
            mb: 6,
            background: 'rgba(45, 50, 80, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(196, 161, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(196, 161, 255, 0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(196, 161, 255, 0.3)',
              transform: 'translateY(-8px)',
              border: '1px solid rgba(196, 161, 255, 0.4)'
            }
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={4} alignItems="center">
              {/* 프로필 사진 */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    src={aboutMeData.basicInfo.photo}
                    alt={aboutMeData.basicInfo.name}
                    sx={{
                      width: { xs: 150, md: 200 },
                      height: { xs: 150, md: 200 },
                      border: '4px solid #C4A1FF',
                      boxShadow: '0 0 30px rgba(196, 161, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                </Box>
              </Grid>

              {/* 기본 정보 */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 700,
                    mb: 3,
                    color: '#FFFFFF',
                    textShadow: '0 0 10px rgba(196, 161, 255, 0.5)'
                  }}
                >
                  {aboutMeData.basicInfo.name}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* 학력 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SchoolIcon sx={{ color: '#C4A1FF', fontSize: '2rem' }} />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: '#B8B8D0', display: 'block' }}
                      >
                        학력
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#FFFFFF' }}
                      >
                        {aboutMeData.basicInfo.education}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 전공 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CodeIcon sx={{ color: '#C4A1FF', fontSize: '2rem' }} />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: '#B8B8D0', display: 'block' }}
                      >
                        전공
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#FFFFFF' }}
                      >
                        {aboutMeData.basicInfo.major}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 경력 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <WorkIcon sx={{ color: '#C4A1FF', fontSize: '2rem' }} />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: '#B8B8D0', display: 'block' }}
                      >
                        경력
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: '1.1rem', color: '#FFFFFF' }}
                      >
                        {aboutMeData.basicInfo.experience}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 콘텐츠 섹션 (탭) */}
        <Card
          sx={{
            background: 'rgba(45, 50, 80, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(196, 161, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(196, 161, 255, 0.15)'
          }}
        >
          {/* 탭 헤더 */}
          <Box sx={{ borderBottom: 1, borderColor: 'rgba(196, 161, 255, 0.2)' }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minHeight: '64px',
                  color: '#B8B8D0'
                },
                '& .Mui-selected': {
                  color: '#FFFFFF'
                },
                '& .MuiTabs-indicator': {
                  background: 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 100%)',
                  height: '4px',
                  boxShadow: '0 0 10px rgba(196, 161, 255, 0.6)'
                }
              }}
            >
              {aboutMeData.sections.map((section, index) => (
                <Tab
                  key={section.id}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {section.title}
                      {section.showInHome && (
                        <StarIcon sx={{ fontSize: '1rem', color: '#C4A1FF' }} />
                      )}
                    </Box>
                  }
                />
              ))}
              {/* Developer's Menu 탭 추가 */}
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Developer's Menu
                    <StarIcon sx={{ fontSize: '1rem', color: '#C4A1FF' }} />
                  </Box>
                }
              />
            </Tabs>
          </Box>

          {/* 탭 콘텐츠 */}
          <CardContent sx={{ p: { xs: 3, md: 5 }, minHeight: '400px' }}>
            {/* 나의 개발 스토리 */}
            {currentTab === 0 && (
              <Box>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      mb: 2,
                      color: '#FFFFFF',
                      textShadow: '0 0 10px rgba(196, 161, 255, 0.3)'
                    }}
                  >
                    {aboutMeData.sections[0].content.start.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#E0D4FF' }}
                  >
                    {aboutMeData.sections[0].content.start.text}
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      mb: 2,
                      color: '#FFFFFF',
                      textShadow: '0 0 10px rgba(196, 161, 255, 0.3)'
                    }}
                  >
                    {aboutMeData.sections[0].content.value.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#E0D4FF' }}
                  >
                    {aboutMeData.sections[0].content.value.text}
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      mb: 2,
                      color: '#FFFFFF',
                      textShadow: '0 0 10px rgba(196, 161, 255, 0.3)'
                    }}
                  >
                    {aboutMeData.sections[0].content.personal.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, mb: 1, color: '#C4A1FF' }}
                    >
                      {aboutMeData.sections[0].content.personal.hobby}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ lineHeight: 1.8, color: '#E0D4FF' }}
                    >
                      {aboutMeData.sections[0].content.personal.hobbyDesc}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, mb: 1, color: '#C4A1FF' }}
                    >
                      {aboutMeData.sections[0].content.personal.interest}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ lineHeight: 1.8, color: '#E0D4FF' }}
                    >
                      {aboutMeData.sections[0].content.personal.interestDesc}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      mb: 2,
                      color: '#FFFFFF',
                      textShadow: '0 0 10px rgba(196, 161, 255, 0.3)'
                    }}
                  >
                    {aboutMeData.sections[0].content.goal.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#E0D4FF', mb: 3 }}
                  >
                    {aboutMeData.sections[0].content.goal.text}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {aboutMeData.sections[0].content.goal.roadmap.map((item) => (
                      <Box
                        key={item.year}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          background: 'rgba(196, 161, 255, 0.1)',
                          borderRadius: '8px',
                          borderLeft: '4px solid #C4A1FF',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(196, 161, 255, 0.2)',
                            transform: 'translateX(8px)'
                          }
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ fontSize: '1.2rem', fontWeight: 700, minWidth: '60px', color: '#C4A1FF' }}
                        >
                          {item.year}
                        </Typography>
                        <Typography variant="body1" sx={{ flex: 1, color: '#FFFFFF' }}>
                          {item.goal}
                        </Typography>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            backgroundColor: item.status === '진행 중' ? '#C4A1FF' : 'rgba(184, 184, 208, 0.3)',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            border: item.status === '진행 중' ? 'none' : '1px solid #B8B8D0'
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {/* 개발 철학 */}
            {currentTab === 1 && (
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: '#B8B8D0',
                    mb: 4,
                    fontSize: '1.1rem'
                  }}
                >
                  개발을 하면서 가장 중요하게 생각하는 원칙들입니다.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {aboutMeData.sections[1].content.principles.map((principle, index) => (
                    <Card
                      key={index}
                      sx={{
                        background: 'rgba(196, 161, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: 'none',
                        border: '1px solid rgba(196, 161, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#C4A1FF',
                          transform: 'translateX(8px)',
                          boxShadow: '0 0 20px rgba(196, 161, 255, 0.3)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: '1.3rem',
                            fontWeight: 600,
                            mb: 1.5,
                            color: '#FFFFFF',
                            textShadow: '0 0 10px rgba(196, 161, 255, 0.3)'
                          }}
                        >
                          {index + 1}. {principle.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ lineHeight: 1.8, color: '#E0D4FF' }}
                        >
                          {principle.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            )}

            {/* 개인적인 이야기 */}
            {currentTab === 2 && (
              <Box>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      mb: 2,
                      color: '#FFFFFF',
                      textShadow: '0 0 10px rgba(196, 161, 255, 0.3)'
                    }}
                  >
                    배경
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#E0D4FF' }}
                  >
                    {aboutMeData.sections[2].content.background}
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      mb: 2,
                      color: '#FFFFFF',
                      textShadow: '0 0 10px rgba(196, 161, 255, 0.3)'
                    }}
                  >
                    동기
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#E0D4FF' }}
                  >
                    {aboutMeData.sections[2].content.motivation}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      mb: 2,
                      color: '#FFFFFF',
                      textShadow: '0 0 10px rgba(196, 161, 255, 0.3)'
                    }}
                  >
                    미래 계획
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#E0D4FF' }}
                  >
                    {aboutMeData.sections[2].content.future}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Developer's Menu (Skills) - 업그레이드 버전 */}
            {currentTab === 3 && (
              <Box>
                {/* 메뉴판 헤더 */}
                <Box
                  sx={{
                    textAlign: 'center',
                    mb: 5,
                    pb: 3,
                    borderBottom: '2px dashed rgba(196, 161, 255, 0.3)'
                  }}
                >
                  <RestaurantMenuIcon
                    sx={{
                      fontSize: '3.5rem',
                      color: '#C4A1FF',
                      mb: 2,
                      filter: 'drop-shadow(0 0 15px rgba(196, 161, 255, 0.7))',
                      animation: 'float 3s ease-in-out infinite',
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-8px)' }
                      }
                    }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontFamily: '"Playfair Display", "Noto Serif KR", serif',
                      fontWeight: 700,
                      mb: 1,
                      color: '#FFFFFF',
                      textShadow: '0 0 20px rgba(196, 161, 255, 0.6)'
                    }}
                  >
                    Developer's Skills
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: 'italic',
                      color: '#B8B8D0',
                      fontSize: '1rem',
                      mb: 2
                    }}
                  >
                    나의 기술 스택 ✨
                  </Typography>
                  <Box
                    sx={{
                      width: '100px',
                      height: '4px',
                      background: 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 50%, #FFC4E8 100%)',
                      mx: 'auto',
                      borderRadius: '10px',
                      boxShadow: '0 0 12px rgba(196, 161, 255, 0.7)'
                    }}
                  />
                </Box>

                {/* 스킬 섹션 컴포넌트 */}
                <SkillsSection skills={aboutMeData.skills} />

                {/* 메뉴판 푸터 */}
                <Box
                  sx={{
                    mt: 5,
                    pt: 3,
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
                    카드에 마우스를 올리면 상세 정보를 확인할 수 있습니다
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

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
              width: { xs: '90%', sm: '500px' },
              maxHeight: '80vh',
              overflow: 'auto',
              background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.98) 0%, rgba(45, 50, 80, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              border: '2px solid #C4A1FF',
              borderRadius: '16px',
              boxShadow: '0 0 60px rgba(196, 161, 255, 0.6)',
              p: 4
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
                  background: 'rgba(196, 161, 255, 0.2)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>

            {selectedSkill && (
              <Box>
                {/* 스킬 이름 */}
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    mb: 1,
                    color: '#FFFFFF',
                    textShadow: '0 0 20px rgba(196, 161, 255, 0.5)',
                    fontFamily: '"Playfair Display", "Noto Serif KR", serif'
                  }}
                >
                  {selectedSkill.name}
                </Typography>

                {/* 숙련도 */}
                <Chip
                  label={`숙련도: ${selectedSkill.level}`}
                  sx={{
                    mb: 3,
                    background: 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 100%)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    fontSize: '1rem'
                  }}
                />

                {/* 설명 */}
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: '#E0D4FF',
                    lineHeight: 1.6
                  }}
                >
                  "{selectedSkill.description}"
                </Typography>

                {/* 상세 내용 */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      mb: 1.5,
                      color: '#C4A1FF'
                    }}
                  >
                    상세 내용
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      color: '#E0D4FF'
                    }}
                  >
                    {selectedSkill.detail}
                  </Typography>
                </Box>

                {/* 경험 */}
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      mb: 1.5,
                      color: '#C4A1FF'
                    }}
                  >
                    학습 및 프로젝트 경험
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      color: '#E0D4FF'
                    }}
                  >
                    {selectedSkill.experience}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Modal>

        {/* showInHome 표시 안내 */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#B8B8D0' }}>
            <StarIcon sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#C4A1FF' }} />
            별 아이콘이 있는 섹션은 홈 페이지에도 표시됩니다
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutMe;
