import { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * RadioSection 컴포넌트
 *
 * MUI RadioGroup과 FormControlLabel을 사용한 라디오 버튼
 * - 3-4개 라디오 옵션
 * - 선택값 실시간 표시
 * - FormLabel로 그룹 제목 설정
 */
function RadioSection() {
  const [gender, setGender] = useState('');
  const [plan, setPlan] = useState('');
  const [language, setLanguage] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
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
        Radio Button Components
      </Typography>

      {/* 성별 선택 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          성별 선택
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl>
              <FormLabel id="gender-radio-group-label">성별</FormLabel>
              <RadioGroup
                aria-labelledby="gender-radio-group-label"
                name="gender-radio-group"
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel value="male" control={<Radio />} label="남성" />
                <FormControlLabel value="female" control={<Radio />} label="여성" />
                <FormControlLabel value="other" control={<Radio />} label="기타" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body1">
                선택된 성별: <strong>{gender || '(선택 안 함)'}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 요금제 선택 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          요금제 선택
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl>
              <FormLabel id="plan-radio-group-label">구독 요금제</FormLabel>
              <RadioGroup
                aria-labelledby="plan-radio-group-label"
                name="plan-radio-group"
                value={plan}
                onChange={handlePlanChange}
              >
                <FormControlLabel value="free" control={<Radio />} label="무료 (Free)" />
                <FormControlLabel value="basic" control={<Radio />} label="베이직 (Basic) - 월 $9.99" />
                <FormControlLabel value="pro" control={<Radio />} label="프로 (Pro) - 월 $19.99" />
                <FormControlLabel value="enterprise" control={<Radio />} label="엔터프라이즈 (Enterprise) - 문의" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body1">
                선택된 요금제: <strong>{plan || '(선택 안 함)'}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 프로그래밍 언어 선택 */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          프로그래밍 언어 선택
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl>
              <FormLabel id="language-radio-group-label">주로 사용하는 언어</FormLabel>
              <RadioGroup
                aria-labelledby="language-radio-group-label"
                name="language-radio-group"
                value={language}
                onChange={handleLanguageChange}
              >
                <FormControlLabel value="javascript" control={<Radio />} label="JavaScript" />
                <FormControlLabel value="python" control={<Radio />} label="Python" />
                <FormControlLabel value="java" control={<Radio />} label="Java" />
                <FormControlLabel value="csharp" control={<Radio />} label="C#" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Typography variant="body1">
                선택된 언어: <strong>{language || '(선택 안 함)'}</strong>
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
          💡 <strong>Tip:</strong> Radio 버튼은 여러 옵션 중 하나만 선택할 수 있습니다.
          Checkbox와 달리 단일 선택(single choice)에 사용됩니다.
        </Typography>
      </Box>
    </Box>
  );
}

export default RadioSection;
