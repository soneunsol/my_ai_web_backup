import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../supabaseClient';

/**
 * 회원가입 페이지 컴포넌트
 */
function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      setError('');

      // 입력 유효성 검사
      if (!username || !nickname || !password) {
        setError('모든 필드를 입력해주세요.');
        return;
      }

      // 랜덤 프로필 이미지 URL (랜덤 인물 API)
      const profileImageUrl = `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? 'men' : 'women'
      }/${Math.floor(Math.random() * 99)}.jpg`;

      // Supabase에 사용자 등록
      const { data, error: dbError } = await supabase
        .from('users')
        .insert([
          {
            username,
            nickname,
            password,
            profile_image_url: profileImageUrl,
          },
        ])
        .select();

      if (dbError) {
        if (dbError.code === '23505') {
          setError('이미 존재하는 아이디입니다.');
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

  const handleBack = () => {
    navigate('/');
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
        py: 4,
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
          {/* 뒤로가기 버튼과 타이틀 */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              mb: 2,
            }}
          >
            <IconButton
              onClick={handleBack}
              sx={{
                position: 'absolute',
                left: 0,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                width: '100%',
                textAlign: 'center',
              }}
            >
              회원가입
            </Typography>
          </Box>

          {/* 아이디 입력란 */}
          <TextField
            fullWidth
            label='아이디'
            variant='outlined'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* 닉네임 입력란 */}
          <TextField
            fullWidth
            label='닉네임'
            variant='outlined'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          {/* 비밀번호 입력란 */}
          <TextField
            fullWidth
            label='비밀번호'
            type='password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 에러 메시지 */}
          {error && (
            <Typography color='error' variant='body2'>
              {error}
            </Typography>
          )}

          {/* 회원가입 버튼 */}
          <Button
            fullWidth
            variant='contained'
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

export default Signup;
