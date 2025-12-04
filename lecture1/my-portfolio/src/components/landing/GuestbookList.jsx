/**
 * GuestbookList 컴포넌트
 *
 * Props: 없음
 *
 * 주요 기능:
 * - Supabase에서 방명록 데이터 가져오기
 * - 방명록 목록을 카드 형태로 표시
 * - 작성자 이름, 메시지, 날짜, 소속, 이모지 표시
 * - 실시간 업데이트
 *
 * Example usage:
 * <GuestbookList />
 */
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { supabase } from '../../supabaseClient';

function GuestbookList() {
  const [guestbooks, setGuestbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  // 방명록 데이터 가져오기
  const fetchGuestbooks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setGuestbooks(data || []);
    } catch (error) {
      setError('방명록을 불러오는데 실패했습니다.');
      console.error('Error fetching guestbooks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestbooks();

    // 실시간 구독 설정
    const channel = supabase
      .channel('guestbook_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'guestbook'
        },
        (payload) => {
          setGuestbooks((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#CFFF00' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 4 }}>
        {error}
      </Alert>
    );
  }

  if (guestbooks.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 4,
          backgroundColor: '#F8F8F8',
          borderRadius: 2
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: '#999999',
            fontSize: '1rem'
          }}
        >
          아직 방명록이 없습니다. 첫 번째 방명록을 남겨주세요! 🌟
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          fontWeight: 600,
          mb: 3,
          color: '#333333'
        }}
      >
        방명록 목록 ({guestbooks.length})
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {guestbooks.map((guestbook) => (
          <Card
            key={guestbook.id}
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)'
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* 헤더 (이름, 이모지, 날짜) */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  flexWrap: 'wrap',
                  gap: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon sx={{ fontSize: 20, color: '#666666' }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#333333'
                    }}
                  >
                    {guestbook.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      lineHeight: 1
                    }}
                  >
                    {guestbook.emoji}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarTodayIcon sx={{ fontSize: 14, color: '#999999' }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.85rem',
                      color: '#999999'
                    }}
                  >
                    {formatDate(guestbook.created_at)}
                  </Typography>
                </Box>
              </Box>

              {/* 메시지 */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: '0.95rem',
                  color: '#444444',
                  lineHeight: 1.8,
                  mb: 2,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {guestbook.message}
              </Typography>

              {/* 소속 정보 */}
              {guestbook.affiliation && (
                <Chip
                  icon={<BusinessIcon sx={{ fontSize: 16 }} />}
                  label={guestbook.affiliation}
                  size="small"
                  sx={{
                    backgroundColor: '#F5F5F5',
                    color: '#666666',
                    fontSize: '0.85rem',
                    height: '28px',
                    '& .MuiChip-icon': {
                      color: '#666666'
                    }
                  }}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default GuestbookList;
