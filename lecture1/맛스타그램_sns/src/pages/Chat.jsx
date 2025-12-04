import { Box, Container, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Badge } from '@mui/material';

/**
 * 채팅 페이지 (목업)
 */
function Chat() {
  // 목업 채팅방 데이터
  const mockChatRooms = [
    {
      id: 1,
      name: '강남 맛집 투어',
      participants: 6,
      lastMessage: '오늘 저녁 6시에 만나요!',
      lastMessageTime: '5분 전',
      unread: 2,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: '분식 러버들 모여라',
      participants: 4,
      lastMessage: '떡볶이 맛집 찾았어요',
      lastMessageTime: '1시간 전',
      unread: 0,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 3,
      name: '카페 투어 같이 해요',
      participants: 8,
      lastMessage: '다음 주 토요일 어때요?',
      lastMessageTime: '2시간 전',
      unread: 5,
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      id: 4,
      name: '일식 좋아하시는 분',
      participants: 5,
      lastMessage: '초밥 먹으러 가요~',
      lastMessageTime: '1일 전',
      unread: 0,
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      id: 5,
      name: '한식 덕후들',
      participants: 7,
      lastMessage: '삼겹살집 추천해주세요',
      lastMessageTime: '2일 전',
      unread: 1,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
  ];

  const handleChatRoomClick = (chatRoom) => {
    alert(`"${chatRoom.name}" 채팅방 (${chatRoom.participants}명)`);
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
            mb: 3,
            textAlign: 'center',
          }}
        >
          채팅
        </Typography>

        {/* 채팅방 목록 */}
        <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
          {mockChatRooms.map((chatRoom, index) => (
            <ListItem
              key={chatRoom.id}
              onClick={() => handleChatRoomClick(chatRoom)}
              sx={{
                cursor: 'pointer',
                borderBottom:
                  index < mockChatRooms.length - 1
                    ? '1px solid'
                    : 'none',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                py: 2,
              }}
            >
              <ListItemAvatar>
                <Badge
                  badgeContent={chatRoom.unread}
                  color='primary'
                  overlap='circular'
                >
                  <Avatar src={chatRoom.avatar} />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      sx={{ fontWeight: chatRoom.unread > 0 ? 'bold' : 'normal' }}
                    >
                      {chatRoom.name}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {chatRoom.lastMessageTime}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        mb: 0.5,
                      }}
                    >
                      {chatRoom.lastMessage}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      참가자 {chatRoom.participants}명
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default Chat;
