import { Box, Container, Typography, Card, CardContent, Button, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

/**
 * 주변 친구/모임 공유 페이지 (목업)
 */
function Nearby() {
  // 목업 데이터
  const mockMeetings = [
    {
      id: 1,
      name: '강남 맛집 투어',
      location: '강남역 2번 출구',
      time: '오늘 오후 6시',
      currentMembers: 3,
      maxMembers: 6,
      distance: '0.5km',
    },
    {
      id: 2,
      name: '분식 러버들 모여라',
      location: '홍대입구역 근처',
      time: '내일 오후 7시',
      currentMembers: 2,
      maxMembers: 4,
      distance: '1.2km',
    },
    {
      id: 3,
      name: '카페 투어 같이 해요',
      location: '신촌 카페거리',
      time: '이번 주 토요일',
      currentMembers: 5,
      maxMembers: 8,
      distance: '2.1km',
    },
    {
      id: 4,
      name: '일식 좋아하시는 분',
      location: '이태원역 4번 출구',
      time: '이번 주 일요일',
      currentMembers: 4,
      maxMembers: 5,
      distance: '3.5km',
    },
  ];

  const handleJoin = (meeting) => {
    alert(`"${meeting.name}" 모임에 참가 신청되었습니다!`);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        pb: 8,
      }}
    >
      <Container maxWidth='sm' sx={{ pt: 2 }}>
        <Typography
          variant='h5'
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 1,
            textAlign: 'center',
          }}
        >
          주변 모임
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mb: 3, textAlign: 'center' }}
        >
          가까운 곳에서 함께 맛집을 즐길 친구를 찾아보세요
        </Typography>

        {/* 모임 카드 목록 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mockMeetings.map((meeting) => (
            <Card
              key={meeting.id}
              sx={{
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{ fontWeight: 'bold', flex: 1 }}
                  >
                    {meeting.name}
                  </Typography>
                  <Chip
                    label={meeting.distance}
                    size='small'
                    color='primary'
                    variant='outlined'
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <LocationOnIcon fontSize='small' color='action' />
                  <Typography variant='body2' color='text.secondary'>
                    {meeting.location}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <AccessTimeIcon fontSize='small' color='action' />
                  <Typography variant='body2' color='text.secondary'>
                    {meeting.time}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PeopleIcon fontSize='small' color='action' />
                    <Typography variant='body2' color='text.secondary'>
                      {meeting.currentMembers}/{meeting.maxMembers}명
                    </Typography>
                  </Box>

                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => handleJoin(meeting)}
                    disabled={meeting.currentMembers >= meeting.maxMembers}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {meeting.currentMembers >= meeting.maxMembers
                      ? '마감'
                      : '참가하기'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Nearby;
