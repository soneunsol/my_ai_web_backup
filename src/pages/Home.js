import React from 'react';
import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const sections = [
    {
      id: 'hero',
      title: 'Hero 섹션',
      description: '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.',
      gradient: true,
    },
    {
      id: 'about',
      title: 'About Me 섹션',
      description: '여기는 About Me 섹션입니다. 간단한 자기소개와 "더 알아보기" 버튼이 들어갈 예정입니다.',
      hasButton: true,
      buttonText: '더 알아보기',
      buttonLink: '/about',
    },
    {
      id: 'skills',
      title: 'Skill Tree 섹션',
      description: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.',
    },
    {
      id: 'projects',
      title: 'Projects 섹션',
      description: '여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 "더 보기" 버튼이 들어갈 예정입니다.',
      hasButton: true,
      buttonText: '더 보기',
      buttonLink: '/projects',
    },
    {
      id: 'contact',
      title: 'Contact 섹션',
      description: '여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {sections.map((section, index) => (
        <Box
          key={section.id}
          sx={{
            py: 8,
            backgroundColor: index % 2 === 0
              ? 'var(--color-bg-primary)'
              : 'var(--color-bg-secondary)',
          }}
        >
          <Container maxWidth="md">
            <Card
              sx={{
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'var(--color-primary)',
                  boxShadow: 'var(--shadow-lg), var(--glow-primary)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: 'var(--color-text-primary)',
                    ...(section.gradient && {
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }),
                  }}
                >
                  {section.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.8,
                    mt: 2,
                  }}
                >
                  {section.description}
                </Typography>

                {section.hasButton && (
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      component={Link}
                      to={section.buttonLink}
                      variant="contained"
                      sx={{
                        background: 'var(--gradient-primary)',
                        color: 'var(--color-text-primary)',
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        textTransform: 'none',
                        boxShadow: 'var(--glow-primary)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'var(--gradient-secondary)',
                          transform: 'scale(1.05)',
                          boxShadow: 'var(--shadow-lg), var(--glow-primary)',
                        },
                      }}
                    >
                      {section.buttonText}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Container>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
