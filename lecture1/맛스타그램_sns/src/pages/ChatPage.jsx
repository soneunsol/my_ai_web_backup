import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import Layout from '../components/common/Layout';

/**
 * ChatPage 컴포넌트 - 채팅 페이지 (목업)
 *
 * Props: 없음
 */
function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [message, setMessage] = useState('');

  const mockChatRooms = [
    {
      id: 1,
      name: '강남 맛집 탐방',
      participants: 4,
      lastMessage: '이따 봐요!',
      type: 'group',
    },
    {
      id: 2,
      name: '김민수',
      participants: 2,
      lastMessage: '사진 너무 예쁘네요!',
      type: '1:1',
    },
    {
      id: 3,
      name: '홍대 카페 투어',
      participants: 5,
      lastMessage: '다음주에 만나요',
      type: 'group',
    },
  ];

  const mockMessages = [
    {
      id: 1,
      sender: '김민수',
      content: '안녕하세요!',
      isMine: false,
      time: '오후 2:30',
    },
    {
      id: 2,
      sender: '나',
      content: '안녕하세요! 반가워요',
      isMine: true,
      time: '오후 2:31',
    },
    {
      id: 3,
      sender: '김민수',
      content: '사진 너무 예쁘네요!',
      isMine: false,
      time: '오후 2:32',
    },
    {
      id: 4,
      sender: '나',
      content: '감사합니다!',
      isMine: true,
      time: '오후 2:33',
    },
  ];

  if (selectedRoom) {
    return (
      <Layout showBottomNav={false}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 64px)',
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid #EFEFEF',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <IconButton onClick={() => setSelectedRoom(null)}>
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ fontSize: '1.125rem', fontWeight: 600 }}>
              {selectedRoom.name}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {mockMessages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.isMine ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    backgroundColor: msg.isMine ? '#FF6B35' : '#F0F0F0',
                    color: msg.isMine ? '#FFFFFF' : '#333333',
                  }}
                >
                  <Box>{msg.content}</Box>
                  <Box
                    sx={{
                      fontSize: '0.75rem',
                      mt: 0.5,
                      opacity: 0.7,
                    }}
                  >
                    {msg.time}
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              p: 2,
              borderTop: '1px solid #EFEFEF',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              placeholder='메시지를 입력하세요...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              size='small'
            />
            <IconButton
              onClick={() => {
                if (message.trim()) {
                  alert('메시지 전송 기능은 준비 중입니다.');
                  setMessage('');
                }
              }}
              sx={{ color: '#FF6B35' }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 2 }}>
        <Box sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 3 }}>
          채팅
        </Box>

        <List>
          {mockChatRooms.map((room) => (
            <ListItem
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              sx={{
                cursor: 'pointer',
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#FF6B35' }}>
                  {room.name[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>{room.name}</span>
                    <span style={{ fontSize: '0.875rem', color: '#999' }}>
                      {room.participants}명
                    </span>
                  </Box>
                }
                secondary={room.lastMessage}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
}

export default ChatPage;
