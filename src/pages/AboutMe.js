import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';

const AboutMe = () => {
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
              About Me
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'var(--color-text-secondary)',
                lineHeight: 1.8,
                textAlign: 'center',
              }}
            >
              About Me 페이지가 개발될 공간입니다.
              <br />
              상세한 자기소개가 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AboutMe;
