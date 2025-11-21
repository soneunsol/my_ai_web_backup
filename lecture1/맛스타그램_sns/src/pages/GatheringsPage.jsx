import { Box, Card, CardContent, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import Layout from '../components/common/Layout';

/**
 * GatheringsPage 컴포넌트 - 친구 모임 페이지 (목업)
 *
 * Props: 없음
 */
function GatheringsPage() {
  const mockGatherings = [
    {
      id: 1,
      name: '강남 맛집 탐방',
      location: '서울시 강남구 역삼동',
      time: '오늘 오후 7시',
      members: 4,
      maxMembers: 6,
    },
    {
      id: 2,
      name: '홍대 카페 투어',
      location: '서울시 마포구 홍대입구',
      time: '내일 오후 2시',
      members: 3,
      maxMembers: 5,
    },
    {
      id: 3,
      name: '이태원 글로벌 푸드',
      location: '서울시 용산구 이태원동',
      time: '이번 주 토요일 오후 6시',
      members: 5,
      maxMembers: 8,
    },
  ];

  return (
    <Layout>
      <Box sx={{ p: 2 }}>
        <Box sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 3 }}>
          주변 모임
        </Box>

        {mockGatherings.map((gathering) => (
          <Card
            key={gathering.id}
            sx={{
              mb: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Box sx={{ fontSize: '1.25rem', fontWeight: 600, mb: 2 }}>
                {gathering.name}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                  color: '#666',
                }}
              >
                <LocationOnIcon sx={{ fontSize: 20, color: '#FF6B35' }} />
                <span>{gathering.location}</span>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                  color: '#666',
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 20, color: '#FF6B35' }} />
                <span>{gathering.time}</span>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                  color: '#666',
                }}
              >
                <PeopleIcon sx={{ fontSize: 20, color: '#FF6B35' }} />
                <span>
                  {gathering.members}/{gathering.maxMembers}명 참가 중
                </span>
              </Box>

              <Button
                fullWidth
                variant='contained'
                sx={{
                  backgroundColor: '#FF6B35',
                  '&:hover': {
                    backgroundColor: '#E85A2A',
                  },
                }}
                onClick={() => alert('모임 참가 기능은 준비 중입니다.')}
              >
                참가하기
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Layout>
  );
}

export default GatheringsPage;
