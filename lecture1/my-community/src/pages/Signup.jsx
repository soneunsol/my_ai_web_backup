import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Chip,
} from '@mui/material';
import { supabase } from '../lib/supabase';

/**
 * Signup 컴포넌트
 * 사용자 회원가입 페이지
 */
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const navigate = useNavigate();

  // 비밀번호 규칙 검증
  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    const hasNumber = /\d/.test(pwd);
    const hasLetter = /[a-zA-Z]/.test(pwd);
    return minLength && hasNumber && hasLetter;
  };

  // 아이디 중복 확인
  const checkUsername = async () => {
    if (!username) {
      setError('아이디를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('username')
        .eq('username', username);

      if (fetchError) {
        setError('중복 확인 중 오류가 발생했습니다.');
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setError('이미 사용 중인 아이디입니다.');
        setUsernameAvailable(false);
      } else {
        setSuccess('사용 가능한 아이디입니다.');
        setUsernameAvailable(true);
        setUsernameChecked(true);
      }
    } catch (err) {
      setError('중복 확인 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 처리
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 아이디 중복 확인 여부 체크
    if (!usernameChecked || !usernameAvailable) {
      setError('아이디 중복 확인을 해주세요.');
      return;
    }

    // 비밀번호 규칙 검증
    if (!validatePassword(password)) {
      setError('비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.');
      return;
    }

    if (!nickname) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase.from('users').insert([
        {
          username,
          password,
          nickname,
        },
      ]);

      if (insertError) {
        setError('회원가입 중 오류가 발생했습니다.');
        setLoading(false);
        return;
      }

      setSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isPasswordValid = validatePassword(password);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        py: { xs: 2, md: 4 },
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
          {/* 회원가입 제목 */}
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 3,
              fontWeight: 'bold',
            }}
          >
            회원가입
          </Typography>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* 성공 메시지 */}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {/* 회원가입 폼 */}
          <Box component="form" onSubmit={handleSignup}>
            {/* 아이디 입력란 */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="아이디"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameChecked(false);
                  setUsernameAvailable(false);
                  setSuccess('');
                }}
                margin="normal"
                required
              />
              <Button
                fullWidth
                variant="outlined"
                onClick={checkUsername}
                disabled={loading || !username}
                sx={{ mt: 1 }}
              >
                중복 확인
              </Button>
            </Box>

            {/* 비밀번호 입력란 */}
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />

            {/* 비밀번호 규칙 표시 */}
            {password && (
              <Box sx={{ mt: 1, mb: 2 }}>
                <Chip
                  label="8자 이상"
                  color={password.length >= 8 ? 'success' : 'default'}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
                <Chip
                  label="영문 포함"
                  color={/[a-zA-Z]/.test(password) ? 'success' : 'default'}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
                <Chip
                  label="숫자 포함"
                  color={/\d/.test(password) ? 'success' : 'default'}
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Box>
            )}

            {/* 닉네임 입력란 */}
            <TextField
              fullWidth
              label="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !isPasswordValid || !usernameAvailable}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? '가입 중...' : '회원가입'}
            </Button>

            <Button
              fullWidth
              variant="text"
              size="large"
              onClick={() => navigate('/')}
            >
              로그인으로 돌아가기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Signup;
