import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { supabase } from '../supabaseClient';

/**
 * 로그인 페이지 컴포넌트
 */
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError('');

      // Supabase에서 사용자 조회
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (dbError || !data) {
        setError('아이디 또는 비밀번호가 일치하지 않습니다.');
        return;
      }

      // 로그인 성공 - 사용자 정보 저장
      localStorage.setItem('currentUser', JSON.stringify(data));
      navigate('/home');
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  const handleSignup = () => {
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
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth='xs'>
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
              mb: 2,
            }}
          >
            <RestaurantIcon
              sx={{
                fontSize: 48,
                color: 'primary.main',
              }}
            />
            <Typography
              variant='h4'
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
              }}
            >
              맛스타그램
            </Typography>
          </Box>

          {/* 아이디 입력란 */}
          <TextField
            fullWidth
            label='아이디'
            variant='outlined'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
          />

          {/* 비밀번호 입력란 */}
          <TextField
            fullWidth
            label='비밀번호'
            type='password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
          />

          {/* 에러 메시지 */}
          {error && (
            <Typography color='error' variant='body2'>
              {error}
            </Typography>
          )}

          {/* 로그인 버튼 */}
          <Button
            fullWidth
            variant='contained'
            size='large'
            onClick={handleLogin}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            로그인
          </Button>

          {/* 회원가입 버튼 */}
          <Button
            fullWidth
            variant='outlined'
            size='large'
            onClick={handleSignup}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            회원가입
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
