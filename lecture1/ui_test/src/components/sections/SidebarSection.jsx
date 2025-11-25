import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

/**
 * SidebarSection 컴포넌트
 *
 * MUI Drawer 컴포넌트를 사용한 사이드바
 * - 토글 버튼으로 열기/닫기
 * - List와 ListItem으로 메뉴 구성
 * - 사이드바 메뉴 클릭 기능
 */
function SidebarSection() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');

  // 왼쪽 사이드바
  const toggleLeftDrawer = (open) => {
    setLeftOpen(open);
  };

  // 오른쪽 사이드바
  const toggleRightDrawer = (open) => {
    setRightOpen(open);
  };

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu) => {
    alert(`${menu} 메뉴가 클릭되었습니다!`);
    setSelectedMenu(menu);
    setLeftOpen(false);
    setRightOpen(false);
  };

  // 왼쪽 사이드바 콘텐츠
  const leftDrawerContent = () => (
    <Box
      sx={{ width: 280 }}
      role="presentation"
    >
      {/* 헤더 */}
      <Box sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'primary.main',
        color: 'white'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          메뉴
        </Typography>
        <IconButton
          onClick={() => toggleLeftDrawer(false)}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* 메뉴 리스트 */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick('홈')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="홈" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick('프로필')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="프로필" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick('메일')}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="메일" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick('설정')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="설정" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick('정보')}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="정보" />
          </ListItemButton>
        </ListItem>
      </List>

      {/* 푸터 */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        p: 2,
        bgcolor: '#f5f5f5',
        borderTop: '1px solid #ddd'
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          © 2024 UI Test
        </Typography>
      </Box>
    </Box>
  );

  // 오른쪽 사이드바 콘텐츠
  const rightDrawerContent = () => (
    <Box
      sx={{ width: 280 }}
      role="presentation"
    >
      {/* 헤더 */}
      <Box sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'secondary.main',
        color: 'white'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          알림
        </Typography>
        <IconButton
          onClick={() => toggleRightDrawer(false)}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* 알림 리스트 */}
      <List>
        <ListItem>
          <ListItemText
            primary="새로운 메시지"
            secondary="5분 전"
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="업데이트 완료"
            secondary="1시간 전"
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="새 댓글"
            secondary="3시간 전"
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="시스템 알림"
            secondary="어제"
          />
        </ListItem>
      </List>
    </Box>
  );

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
        Sidebar Components (Drawer)
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        버튼을 클릭하여 사이드바를 열어보세요.
      </Typography>

      <Grid container spacing={3}>
        {/* 왼쪽 사이드바 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              왼쪽 사이드바
            </Typography>
            <Button
              variant="contained"
              startIcon={<MenuIcon />}
              onClick={() => toggleLeftDrawer(true)}
            >
              메뉴 열기
            </Button>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              왼쪽에서 슬라이드로 열리는 사이드바
            </Typography>
          </Box>

          {/* 왼쪽 Drawer */}
          <Drawer
            anchor="left"
            open={leftOpen}
            onClose={() => toggleLeftDrawer(false)}
          >
            {leftDrawerContent()}
          </Drawer>
        </Grid>

        {/* 오른쪽 사이드바 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{
            p: 3,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              오른쪽 사이드바
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<MenuIcon />}
              onClick={() => toggleRightDrawer(true)}
            >
              알림 열기
            </Button>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              오른쪽에서 슬라이드로 열리는 사이드바
            </Typography>
          </Box>

          {/* 오른쪽 Drawer */}
          <Drawer
            anchor="right"
            open={rightOpen}
            onClose={() => toggleRightDrawer(false)}
          >
            {rightDrawerContent()}
          </Drawer>
        </Grid>
      </Grid>

      {/* 선택된 메뉴 표시 */}
      <Box sx={{
        mt: 3,
        p: 2,
        bgcolor: '#f5f5f5',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>마지막으로 선택한 메뉴:</strong>
        </Typography>
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          {selectedMenu || '(선택 안 함)'}
        </Typography>
      </Box>

      {/* 추가 설명 */}
      <Box sx={{
        mt: 3,
        p: 2,
        bgcolor: '#e3f2fd',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          💡 <strong>Drawer 컴포넌트 속성:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>anchor</strong>: 사이드바 위치 ("left" | "right" | "top" | "bottom")
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>open</strong>: 열림/닫힘 상태 (Boolean)
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>onClose</strong>: 닫기 핸들러 (배경 클릭 시 호출)
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>List & ListItem</strong>: 메뉴 항목 구성
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>ListItemButton</strong>: 클릭 가능한 메뉴 항목
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SidebarSection;
