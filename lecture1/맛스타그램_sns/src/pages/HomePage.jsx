import { useState, useEffect } from 'react';
import { Box, Container, CircularProgress, Typography } from '@mui/material';
import { supabase } from '../supabaseClient';
import PostCard from '../components/ui/PostCard';
import CommentModal from '../components/ui/CommentModal';
import TopBar from '../components/common/TopBar';
import BottomNav from '../components/common/BottomNav';

/**
 * HomePage 컴포넌트
 * 메인 피드 페이지 - 게시물 목록 표시
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users:author_id (
            id,
            nickname,
            profile_image_url
          ),
          comments (
            id,
            content,
            created_at,
            author:author_id (
              id,
              nickname,
              profile_image_url
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err) {
      console.error('게시물 로딩 에러:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId, isLiked) => {
    try {
      const post = posts.find((p) => p.id === postId);
      const newLikesCount = isLiked
        ? post.likes_count + 1
        : post.likes_count - 1;

      const { error } = await supabase
        .from('posts')
        .update({ likes_count: newLikesCount })
        .eq('id', postId);

      if (error) throw error;

      setPosts(
        posts.map((p) =>
          p.id === postId ? { ...p, likes_count: newLikesCount } : p
        )
      );
    } catch (err) {
      console.error('좋아요 업데이트 에러:', err);
    }
  };

  const handleCommentClick = (postId) => {
    setSelectedPostId(postId);
    setCommentModalOpen(true);
  };

  const handleCommentAdded = (newComment) => {
    setPosts(
      posts.map((post) => {
        if (post.id === selectedPostId) {
          return {
            ...post,
            comments: [...(post.comments || []), newComment],
          };
        }
        return post;
      })
    );
  };

  const handleCloseModal = () => {
    setCommentModalOpen(false);
    setSelectedPostId(null);
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
        maxWidth="md"
        sx={{
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 3 },
          flex: 1,
          mb: 8,
        }}
      >
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh',
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh',
            }}
          >
            <Typography color="error" variant="body1">
              게시물을 불러오는데 실패했습니다: {error}
            </Typography>
          </Box>
        )}

        {!loading && !error && posts.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh',
            }}
          >
            <Typography color="text.secondary" variant="body1">
              아직 게시물이 없습니다.
            </Typography>
          </Box>
        )}

        {!loading && !error && posts.length > 0 && (
          <Box>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onCommentClick={handleCommentClick}
              />
            ))}
          </Box>
        )}
      </Container>

      <BottomNav />

      {selectedPostId && (
        <CommentModal
          open={commentModalOpen}
          onClose={handleCloseModal}
          postId={selectedPostId}
          comments={posts.find((p) => p.id === selectedPostId)?.comments || []}
          onCommentAdded={handleCommentAdded}
        />
      )}
    </Box>
  );
}

export default HomePage;
