import { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * DropdownSection 컴포넌트
 *
 * MUI Select와 MenuItem을 사용한 드롭다운
 * - FormControl과 InputLabel 적용
 * - 다양한 카테고리 (과일, 색상, 국가)
 * - 선택값 실시간 표시
 */
function DropdownSection() {
  const [fruit, setFruit] = useState('');
  const [color, setColor] = useState('');
  const [country, setCountry] = useState('');

  const fruits = ['사과', '바나나', '오렌지', '포도', '딸기'];
  const colors = ['빨강', '파랑', '초록', '노랑'];
  const countries = ['한국', '미국', '일본', '중국', '영국'];

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
        Dropdown Components (Select & MenuItem)
      </Typography>

      {/* 과일 선택 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          과일 선택
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="fruit-select-label">좋아하는 과일을 선택하세요</InputLabel>
              <Select
                labelId="fruit-select-label"
                id="fruit-select"
                value={fruit}
                label="좋아하는 과일을 선택하세요"
                onChange={(e) => setFruit(e.target.value)}
              >
                {fruits.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                선택한 과일: <strong>{fruit || '(선택 안 함)'}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 색상 선택 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          색상 선택
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="color-select-label">좋아하는 색상을 선택하세요</InputLabel>
              <Select
                labelId="color-select-label"
                id="color-select"
                value={color}
                label="좋아하는 색상을 선택하세요"
                onChange={(e) => setColor(e.target.value)}
              >
                {colors.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                선택한 색상: <strong>{color || '(선택 안 함)'}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 국가 선택 */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          국가 선택
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="country-select-label">방문하고 싶은 국가를 선택하세요</InputLabel>
              <Select
                labelId="country-select-label"
                id="country-select"
                value={country}
                label="방문하고 싶은 국가를 선택하세요"
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                선택한 국가: <strong>{country || '(선택 안 함)'}</strong>
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          💡 <strong>Tip:</strong> FormControl과 InputLabel을 함께 사용하면
          접근성이 향상되고 사용자 경험이 개선됩니다.
        </Typography>
      </Box>
    </Box>
  );
}

export default DropdownSection;
