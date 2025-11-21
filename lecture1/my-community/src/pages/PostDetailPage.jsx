import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  TextField,
  IconButton,
  Divider,
  Alert,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../utils/AuthContext';
import { supabase } from '../utils/supabase';

/**
 * PostDetailPage 컴포넌트
 * 게시물 상세 페이지
 */
function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostDetail();
    incrementViewCount();
  }, [id]);

  const fetchPostDetail = async () => {
    try {
      setLoading(true);

      // 게시물 상세 정보 가져오기
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*, users(nickname)')
        .eq('id', id)
        .single();

      if (postError) throw postError;
      setPost(postData);

      // 좋아요 수 가져오기
      const { count: likesCount } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', id);

      setLikesCount(likesCount || 0);

      // 현재 사용자가 좋아요했는지 확인
      const { data: likeData } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', id)
        .eq('user_id', user.id)
        .single();

      setIsLiked(!!likeData);

      // 댓글 목록 가져오기
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*, users(nickname)')
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;
      setComments(commentsData || []);
    } catch (err) {
      console.error('Error fetching post detail:', err);
      setError('게시물을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async () => {
    try {
      await supabase.rpc('increment_view_count', { post_id: id });
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        // 좋아요 취소
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', id)
          .eq('user_id', user.id);

        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        // 좋아요 추가
        await supabase.from('likes').insert([
          {
            post_id: id,
            user_id: user.id,
          },
        ]);

        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      setError('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const { data, error: insertError } = await supabase
        .from('comments')
        .insert([
          {
            post_id: id,
            author_id: user.id,
            content: newComment,
          },
        ])
        .select('*, users(nickname)')
        .single();

      if (insertError) throw insertError;

      setComments([...comments, data]);
      setNewComment('');
      setError('');
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  const handleBack = () => {
    navigate('/board');
  };

  if (loading) {
    return (
      <Container maxWidth='md' sx={{ py: 4 }}>
        <Typography variant='body1' align='center'>
          로딩 중...
        </Typography>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth='md' sx={{ py: 4 }}>
        <Typography variant='body1' align='center' color='error'>
          게시물을 찾을 수 없습니다.
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth='md' sx={{ py: 4 }}>
        {/* 뒤로가기 버튼 */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          뒤로가기
        </Button>

        {/* 에러 메시지 */}
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* 게시물 카드 */}
        <Card sx={{ mb: 4 }}>
          {post.image_url && (
            <CardMedia
              component='img'
              height='400'
              image={post.image_url}
              alt={post.title}
            />
          )}
          <CardContent>
            {/* 제목 */}
            <Typography
              variant='h4'
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              {post.title}
            </Typography>

            {/* 작성자 및 작성 시간 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant='body2' color='text.secondary'>
                작성자: {post.users?.nickname || '익명'}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {formatDate(post.created_at)}
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* 내용 */}
            <Typography
              variant='body1'
              sx={{ mb: 3, whiteSpace: 'pre-wrap' }}
            >
              {post.content}
            </Typography>

            {/* 가격 */}
            <Typography
              variant='h5'
              sx={{
                color: '#ff6b35',
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              {post.price.toLocaleString()}원
            </Typography>

            {/* 좋아요 버튼 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={handleLikeToggle} color='primary'>
                {isLiked ? (
                  <FavoriteIcon sx={{ color: '#ff6b35' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography variant='body1'>{likesCount}</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        <Box>
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
            댓글 ({comments.length})
          </Typography>

          {/* 댓글 목록 */}
          <Box sx={{ mb: 3 }}>
            {comments.length === 0 ? (
              <Typography variant='body2' color='text.secondary'>
                첫 번째 댓글을 작성해보세요!
              </Typography>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography variant='subtitle2' fontWeight='bold'>
                        {comment.users?.nickname || '익명'}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {formatDate(comment.created_at)}
                      </Typography>
                    </Box>
                    <Typography variant='body2'>{comment.content}</Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>

          {/* 댓글 입력 폼 */}
          <Box
            component='form'
            onSubmit={handleAddComment}
            sx={{ display: 'flex', gap: 1 }}
          >
            <TextField
              label='댓글을 입력하세요'
              variant='outlined'
              fullWidth
              multiline
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type='submit'
              variant='contained'
              sx={{ minWidth: '80px' }}
            >
              등록
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PostDetailPage;
