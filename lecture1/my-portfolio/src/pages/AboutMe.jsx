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
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

function AboutMe() {
  const [currentTab, setCurrentTab] = useState(0);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // About Me 데이터 구조
  const aboutMeData = {
    basicInfo: {
      name: '손은솔',
      education: 'sbs아카데미 컴퓨터 학원',
      major: '웹 개발',
      experience: '신입',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    sections: [
      {
        id: 'dev-story',
        title: '나의 개발 스토리',
        showInHome: true,
        content: {
          start: {
            title: '개발을 시작하게 된 계기',
            text: '나를 간략히 표현하는 웹사이트를 만들고 싶었습니다. 처음에는 단순히 나를 소개하는 페이지를 만들고 싶다는 생각이었지만, 코드를 작성하면서 점점 더 깊이 빠져들게 되었습니다.'
          },
          value: {
            title: '핵심 가치관',
            text: '즐겁게 디자인하기. 개발은 단순히 기능을 구현하는 것이 아니라, 사용자에게 즐거움을 주는 경험을 만드는 일이라고 생각합니다. 아름다운 UI와 부드러운 UX를 통해 사용자가 웃을 수 있는 웹을 만들고 싶습니다.'
          },
          personal: {
            title: '개인적 매력',
            hobby: '취미: 줌바 💃',
            hobbyDesc: '리듬을 타며 스트레스를 날려버립니다. 코드를 짜는 것도 일종의 춤이라고 생각해요!',
            interest: '관심사: AI 🤖',
            interestDesc: 'ChatGPT와 함께 코딩하는 시대. AI를 도구로 활용하는 개발자가 되고 싶습니다.'
          },
          goal: {
            title: '성장 목표',
            text: '시니어 프론트엔드 개발자가 되는 것이 목표입니다. React의 깊은 이해, 성능 최적화, 아키텍처 설계 능력을 갖춘 개발자로 성장하고 싶습니다.',
            roadmap: [
              { year: '2025', goal: '주니어 개발자 취업', status: '진행 중' },
              { year: '2026', goal: '중급 프로젝트 리드', status: '목표' },
              { year: '2028', goal: '시니어 개발자 도달', status: '목표' }
            ]
          }
        }
      },
      {
        id: 'philosophy',
        title: '개발 철학',
        showInHome: true,
        content: {
          principles: [
            {
              title: '사용자 중심 개발',
              description: '항상 사용자의 입장에서 생각하고, 사용자가 편리하게 사용할 수 있는 인터페이스를 만들기 위해 노력합니다.'
            },
            {
              title: '코드의 가독성',
              description: '좋은 코드는 다른 개발자가 읽기 쉬운 코드입니다. 명확한 변수명, 함수명, 그리고 적절한 주석을 통해 유지보수가 쉬운 코드를 작성합니다.'
            },
            {
              title: '지속적인 학습',
              description: '기술은 빠르게 변화합니다. 새로운 기술을 배우는 것을 두려워하지 않고, 항상 더 나은 방법을 찾기 위해 노력합니다.'
            }
          ]
        }
      },
      {
        id: 'personal',
        title: '개인적인 이야기',
        showInHome: false,
        content: {
          background: '컴퓨터 학원에서 웹 개발을 처음 배우기 시작했습니다. 처음에는 HTML, CSS부터 시작했지만, JavaScript를 배우면서 프로그래밍의 재미를 느꼈습니다.',
          motivation: '웹 개발자가 되고 싶은 이유는 내가 만든 것이 실제로 사람들에게 사용되는 것을 보고 싶기 때문입니다. 작은 기능 하나라도 누군가의 일상을 편리하게 만들 수 있다는 것이 매력적입니다.',
          future: '앞으로는 프론트엔드뿐만 아니라 백엔드, 데이터베이스까지 전체적인 웹 개발 프로세스를 이해하는 풀스택 개발자로 성장하고 싶습니다.'
        }
      },
      {
        id: 'skills',
        title: 'Developer\'s Menu',
        showInHome: true,
        content: {
          skills: [
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
          ]
        }
      }
    ]
  };

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

            {/* Developer's Menu (Skills) */}
            {currentTab === 3 && (
              <Box>
                {/* 메뉴판 헤더 */}
                <Box
                  sx={{
                    textAlign: 'center',
                    mb: 4,
                    pb: 3,
                    borderBottom: '2px dashed rgba(196, 161, 255, 0.3)'
                  }}
                >
                  <RestaurantMenuIcon
                    sx={{
                      fontSize: '3rem',
                      color: '#C4A1FF',
                      mb: 2,
                      filter: 'drop-shadow(0 0 10px rgba(196, 161, 255, 0.6))'
                    }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                      fontFamily: '"Playfair Display", "Noto Serif KR", serif',
                      fontWeight: 700,
                      mb: 1,
                      color: '#FFFFFF',
                      textShadow: '0 0 15px rgba(196, 161, 255, 0.5)'
                    }}
                  >
                    Developer's Menu
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: 'italic',
                      color: '#B8B8D0',
                      fontSize: '0.95rem'
                    }}
                  >
                    Today's Special
                  </Typography>
                </Box>

                {/* 스킬 메뉴 목록 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {aboutMeData.sections[3].content.skills.map((skill, index) => (
                    <Card
                      key={index}
                      onClick={() => handleSkillClick(skill)}
                      sx={{
                        background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.05) 0%, rgba(168, 216, 255, 0.05) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(196, 161, 255, 0.2)',
                        boxShadow: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.15) 0%, rgba(168, 216, 255, 0.15) 100%)',
                          borderColor: '#C4A1FF',
                          transform: 'translateX(8px)',
                          boxShadow: '0 0 25px rgba(196, 161, 255, 0.4)',
                          '& .skill-dots': {
                            animation: 'sparkle 1s infinite'
                          }
                        },
                        '@keyframes sparkle': {
                          '0%, 100%': { opacity: 0.4 },
                          '50%': { opacity: 1 }
                        }
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                            flexWrap: 'wrap'
                          }}
                        >
                          {/* 스킬 이름 */}
                          <Box sx={{ flex: { xs: '1 1 100%', md: '0 1 180px' } }}>
                            <Typography
                              variant="h4"
                              sx={{
                                fontSize: { xs: '1.3rem', md: '1.5rem' },
                                fontWeight: 700,
                                color: '#FFFFFF',
                                fontFamily: '"Playfair Display", "Noto Serif KR", serif'
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
                              borderBottom: '2px dotted rgba(196, 161, 255, 0.4)',
                              minWidth: '60px',
                              display: { xs: 'none', md: 'block' },
                              transition: 'opacity 0.3s ease'
                            }}
                          />

                          {/* 숙련도 (기울임체) */}
                          <Box sx={{ minWidth: '60px', textAlign: 'right' }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: { xs: '1.2rem', md: '1.4rem' },
                                fontStyle: 'italic',
                                fontWeight: 600,
                                color: '#C4A1FF',
                                fontFamily: '"Playfair Display", "Noto Serif KR", serif'
                              }}
                            >
                              {skill.level}
                            </Typography>
                          </Box>
                        </Box>

                        {/* 설명 */}
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1.5,
                            fontSize: '0.95rem',
                            color: '#E0D4FF',
                            fontStyle: 'italic'
                          }}
                        >
                          "{skill.description}"
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>

                {/* 메뉴판 푸터 */}
                <Box
                  sx={{
                    mt: 4,
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
                      fontSize: '0.85rem'
                    }}
                  >
                    * 숙련도: 上(상) 中(중) 下(하)
                  </Typography>
                  <br />
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#B8B8D0',
                      fontSize: '0.85rem',
                      mt: 1
                    }}
                  >
                    클릭하시면 상세 정보를 확인하실 수 있습니다
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
