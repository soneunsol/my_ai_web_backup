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
import { supabase } from '../utils/supabase';

/**
 * SignupPage 컴포넌트
 * 사용자 회원가입 페이지
 */
function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  // 비밀번호 규칙 검증
  const validatePassword = (pwd) => {
    if (pwd.length < 6) {
      return '비밀번호는 최소 6자 이상이어야 합니다.';
    }
    if (!/[a-zA-Z]/.test(pwd) || !/[0-9]/.test(pwd)) {
      return '비밀번호는 영문과 숫자를 포함해야 합니다.';
    }
    return null;
  };

  // 아이디 중복 확인
  const handleCheckUsername = async () => {
    if (!username) {
      setError('아이디를 입력해주세요.');
      return;
    }

    try {
      const { data, error: checkError } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (checkError && checkError.code === 'PGRST116') {
        // 데이터가 없음 (사용 가능)
        setUsernameAvailable(true);
        setUsernameChecked(true);
        setSuccess('사용 가능한 아이디입니다.');
        setError('');
      } else if (data) {
        setUsernameAvailable(false);
        setUsernameChecked(true);
        setError('이미 사용 중인 아이디입니다.');
        setSuccess('');
      }
    } catch (err) {
      console.error('Username check error:', err);
      setError('아이디 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameChecked(false);
    setUsernameAvailable(false);
    setError('');
    setSuccess('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 유효성 검사
    if (!username || !password || !nickname) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (!usernameChecked || !usernameAvailable) {
      setError('아이디 중복 확인을 해주세요.');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    const result = await signup(username, password, nickname);
    if (result.success) {
      setSuccess('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error);
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
          {/* 회원가입 제목 */}
          <Typography
            variant='h4'
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 'medium',
            }}
          >
            회원가입
          </Typography>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity='error' sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          {/* 성공 메시지 */}
          {success && (
            <Alert severity='success' sx={{ width: '100%' }}>
              {success}
            </Alert>
          )}

          {/* 회원가입 폼 */}
          <Box
            component='form'
            onSubmit={handleSignup}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* 아이디 입력 + 중복확인 버튼 */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label='아이디'
                variant='outlined'
                fullWidth
                value={username}
                onChange={handleUsernameChange}
                autoComplete='username'
              />
              <Button
                variant='outlined'
                onClick={handleCheckUsername}
                sx={{ minWidth: '100px' }}
              >
                중복확인
              </Button>
            </Box>

            <TextField
              label='비밀번호'
              type='password'
              variant='outlined'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText='6자 이상, 영문과 숫자 포함'
              autoComplete='new-password'
            />

            <TextField
              label='닉네임'
              variant='outlined'
              fullWidth
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              autoComplete='nickname'
            />

            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              sx={{ mt: 2 }}
            >
              회원가입
            </Button>

            <Button
              variant='text'
              size='large'
              fullWidth
              onClick={() => navigate('/login')}
            >
              로그인으로 돌아가기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;
