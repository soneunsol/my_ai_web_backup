import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Alert,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import TopBar from '../components/common/TopBar';
import BottomNav from '../components/common/BottomNav';

/**
 * CreatePostPage 컴포넌트
 * 게시물 작성 페이지 - Unsplash 랜덤 이미지, 캡션, 해시태그, 위치 입력
 *
 * Props: 없음
 *
 * Example usage:
 * <CreatePostPage />
 */
function CreatePostPage() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(
    `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`
  );
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRefreshImage = () => {
    setImageUrl(`https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!caption.trim()) {
      setError('캡션을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      // localStorage에서 사용자 정보 가져오기
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        setError('로그인이 필요합니다.');
        navigate('/');
        return;
      }

      const user = JSON.parse(userStr);

      const { error: insertError } = await supabase.from('posts').insert([
        {
          author_id: user.id,
          image_url: imageUrl,
          title: caption.trim().substring(0, 50) || '맛있는 음식',
          content: caption.trim(),
          caption: caption.trim(),
          hashtags: hashtags.trim(),
          location: location.trim(),
          likes_count: 0,
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (err) {
      console.error('게시물 작성 에러:', err);
      setError(err.message || '게시물 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      <TopBar />

      <Container
        maxWidth="sm"
        sx={{
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 3 },
          flex: 1,
          mb: 8,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            새 게시물
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            게시물이 성공적으로 작성되었습니다!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Card sx={{ mb: 2, position: 'relative' }}>
            <CardMedia
              component="img"
              image={imageUrl}
              alt="음식 이미지"
              sx={{
                height: { xs: 300, md: 400 },
                objectFit: 'cover',
              }}
            />
            <IconButton
              onClick={handleRefreshImage}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Card>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="캡션"
            placeholder="오늘의 맛있는 한끼를 공유해보세요..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            label="해시태그"
            placeholder="#맛있다 #음식 #맛집"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="위치"
            placeholder="서울시 강남구"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading || success}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            {loading ? '작성 중...' : '게시하기'}
          </Button>
        </Box>
      </Container>

      <BottomNav />
    </Box>
  );
}

export default CreatePostPage;
