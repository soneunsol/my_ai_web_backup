import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../utils/AuthContext';
import { supabase } from '../utils/supabase';
import PostCard from '../components/ui/PostCard';

/**
 * BoardPage 컴포넌트
 * 게시판 메인 페이지
 */
function BoardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      // 게시물 목록 가져오기 (작성자 정보 포함)
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*, users(nickname)')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // 각 게시물의 좋아요 수와 댓글 수 가져오기
      const postsWithCounts = await Promise.all(
        postsData.map(async (post) => {
          const { count: likesCount } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          const { count: commentsCount } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          return {
            ...post,
            likesCount: likesCount || 0,
            commentsCount: commentsCount || 0,
          };
        })
      );

      setPosts(postsWithCounts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreatePost = () => {
    navigate('/post/create');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth='lg' sx={{ py: 4 }}>
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 'bold',
            }}
          >
            {user?.nickname}님 환영해요!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleCreatePost}
            >
              게시물 추가
            </Button>
            <Button variant='outlined' onClick={handleLogout}>
              로그아웃
            </Button>
          </Box>
        </Box>

        {/* 게시물 목록 */}
        {loading ? (
          <Typography variant='body1' align='center'>
            로딩 중...
          </Typography>
        ) : posts.length === 0 ? (
          <Typography variant='body1' align='center' color='text.secondary'>
            아직 게시물이 없습니다. 첫 번째 게시물을 작성해보세요!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <PostCard
                  post={post}
                  likesCount={post.likesCount}
                  commentsCount={post.commentsCount}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default BoardPage;
