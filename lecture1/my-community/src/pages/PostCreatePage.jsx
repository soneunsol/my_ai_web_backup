import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardMedia,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useAuth } from '../utils/AuthContext';
import { supabase } from '../utils/supabase';

/**
 * PostCreatePage 컴포넌트
 * 게시물 작성 페이지
 */
function PostCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddRandomImage = () => {
    // 랜덤 이미지 URL 생성 (Picsum 사용)
    const randomId = Math.floor(Math.random() * 1000);
    const randomImageUrl = `https://picsum.photos/400/300?random=${randomId}`;
    setImageUrl(randomImageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 유효성 검사
    if (!title || !content || !price) {
      setError('제목, 내용, 가격은 필수 입력 항목입니다.');
      return;
    }

    if (isNaN(price) || Number(price) < 0) {
      setError('가격은 0 이상의 숫자여야 합니다.');
      return;
    }

    try {
      setLoading(true);

      // 게시물 생성
      const { data, error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            title,
            content,
            price: Number(price),
            image_url: imageUrl || null,
            author_id: user.id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // 게시판으로 이동
      navigate('/board');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('게시물 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/board');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth='md' sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* 제목 */}
          <Typography
            variant='h4'
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 'bold',
            }}
          >
            게시물 작성
          </Typography>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity='error' sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          {/* 게시물 작성 폼 */}
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <TextField
              label='제목'
              variant='outlined'
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <TextField
              label='내용'
              variant='outlined'
              fullWidth
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <TextField
              label='상품 가격 (원)'
              variant='outlined'
              fullWidth
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            {/* 이미지 업로드 버튼 */}
            <Box>
              <Button
                variant='outlined'
                startIcon={<ImageIcon />}
                onClick={handleAddRandomImage}
                sx={{ mb: 2 }}
              >
                랜덤 이미지 추가
              </Button>

              {/* 이미지 미리보기 */}
              {imageUrl && (
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                    component='img'
                    height='300'
                    image={imageUrl}
                    alt='게시물 이미지'
                  />
                </Card>
              )}
            </Box>

            {/* 버튼 영역 */}
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                type='submit'
                variant='contained'
                size='large'
                fullWidth
                disabled={loading}
              >
                {loading ? '등록 중...' : '게시물 등록'}
              </Button>
              <Button
                variant='outlined'
                size='large'
                fullWidth
                onClick={handleCancel}
                disabled={loading}
              >
                취소
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PostCreatePage;
