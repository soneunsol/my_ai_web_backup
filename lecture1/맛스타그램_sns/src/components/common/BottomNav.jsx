import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';

/**
 * BottomNav 컴포넌트
 * 하단 네비게이션 바 - 홈, 게시물 작성, 친구 모임, 채팅, 마이페이지
 *
 * Props: 없음 (자체적으로 라우팅 처리)
 *
 * Example usage:
 * <BottomNav />
 */
function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getValue = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 0;
    if (path === '/create') return 1;
    if (path === '/meetup') return 2;
    if (path === '/chat') return 3;
    if (path === '/mypage') return 4;
    return 0;
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
    case 0:
      navigate('/home');
      break;
    case 1:
      navigate('/create');
      break;
    case 2:
      navigate('/meetup');
      break;
    case 3:
      navigate('/chat');
      break;
    case 4:
      navigate('/mypage');
      break;
    default:
      break;
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation value={getValue()} onChange={handleChange} showLabels>
        <BottomNavigationAction label='홈' icon={<HomeIcon />} />
        <BottomNavigationAction label='작성' icon={<AddCircleOutlineIcon />} />
        <BottomNavigationAction label='모임' icon={<PeopleIcon />} />
        <BottomNavigationAction label='채팅' icon={<ChatIcon />} />
        <BottomNavigationAction label='마이' icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
