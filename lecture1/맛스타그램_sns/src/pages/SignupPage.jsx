import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../supabaseClient';

/**
 * SignupPage 컴포넌트
 * 
 * 회원가입 페이지 - 아이디, 닉네임, 비밀번호로 회원가입합니다.
 */
function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      setError('');

      if (!username || !nickname || !password) {
        setError('모든 필드를 입력해주세요.');
        return;
      }

      const randomProfileId = Math.floor(Math.random() * 70);
      const profileImageUrl = `https://randomuser.me/api/portraits/lego/${randomProfileId}.jpg`;

      const { error: signupError } = await supabase
        .from('users')
        .insert([
          { 
            username, 
            nickname, 
            password,
            profile_image_url: profileImageUrl
          }
        ]);

      if (signupError) {
        if (signupError.code === '23505') {
          setError('이미 사용 중인 아이디입니다.');
        } else {
          setError('회원가입 중 오류가 발생했습니다.');
        }
        return;
      }

      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
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
      bgcolor: 'background.default',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3
        }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ alignSelf: 'flex-start' }}
          >
            뒤로 가기
          </Button>

          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            textAlign: 'center'
          }}>
            회원가입
          </Typography>

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
              label="닉네임"
              variant="outlined"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleSignup}
              sx={{ mt: 2 }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;
