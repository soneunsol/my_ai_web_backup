/**
 * GuestbookForm 컴포넌트
 *
 * Props: 없음
 *
 * 주요 기능:
 * - 방명록 작성 폼 제공
 * - 이름, 메시지, 소속, 이메일, 이모지 입력
 * - Supabase에 데이터 저장
 * - 작성 완료 후 폼 초기화
 *
 * Example usage:
 * <GuestbookForm />
 */
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { supabase } from '../../supabaseClient';

function GuestbookForm() {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    affiliation: '',
    email: ''
  });
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

  const emojis = ['😊', '🎉', '💖', '🌟', '👍', '🔥', '✨'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmojiChange = (event, newEmoji) => {
    if (newEmoji !== null) {
      setSelectedEmoji(newEmoji);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 메시지는 필수
    if (!formData.message.trim()) {
      setAlert({
        show: true,
        type: 'error',
        message: '메시지를 입력해주세요.'
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('guestbook').insert([
        {
          name: formData.name.trim() || '익명',
          message: formData.message.trim(),
          affiliation: formData.affiliation.trim() || null,
          email: formData.email.trim() || null,
          emoji: selectedEmoji
        }
      ]);

      if (error) throw error;

      // 성공 메시지
      setAlert({
        show: true,
        type: 'success',
        message: '방명록이 성공적으로 등록되었습니다! 감사합니다 ✨'
      });

      // 폼 초기화
      setFormData({
        name: '',
        message: '',
        affiliation: '',
        email: ''
      });
      setSelectedEmoji('😊');

      // 3초 후 알림 숨기기
      setTimeout(() => {
        setAlert({ show: false, type: 'success', message: '' });
      }, 3000);
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: '방명록 등록에 실패했습니다. 다시 시도해주세요.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        mb: 4
      }}
    >
      {/* Alert */}
      {alert.show && (
        <Alert
          severity={alert.type}
          onClose={() => setAlert({ show: false, type: 'success', message: '' })}
          sx={{ mb: 3 }}
        >
          {alert.message}
        </Alert>
      )}

      {/* 이름 */}
      <TextField
        fullWidth
        label="이름"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="이름을 입력하세요 (비워두면 익명으로 표시됩니다)"
        sx={{ mb: 2 }}
      />

      {/* 메시지 */}
      <TextField
        fullWidth
        required
        multiline
        rows={4}
        label="메시지"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="따뜻한 메시지를 남겨주세요"
        sx={{ mb: 2 }}
      />

      {/* 소속/직업 */}
      <TextField
        fullWidth
        label="소속/직업 (선택)"
        name="affiliation"
        value={formData.affiliation}
        onChange={handleChange}
        placeholder="예: OO대학교, OO회사"
        sx={{ mb: 2 }}
      />

      {/* 이메일 */}
      <TextField
        fullWidth
        type="email"
        label="이메일 (선택, 비공개)"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="답장을 받고 싶다면 이메일을 입력하세요"
        sx={{ mb: 3 }}
        helperText="이메일은 비공개로 처리됩니다"
      />

      {/* 이모지 선택 */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            mb: 1.5,
            color: '#666666',
            fontWeight: 500
          }}
        >
          기분을 선택해주세요
        </Typography>
        <ToggleButtonGroup
          value={selectedEmoji}
          exclusive
          onChange={handleEmojiChange}
          aria-label="emoji selection"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          {emojis.map((emoji) => (
            <ToggleButton
              key={emoji}
              value={emoji}
              sx={{
                fontSize: '1.8rem',
                padding: '8px 16px',
                border: '2px solid #E8E8E8',
                borderRadius: '8px',
                '&.Mui-selected': {
                  backgroundColor: '#CFFF00',
                  borderColor: '#CFFF00',
                  '&:hover': {
                    backgroundColor: '#E4FF1A'
                  }
                },
                '&:hover': {
                  backgroundColor: '#F5F5F5'
                }
              }}
            >
              {emoji}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          backgroundColor: '#CFFF00',
          color: '#000000',
          fontWeight: 600,
          py: 1.5,
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: '#E4FF1A',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(207, 255, 0, 0.4)'
          },
          '&:disabled': {
            backgroundColor: '#E8E8E8',
            color: '#999999'
          },
          transition: 'all 0.3s ease'
        }}
      >
        {loading ? '등록 중...' : '방명록 남기기'}
      </Button>
    </Box>
  );
}

export default GuestbookForm;
