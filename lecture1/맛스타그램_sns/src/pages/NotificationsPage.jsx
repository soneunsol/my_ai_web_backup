import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/common/TopBar';
import BottomNav from '../components/common/BottomNav';

/**
 * NotificationsPage 컴포넌트
 * 알림 페이지 (목업 - 더미 데이터)
 *
 * Props: 없음
 *
 * Example usage:
 * <NotificationsPage />
 */
function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications] = useState([
    {
      id: 1,
      type: 'like',
      user: {
        name: '김철수',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      message: '님이 회원님의 게시물을 좋아합니다.',
      time: '5분 전',
      isRead: false,
      postImage: 'https://picsum.photos/100/100?random=11',
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: '이영희',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      message: '님이 회원님의 게시물에 댓글을 남겼습니다: "정말 맛있어 보이네요!"',
      time: '15분 전',
      isRead: false,
      postImage: 'https://picsum.photos/100/100?random=12',
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: '박민수',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      message: '님이 회원님을 팔로우하기 시작했습니다.',
      time: '1시간 전',
      isRead: false,
    },
    {
      id: 4,
      type: 'like',
      user: {
        name: '정수진',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      message: '님이 회원님의 게시물을 좋아합니다.',
      time: '2시간 전',
      isRead: true,
      postImage: 'https://picsum.photos/100/100?random=13',
    },
    {
      id: 5,
      type: 'comment',
      user: {
        name: '최영수',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      message: '님이 회원님의 게시물에 댓글을 남겼습니다: "여기 어디예요?"',
      time: '3시간 전',
      isRead: true,
      postImage: 'https://picsum.photos/100/100?random=14',
    },
    {
      id: 6,
      type: 'follow',
      user: {
        name: '강민지',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
      message: '님이 회원님을 팔로우하기 시작했습니다.',
      time: '어제',
      isRead: true,
    },
    {
      id: 7,
      type: 'like',
      user: {
        name: '윤성호',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
      message: '님이 회원님의 게시물을 좋아합니다.',
      time: '어제',
      isRead: true,
      postImage: 'https://picsum.photos/100/100?random=15',
    },
    {
      id: 8,
      type: 'comment',
      user: {
        name: '송하늘',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      message: '님이 회원님의 게시물에 댓글을 남겼습니다: "저도 가보고 싶어요!"',
      time: '2일 전',
      isRead: true,
      postImage: 'https://picsum.photos/100/100?random=16',
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
    case 'like':
      return <FavoriteIcon sx={{ color: 'error.main', fontSize: 20 }} />;
    case 'comment':
      return <ChatBubbleIcon sx={{ color: 'primary.main', fontSize: 20 }} />;
    case 'follow':
      return <PersonAddIcon sx={{ color: 'success.main', fontSize: 20 }} />;
    default:
      return null;
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'follow') {
      alert(`${notification.user.name} 프로필로 이동 (목업)`);
    } else {
      alert('게시물로 이동 (목업)');
    }
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
        maxWidth="md"
        sx={{
          py: { xs: 2, md: 3 },
          px: { xs: 0, md: 3 },
          flex: 1,
          mb: 8,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            px: { xs: 2, md: 0 },
          }}
        >
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            알림
          </Typography>
        </Box>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {notifications.map((notification, index) => (
            <Box key={notification.id}>
              <ListItem
                alignItems="flex-start"
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  cursor: 'pointer',
                  py: 2,
                  px: { xs: 2, md: 2 },
                  backgroundColor: notification.isRead
                    ? 'transparent'
                    : 'action.hover',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
              >
                <ListItemAvatar>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      alt={notification.user.name}
                      src={notification.user.avatar}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -4,
                        right: -4,
                        backgroundColor: 'background.paper',
                        borderRadius: '50%',
                        padding: 0.3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Box>
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: notification.isRead ? 'normal' : 'medium',
                      }}
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        fontWeight="bold"
                      >
                        {notification.user.name}
                      </Typography>
                      {notification.message}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  }
                  sx={{ ml: 2 }}
                />
                {notification.postImage && (
                  <Box
                    component="img"
                    src={notification.postImage}
                    alt="게시물"
                    sx={{
                      width: 48,
                      height: 48,
                      objectFit: 'cover',
                      borderRadius: 1,
                      ml: 2,
                    }}
                  />
                )}
              </ListItem>
              {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      </Container>

      <BottomNav />
    </Box>
  );
}

export default NotificationsPage;
