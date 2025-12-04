import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  Card,
  CardMedia,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { supabase } from '../supabaseClient';

/**
 * 게시물 작성 페이지 컴포넌트
 */
function CreatePost() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 페이지 로드시 랜덤 음식 이미지 불러오기
    fetchRandomFoodImage();
  }, []);

  const fetchRandomFoodImage = async () => {
    try {
      const response = await fetch('https://foodish-api.com/api/');
      const data = await response.json();
      setImageUrl(data.image);
    } catch (error) {
      console.error('이미지 로드 오류:', error);
      // 실패시 기본 이미지
      setImageUrl('https://source.unsplash.com/400x400/?food');
    }
  };

  const handleImageChange = () => {
    fetchRandomFoodImage();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 현재 로그인한 사용자 정보 가져오기
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        alert('로그인이 필요합니다.');
        navigate('/');
        return;
      }

      // 게시물 데이터 생성
      const { data, error } = await supabase.from('posts').insert([
        {
          author_id: currentUser.id,
          image_url: imageUrl,
          caption: caption,
          hashtags: hashtags,
          location: location,
        },
      ]);

      if (error) throw error;

      alert('게시물이 등록되었습니다!');
      navigate('/home');
    } catch (error) {
      console.error('게시물 등록 오류:', error);
      alert('게시물 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        pb: 8,
      }}
    >
      <Container maxWidth='sm' sx={{ pt: 2 }}>
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            게시물 작성
          </Typography>
          <Box sx={{ width: 40 }} />
        </Box>

        {/* 이미지 미리보기 */}
        <Card sx={{ mb: 2 }}>
          <CardMedia
            component='img'
            image={imageUrl}
            alt='음식 이미지'
            sx={{
              width: '100%',
              aspectRatio: '1/1',
              objectFit: 'cover',
            }}
          />
        </Card>

        {/* 이미지 변경 버튼 */}
        <Button
          fullWidth
          variant='outlined'
          startIcon={<RefreshIcon />}
          onClick={handleImageChange}
          sx={{ mb: 3 }}
        >
          다른 이미지로 변경
        </Button>

        {/* 캡션 입력 */}
        <TextField
          fullWidth
          label='게시물 내용 (캡션)'
          multiline
          rows={4}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* 해시태그 입력 */}
        <TextField
          fullWidth
          label='해시태그 (예: #맛집 #음식 #추천)'
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* 위치 입력 */}
        <TextField
          fullWidth
          label='위치'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* 게시물 등록 버튼 */}
        <Button
          fullWidth
          variant='contained'
          size='large'
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {loading ? '등록 중...' : '게시물 등록'}
        </Button>
      </Container>
    </Box>
  );
}

export default CreatePost;
