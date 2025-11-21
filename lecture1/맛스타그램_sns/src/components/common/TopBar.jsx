import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';

/**
 * TopBar 컴포넌트 - 앱 상단 바
 *
 * Props: 없음
 */
function TopBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <RestaurantIcon sx={{ color: '#FF6B35', fontSize: 32 }} />
          <Box
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#FF6B35',
            }}
          >
            맛스타그램
          </Box>
        </Box>

        <IconButton
          onClick={() => navigate('/notifications')}
          sx={{ color: '#FF6B35' }}
        >
          <NotificationsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
