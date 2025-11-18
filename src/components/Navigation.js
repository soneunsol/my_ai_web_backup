import React from 'react';
import { AppBar, Toolbar, Container, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border-subtle)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Portfolio
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: location.pathname === item.path
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-muted)',
                  borderBottom: location.pathname === item.path
                    ? '2px solid var(--color-primary)'
                    : '2px solid transparent',
                  borderRadius: 0,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'var(--color-primary)',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
