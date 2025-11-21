import { useState } from 'react';
import { Box, TextField, Button, Container, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

/**
 * SignupPage 컴포넌트 - 회원가입 페이지
 *
 * Props: 없음
 */
function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!username || !nickname || !password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const profileImageUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            username,
            nickname,
            password,
            profile_image_url: profileImageUrl,
          },
        ])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          alert('이미 존재하는 아이디입니다.');
        } else {
          alert('회원가입 실패: ' + error.message);
        }
        return;
      }

      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('회원가입 중 오류가 발생했습니다.');
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
            gap: 3,
            backgroundColor: '#FFFFFF',
            borderRadius: 2,
            p: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              color: '#666',
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box
            sx={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#FF6B35',
              textAlign: 'center',
              mt: 4,
              mb: 2,
            }}
          >
            회원가입
          </Box>

          <TextField
            fullWidth
            label='아이디'
            variant='outlined'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            label='닉네임'
            variant='outlined'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <TextField
            fullWidth
            label='비밀번호'
            type='password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant='contained'
            size='large'
            onClick={handleSignup}
            sx={{
              backgroundColor: '#FF6B35',
              '&:hover': {
                backgroundColor: '#E85A2A',
              },
              py: 1.5,
              mt: 2,
            }}
          >
            회원가입
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;
