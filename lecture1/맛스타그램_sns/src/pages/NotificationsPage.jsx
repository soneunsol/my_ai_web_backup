import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Layout from '../components/common/Layout';

/**
 * NotificationsPage 컴포넌트 - 알림 페이지 (목업)
 *
 * Props: 없음
 */
function NotificationsPage() {
  const mockNotifications = [
    {
      id: 1,
      type: 'like',
      user: '김민수',
      content: '회원님의 게시물을 좋아합니다.',
      time: '5분 전',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    },
    {
      id: 2,
      type: 'comment',
      user: '이영희',
      content: '회원님의 게시물에 댓글을 남겼습니다: "맛있어 보이네요!"',
      time: '1시간 전',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    },
    {
      id: 3,
      type: 'follow',
      user: '박철수',
      content: '회원님을 팔로우하기 시작했습니다.',
      time: '3시간 전',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
    },
    {
      id: 4,
      type: 'like',
      user: '최지우',
      content: '회원님의 게시물을 좋아합니다.',
      time: '1일 전',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <FavoriteIcon sx={{ color: '#FF6B35' }} />;
      case 'comment':
        return <CommentIcon sx={{ color: '#FF6B35' }} />;
      case 'follow':
        return <PersonAddIcon sx={{ color: '#FF6B35' }} />;
      default:
        return null;
    }
  };

  return (
    <Layout showBottomNav={false}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 3 }}>
          알림
        </Box>

        <List>
          {mockNotifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: '#FAFAFA',
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar src={notification.avatar} alt={notification.user} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getIcon(notification.type)}
                    <span style={{ fontWeight: 600 }}>{notification.user}</span>
                  </Box>
                }
                secondary={
                  <Box>
                    <Box>{notification.content}</Box>
                    <Box sx={{ color: '#999', fontSize: '0.875rem', mt: 0.5 }}>
                      {notification.time}
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
}

export default NotificationsPage;
