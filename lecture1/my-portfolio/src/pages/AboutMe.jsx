/**
 * AboutMe 페이지
 *
 * Props: 없음
 *
 * 주요 기능:
 * - 기본 정보 카드 (프로필, 이름, 학력, 전공, 경력)
 * - 콘텐츠 섹션 탭 (개발 스토리, 개발 철학, 개인적 이야기)
 * - showInHome 속성으로 홈 페이지 표시 여부 관리
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
  Chip
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';

function AboutMe() {
  const [currentTab, setCurrentTab] = useState(0);

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
      }
    ]
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, md: 8 },
        backgroundColor: '#FAFAFA'
      }}
    >
      <Container maxWidth="lg">
        {/* 페이지 타이틀 */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2
            }}
          >
            About Me
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '5px',
              backgroundColor: '#CFFF00',
              mx: 'auto'
            }}
          />
        </Box>

        {/* 기본 정보 섹션 */}
        <Card
          sx={{
            mb: 6,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(207, 255, 0, 0.3)',
              transform: 'translateY(-4px)'
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
                      border: '4px solid #CFFF00',
                      boxShadow: '0 4px 12px rgba(207, 255, 0, 0.3)'
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
                    color: '#000000'
                  }}
                >
                  {aboutMeData.basicInfo.name}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* 학력 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SchoolIcon sx={{ color: '#CFFF00', fontSize: '2rem' }} />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: '#999999', display: 'block' }}
                      >
                        학력
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: '1.1rem' }}
                      >
                        {aboutMeData.basicInfo.education}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 전공 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CodeIcon sx={{ color: '#CFFF00', fontSize: '2rem' }} />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: '#999999', display: 'block' }}
                      >
                        전공
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: '1.1rem' }}
                      >
                        {aboutMeData.basicInfo.major}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 경력 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <WorkIcon sx={{ color: '#CFFF00', fontSize: '2rem' }} />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: '#999999', display: 'block' }}
                      >
                        경력
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: '1.1rem' }}
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
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* 탭 헤더 */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                  minHeight: '64px'
                },
                '& .Mui-selected': {
                  color: '#000000'
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#CFFF00',
                  height: '4px'
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
                        <HomeIcon sx={{ fontSize: '1rem', color: '#CFFF00' }} />
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
                      color: '#000000'
                    }}
                  >
                    {aboutMeData.sections[0].content.start.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#333333' }}
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
                      color: '#000000'
                    }}
                  >
                    {aboutMeData.sections[0].content.value.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#333333' }}
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
                      color: '#000000'
                    }}
                  >
                    {aboutMeData.sections[0].content.personal.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {aboutMeData.sections[0].content.personal.hobby}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ lineHeight: 1.8, color: '#333333' }}
                    >
                      {aboutMeData.sections[0].content.personal.hobbyDesc}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {aboutMeData.sections[0].content.personal.interest}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ lineHeight: 1.8, color: '#333333' }}
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
                      color: '#000000'
                    }}
                  >
                    {aboutMeData.sections[0].content.goal.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#333333', mb: 3 }}
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
                          backgroundColor: '#F5F5F5',
                          borderRadius: '8px',
                          borderLeft: '4px solid #CFFF00'
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ fontSize: '1.2rem', fontWeight: 700, minWidth: '60px' }}
                        >
                          {item.year}
                        </Typography>
                        <Typography variant="body1" sx={{ flex: 1 }}>
                          {item.goal}
                        </Typography>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            backgroundColor: item.status === '진행 중' ? '#CFFF00' : '#E0E0E0',
                            color: '#000000',
                            fontWeight: 600
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
                    color: '#666666',
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
                        backgroundColor: '#F8F8F8',
                        boxShadow: 'none',
                        border: '1px solid #E0E0E0',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#CFFF00',
                          transform: 'translateX(8px)'
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
                            color: '#000000'
                          }}
                        >
                          {index + 1}. {principle.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ lineHeight: 1.8, color: '#333333' }}
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
                      color: '#000000'
                    }}
                  >
                    배경
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#333333' }}
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
                      color: '#000000'
                    }}
                  >
                    동기
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#333333' }}
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
                      color: '#000000'
                    }}
                  >
                    미래 계획
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: '#333333' }}
                  >
                    {aboutMeData.sections[2].content.future}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* showInHome 표시 안내 */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#999999' }}>
            <HomeIcon sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5 }} />
            아이콘이 있는 섹션은 홈 페이지에도 표시됩니다
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutMe;
