import { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * DragDropSection 컴포넌트
 *
 * HTML5 드래그 API를 사용한 드래그 앤 드롭
 * - 드래그 가능한 아이템 2-3개
 * - 드롭 영역 1개
 * - 드래그 시 시각적 피드백
 */
function DragDropSection() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverDropZone, setIsOverDropZone] = useState(false);

  const initialItems = [
    { id: 1, name: 'React', color: '#61dafb' },
    { id: 2, name: 'JavaScript', color: '#f7df1e' },
    { id: 3, name: 'TypeScript', color: '#3178c6' }
  ];

  // 드래그 시작
  const handleDragStart = (item) => {
    setDraggedItem(item);
    setIsDragging(true);
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsDragging(false);
    setIsOverDropZone(false);
  };

  // 드롭 영역 위로 드래그
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOverDropZone(true);
  };

  // 드롭 영역을 벗어남
  const handleDragLeave = () => {
    setIsOverDropZone(false);
  };

  // 드롭
  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      // 중복 체크
      const isDuplicate = droppedItems.some(item => item.id === draggedItem.id);
      if (!isDuplicate) {
        setDroppedItems([...droppedItems, draggedItem]);
      }
    }
    setIsOverDropZone(false);
  };

  // 드롭된 아이템 제거
  const handleRemoveItem = (itemId) => {
    setDroppedItems(droppedItems.filter(item => item.id !== itemId));
  };

  // 모두 제거
  const handleClearAll = () => {
    setDroppedItems([]);
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
        Drag & Drop Components
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        아래 아이템을 드래그하여 드롭 영역으로 이동해보세요.
      </Typography>

      <Grid container spacing={3}>
        {/* 드래그 가능한 아이템 영역 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            드래그 가능한 아이템
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '250px'
          }}>
            {initialItems.map((item) => (
              <Box
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
                sx={{
                  p: 2,
                  bgcolor: 'white',
                  borderRadius: 1,
                  border: '2px solid',
                  borderColor: draggedItem?.id === item.id ? 'primary.main' : '#ddd',
                  cursor: 'grab',
                  transition: 'all 0.2s ease',
                  opacity: draggedItem?.id === item.id ? 0.5 : 1,
                  transform: draggedItem?.id === item.id ? 'scale(0.95)' : 'scale(1)',
                  '&:hover': {
                    boxShadow: 2,
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)'
                  },
                  '&:active': {
                    cursor: 'grabbing'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: item.color,
                      borderRadius: '50%',
                      border: '2px solid white',
                      boxShadow: 1
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* 드롭 영역 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              드롭 영역
            </Typography>
            {droppedItems.length > 0 && (
              <Chip
                label="모두 제거"
                size="small"
                onClick={handleClearAll}
                color="error"
                sx={{ cursor: 'pointer' }}
              />
            )}
          </Box>
          <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              p: 3,
              bgcolor: isOverDropZone ? '#e3f2fd' : '#fafafa',
              borderRadius: 2,
              border: '3px dashed',
              borderColor: isOverDropZone ? 'primary.main' : '#ddd',
              minHeight: '250px',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            {droppedItems.length === 0 ? (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'text.secondary'
              }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {isOverDropZone ? '여기에 놓으세요!' : '아이템을 여기로 드래그하세요'}
                </Typography>
                <Typography variant="body2">
                  👆
                </Typography>
              </Box>
            ) : (
              droppedItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 2,
                    bgcolor: 'white',
                    borderRadius: 1,
                    border: '2px solid',
                    borderColor: 'success.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    animation: 'fadeIn 0.3s ease',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(-10px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        bgcolor: item.color,
                        borderRadius: '50%',
                        border: '2px solid white',
                        boxShadow: 1
                      }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Chip
                    label="제거"
                    size="small"
                    onClick={() => handleRemoveItem(item.id)}
                    color="error"
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
              ))
            )}
          </Box>
        </Grid>
      </Grid>

      {/* 상태 표시 */}
      <Box sx={{
        mt: 3,
        p: 2,
        bgcolor: '#f5f5f5',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>현재 상태:</strong>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          드래그 중: {isDragging ? `${draggedItem?.name} ✓` : '없음'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          드롭된 아이템 개수: {droppedItems.length}개
        </Typography>
      </Box>

      {/* 추가 설명 */}
      <Box sx={{
        mt: 3,
        p: 2,
        bgcolor: '#e3f2fd',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          💡 <strong>드래그 앤 드롭 이벤트:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>onDragStart</strong>: 드래그 시작 시 호출
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>onDragOver</strong>: 드래그 중 드롭 영역 위에 있을 때 호출
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>onDrop</strong>: 드롭 영역에 놓았을 때 호출
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>onDragEnd</strong>: 드래그 종료 시 호출
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default DragDropSection;
