import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * HoverSection 컴포넌트
 *
 * CSS 호버 효과 데모
 * - CSS 호버 효과 3-4가지
 * - 색상 변경, 그림자, 크기 변화, 회전
 * - MUI Box 컴포넌트 활용
 * - 다양한 호버 패턴 데모
 */
function HoverSection() {
  return (
    <Box sx={{
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: 1,
      p: { xs: 3, md: 4 }
    }}>
      {/* 섹션 제목 */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        Hover Effect Components
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        각 박스에 마우스를 올려보세요. 다양한 호버 효과를 확인할 수 있습니다.
      </Typography>

      {/* 기본 호버 효과 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          기본 호버 효과
        </Typography>
        <Grid container spacing={3}>
          {/* 색상 변경 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{
              p: 3,
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'secondary.main'
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                색상 변경
              </Typography>
              <Typography variant="body2">
                Color Change
              </Typography>
            </Box>
          </Grid>

          {/* 그림자 추가 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{
              p: 3,
              bgcolor: '#e3f2fd',
              color: 'primary.main',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 1,
              '&:hover': {
                boxShadow: 8
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                그림자
              </Typography>
              <Typography variant="body2">
                Box Shadow
              </Typography>
            </Box>
          </Grid>

          {/* 크기 변화 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{
              p: 3,
              bgcolor: '#f3e5f5',
              color: 'secondary.main',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                크기 변화
              </Typography>
              <Typography variant="body2">
                Scale Transform
              </Typography>
            </Box>
          </Grid>

          {/* 회전 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{
              p: 3,
              bgcolor: '#fff3e0',
              color: 'warning.main',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'rotate(5deg)'
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                회전
              </Typography>
              <Typography variant="body2">
                Rotate Transform
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 고급 호버 효과 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          고급 호버 효과
        </Typography>
        <Grid container spacing={3}>
          {/* 위로 이동 + 그림자 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{
              p: 3,
              bgcolor: 'success.main',
              color: 'white',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: 6
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                위로 이동
              </Typography>
              <Typography variant="body2">
                Lift Up
              </Typography>
            </Box>
          </Grid>

          {/* 크기 + 회전 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{
              p: 3,
              bgcolor: 'error.main',
              color: 'white',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.5s ease',
              '&:hover': {
                transform: 'scale(1.15) rotate(-5deg)'
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                확대 + 회전
              </Typography>
              <Typography variant="body2">
                Scale & Rotate
              </Typography>
            </Box>
          </Grid>

          {/* 투명도 변화 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{
              p: 3,
              bgcolor: 'info.main',
              color: 'white',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: 1,
              '&:hover': {
                opacity: 0.7
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                투명도
              </Typography>
              <Typography variant="body2">
                Opacity
              </Typography>
            </Box>
          </Grid>

          {/* 테두리 애니메이션 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{
              p: 3,
              bgcolor: 'white',
              color: 'text.primary',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              border: '3px solid',
              borderColor: 'grey.300',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: '0 0 20px rgba(25, 118, 210, 0.5)'
              }
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                테두리
              </Typography>
              <Typography variant="body2">
                Border Glow
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 텍스트 호버 효과 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          텍스트 호버 효과
        </Typography>
        <Grid container spacing={3}>
          {/* 밑줄 애니메이션 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              p: 3,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: 0,
                    height: '3px',
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                밑줄 애니메이션
              </Typography>
            </Box>
          </Grid>

          {/* 색상 그라데이션 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              p: 3,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  background: 'linear-gradient(90deg, #1976d2, #dc004e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #dc004e, #1976d2)'
                  }
                }}
              >
                그라데이션 텍스트
              </Typography>
            </Box>
          </Grid>

          {/* 텍스트 확대 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              p: 3,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: 'secondary.main',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    fontSize: '1.5rem',
                    color: 'primary.main'
                  }
                }}
              >
                텍스트 확대
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 카드 호버 효과 */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          카드 호버 효과
        </Typography>
        <Grid container spacing={3}>
          {/* 플립 효과 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{
              height: 200,
              perspective: '1000px',
              cursor: 'pointer'
            }}>
              <Box sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: 'transform 0.6s',
                transformStyle: 'preserve-3d',
                '&:hover': {
                  transform: 'rotateY(180deg)'
                }
              }}>
                {/* 앞면 */}
                <Box sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    앞면
                  </Typography>
                  <Typography variant="body2">
                    마우스를 올리세요
                  </Typography>
                </Box>
                {/* 뒷면 */}
                <Box sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  bgcolor: 'secondary.main',
                  color: 'white',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  transform: 'rotateY(180deg)'
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    뒷면
                  </Typography>
                  <Typography variant="body2">
                    플립 효과!
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* 오버레이 효과 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{
              position: 'relative',
              height: 200,
              bgcolor: 'success.main',
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              },
              '&:hover::before': {
                opacity: 1
              }
            }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', zIndex: 1 }}>
                오버레이 효과
              </Typography>
            </Box>
          </Grid>

          {/* 슬라이드 업 효과 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{
              position: 'relative',
              height: 200,
              bgcolor: 'warning.main',
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                슬라이드 업
              </Typography>
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: 0,
                bgcolor: 'error.main',
                transition: 'height 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '.MuiBox-root:hover &': {
                  height: '100%'
                }
              }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                  호버 콘텐츠
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 추가 설명 */}
      <Box sx={{
        mt: 4,
        p: 2,
        bgcolor: '#e3f2fd',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          💡 <strong>CSS 호버 효과 속성:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>':hover'</strong>: 마우스를 올렸을 때 적용되는 스타일
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>transition</strong>: 상태 변화를 부드럽게 처리
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>transform</strong>: scale, rotate, translate 등의 변형
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>::before, ::after</strong>: 가상 요소로 추가 효과 구현
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default HoverSection;
