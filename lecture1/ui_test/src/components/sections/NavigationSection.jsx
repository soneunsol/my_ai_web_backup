import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

/**
 * NavigationSection 컴포넌트
 *
 * MUI AppBar와 Toolbar를 사용한 네비게이션 바
 * - 데스크톱: 일반 메뉴 버튼
 * - 모바일: 햄버거 메뉴 (Drawer)
 * - 메뉴: 홈, 소개, 서비스, 연락처
 * - 클릭 시 메뉴명 알림
 */
function NavigationSection() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = ['홈', '소개', '서비스', '연락처'];

  const handleMenuClick = (menu) => {
    alert(`${menu} 메뉴가 클릭되었습니다!`);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: 1,
      p: { xs: 3, md: 4 }
    }}>
      {/* 섹션 제목 */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        Navigation Components (AppBar & Toolbar)
      </Typography>

      {/* 설명 */}
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        데스크톱에서는 메뉴가 가로로 표시되고, 모바일에서는 햄버거 메뉴로 전환됩니다.
      </Typography>

      {/* Navigation Bar */}
      <Box sx={{ position: 'relative', minHeight: '64px' }}>
        <AppBar position="static" sx={{ borderRadius: 1 }}>
          <Toolbar>
            {/* 로고/타이틀 */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              My Website
            </Typography>

            {/* 데스크톱 메뉴 */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item}
                    color="inherit"
                    onClick={() => handleMenuClick(item)}
                    sx={{
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            )}

            {/* 모바일 햄버거 메뉴 버튼 */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>

        {/* 모바일 Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250
            }
          }}
        >
          <Box sx={{ pt: 2 }}>
            <Typography
              variant="h6"
              sx={{
                px: 2,
                pb: 2,
                fontWeight: 'bold',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              메뉴
            </Typography>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick(item)}>
                    <ListItemText
                      primary={item}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontWeight: 500
                        }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>

      {/* 추가 설명 */}
      <Box sx={{
        mt: 3,
        p: 2,
        bgcolor: '#f5f5f5',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          💡 <strong>Tip:</strong> 브라우저 창 크기를 조절하여 반응형 메뉴를 확인해보세요!
          {isMobile ? ' (현재: 모바일 모드)' : ' (현재: 데스크톱 모드)'}
        </Typography>
      </Box>
    </Box>
  );
}

export default NavigationSection;
