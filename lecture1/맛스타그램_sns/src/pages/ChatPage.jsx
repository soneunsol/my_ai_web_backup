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
  Badge,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import TopBar from '../components/common/TopBar';
import BottomNav from '../components/common/BottomNav';

/**
 * ChatPage 컴포넌트
 * 채팅 페이지 (목업 - 더미 데이터)
 *
 * Props: 없음
 *
 * Example usage:
 * <ChatPage />
 */
function ChatPage() {
  const [chats] = useState([
    {
      id: 1,
      name: '김철수',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: '오늘 저녁에 뭐 먹을까요?',
      time: '10분 전',
      unread: 3,
      online: true,
      messages: [
        { id: 1, text: '안녕하세요!', isMine: false, time: '10:30' },
        { id: 2, text: '네 안녕하세요', isMine: true, time: '10:31' },
        { id: 3, text: '오늘 저녁에 뭐 먹을까요?', isMine: false, time: '10:32' },
      ],
    },
    {
      id: 2,
      name: '이영희',
      avatar: 'https://i.pravatar.cc/150?img=2',
      lastMessage: '그 맛집 정말 좋았어요!',
      time: '30분 전',
      unread: 1,
      online: true,
      messages: [
        { id: 1, text: '어제 간 그 맛집 어땠어요?', isMine: true, time: '09:15' },
        { id: 2, text: '그 맛집 정말 좋았어요!', isMine: false, time: '09:45' },
      ],
    },
    {
      id: 3,
      name: '박민수',
      avatar: 'https://i.pravatar.cc/150?img=3',
      lastMessage: '사진 감사합니다',
      time: '1시간 전',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: '음식 사진 보내드릴게요', isMine: true, time: '08:20' },
        { id: 2, text: '사진 감사합니다', isMine: false, time: '09:00' },
      ],
    },
    {
      id: 4,
      name: '정수진',
      avatar: 'https://i.pravatar.cc/150?img=4',
      lastMessage: '다음에 또 만나요~',
      time: '2시간 전',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: '오늘 정말 즐거웠어요', isMine: false, time: '08:10' },
        { id: 2, text: '저도요! 다음에 또 만나요~', isMine: true, time: '08:15' },
      ],
    },
    {
      id: 5,
      name: '최영수',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: '음식 사진 보내드렸어요',
      time: '3시간 전',
      unread: 5,
      online: true,
      messages: [
        { id: 1, text: '음식 사진 보내드렸어요', isMine: false, time: '07:30' },
      ],
    },
    {
      id: 6,
      name: '강민지',
      avatar: 'https://i.pravatar.cc/150?img=6',
      lastMessage: '맛있게 드세요!',
      time: '어제',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: '지금 식사하러 가요', isMine: true, time: '어제 12:00' },
        { id: 2, text: '맛있게 드세요!', isMine: false, time: '어제 12:05' },
      ],
    },
    {
      id: 7,
      name: '윤성호',
      avatar: 'https://i.pravatar.cc/150?img=7',
      lastMessage: '좋은 하루 되세요',
      time: '어제',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: '좋은 하루 되세요', isMine: false, time: '어제 09:00' },
      ],
    },
    {
      id: 8,
      name: '송하늘',
      avatar: 'https://i.pravatar.cc/150?img=8',
      lastMessage: '내일 봐요!',
      time: '2일 전',
      unread: 0,
      online: true,
      messages: [
        { id: 1, text: '내일 봐요!', isMine: false, time: '2일 전' },
      ],
    },
  ]);

  const [selectedChat, setSelectedChat] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedChat(null);
    setMessageInput('');
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: selectedChat.messages.length + 1,
      text: messageInput,
      isMine: true,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
    });

    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 2,
            px: { xs: 2, md: 0 },
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          채팅
        </Typography>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {chats.map((chat, index) => (
            <Box key={chat.id}>
              <ListItem
                alignItems="flex-start"
                onClick={() => handleChatClick(chat)}
                sx={{
                  cursor: 'pointer',
                  py: 2,
                  px: { xs: 2, md: 2 },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: chat.online ? '#44b700' : 'transparent',
                        color: chat.online ? '#44b700' : 'transparent',
                        boxShadow: `0 0 0 2px ${
                          chat.online ? '#fff' : 'transparent'
                        }`,
                        '&::after': chat.online
                          ? {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            animation: 'ripple 1.2s infinite ease-in-out',
                            border: '1px solid currentColor',
                            content: '""',
                          }
                          : {},
                      },
                    }}
                  >
                    <Avatar
                      alt={chat.name}
                      src={chat.avatar}
                      sx={{ width: 56, height: 56 }}
                    />
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
                        variant="subtitle1"
                        fontWeight={chat.unread > 0 ? 'bold' : 'medium'}
                        sx={{ flex: 1 }}
                      >
                        {chat.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 2 }}
                      >
                        {chat.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontWeight: chat.unread > 0 ? 'medium' : 'normal',
                        }}
                      >
                        {chat.lastMessage}
                      </Typography>
                      {chat.unread > 0 && (
                        <Badge
                          badgeContent={chat.unread}
                          color="primary"
                          sx={{ ml: 2 }}
                        />
                      )}
                    </Box>
                  }
                  sx={{ ml: 2 }}
                />
              </ListItem>
              {index < chats.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      </Container>

      {/* 채팅방 전체 화면 */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: 'background.default',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handleCloseModal} edge='start'>
              <ArrowBackIcon />
            </IconButton>
            <Avatar src={selectedChat?.avatar} alt={selectedChat?.name} />
            <Typography variant='h6' fontWeight='bold'>
              {selectedChat?.name}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
          {/* 메시지 영역 */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {selectedChat?.messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.isMine ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    backgroundColor: message.isMine ? 'primary.main' : 'background.paper',
                    color: message.isMine ? 'white' : 'text.primary',
                  }}
                >
                  <Typography variant='body1'>{message.text}</Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      display: 'block',
                      mt: 0.5,
                      opacity: 0.7,
                    }}
                  >
                    {message.time}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* 입력 영역 */}
          <Box
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              placeholder='메시지를 입력하세요...'
              variant='outlined'
              size='small'
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <IconButton color='primary' onClick={handleSendMessage} disabled={!messageInput.trim()}>
              <SendIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </Box>
  );
}

export default ChatPage;
