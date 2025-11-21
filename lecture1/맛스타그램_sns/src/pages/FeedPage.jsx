import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Layout from '../components/common/Layout';
import PostCard from '../components/ui/PostCard';
import { supabase } from '../lib/supabaseClient';

/**
 * FeedPage 컴포넌트 - 메인 피드 페이지
 *
 * Props: 없음
 */
function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setPosts(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Layout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress sx={{ color: '#FF6B35' }} />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 0 }}>
        {posts.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              color: '#999',
            }}
          >
            아직 게시물이 없습니다.
          </Box>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </Box>
    </Layout>
  );
}

export default FeedPage;
