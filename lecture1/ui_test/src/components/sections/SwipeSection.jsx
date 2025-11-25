import { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeUpIcon from '@mui/icons-material/SwipeUp';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';

/**
 * SwipeSection 컴포넌트
 *
 * 터치/마우스 스와이프 이벤트 처리
 * - 좌우/상하 스와이프 감지
 * - 스와이프 방향 표시
 * - 모바일과 데스크톱 모두 지원
 * - 카드 스와이프 및 이미지 슬라이더 데모
 */
function SwipeSection() {
  // 기본 스와이프 상태
  const [swipeDirection, setSwipeDirection] = useState('');
  const [swipeCount, setSwipeCount] = useState(0);

  // 4방향 스와이프 상태
  const [fourWayDirection, setFourWayDirection] = useState('');
  const [fourWayCount, setFourWayCount] = useState({ left: 0, right: 0, up: 0, down: 0 });

  // 카드 스와이프 상태
  const [cards, setCards] = useState([
    { id: 1, title: '카드 1', color: '#e3f2fd' },
    { id: 2, title: '카드 2', color: '#f3e5f5' },
    { id: 3, title: '카드 3', color: '#fff3e0' },
    { id: 4, title: '카드 4', color: '#e8f5e9' }
  ]);
  const [cardSwipeDirection, setCardSwipeDirection] = useState('');

  // 이미지 슬라이더 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    { id: 1, title: '이미지 1', color: '#1976d2' },
    { id: 2, title: '이미지 2', color: '#dc004e' },
    { id: 3, title: '이미지 3', color: '#f57c00' },
    { id: 4, title: '이미지 4', color: '#388e3c' }
  ];

  // 스와이프 감지 임계값
  const SWIPE_THRESHOLD = 50;

  // 기본 스와이프 핸들러
  const handleSwipe = (element) => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleStart = (e) => {
      const touch = e.type === 'touchstart' ? e.touches[0] : e;
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
    };

    const handleEnd = (e) => {
      const touch = e.type === 'touchend' ? e.changedTouches[0] : e;
      const endX = touch.clientX;
      const endY = touch.clientY;
      const endTime = Date.now();

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;

      // 너무 느린 스와이프는 무시
      if (deltaTime > 1000) return;

      // 수평 스와이프
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
        const direction = deltaX > 0 ? '오른쪽' : '왼쪽';
        setSwipeDirection(direction);
        setSwipeCount(prev => prev + 1);
      }
      // 수직 스와이프
      else if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        const direction = deltaY > 0 ? '아래' : '위';
        setSwipeDirection(direction);
        setSwipeCount(prev => prev + 1);
      }
    };

    return { handleStart, handleEnd };
  };

  // 4방향 스와이프 핸들러
  const handleFourWaySwipe = (element) => {
    let startX = 0;
    let startY = 0;

    const handleStart = (e) => {
      const touch = e.type === 'touchstart' ? e.touches[0] : e;
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleEnd = (e) => {
      const touch = e.type === 'touchend' ? e.changedTouches[0] : e;
      const endX = touch.clientX;
      const endY = touch.clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX > 0) {
          setFourWayDirection('오른쪽');
          setFourWayCount(prev => ({ ...prev, right: prev.right + 1 }));
        } else {
          setFourWayDirection('왼쪽');
          setFourWayCount(prev => ({ ...prev, left: prev.left + 1 }));
        }
      } else if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        if (deltaY > 0) {
          setFourWayDirection('아래');
          setFourWayCount(prev => ({ ...prev, down: prev.down + 1 }));
        } else {
          setFourWayDirection('위');
          setFourWayCount(prev => ({ ...prev, up: prev.up + 1 }));
        }
      }
    };

    return { handleStart, handleEnd };
  };

  // 카드 스와이프 핸들러
  const handleCardSwipe = (cardId) => {
    let startX = 0;

    const handleStart = (e) => {
      const touch = e.type === 'touchstart' ? e.touches[0] : e;
      startX = touch.clientX;
    };

    const handleEnd = (e) => {
      const touch = e.type === 'touchend' ? e.changedTouches[0] : e;
      const endX = touch.clientX;
      const deltaX = endX - startX;

      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        const direction = deltaX > 0 ? '오른쪽' : '왼쪽';
        setCardSwipeDirection(direction);

        // 카드 삭제
        setTimeout(() => {
          setCards(prev => prev.filter(card => card.id !== cardId));
          setCardSwipeDirection('');
        }, 300);
      }
    };

    return { handleStart, handleEnd };
  };

  // 이미지 슬라이더 스와이프 핸들러
  const handleImageSwipe = () => {
    let startX = 0;

    const handleStart = (e) => {
      const touch = e.type === 'touchstart' ? e.touches[0] : e;
      startX = touch.clientX;
    };

    const handleEnd = (e) => {
      const touch = e.type === 'touchend' ? e.changedTouches[0] : e;
      const endX = touch.clientX;
      const deltaX = endX - startX;

      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX > 0 && currentImageIndex > 0) {
          // 오른쪽으로 스와이프 - 이전 이미지
          setCurrentImageIndex(prev => prev - 1);
        } else if (deltaX < 0 && currentImageIndex < images.length - 1) {
          // 왼쪽으로 스와이프 - 다음 이미지
          setCurrentImageIndex(prev => prev + 1);
        }
      }
    };

    return { handleStart, handleEnd };
  };

  const basicSwipeHandlers = handleSwipe();
  const fourWaySwipeHandlers = handleFourWaySwipe();
  const imageSwipeHandlers = handleImageSwipe();

  // 카드 초기화
  const resetCards = () => {
    setCards([
      { id: 1, title: '카드 1', color: '#e3f2fd' },
      { id: 2, title: '카드 2', color: '#f3e5f5' },
      { id: 3, title: '카드 3', color: '#fff3e0' },
      { id: 4, title: '카드 4', color: '#e8f5e9' }
    ]);
    setCardSwipeDirection('');
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
        Swipe Components (Touch/Mouse)
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        각 영역을 마우스로 드래그하거나 터치로 스와이프해보세요. 모바일과 데스크톱 모두 지원됩니다.
      </Typography>

      <Grid container spacing={3}>
        {/* 기본 스와이프 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '250px'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              기본 스와이프
            </Typography>
            <Box
              onTouchStart={basicSwipeHandlers.handleStart}
              onTouchEnd={basicSwipeHandlers.handleEnd}
              onMouseDown={basicSwipeHandlers.handleStart}
              onMouseUp={basicSwipeHandlers.handleEnd}
              sx={{
                width: '100%',
                height: 150,
                bgcolor: 'primary.main',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'grab',
                userSelect: 'none',
                transition: 'all 0.3s ease',
                '&:active': {
                  cursor: 'grabbing',
                  transform: 'scale(0.98)'
                }
              }}
            >
              <SwipeLeftIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                스와이프 해보세요
              </Typography>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>마지막 방향:</strong> {swipeDirection || '(없음)'}
              </Typography>
              <Typography variant="body2">
                <strong>총 스와이프:</strong> {swipeCount}회
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 4방향 스와이프 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '250px'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              4방향 스와이프
            </Typography>
            <Box
              onTouchStart={fourWaySwipeHandlers.handleStart}
              onTouchEnd={fourWaySwipeHandlers.handleEnd}
              onMouseDown={fourWaySwipeHandlers.handleStart}
              onMouseUp={fourWaySwipeHandlers.handleEnd}
              sx={{
                width: '100%',
                height: 150,
                bgcolor: 'secondary.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'grab',
                userSelect: 'none',
                '&:active': {
                  cursor: 'grabbing'
                }
              }}
            >
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(3, 1fr)',
                gap: 1,
                width: '80%',
                height: '80%'
              }}>
                <Box />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <SwipeUpIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
                <Box />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SwipeLeftIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {fourWayDirection || '상하좌우'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <SwipeRightIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
                <Box />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <SwipeDownIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
                <Box />
              </Box>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip label={`← ${fourWayCount.left}`} size="small" />
              <Chip label={`→ ${fourWayCount.right}`} size="small" />
              <Chip label={`↑ ${fourWayCount.up}`} size="small" />
              <Chip label={`↓ ${fourWayCount.down}`} size="small" />
            </Box>
          </Box>
        </Grid>

        {/* 카드 스와이프 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '300px'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                카드 스와이프 (삭제)
              </Typography>
              <Button size="small" variant="outlined" onClick={resetCards}>
                초기화
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              카드를 좌우로 스와이프하여 삭제하세요
            </Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {cards.length > 0 ? (
                cards.map((card) => {
                  const cardHandlers = handleCardSwipe(card.id);
                  return (
                    <Box
                      key={card.id}
                      onTouchStart={cardHandlers.handleStart}
                      onTouchEnd={cardHandlers.handleEnd}
                      onMouseDown={cardHandlers.handleStart}
                      onMouseUp={cardHandlers.handleEnd}
                      sx={{
                        p: 2,
                        bgcolor: card.color,
                        borderRadius: 2,
                        cursor: 'grab',
                        userSelect: 'none',
                        transition: 'all 0.3s ease',
                        '&:active': {
                          cursor: 'grabbing',
                          opacity: 0.7
                        }
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        좌우로 스와이프하여 삭제
                      </Typography>
                    </Box>
                  );
                })
              ) : (
                <Box sx={{
                  p: 3,
                  textAlign: 'center',
                  color: 'text.secondary'
                }}>
                  <Typography variant="body1">
                    모든 카드가 삭제되었습니다
                  </Typography>
                  <Typography variant="body2">
                    초기화 버튼을 클릭하세요
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        {/* 이미지 슬라이더 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '300px'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              이미지 슬라이더
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              좌우로 스와이프하여 이미지 전환
            </Typography>
            <Box
              onTouchStart={imageSwipeHandlers.handleStart}
              onTouchEnd={imageSwipeHandlers.handleEnd}
              onMouseDown={imageSwipeHandlers.handleStart}
              onMouseUp={imageSwipeHandlers.handleEnd}
              sx={{
                width: '100%',
                height: 200,
                bgcolor: images[currentImageIndex].color,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'grab',
                userSelect: 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:active': {
                  cursor: 'grabbing'
                }
              }}
            >
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                {images[currentImageIndex].title}
              </Typography>
              {currentImageIndex > 0 && (
                <SwipeRightIcon sx={{
                  position: 'absolute',
                  left: 16,
                  fontSize: 32,
                  color: 'rgba(255, 255, 255, 0.5)'
                }} />
              )}
              {currentImageIndex < images.length - 1 && (
                <SwipeLeftIcon sx={{
                  position: 'absolute',
                  right: 16,
                  fontSize: 32,
                  color: 'rgba(255, 255, 255, 0.5)'
                }} />
              )}
            </Box>
            <Box sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'center',
              gap: 1
            }}>
              {images.map((img, index) => (
                <Box
                  key={img.id}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: index === currentImageIndex ? 'primary.main' : 'grey.300',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Box>
            <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: 'text.secondary' }}>
              {currentImageIndex + 1} / {images.length}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* 추가 설명 */}
      <Box sx={{
        mt: 4,
        p: 2,
        bgcolor: '#e3f2fd',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          💡 <strong>스와이프 이벤트 처리:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Touch Events</strong>: touchstart, touchmove, touchend (모바일)
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Mouse Events</strong>: mousedown, mousemove, mouseup (데스크톱)
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Delta 계산</strong>: 시작점과 끝점의 차이로 방향 감지
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Threshold</strong>: 최소 이동 거리(50px)로 의도치 않은 스와이프 방지
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>userSelect: 'none'</strong>: 드래그 시 텍스트 선택 방지
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SwipeSection;
