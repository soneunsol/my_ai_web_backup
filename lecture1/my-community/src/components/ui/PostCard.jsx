import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

/**
 * PostCard 컴포넌트
 * 게시물 카드를 표시하는 컴포넌트
 *
 * Props:
 * @param {Object} post - 게시물 데이터 [Required]
 * @param {number} likesCount - 좋아요 수 [Required]
 * @param {number} commentsCount - 댓글 수 [Required]
 *
 * Example usage:
 * <PostCard post={postData} likesCount={5} commentsCount={3} />
 */
function PostCard({ post, likesCount, commentsCount }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography
          variant='h6'
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            {post.users?.nickname || '익명'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {formatDate(post.created_at)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography
            variant='h6'
            sx={{
              color: '#ff6b35',
              fontWeight: 'bold',
            }}
          >
            {post.price.toLocaleString()}원
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FavoriteIcon sx={{ fontSize: '1rem', color: '#ff6b35' }} />
              <Typography variant='body2'>{likesCount}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: '1rem' }} />
              <Typography variant='body2'>{commentsCount}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <VisibilityIcon sx={{ fontSize: '1rem' }} />
              <Typography variant='body2'>{post.view_count}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostCard;
