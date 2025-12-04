import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

/**
 * PostCard ���
 * SNS ��< t�| \�X� ���
 *
 * Props:
 * @param {object} post - ��< pt0 � [Required]
 * @param {string} post.id - ��< ID
 * @param {string} post.image_url - ��< t�� URL
 * @param {string} post.caption - ��< �X
 * @param {string} post.hashtags - t��� 8��
 * @param {string} post.location - X �
 * @param {number} post.likes_count - �D� 
 * @param {object} post.users - �1� �
 * @param {string} post.users.nickname - �1� �$�
 * @param {string} post.users.avatar_url - �1� \D t�� URL
 * @param {function} onLike - �D� t� x�� [Optional]
 * @param {boolean} isLiked - � ���X �D� � [Optional, 0�: false]
 *
 * Example usage:
 * <PostCard
 *   post={postData}
 *   onLike={handleLike}
 *   isLiked={true}
 * />
 */
function PostCard({ post, onLike, onCommentClick, isLiked = false }) {
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);

  const comments = post.comments || [];
  const commentsCount = comments.length;
  const lastTwoComments = comments.slice(-2);

  const handleLikeClick = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikesCount(newLikedState ? likesCount + 1 : likesCount - 1);

    if (onLike) {
      onLike(post.id, newLikedState);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: '100%', md: 600 },
        mx: 'auto',
        mb: 2,
        boxShadow: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={post.users?.profile_image_url}
            alt={post.users?.nickname}
            sx={{ bgcolor: 'primary.main' }}
          >
            {post.users?.nickname?.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight="bold">
            {post.users?.nickname || '사용자'}
          </Typography>
        }
        subheader={
          post.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {post.location}
              </Typography>
            </Box>
          )
        }
        sx={{ pb: 1 }}
      />

      <CardMedia
        component="img"
        image={post.image_url}
        alt={post.caption}
        sx={{
          height: { xs: 300, md: 400 },
          objectFit: 'cover',
        }}
      />

      <CardActions disableSpacing sx={{ px: 2, py: 1 }}>
        <IconButton
          onClick={handleLikeClick}
          sx={{ color: liked ? 'error.main' : 'text.secondary' }}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {likesCount}
        </Typography>

        <IconButton
          onClick={() => onCommentClick && onCommentClick(post.id)}
          sx={{ ml: 1, color: 'text.secondary' }}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
        {commentsCount > 0 && (
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {commentsCount}
          </Typography>
        )}
      </CardActions>

      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" component="span" fontWeight="bold">
            {post.users?.nickname || '사용자'}
          </Typography>
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>
            {post.caption}
          </Typography>
        </Box>

        {post.hashtags && (
          <Typography variant="body2" color="primary.main" sx={{ mb: 1 }}>
            {post.hashtags}
          </Typography>
        )}

        {commentsCount > 2 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, cursor: 'pointer' }}
            onClick={() => onCommentClick && onCommentClick(post.id)}
          >
            댓글 {commentsCount}개 모두 보기
          </Typography>
        )}

        {lastTwoComments.map((comment) => (
          <Box key={comment.id} sx={{ mb: 0.5 }}>
            <Typography variant="body2" component="span" fontWeight="bold">
              {comment.author?.nickname || '사용자'}
            </Typography>
            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
              {comment.content}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default PostCard;
