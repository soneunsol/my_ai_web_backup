import { BottomNavigation, BottomNavigationAction, Paper, Fab, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * BottomNav 컴포넌트 - 하단 네비게이션 바
 *
 * Props: 없음
 */
function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const pathToValue = {
      '/': 0,
      '/feed': 0,
      '/gatherings': 1,
      '/chat': 2,
      '/mypage': 3,
    };
    setValue(pathToValue[location.pathname] ?? 0);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const routes = ['/feed', '/gatherings', '/chat', '/mypage'];
    navigate(routes[newValue]);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
      elevation={3}
    >
      <Box sx={{ position: 'relative' }}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          sx={{
            height: 70,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 'auto',
              padding: '6px 12px',
            },
          }}
        >
          <BottomNavigationAction
            label='홈'
            icon={<HomeIcon />}
            sx={{ color: value === 0 ? '#FF6B35' : '#999' }}
          />
          <BottomNavigationAction
            label='모임'
            icon={<LocalCafeIcon />}
            sx={{ color: value === 1 ? '#FF6B35' : '#999' }}
          />
          <Box sx={{ minWidth: 80 }} />
          <BottomNavigationAction
            label='채팅'
            icon={<ChatIcon />}
            sx={{ color: value === 2 ? '#FF6B35' : '#999' }}
          />
          <BottomNavigationAction
            label='마이'
            icon={<PersonIcon />}
            sx={{ color: value === 3 ? '#FF6B35' : '#999' }}
          />
        </BottomNavigation>

        <Fab
          color='primary'
          onClick={() => navigate('/create-post')}
          sx={{
            position: 'absolute',
            top: -28,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#FF6B35',
            '&:hover': {
              backgroundColor: '#E85A2A',
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Paper>
  );
}

export default BottomNav;
