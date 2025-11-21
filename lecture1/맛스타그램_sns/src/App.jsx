import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';
import CreatePostPage from './pages/CreatePostPage';
import MyPage from './pages/MyPage';
import GatheringsPage from './pages/GatheringsPage';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/create-post' element={<CreatePostPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/gatherings' element={<GatheringsPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
