/**
 * Projects 페이지
 *
 * Props: 없음
 *
 * 주요 기능:
 * - Supabase에서 프로젝트 목록 불러오기
 * - 4열 카드 그리드 레이아웃 (반응형)
 * - 프로젝트 썸네일 이미지 (image.thum.io API)
 * - 기술 스택 아이콘 표시
 * - 호버 효과 (확대, 그림자)
 * - View Details 버튼으로 프로젝트 링크 연결
 */
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Button,
  CircularProgress
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { supabase } from '../supabaseClient';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress sx={{ color: '#CFFF00' }} />
      </Box>
    );
  }

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
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 6 }}>
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
            제가 작업한 프로젝트들을 소개합니다.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  borderRadius: 2,
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                    borderTop: '4px solid #CFFF00'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.thumbnail_url}
                  alt={project.title}
                  sx={{
                    objectFit: 'cover',
                    backgroundColor: '#F5F5F5'
                  }}
                />
                <CardContent
                  sx={{
                    p: 3,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 600,
                      mb: 1.5
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666666',
                      lineHeight: 1.6,
                      mb: 2,
                      flex: 1
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#999999',
                        fontSize: '0.75rem',
                        mb: 1,
                        display: 'block'
                      }}
                    >
                      기술 스택
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {project.tech_stack.map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: '#F5F5F5',
                            color: '#333333',
                            fontSize: '0.7rem',
                            height: '24px',
                            '&:hover': {
                              backgroundColor: '#CFFF00'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {project.project_date && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#999999',
                        fontSize: '0.75rem',
                        mb: 2
                      }}
                    >
                      작업 날짜: {project.project_date}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    endIcon={<OpenInNewIcon />}
                    href={project.detail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: '#333333',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      py: 1,
                      '&:hover': {
                        backgroundColor: '#CFFF00',
                        color: '#000000'
                      }
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {projects.length === 0 && (
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
              프로젝트 준비 중
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                lineHeight: 1.8
              }}
            >
              곧 멋진 프로젝트들을 선보일 예정입니다.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Projects;
