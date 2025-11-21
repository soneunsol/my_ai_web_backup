import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Box,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import { supabase } from '../../lib/supabaseClient';

/**
 * PostCard 컴포넌트 - 게시물 카드
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {function} onLike - 좋아요 클릭 핸들러 [Optional]
 *
 * Example usage:
 * <PostCard post={postData} />
 */
function PostCard({ post, onLike }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetchAuthor();
    fetchComments();
  }, []);

  const fetchAuthor = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', post.author_id)
      .single();

    if (data) setAuthor(data);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        users:author_id (nickname, profile_image_url)
      `)
      .eq('post_id', post.id)
      .order('created_at', { ascending: false })
      .limit(2);

    if (data) setComments(data);
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    if (onLike) onLike(post.id);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: post.id,
          author_id: user.id,
          content: newComment,
        },
      ])
      .select(`
        *,
        users:author_id (nickname, profile_image_url)
      `)
      .single();

    if (data) {
      setComments([data, ...comments]);
      setNewComment('');
    }
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

  if (!author) return null;

  return (
    <>
      <Card sx={{ mb: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
        <CardHeader
          avatar={
            <Avatar
              src={author.profile_image_url}
              alt={author.nickname}
            />
          }
          title={author.nickname}
          subheader={
            post.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOnIcon sx={{ fontSize: 16, color: '#FF6B35' }} />
                <span>{post.location}</span>
              </Box>
            )
          }
        />

        <CardMedia
          component='img'
          image={post.image_url}
          alt='게시물 이미지'
          sx={{
            aspectRatio: '1/1',
            objectFit: 'cover',
          }}
        />

        <CardContent>
          <Box sx={{ mb: 1 }}>
            <strong>{author.nickname}</strong> {post.content}
          </Box>
          {post.hashtags && (
            <Box sx={{ color: '#FF6B35', mb: 1 }}>
              {post.hashtags}
            </Box>
          )}
          <Box sx={{ color: '#999', fontSize: '0.875rem' }}>
            {formatTime(post.created_at)}
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton onClick={handleLike} sx={{ color: liked ? '#FF6B35' : '#666' }}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <span>{likesCount}</span>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
            <IconButton onClick={() => setShowComments(true)} sx={{ color: '#666' }}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <span>{comments.length}</span>
          </Box>
        </CardActions>

        {comments.length > 0 && (
          <Box sx={{ px: 2, pb: 2 }}>
            {comments.slice(0, 2).map((comment) => (
              <Box key={comment.id} sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                <strong>{comment.users?.nickname}</strong> {comment.content}
              </Box>
            ))}
          </Box>
        )}
      </Card>

      <Modal
        open={showComments}
        onClose={() => setShowComments(false)}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '80vh',
            borderRadius: '16px 16px 0 0',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ fontSize: '1.25rem', fontWeight: 600 }}>댓글</Box>
            <IconButton onClick={() => setShowComments(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            {comments.map((comment) => (
              <Box key={comment.id} sx={{ mb: 2, display: 'flex', gap: 1 }}>
                <Avatar src={comment.users?.profile_image_url} sx={{ width: 32, height: 32 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ fontSize: '0.875rem' }}>
                    <strong>{comment.users?.nickname}</strong>
                  </Box>
                  <Box sx={{ fontSize: '0.875rem', color: '#666' }}>
                    {comment.content}
                  </Box>
                  <Box sx={{ fontSize: '0.75rem', color: '#999', mt: 0.5 }}>
                    {formatTime(comment.created_at)}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder='댓글을 입력하세요...'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              size='small'
            />
            <Button
              variant='contained'
              onClick={handleAddComment}
              sx={{
                backgroundColor: '#FF6B35',
                '&:hover': { backgroundColor: '#E85A2A' },
              }}
            >
              등록
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default PostCard;
