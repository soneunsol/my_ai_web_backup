import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  AvatarGroup,
  Chip,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import TopBar from '../components/common/TopBar';
import BottomNav from '../components/common/BottomNav';

/**
 * MeetupPage 컴포넌트
 * 친구 모임 페이지 (목업 - 더미 데이터)
 *
 * Props: 없음
 *
 * Example usage:
 * <MeetupPage />
 */
function MeetupPage() {
  const navigate = useNavigate();
  const [meetups] = useState([
    {
      id: 1,
      title: '강남 맛집 탐방',
      description: '강남역 주변 유명 맛집을 함께 돌아봐요!',
      location: '서울시 강남구 강남역',
      date: '2025-12-10',
      time: '18:00',
      members: [
        { id: 1, name: '김철수', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: '이영희', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, name: '박민수', avatar: 'https://i.pravatar.cc/150?img=3' },
      ],
      maxMembers: 6,
      category: '한식',
      image: 'https://picsum.photos/400/300?random=1',
    },
    {
      id: 2,
      title: '홍대 디저트 카페 투어',
      description: '홍대 인기 디저트 카페 3곳을 방문해요',
      location: '서울시 마포구 홍대입구역',
      date: '2025-12-12',
      time: '14:00',
      members: [
        { id: 4, name: '정수진', avatar: 'https://i.pravatar.cc/150?img=4' },
        { id: 5, name: '최영수', avatar: 'https://i.pravatar.cc/150?img=5' },
      ],
      maxMembers: 5,
      category: '디저트',
      image: 'https://picsum.photos/400/300?random=2',
    },
    {
      id: 3,
      title: '이태원 세계 음식 투어',
      description: '다양한 나라의 음식을 맛보러 가요',
      location: '서울시 용산구 이태원역',
      date: '2025-12-15',
      time: '19:00',
      members: [
        { id: 6, name: '강민지', avatar: 'https://i.pravatar.cc/150?img=6' },
        { id: 7, name: '윤성호', avatar: 'https://i.pravatar.cc/150?img=7' },
        { id: 8, name: '송하늘', avatar: 'https://i.pravatar.cc/150?img=8' },
        { id: 9, name: '임바다', avatar: 'https://i.pravatar.cc/150?img=9' },
      ],
      maxMembers: 8,
      category: '세계음식',
      image: 'https://picsum.photos/400/300?random=3',
    },
  ]);

  const handleJoin = (meetupId) => {
    // 채팅방으로 이동
    navigate('/chat');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      <TopBar />

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 3 },
          flex: 1,
          mb: 8,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 3,
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          친구 모임
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {meetups.map((meetup) => (
            <Grid size={{ xs: 12, md: 6 }} key={meetup.id}>
              <Card
                sx={{
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={meetup.image}
                  alt={meetup.title}
                  sx={{
                    height: { xs: 200, md: 250 },
                    objectFit: 'cover',
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {meetup.title}
                    </Typography>
                    <Chip
                      label={meetup.category}
                      color="primary"
                      size="small"
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {meetup.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {meetup.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {meetup.date} {meetup.time}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PeopleIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {meetup.members.length} / {meetup.maxMembers}명
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <AvatarGroup max={4}>
                      {meetup.members.map((member) => (
                        <Avatar
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          sx={{ width: 32, height: 32 }}
                        />
                      ))}
                    </AvatarGroup>

                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleJoin(meetup.id)}
                      disabled={meetup.members.length >= meetup.maxMembers}
                    >
                      참여하기
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <BottomNav />
    </Box>
  );
}

export default MeetupPage;
