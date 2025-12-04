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
 * 게시물 카드 컴포넌트
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {object} user - 작성자 데이터 [Required]
 * @param {array} comments - 댓글 목록 [Optional, 기본값: []]
 * @param {function} onCommentClick - 댓글 클릭 핸들러 [Optional]
 */
function PostCard({ post, user, comments = [], onCommentClick }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* 게시물 헤더 */}
      <CardHeader
        avatar={
          <Avatar
            src={user?.profile_image_url}
            alt={user?.nickname}
            sx={{ width: 40, height: 40 }}
          />
        }
        title={user?.nickname}
        subheader={new Date(post.created_at).toLocaleDateString('ko-KR')}
        titleTypographyProps={{ fontWeight: 'bold' }}
      />

      {/* 음식 이미지 */}
      <CardMedia
        component='img'
        image={post.image_url}
        alt='음식 이미지'
        sx={{
          width: '100%',
          aspectRatio: '1/1',
          objectFit: 'cover',
        }}
      />

      {/* 좋아요/댓글 버튼 */}
      <CardActions disableSpacing>
        <IconButton onClick={handleLike}>
          {isLiked ? (
            <FavoriteIcon sx={{ color: 'primary.main' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography variant='body2' sx={{ mr: 2 }}>
          {likeCount}
        </Typography>

        <IconButton onClick={onCommentClick}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography variant='body2'>{comments.length}</Typography>
      </CardActions>

      {/* 게시물 내용 */}
      <CardContent sx={{ pt: 0 }}>
        {/* 캡션 */}
        {post.caption && (
          <Typography variant='body1' sx={{ mb: 1 }}>
            <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
              {user?.nickname}
            </Box>
            {post.caption}
          </Typography>
        )}

        {/* 해시태그 */}
        {post.hashtags && (
          <Typography variant='body2' color='primary' sx={{ mb: 1 }}>
            {post.hashtags}
          </Typography>
        )}

        {/* 위치 */}
        {post.location && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon fontSize='small' color='action' />
            <Typography variant='body2' color='text.secondary'>
              {post.location}
            </Typography>
          </Box>
        )}

        {/* 댓글 미리보기 */}
        {comments.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ cursor: 'pointer', mb: 0.5 }}
              onClick={onCommentClick}
            >
              댓글 {comments.length}개 모두 보기
            </Typography>
            {comments.slice(0, 2).map((comment) => (
              <Typography key={comment.id} variant='body2' sx={{ mb: 0.5 }}>
                <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                  {comment.author?.nickname}
                </Box>
                {comment.content}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PostCard;
