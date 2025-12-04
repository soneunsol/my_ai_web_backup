import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { supabase } from '../supabaseClient';

/**
 * LoginPage 컴포넌트
 * 
 * 로그인 페이지 - 아이디와 비밀번호로 로그인합니다.
 */
function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError('');
      
      const { data, error: loginError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (loginError || !data) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      navigate('/home');
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: 'background.default'
    }}>
      <Container maxWidth="sm">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" component="h1" sx={{
              fontWeight: 700,
              color: 'primary.main'
            }}>
              🍴 맛스타그램
            </Typography>
          </Box>

          <Box sx={{ 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 2
          }}>
            <TextField
              fullWidth
              label="아이디"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{ mt: 1 }}
            >
              로그인
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => navigate('/signup')}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
