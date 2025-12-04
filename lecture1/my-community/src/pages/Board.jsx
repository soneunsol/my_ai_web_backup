import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
} from '@mui/material';
import {
  Favorite,
  Comment,
  Visibility,
  Add,
} from '@mui/icons-material';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

/**
 * Board 컴포넌트
 * 게시판 목록 페이지
 */
function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchPosts();
  }, [user, navigate]);

  const fetchPosts = async () => {
    try {
      // 게시물 조회
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          users:author_id (nickname)
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // 각 게시물의 댓글 수와 좋아요 수 조회
      const postsWithCounts = await Promise.all(
        postsData.map(async (post) => {
          // 댓글 수 조회
          const { count: commentsCount } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          // 좋아요 수 조회
          const { count: likesCount } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          return {
            ...post,
            commentsCount: commentsCount || 0,
            likesCount: likesCount || 0,
          };
        })
      );

      setPosts(postsWithCounts);
    } catch (error) {
      console.error('게시물 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60);

    if (diff < 1) return '방금 전';
    if (diff < 60) return `${diff}분 전`;
    if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;
    return date.toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>로딩 중...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {user?.nickname}님 환영해요 👋
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/create')}
            >
              게시물 추가
            </Button>
            <Button variant="outlined" onClick={handleLogout}>
              로그아웃
            </Button>
          </Box>
        </Box>

        {/* 게시물 목록 */}
        <Grid container spacing={3}>
          {posts.length === 0 ? (
            <Grid size={{ xs: 12 }}>
              <Typography
                sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}
              >
                아직 게시물이 없습니다. 첫 게시물을 작성해보세요!
              </Typography>
            </Grid>
          ) : (
            posts.map((post) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  {post.image_url && (
                    <Box
                      component="img"
                      src={post.image_url}
                      alt={post.title}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                      }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        작성자: {post.users?.nickname || '알 수 없음'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(post.created_at)}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${post.price.toLocaleString()}원`}
                      color="primary"
                      size="small"
                    />
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-around', py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Visibility fontSize="small" color="action" />
                      <Typography variant="body2">{post.views}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Favorite fontSize="small" color="action" />
                      <Typography variant="body2">{post.likesCount}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Comment fontSize="small" color="action" />
                      <Typography variant="body2">
                        {post.commentsCount}
                      </Typography>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Board;
