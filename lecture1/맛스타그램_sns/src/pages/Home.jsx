import { useState, useEffect } from 'react';
import { Box, Container, CircularProgress, Typography } from '@mui/material';
import PostCard from '../components/common/PostCard';
import { supabase } from '../supabaseClient';

/**
 * 메인 피드 페이지 컴포넌트
 */
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // 게시물과 작성자 정보를 함께 가져오기
      const { data: postsData, error } = await supabase
        .from('posts')
        .select(
          `
          *,
          author:users!posts_author_id_fkey(id, nickname, profile_image_url)
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;

      // 각 게시물의 댓글 가져오기
      const postsWithComments = await Promise.all(
        postsData.map(async (post) => {
          const { data: commentsData } = await supabase
            .from('comments')
            .select(
              `
              *,
              author:users!comments_author_id_fkey(nickname)
            `
            )
            .eq('post_id', post.id)
            .order('created_at', { ascending: false });

          return {
            ...post,
            comments: commentsData || [],
          };
        })
      );

      setPosts(postsWithComments);
    } catch (error) {
      console.error('게시물 로드 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
        <Typography
          variant='h5'
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
            textAlign: 'center',
          }}
        >
          맛스타그램
        </Typography>

        {posts.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
            }}
          >
            <Typography color='text.secondary'>
              아직 게시물이 없습니다.
            </Typography>
          </Box>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              user={post.author}
              comments={post.comments}
            />
          ))
        )}
      </Container>
    </Box>
  );
}

export default Home;
