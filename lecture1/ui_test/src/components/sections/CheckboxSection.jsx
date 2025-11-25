import { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * CheckboxSection 컴포넌트
 *
 * MUI Checkbox와 FormControlLabel을 사용한 체크박스
 * - 3-4개 체크박스 옵션
 * - 체크된 항목들 실시간 표시
 * - 전체 선택/해제 기능
 */
function CheckboxSection() {
  const [checkedItems, setCheckedItems] = useState({
    react: false,
    vue: false,
    angular: false,
    svelte: false
  });

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  };

  const handleSelectAll = () => {
    setCheckedItems({
      react: true,
      vue: true,
      angular: true,
      svelte: true
    });
  };

  const handleDeselectAll = () => {
    setCheckedItems({
      react: false,
      vue: false,
      angular: false,
      svelte: false
    });
  };

  const getCheckedItemsList = () => {
    const checkedList = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    return checkedList.length > 0 ? checkedList.join(', ') : '선택된 항목 없음';
  };

  const frameworks = [
    { key: 'react', label: 'React' },
    { key: 'vue', label: 'Vue.js' },
    { key: 'angular', label: 'Angular' },
    { key: 'svelte', label: 'Svelte' }
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
        Checkbox Components
      </Typography>

      {/* 체크박스 그룹 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          좋아하는 프론트엔드 프레임워크를 선택하세요
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormGroup>
              {frameworks.map((framework) => (
                <FormControlLabel
                  key={framework.key}
                  control={
                    <Checkbox
                      checked={checkedItems[framework.key]}
                      onChange={handleChange}
                      name={framework.key}
                    />
                  }
                  label={framework.label}
                />
              ))}
            </FormGroup>

            {/* 전체 선택/해제 버튼 */}
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleSelectAll}
              >
                전체 선택
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={handleDeselectAll}
              >
                전체 해제
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              minHeight: '150px'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                선택된 항목:
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {getCheckedItemsList()}
              </Typography>

              {/* 체크된 항목 개수 */}
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #ddd' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  총 <strong>{Object.values(checkedItems).filter(Boolean).length}</strong>개 선택됨
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 추가 예시: 단일 체크박스 */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          약관 동의 (단일 체크박스 예시)
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="서비스 이용약관에 동의합니다"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="개인정보 처리방침에 동의합니다"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="마케팅 정보 수신에 동의합니다 (선택)"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 2,
              bgcolor: '#e3f2fd',
              borderRadius: 1
            }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                💡 <strong>Tip:</strong> FormControlLabel을 사용하면 레이블 클릭 시에도
                체크박스가 토글됩니다. 사용자 경험이 개선됩니다!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CheckboxSection;
