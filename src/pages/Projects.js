import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';

const Projects = () => {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', py: 8 }}>
      <Container maxWidth="md">
        <Card
          sx={{
            backgroundColor: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: 'var(--shadow-xl)',
            minHeight: '400px',
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                mb: 4,
              }}
            >
              Projects
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'var(--color-text-secondary)',
                lineHeight: 1.8,
                textAlign: 'center',
              }}
            >
              Projects 페이지가 개발될 공간입니다.
              <br />
              포트폴리오 작품들이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Projects;
