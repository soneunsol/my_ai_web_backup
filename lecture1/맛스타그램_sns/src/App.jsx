import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import MyPage from './pages/MyPage';
import MeetupPage from './pages/MeetupPage';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationsPage';
import TopBar from './components/common/TopBar';
import BottomNav from './components/common/BottomNav';

function App() {
  const routesWithNav = ['/home', '/create', '/mypage', '/meetup', '/chat'];
  const showNav = routesWithNav.some((route) =>
    window.location.pathname.startsWith(route)
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          {showNav && <TopBar />}

          <Box sx={{ pb: showNav ? 8 : 0 }}>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/create' element={<CreatePostPage />} />
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/meetup' element={<MeetupPage />} />
              <Route path='/chat' element={<ChatPage />} />
              <Route path='/notifications' element={<NotificationsPage />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </Box>

          {showNav && <BottomNav />}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
