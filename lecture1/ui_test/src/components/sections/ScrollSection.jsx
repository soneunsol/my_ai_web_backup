import { useState, useRef } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * ScrollSection 컴포넌트
 *
 * 스크롤 이벤트 처리 및 위치 표시
 * - 고정 높이 스크롤 컨테이너
 * - 긴 콘텐츠로 스크롤 테스트
 * - 스크롤 이벤트 처리
 * - 스크롤 위치 표시
 */
function ScrollSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef(null);

  // 스크롤 이벤트 핸들러
  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const percentage = (scrollTop / scrollHeight) * 100;

    setScrollPosition(Math.round(scrollTop));
    setScrollPercentage(Math.round(percentage));
    setIsAtTop(scrollTop === 0);
    setIsAtBottom(scrollTop >= scrollHeight - 1);
  };

  // 맨 위로 스크롤
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // 맨 아래로 스크롤
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // 중간으로 스크롤
  const scrollToMiddle = () => {
    if (scrollContainerRef.current) {
      const scrollHeight = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight / 2,
        behavior: 'smooth'
      });
    }
  };

  // 더미 콘텐츠 생성
  const generateContent = () => {
    const items = [];
    for (let i = 1; i <= 20; i++) {
      items.push(
        <Box
          key={i}
          sx={{
            p: 2,
            mb: 2,
            bgcolor: i % 2 === 0 ? '#f5f5f5' : 'white',
            borderRadius: 1,
            border: '1px solid #ddd'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            콘텐츠 아이템 #{i}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            이것은 스크롤 테스트를 위한 더미 콘텐츠입니다.
            긴 콘텐츠를 스크롤하면서 이벤트가 정상적으로 동작하는지 확인해보세요.
          </Typography>
        </Box>
      );
    }
    return items;
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
        Scroll Components
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        스크롤 컨테이너를 스크롤하면 위치 정보가 실시간으로 업데이트됩니다.
      </Typography>

      <Grid container spacing={3}>
        {/* 스크롤 컨테이너 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            스크롤 가능한 컨테이너
          </Typography>

          {/* 스크롤 컨트롤 버튼 */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="small"
              onClick={scrollToTop}
              disabled={isAtTop}
            >
              ⬆️ 맨 위로
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={scrollToMiddle}
            >
              ➡️ 중간으로
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={scrollToBottom}
              disabled={isAtBottom}
            >
              ⬇️ 맨 아래로
            </Button>
          </Box>

          {/* 스크롤 컨테이너 */}
          <Box
            ref={scrollContainerRef}
            onScroll={handleScroll}
            sx={{
              height: '400px',
              overflowY: 'auto',
              border: '2px solid #ddd',
              borderRadius: 2,
              p: 2,
              bgcolor: '#fafafa',
              '&::-webkit-scrollbar': {
                width: '8px'
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: '#f1f1f1',
                borderRadius: '4px'
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: '#888',
                borderRadius: '4px',
                '&:hover': {
                  bgcolor: '#555'
                }
              }
            }}
          >
            {generateContent()}
          </Box>
        </Grid>

        {/* 스크롤 정보 표시 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            스크롤 정보
          </Typography>

          {/* 스크롤 위치 */}
          <Box sx={{
            p: 2,
            bgcolor: '#f5f5f5',
            borderRadius: 1,
            mb: 2
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              스크롤 위치:
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {scrollPosition}px
            </Typography>
          </Box>

          {/* 스크롤 비율 */}
          <Box sx={{
            p: 2,
            bgcolor: '#f5f5f5',
            borderRadius: 1,
            mb: 2
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              스크롤 진행률:
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary.main', mb: 1 }}>
              {scrollPercentage}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={scrollPercentage}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>

          {/* 스크롤 상태 */}
          <Box sx={{
            p: 2,
            bgcolor: '#f5f5f5',
            borderRadius: 1
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              스크롤 상태:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Box sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: isAtTop ? 'success.main' : 'grey.300'
                }} />
                <Typography variant="body2">
                  맨 위 {isAtTop ? '✓' : ''}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Box sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: isAtBottom ? 'success.main' : 'grey.300'
                }} />
                <Typography variant="body2">
                  맨 아래 {isAtBottom ? '✓' : ''}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Box sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: !isAtTop && !isAtBottom ? 'success.main' : 'grey.300'
                }} />
                <Typography variant="body2">
                  스크롤 중 {!isAtTop && !isAtBottom ? '✓' : ''}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* 추가 설명 */}
      <Box sx={{
        mt: 3,
        p: 2,
        bgcolor: '#e3f2fd',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          💡 <strong>스크롤 이벤트 속성:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>scrollTop</strong>: 스크롤된 픽셀 값
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>scrollHeight</strong>: 전체 스크롤 가능한 높이
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>clientHeight</strong>: 보이는 영역의 높이
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>scrollTo()</strong>: 특정 위치로 스크롤 (smooth 옵션 가능)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ScrollSection;
