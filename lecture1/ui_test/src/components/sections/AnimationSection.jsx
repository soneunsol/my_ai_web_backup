import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * AnimationSection 컴포넌트
 *
 * CSS 트랜지션 애니메이션 데모
 * - CSS 트랜지션 애니메이션
 * - 재생 버튼으로 제어
 * - 페이드인/아웃, 크기 변화, 회전 효과
 * - 버튼 클릭 시 애니메이션 실행
 */
function AnimationSection() {
  const [fadeActive, setFadeActive] = useState(false);
  const [scaleActive, setScaleActive] = useState(false);
  const [rotateActive, setRotateActive] = useState(false);
  const [slideActive, setSlideActive] = useState(false);
  const [bounceActive, setBounceActive] = useState(false);
  const [allActive, setAllActive] = useState(false);

  // 페이드 애니메이션
  const handleFade = () => {
    setFadeActive(true);
    setTimeout(() => setFadeActive(false), 2000);
  };

  // 크기 변화 애니메이션
  const handleScale = () => {
    setScaleActive(true);
    setTimeout(() => setScaleActive(false), 1000);
  };

  // 회전 애니메이션
  const handleRotate = () => {
    setRotateActive(true);
    setTimeout(() => setRotateActive(false), 1000);
  };

  // 슬라이드 애니메이션
  const handleSlide = () => {
    setSlideActive(true);
    setTimeout(() => setSlideActive(false), 1000);
  };

  // 바운스 애니메이션
  const handleBounce = () => {
    setBounceActive(true);
    setTimeout(() => setBounceActive(false), 1000);
  };

  // 모든 애니메이션 동시 재생
  const handlePlayAll = () => {
    setAllActive(true);
    handleFade();
    handleScale();
    handleRotate();
    handleSlide();
    handleBounce();
    setTimeout(() => setAllActive(false), 2000);
  };

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
        Animation Components
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        버튼을 클릭하여 다양한 CSS 애니메이션 효과를 확인해보세요.
      </Typography>

      {/* 애니메이션 그리드 */}
      <Grid container spacing={3}>
        {/* 페이드 인/아웃 */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              페이드 인/아웃
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                transition: 'opacity 2s ease',
                opacity: fadeActive ? 0 : 1
              }}
            >
              FADE
            </Box>
            <Button
              variant="contained"
              size="small"
              onClick={handleFade}
              disabled={fadeActive}
            >
              재생
            </Button>
          </Box>
        </Grid>

        {/* 크기 변화 */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              크기 변화
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'secondary.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                transition: 'transform 1s ease',
                transform: scaleActive ? 'scale(1.5)' : 'scale(1)'
              }}
            >
              SCALE
            </Box>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleScale}
              disabled={scaleActive}
            >
              재생
            </Button>
          </Box>
        </Grid>

        {/* 회전 */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              회전
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'success.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                transition: 'transform 1s ease',
                transform: rotateActive ? 'rotate(360deg)' : 'rotate(0deg)'
              }}
            >
              ROTATE
            </Box>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={handleRotate}
              disabled={rotateActive}
            >
              재생
            </Button>
          </Box>
        </Grid>

        {/* 슬라이드 */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              슬라이드
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'warning.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                transition: 'transform 1s ease',
                transform: slideActive ? 'translateX(50px)' : 'translateX(0)'
              }}
            >
              SLIDE
            </Box>
            <Button
              variant="contained"
              size="small"
              color="warning"
              onClick={handleSlide}
              disabled={slideActive}
            >
              재생
            </Button>
          </Box>
        </Grid>

        {/* 바운스 */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              바운스
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'error.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                animation: bounceActive ? 'bounce 1s ease' : 'none',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '25%': { transform: 'translateY(-30px)' },
                  '50%': { transform: 'translateY(0)' },
                  '75%': { transform: 'translateY(-15px)' }
                }
              }}
            >
              BOUNCE
            </Box>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={handleBounce}
              disabled={bounceActive}
            >
              재생
            </Button>
          </Box>
        </Grid>

        {/* 복합 애니메이션 */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              복합 효과
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'info.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                transition: 'all 1s ease',
                transform: allActive ? 'scale(1.3) rotate(180deg)' : 'scale(1) rotate(0deg)',
                opacity: allActive ? 0.5 : 1
              }}
            >
              ALL
            </Box>
            <Button
              variant="contained"
              size="small"
              color="info"
              onClick={handlePlayAll}
              disabled={allActive}
            >
              모두 재생
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* 호버 애니메이션 예시 */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          호버 애니메이션 (마우스를 올려보세요)
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{
              p: 3,
              bgcolor: '#e3f2fd',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 4
              }
            }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                위로 이동
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{
              p: 3,
              bgcolor: '#f3e5f5',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 4
              }
            }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                크기 확대
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{
              p: 3,
              bgcolor: '#fff3e0',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'rotate(5deg)',
                boxShadow: 4
              }
            }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                살짝 회전
              </Typography>
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
          💡 <strong>CSS 애니메이션 속성:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>transition</strong>: 상태 변화 시 부드러운 전환 (opacity, transform 등)
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>transform</strong>: scale(), rotate(), translate() 등의 변형
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>@keyframes</strong>: 복잡한 애니메이션 시퀀스 정의
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>animation</strong>: keyframes 애니메이션 실행
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AnimationSection;
