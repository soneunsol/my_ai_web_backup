import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../supabaseClient';

/**
 * CommentModal 컴포넌트
 * 게시물 댓글 모달 - 하단에서 올라오는 Instagram 스타일
 *
 * Props:
 * @param {boolean} open - 모달 열림 여부 [Required]
 * @param {function} onClose - 모달 닫기 핸들러 [Required]
 * @param {string} postId - 게시물 ID [Required]
 * @param {array} comments - 댓글 목록 [Required]
 * @param {function} onCommentAdded - 댓글 추가 후 콜백 [Optional]
 *
 * Example usage:
 * <CommentModal
 *   open={isOpen}
 *   onClose={handleClose}
 *   postId="post-id"
 *   comments={commentsArray}
 *   onCommentAdded={handleCommentAdded}
 * />
 */
function CommentModal({ open, onClose, postId, comments, onCommentAdded }) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);

      const userStr = localStorage.getItem('user');
      if (!userStr) {
        alert('로그인이 필요합니다.');
        return;
      }
      const user = JSON.parse(userStr);

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            author_id: user.id,
            content: newComment.trim(),
          },
        ])
        .select(`
          *,
          author:author_id (
            id,
            nickname,
            profile_image_url
          )
        `)
        .single();

      if (error) throw error;

      setNewComment('');
      if (onCommentAdded) {
        onCommentAdded(data);
      }
    } catch (err) {
      console.error('댓글 작성 에러:', err);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInDays < 7) return `${diffInDays}일 전`;

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          height: '80vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            댓글
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* 댓글 목록 */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {comments && comments.length > 0 ? (
            <List sx={{ width: '100%' }}>
              {comments.map((comment, index) => (
                <Box key={comment.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={comment.author?.profile_image_url}
                        alt={comment.author?.nickname}
                        sx={{ bgcolor: 'primary.main' }}
                      >
                        {comment.author?.nickname?.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography
                            variant="body2"
                            component="span"
                            fontWeight="bold"
                            sx={{ mr: 1 }}
                          >
                            {comment.author?.nickname || '사용자'}
                          </Typography>
                          <Typography variant="body2" component="span">
                            {comment.content}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(comment.created_at)}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < comments.length - 1 && <Divider variant="inset" component="li" />}
                </Box>
              ))}
            </List>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography color="text.secondary">
                아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
              </Typography>
            </Box>
          )}
        </Box>

        {/* 댓글 입력 */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitComment();
                }
              }}
              disabled={isSubmitting}
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <SendIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

export default CommentModal;
