import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  CircularProgress,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PostCard from '../components/ui/PostCard';
import TopBar from '../components/common/TopBar';
import BottomNav from '../components/common/BottomNav';
import { supabase } from '../supabaseClient';

/**
 * MyPage 컴포넌트
 * 마이페이지 - 프로필 정보, 내 게시물 3열 그리드
 *
 * Props: 없음
 *
 * Example usage:
 * <MyPage />
 */
function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // localStorage에서 사용자 정보 가져오기
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/');
        return;
      }

      const authUser = JSON.parse(userStr);

      // 사용자 정보 가져오기
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      setUser(userData);

      // 사용자의 게시물 가져오기
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(
          `
          *,
          users:author_id (
            id,
            nickname,
            profile_image_url
          )
        `
        )
        .eq('author_id', authUser.id)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;
      setPosts(postsData || []);

      // 팔로워/팔로잉 수 가져오기 (테이블이 있는 경우)
      const { data: followersData } = await supabase
        .from('follows')
        .select('*')
        .eq('following_id', authUser.id);

      const { data: followingData } = await supabase
        .from('follows')
        .select('*')
        .eq('follower_id', authUser.id);

      setFollowerCount(followersData?.length || 0);
      setFollowingCount(followingData?.length || 0);
    } catch (error) {
      console.error('데이터 로드 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = async (post) => {
    try {
      // 게시물의 댓글 가져오기
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

      setSelectedPost({
        ...post,
        comments: commentsData || [],
      });
      setOpenModal(true);
    } catch (error) {
      console.error('댓글 로드 오류:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null);
  };

  const handleBack = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
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
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {user?.nickname}
          </Typography>
          <IconButton onClick={handleLogout} color="primary">
            <LogoutIcon />
          </IconButton>
        </Box>

        {/* 프로필 섹션 */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              mb: 3,
            }}
          >
            <Avatar
              src={user?.profile_image_url}
              alt={user?.nickname}
              sx={{ width: 80, height: 80 }}
            />
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  textAlign: 'center',
                }}
              >
                <Box>
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    {posts.length}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    게시물
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    {followerCount}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    팔로워
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    {followingCount}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    팔로잉
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
            {user?.nickname}
          </Typography>
        </Box>

        {/* 게시물 그리드 */}
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
          {posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                아직 게시물이 없습니다.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={0.5}>
              {posts.map((post) => (
                <Grid size={{ xs: 4 }} key={post.id}>
                  <Box
                    onClick={() => handlePostClick(post)}
                    sx={{
                      aspectRatio: '1/1',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                  >
                    <img
                      src={post.image_url}
                      alt="게시물"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* 게시물 모달 */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth={false}
          PaperProps={{
            sx: {
              backgroundColor: 'background.default',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 64,
              height: 'calc(100vh - 64px)',
              width: '100%',
              margin: 0,
              borderRadius: 0,
              maxHeight: 'calc(100vh - 64px)',
            },
          }}
          BackdropProps={{
            sx: {
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <DialogContent
            sx={{
              p: 0,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1,
                backgroundColor: 'background.paper',
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedPost && (
              <Box sx={{ flex: 1, overflow: 'auto', pt: 6 }}>
                <Container maxWidth='sm'>
                  <PostCard
                    post={selectedPost}
                    user={user}
                    comments={selectedPost.comments}
                  />
                </Container>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Container>

      <BottomNav />
    </Box>
  );
}

export default MyPage;
