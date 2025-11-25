import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * CardSection 컴포넌트
 *
 * MUI Card 컴포넌트를 사용한 카드
 * - CardContent와 CardActions 구조
 * - 2-3개 예시 카드
 * - 호버 효과 및 그림자
 */
function CardSection() {
  const handleCardClick = (cardName) => {
    alert(`${cardName} 카드의 버튼이 클릭되었습니다!`);
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
        Card Components
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        카드에 마우스를 올리면 호버 효과를 확인할 수 있습니다.
      </Typography>

      {/* 카드 그리드 */}
      <Grid container spacing={3}>
        {/* 카드 1: 기본 카드 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
              >
                기본 카드
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                이것은 기본 카드입니다. CardContent와 CardActions로 구성되어 있습니다.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                호버 시 위로 올라가는 효과와 그림자가 강조됩니다.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleCardClick('기본')}>
                자세히 보기
              </Button>
              <Button size="small" color="secondary" onClick={() => handleCardClick('기본')}>
                공유하기
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* 카드 2: 프로필 카드 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ mb: 2, fontWeight: 'bold', color: 'secondary.main' }}
              >
                프로필 카드
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  이름: 홍길동
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  직책: 프론트엔드 개발자
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  이메일: hong@example.com
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                React와 MUI를 사용하여 현대적인 웹 애플리케이션을 개발합니다.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={() => handleCardClick('프로필')}>
                연락하기
              </Button>
              <Button size="small" onClick={() => handleCardClick('프로필')}>
                더보기
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* 카드 3: 상품 카드 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ mb: 2, fontWeight: 'bold', color: 'success.main' }}
              >
                상품 카드
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                  ₩29,900
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  정가: ₩39,900
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                프리미엄 무선 이어폰
              </Typography>
              <Typography variant="body2" color="text.secondary">
                고품질 사운드와 긴 배터리 수명을 자랑하는 무선 이어폰입니다.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="success" onClick={() => handleCardClick('상품')}>
                장바구니
              </Button>
              <Button size="small" onClick={() => handleCardClick('상품')}>
                찜하기
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* 추가 카드 예시 - 다른 스타일 */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          다양한 스타일의 카드
        </Typography>

        <Grid container spacing={3}>
          {/* 알림 카드 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: '#e3f2fd',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  📢 공지사항
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  새로운 기능이 추가되었습니다! 지금 바로 확인해보세요.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleCardClick('공지사항')}>
                  확인
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* 통계 카드 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: '#f3e5f5',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  📊 월간 통계
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      1,234
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      방문자
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                      89
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      게시물
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
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
          💡 <strong>Card 호버 효과:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>transform: translateY(-8px)</strong>: 위로 8px 이동
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>boxShadow</strong>: 그림자 강도 증가
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>transition</strong>: 부드러운 애니메이션 효과
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CardSection;
