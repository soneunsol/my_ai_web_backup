import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * ButtonSection 컴포넌트
 *
 * MUI Button의 다양한 variant와 color를 보여주는 섹션
 * - variant: contained, outlined, text
 * - color: primary, secondary, error
 * - 클릭 시 알림창 표시
 */
function ButtonSection() {
  const handleClick = (variant, color) => {
    alert(`${color} ${variant} 버튼이 클릭되었습니다!`);
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
        Button Components
      </Typography>

      {/* Contained Buttons */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Contained Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleClick('contained', 'primary')}
            >
              Primary
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => handleClick('contained', 'secondary')}
            >
              Secondary
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => handleClick('contained', 'error')}
            >
              Error
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Outlined Buttons */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Outlined Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => handleClick('outlined', 'primary')}
            >
              Primary
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => handleClick('outlined', 'secondary')}
            >
              Secondary
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => handleClick('outlined', 'error')}
            >
              Error
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Text Buttons */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Text Buttons
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="text"
              color="primary"
              fullWidth
              onClick={() => handleClick('text', 'primary')}
            >
              Primary
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="text"
              color="secondary"
              fullWidth
              onClick={() => handleClick('text', 'secondary')}
            >
              Secondary
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              variant="text"
              color="error"
              fullWidth
              onClick={() => handleClick('text', 'error')}
            >
              Error
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ButtonSection;
