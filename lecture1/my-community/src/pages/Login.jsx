import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

/**
 * Login 컴포넌트
 * 사용자 로그인 페이지
 */
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Supabase에서 사용자 조회
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (fetchError || !data) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        setLoading(false);
        return;
      }

      // 로그인 성공
      login(data);
      navigate('/board');
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: { xs: 3, md: 4 },
            boxShadow: 3,
          }}
        >
          {/* 로고 */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 'bold',
                color: 'primary.main',
              }}
            >
              ✨ ShineMarket
            </Typography>
          </Box>

          {/* 로그인 제목 */}
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 3,
              fontWeight: 'bold',
            }}
          >
            로그인
          </Typography>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* 로그인 폼 */}
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => navigate('/signup')}
            >
              회원가입하러가기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
