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
import { useAuth } from '../utils/AuthContext';

/**
 * LoginPage 컴포넌트
 * 사용자 로그인 페이지
 */
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      navigate('/board');
    } else {
      setError(result.error);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth='sm' sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* 로고 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '3rem', md: '4rem' },
              }}
            >
              🍊
            </Typography>
            <Typography
              variant='h3'
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 'bold',
                color: '#ff6b35',
              }}
            >
              Orange Market
            </Typography>
          </Box>

          {/* 로그인 제목 */}
          <Typography
            variant='h4'
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 'medium',
              mt: 2,
            }}
          >
            로그인
          </Typography>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity='error' sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          {/* 로그인 폼 */}
          <Box
            component='form'
            onSubmit={handleLogin}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label='아이디'
              variant='outlined'
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete='username'
            />
            <TextField
              label='비밀번호'
              type='password'
              variant='outlined'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              sx={{ mt: 2 }}
            >
              로그인
            </Button>
            <Button
              variant='outlined'
              size='large'
              fullWidth
              onClick={handleSignupClick}
            >
              회원가입하러가기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
