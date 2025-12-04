import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

/**
 * TopBar 컴포넌트
 * 상단 네비게이션 바 (로고 + 알림 아이콘)
 *
 * Props:
 * @param {function} onNotificationClick - 알림 아이콘 클릭 핸들러 [Optional]
 * @param {string} title - 앱 타이틀 [Optional, 기본값: '맛스타그램']
 *
 * Example usage:
 * <TopBar onNotificationClick={handleNotification} />
 */
function TopBar({ onNotificationClick, title = '맛스타그램' }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNotificationClick = () => {
    if (onNotificationClick) {
      onNotificationClick();
    } else {
      navigate('/notifications');
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
        <Box
          onClick={handleLogoClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: 'primary.main',
              letterSpacing: '-0.5px',
            }}
          >
            {title}
          </Typography>
        </Box>

        <IconButton
          onClick={handleNotificationClick}
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <NotificationsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
