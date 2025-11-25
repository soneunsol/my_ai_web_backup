import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid';

/**
 * MenuSection 컴포넌트
 *
 * MUI Menu 컴포넌트를 사용한 드롭다운 메뉴
 * - 버튼 클릭으로 메뉴 열기/닫기
 * - MenuItem 3-4개
 * - 메뉴 아이템 클릭 시 알림
 */
function MenuSection() {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  // 기본 메뉴 1
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleMenuItemClick1 = (option) => {
    alert(`${option} 메뉴가 선택되었습니다!`);
    setSelectedOption(option);
    handleClose1();
  };

  // 아이콘 메뉴 2
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleMenuItemClick2 = (option) => {
    alert(`${option} 메뉴가 선택되었습니다!`);
    setSelectedOption(option);
    handleClose2();
  };

  // 위치 설정 메뉴 3
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleMenuItemClick3 = (option) => {
    alert(`${option} 메뉴가 선택되었습니다!`);
    setSelectedOption(option);
    handleClose3();
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
        Menu Components
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        버튼을 클릭하여 드롭다운 메뉴를 열어보세요.
      </Typography>

      <Grid container spacing={3}>
        {/* 기본 메뉴 */}
        <Grid size={{ xs: 12, md: 4 }}>
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
              기본 메뉴
            </Typography>
            <Button
              variant="contained"
              onClick={handleClick1}
            >
              메뉴 열기
            </Button>
            <Menu
              anchorEl={anchorEl1}
              open={open1}
              onClose={handleClose1}
            >
              <MenuItem onClick={() => handleMenuItemClick1('홈')}>홈</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick1('프로필')}>프로필</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick1('설정')}>설정</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick1('로그아웃')}>로그아웃</MenuItem>
            </Menu>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              간단한 텍스트 메뉴
            </Typography>
          </Box>
        </Grid>

        {/* 아이콘이 있는 메뉴 */}
        <Grid size={{ xs: 12, md: 4 }}>
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
              아이콘 메뉴
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClick2}
            >
              메뉴 열기
            </Button>
            <Menu
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose2}
            >
              <MenuItem onClick={() => handleMenuItemClick2('프로필')}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>프로필</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick2('설정')}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>설정</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleMenuItemClick2('정보')}>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>정보</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick2('로그아웃')}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>로그아웃</ListItemText>
              </MenuItem>
            </Menu>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              아이콘과 Divider 포함
            </Typography>
          </Box>
        </Grid>

        {/* 아이콘 버튼 메뉴 */}
        <Grid size={{ xs: 12, md: 4 }}>
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
              아이콘 버튼 메뉴
            </Typography>
            <IconButton
              onClick={handleClick3}
              sx={{
                bgcolor: 'success.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'success.dark'
                }
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl3}
              open={open3}
              onClose={handleClose3}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => handleMenuItemClick3('수정')}>수정</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick3('복사')}>복사</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick3('공유')}>공유</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleMenuItemClick3('삭제')} sx={{ color: 'error.main' }}>
                삭제
              </MenuItem>
            </Menu>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              위치 조정 및 색상 변경
            </Typography>
          </Box>
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
          {selectedOption || '(선택 안 함)'}
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
          💡 <strong>Menu 컴포넌트 속성:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>anchorEl</strong>: 메뉴가 나타날 기준 요소
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>open</strong>: 메뉴 열림/닫힘 상태 (Boolean)
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>onClose</strong>: 메뉴 닫기 핸들러
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>anchorOrigin & transformOrigin</strong>: 메뉴 위치 조정
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>ListItemIcon & ListItemText</strong>: 아이콘과 텍스트 표시
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Divider</strong>: 메뉴 항목 구분선
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MenuSection;
