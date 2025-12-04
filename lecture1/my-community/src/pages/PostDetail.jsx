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
  Divider,
  IconButton,
  Chip,
  Alert,
} from '@mui/material';
import { Favorite, FavoriteBorder, ArrowBack, Send } from '@mui/icons-material';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

/**
 * PostDetail 컴포넌트
 * 게시물 상세 페이지
 */
function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchPostDetail();
    incrementViews();
  }, [postId, user, navigate]);

  // 조회수 증가
  const incrementViews = async () => {
    try {
      const { data: currentPost } = await supabase
        .from('posts')
        .select('views')
        .eq('id', postId)
        .single();

      if (currentPost) {
        await supabase
          .from('posts')
          .update({ views: currentPost.views + 1 })
          .eq('id', postId);
      }
    } catch (error) {
      console.error('조회수 업데이트 실패:', error);
    }
  };

  // 게시물 상세 정보 조회
  const fetchPostDetail = async () => {
    try {
      // 게시물 조회
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select(`
          *,
          users:author_id (nickname)
        `)
        .eq('id', postId)
        .single();

      if (postError) throw postError;
      setPost(postData);

      // 댓글 조회
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select(`
          *,
          users:author_id (nickname)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;
      setComments(commentsData);

      // 좋아요 수 조회
      const { count: likesCount } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId);

      setLikesCount(likesCount || 0);

      // 현재 사용자의 좋아요 여부 확인
      const { data: likeData } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      setIsLiked(!!likeData);
    } catch (error) {
      console.error('게시물 조회 실패:', error);
      setError('게시물을 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 좋아요 토글
  const toggleLike = async () => {
    try {
      if (isLiked) {
        // 좋아요 취소
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        // 좋아요 추가
        await supabase.from('likes').insert([
          {
            post_id: postId,
            user_id: user.id,
          },
        ]);
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  // 댓글 등록
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            author_id: user.id,
            content: newComment,
          },
        ])
        .select(`
          *,
          users:author_id (nickname)
        `)
        .single();

      if (error) throw error;

      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      setError('댓글 등록에 실패했습니다.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>로딩 중...</Typography>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color="error">{error || '게시물을 찾을 수 없습니다.'}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="md">
        {/* 뒤로가기 버튼 */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/board')}
          sx={{ mb: 2 }}
        >
          목록으로
        </Button>

        {/* 게시물 카드 */}
        <Card sx={{ mb: 3 }}>
          {post.image_url && (
            <CardMedia
              component="img"
              height="400"
              image={post.image_url}
              alt={post.title}
            />
          )}
          <CardContent>
            {/* 제목 */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {post.title}
            </Typography>

            {/* 작성자 및 작성 시간 */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                작성자: {post.users?.nickname || '알 수 없음'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(post.created_at)}
              </Typography>
            </Box>

            {/* 상품 가격 */}
            <Chip
              label={`${post.price.toLocaleString()}원`}
              color="primary"
              sx={{ mb: 3 }}
            />

            {/* 내용 */}
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              {post.content}
            </Typography>

            {/* 좋아요 버튼 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={toggleLike}
                color={isLiked ? 'error' : 'default'}
              >
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <Typography variant="body1">{likesCount}</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              댓글 {comments.length}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* 댓글 목록 */}
            {comments.length === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 3 }}
              >
                첫 댓글을 작성해보세요!
              </Typography>
            ) : (
              <Box sx={{ mb: 3 }}>
                {comments.map((comment) => (
                  <Box key={comment.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {comment.users?.nickname || '알 수 없음'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(comment.created_at)}
                      </Typography>
                    </Box>
                    <Typography variant="body1">{comment.content}</Typography>
                    {comment !== comments[comments.length - 1] && (
                      <Divider sx={{ mt: 2 }} />
                    )}
                  </Box>
                ))}
              </Box>
            )}

            {/* 댓글 입력란 */}
            <Box component="form" onSubmit={handleCommentSubmit}>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<Send />}
                disabled={!newComment.trim()}
              >
                댓글 등록
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default PostDetail;
