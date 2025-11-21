import { Box } from '@mui/material';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

/**
 * Layout 컴포넌트 - 전체 레이아웃 구조
 *
 * Props:
 * @param {React.ReactNode} children - 페이지 콘텐츠 [Required]
 * @param {boolean} showTopBar - 상단바 표시 여부 [Optional, 기본값: true]
 * @param {boolean} showBottomNav - 하단 네비게이션 표시 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <Layout><HomePage /></Layout>
 * <Layout showTopBar={false}><LoginPage /></Layout>
 */
function Layout({ children, showTopBar = true, showBottomNav = true }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        paddingTop: showTopBar ? '64px' : 0,
        paddingBottom: showBottomNav ? '70px' : 0,
      }}
    >
      {showTopBar && <TopBar />}
      <Box
        sx={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          minHeight: showTopBar && showBottomNav
            ? 'calc(100vh - 134px)'
            : showTopBar
            ? 'calc(100vh - 64px)'
            : showBottomNav
            ? 'calc(100vh - 70px)'
            : '100vh',
        }}
      >
        {children}
      </Box>
      {showBottomNav && <BottomNav />}
    </Box>
  );
}

export default Layout;
