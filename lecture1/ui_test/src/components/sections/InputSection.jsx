import { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * InputSection 컴포넌트
 *
 * MUI TextField의 다양한 variant를 보여주는 섹션
 * - variant: standard, outlined, filled
 * - placeholder와 label 설정
 * - 입력값 실시간 표시
 */
function InputSection() {
  const [standardValue, setStandardValue] = useState('');
  const [outlinedValue, setOutlinedValue] = useState('');
  const [filledValue, setFilledValue] = useState('');

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
        Input Components (TextField)
      </Typography>

      {/* Standard TextField */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Standard TextField
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              variant="standard"
              label="이름을 입력하세요"
              placeholder="홍길동"
              fullWidth
              value={standardValue}
              onChange={(e) => setStandardValue(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body1">
                입력값: <strong>{standardValue || '(입력값 없음)'}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Outlined TextField */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Outlined TextField
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              variant="outlined"
              label="이메일을 입력하세요"
              placeholder="example@email.com"
              fullWidth
              value={outlinedValue}
              onChange={(e) => setOutlinedValue(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body1">
                입력값: <strong>{outlinedValue || '(입력값 없음)'}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Filled TextField */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Filled TextField
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              variant="filled"
              label="메시지를 입력하세요"
              placeholder="안녕하세요!"
              fullWidth
              value={filledValue}
              onChange={(e) => setFilledValue(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body1">
                입력값: <strong>{filledValue || '(입력값 없음)'}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default InputSection;
