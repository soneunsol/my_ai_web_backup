/**
 * Navigation 컴포넌트
 *
 * Props: 없음
 *
 * 주요 기능:
 * - Home, About Me, Projects 페이지 간 네비게이션 제공
 * - 네온 옐로우 컬러를 활용한 모던한 디자인
 * - 반응형 레이아웃 지원
 */
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Me', path: '/about' },
    { label: 'Projects', path: '/projects' }
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#000000',
        boxShadow: 'none',
        borderBottom: '1px solid #333333'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: '#CFFF00',
            fontWeight: 700,
            letterSpacing: 1
          }}
        >
          Portfolio
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#CFFF00' : '#FFFFFF',
                fontWeight: location.pathname === item.path ? 600 : 400,
                '&:hover': {
                  color: '#E4FF1A',
                  backgroundColor: 'rgba(207, 255, 0, 0.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
