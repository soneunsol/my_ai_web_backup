import { useState } from 'react';
import { Box, TextField, Button, Container } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

/**
 * LoginPage 컴포넌트 - 로그인 페이지
 *
 * Props: 없음
 */
function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        alert('로그인 실패: 아이디 또는 비밀번호를 확인해주세요.');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      navigate('/feed');
    } catch (err) {
      console.error(err);
      alert('로그인 중 오류가 발생했습니다.');
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
        backgroundColor: '#FAFAFA',
      }}
    >
      <Container maxWidth='sm'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            backgroundColor: '#FFFFFF',
            borderRadius: 2,
            p: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <RestaurantIcon sx={{ fontSize: 48, color: '#FF6B35' }} />
          </Box>
          <Box
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#FF6B35',
              mb: 2,
            }}
          >
            맛스타그램
          </Box>

          <TextField
            fullWidth
            label='아이디'
            variant='outlined'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 1 }}
          />

          <TextField
            fullWidth
            label='비밀번호'
            type='password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant='contained'
            size='large'
            onClick={handleLogin}
            sx={{
              backgroundColor: '#FF6B35',
              '&:hover': {
                backgroundColor: '#E85A2A',
              },
              py: 1.5,
              mb: 1,
            }}
          >
            로그인
          </Button>

          <Button
            fullWidth
            variant='outlined'
            size='large'
            onClick={() => navigate('/signup')}
            sx={{
              borderColor: '#FF6B35',
              color: '#FF6B35',
              '&:hover': {
                borderColor: '#E85A2A',
                backgroundColor: '#FFF5F2',
              },
              py: 1.5,
            }}
          >
            회원가입
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
