import { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Grid,
  Modal,
  IconButton,
  CardMedia,
  CardHeader,
  CardContent,
  Card,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Layout from '../components/common/Layout';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

/**
 * MyPage 컴포넌트 - 마이페이지
 *
 * Props: 없음
 */
function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.id) {
      navigate('/');
      return;
    }
    setUser(userData);
    fetchUserPosts(userData.id);
  }, []);

  const fetchUserPosts = async (userId) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', userId)
      .order('created_at', { ascending: false });

    if (data) setPosts(data);
  };

  const handleImageClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diff = now - postDate;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  if (!user) return null;

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            mb: 4,
          }}
        >
          <Avatar
            src={user.profile_image_url}
            alt={user.nickname}
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Box sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1 }}>
              {user.nickname}
            </Box>
            <Box sx={{ display: 'flex', gap: 3, color: '#666' }}>
              <Box>
                <strong>{posts.length}</strong> 게시물
              </Box>
              <Box>
                <strong>0</strong> 팔로워
              </Box>
              <Box>
                <strong>0</strong> 팔로우
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid #EFEFEF',
            pt: 2,
          }}
        >
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
            <Grid container spacing={1}>
              {posts.map((post) => (
                <Grid item xs={4} key={post.id}>
                  <Box
                    onClick={() => handleImageClick(post)}
                    sx={{
                      aspectRatio: '1/1',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: 1,
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                  >
                    <img
                      src={post.image_url}
                      alt='게시물'
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
      </Box>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={() => setShowModal(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(255,255,255,0.9)',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedPost && (
            <Card sx={{ boxShadow: 'none' }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={user.profile_image_url}
                    alt={user.nickname}
                  />
                }
                title={user.nickname}
                subheader={
                  selectedPost.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon sx={{ fontSize: 16, color: '#FF6B35' }} />
                      <span>{selectedPost.location}</span>
                    </Box>
                  )
                }
              />

              <CardMedia
                component='img'
                image={selectedPost.image_url}
                alt='게시물 이미지'
                sx={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                }}
              />

              <CardContent>
                <Box sx={{ mb: 1 }}>
                  <strong>{user.nickname}</strong> {selectedPost.content}
                </Box>
                {selectedPost.hashtags && (
                  <Box sx={{ color: '#FF6B35', mb: 1 }}>
                    {selectedPost.hashtags}
                  </Box>
                )}
                <Box sx={{ color: '#999', fontSize: '0.875rem' }}>
                  {formatTime(selectedPost.created_at)}
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>
    </Layout>
  );
}

export default MyPage;
