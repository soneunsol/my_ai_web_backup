import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  CardMedia,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import Layout from '../components/common/Layout';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

/**
 * CreatePostPage 컴포넌트 - 게시물 작성 페이지
 *
 * Props: 없음
 */
function CreatePostPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState(getRandomFoodImage());

  function getRandomFoodImage() {
    const seed = Math.random().toString(36).substring(7);
    return `https://source.unsplash.com/600x600/?food,restaurant&sig=${seed}`;
  }

  const handleImageRefresh = () => {
    setImageUrl(getRandomFoodImage());
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      alert('로그인이 필요합니다.');
      navigate('/');
      return;
    }

    if (!content.trim()) {
      alert('게시물 내용을 입력해주세요.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title: content.substring(0, 50),
            author_id: user.id,
            content,
            hashtags,
            location,
            image_url: imageUrl,
            likes_count: 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      alert('게시물이 등록되었습니다!');
      navigate('/feed');
    } catch (err) {
      console.error(err);
      alert('게시물 등록 중 오류가 발생했습니다: ' + err.message);
    }
  };

  return (
    <Layout showBottomNav={false}>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            gap: 2,
          }}
        >
          <IconButton onClick={() => navigate('/feed')}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
            게시물 작성
          </Box>
        </Box>

        <Box sx={{ mb: 3, position: 'relative' }}>
          <CardMedia
            component='img'
            image={imageUrl}
            alt='음식 이미지'
            sx={{
              aspectRatio: '1/1',
              borderRadius: 2,
              objectFit: 'cover',
            }}
          />
          <IconButton
            onClick={handleImageRefresh}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,1)',
              },
            }}
          >
            <RefreshIcon sx={{ color: '#FF6B35' }} />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label='게시물 내용'
          placeholder='오늘의 맛집을 소개해주세요...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='해시태그'
          placeholder='#맛집 #음식 #추천'
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='위치'
          placeholder='서울시 강남구'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant='contained'
          size='large'
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#FF6B35',
            '&:hover': {
              backgroundColor: '#E85A2A',
            },
            py: 1.5,
          }}
        >
          게시물 등록
        </Button>
      </Box>
    </Layout>
  );
}

export default CreatePostPage;
