import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { PortfolioProvider } from './contexts/PortfolioContext';
import Navigation from './components/common/Navigation';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navigation />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
