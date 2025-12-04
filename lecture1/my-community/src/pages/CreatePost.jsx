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
import { Image, Send } from '@mui/icons-material';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

/**
 * CreatePost 컴포넌트
 * 게시물 작성 페이지
 */
function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // 랜덤 이미지 생성
  const generateRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const randomImageUrl = `https://picsum.photos/400/300?random=${randomId}`;
    setImageUrl(randomImageUrl);
  };

  // 게시물 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('로그인이 필요합니다.');
      return;
    }

    if (!title || !content || !price) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (isNaN(price) || Number(price) < 0) {
      setError('가격은 0 이상의 숫자여야 합니다.');
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase.from('posts').insert([
        {
          title,
          content,
          author_id: user.id,
          price: Number(price),
          image_url: imageUrl || null,
        },
      ]);

      if (insertError) {
        setError('게시물 등록 중 오류가 발생했습니다.');
        console.error(insertError);
        setLoading(false);
        return;
      }

      // 게시판으로 이동
      navigate('/board');
    } catch (err) {
      setError('게시물 등록 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: { xs: 3, md: 4 },
            boxShadow: 3,
          }}
        >
          {/* 제목 */}
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 3,
              fontWeight: 'bold',
            }}
          >
            게시물 작성
          </Typography>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* 게시물 작성 폼 */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* 제목 입력란 */}
            <TextField
              fullWidth
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />

            {/* 내용 입력란 */}
            <TextField
              fullWidth
              label="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              multiline
              rows={6}
              required
            />

            {/* 상품 가격 입력란 */}
            <TextField
              fullWidth
              label="상품 가격 (원)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
              type="number"
              required
            />

            {/* 이미지 업로드 버튼 */}
            <Box sx={{ mt: 2, mb: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Image />}
                onClick={generateRandomImage}
              >
                랜덤 이미지 추가
              </Button>
            </Box>

            {/* 이미지 미리보기 */}
            {imageUrl && (
              <Card sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={imageUrl}
                  alt="게시물 이미지"
                />
              </Card>
            )}

            {/* 버튼 그룹 */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/board')}
              >
                취소
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<Send />}
                disabled={loading}
              >
                {loading ? '등록 중...' : '게시물 등록'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CreatePost;
