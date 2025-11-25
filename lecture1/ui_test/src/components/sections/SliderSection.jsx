import { useState } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * SliderSection 컴포넌트
 *
 * MUI Slider 컴포넌트를 사용한 슬라이더
 * - 0-100 범위 슬라이더
 * - 현재값 실시간 표시
 * - marks와 valueLabelDisplay 설정
 */
function SliderSection() {
  const [volume, setVolume] = useState(30);
  const [brightness, setBrightness] = useState(50);
  const [temperature, setTemperature] = useState(22);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
  };

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
  };

  // 볼륨 슬라이더용 마크
  const volumeMarks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' }
  ];

  // 밝기 슬라이더용 마크
  const brightnessMarks = [
    { value: 0, label: '어두움' },
    { value: 50, label: '보통' },
    { value: 100, label: '밝음' }
  ];

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
        Slider Components
      </Typography>

      {/* 볼륨 슬라이더 (marks 포함) */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          볼륨 조절 (Marks 포함)
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ px: 2 }}>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                valueLabelDisplay="auto"
                marks={volumeMarks}
                min={0}
                max={100}
                sx={{ mt: 2 }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {volume}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 밝기 슬라이더 (valueLabelDisplay="on") */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          화면 밝기 조절 (항상 값 표시)
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ px: 2 }}>
              <Slider
                value={brightness}
                onChange={handleBrightnessChange}
                valueLabelDisplay="on"
                marks={brightnessMarks}
                min={0}
                max={100}
                sx={{ mt: 4 }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                {brightness}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 온도 슬라이더 (기본 슬라이더) */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          온도 조절 (기본 슬라이더)
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ px: 2 }}>
              <Slider
                value={temperature}
                onChange={handleTemperatureChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                sx={{ mt: 2 }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {temperature}°C
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
          💡 <strong>Slider 속성 설명:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>valueLabelDisplay="auto"</strong>: 드래그 시에만 값 표시
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>valueLabelDisplay="on"</strong>: 항상 값 표시
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>marks</strong>: 슬라이더에 눈금 표시 추가
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SliderSection;
