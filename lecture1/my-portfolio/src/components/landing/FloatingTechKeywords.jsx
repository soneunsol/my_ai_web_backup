/**
 * FloatingTechKeywords 컴포넌트 - 떠다니는 기술 키워드 배경
 *
 * Props: 없음
 *
 * 주요 기능:
 * - Hero 섹션 배경에 기술 키워드 표시
 * - 무한 애니메이션 효과
 * - 반응형 레이아웃
 * - 성능 최적화 (memo)
 *
 * Example usage:
 * <FloatingTechKeywords />
 */
import { memo } from 'react';
import { Box } from '@mui/material';

const FloatingTechKeywords = memo(function FloatingTechKeywords() {
  const keywords = [
    { text: 'React', x: '10%', y: '20%', delay: 0, duration: 20 },
    { text: 'JavaScript', x: '80%', y: '15%', delay: 2, duration: 25 },
    { text: 'HTML5', x: '15%', y: '70%', delay: 4, duration: 22 },
    { text: 'CSS3', x: '85%', y: '60%', delay: 1, duration: 24 },
    { text: 'MUI', x: '5%', y: '45%', delay: 3, duration: 23 },
    { text: 'Figma', x: '90%', y: '35%', delay: 5, duration: 21 },
    { text: 'Node.js', x: '20%', y: '85%', delay: 2.5, duration: 26 },
    { text: 'AI', x: '75%', y: '80%', delay: 1.5, duration: 19 },
    { text: 'const', x: '30%', y: '10%', delay: 4.5, duration: 27 },
    { text: 'async', x: '60%', y: '25%', delay: 3.5, duration: 20 },
    { text: 'useState', x: '40%', y: '90%', delay: 0.5, duration: 24 },
    { text: 'useEffect', x: '95%', y: '50%', delay: 2.8, duration: 22 }
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 0.15,
        zIndex: 0
      }}
    >
      {keywords.map((keyword, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: keyword.x,
            top: keyword.y,
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            fontWeight: 700,
            fontFamily: '"Fira Code", "Courier New", monospace',
            color: '#C4A1FF',
            textShadow: '0 0 10px rgba(196, 161, 255, 0.5)',
            animation: `float${index % 3} ${keyword.duration}s ease-in-out infinite`,
            animationDelay: `${keyword.delay}s`,
            '@keyframes float0': {
              '0%, 100%': {
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 0.15
              },
              '50%': {
                transform: 'translate(30px, -30px) rotate(5deg)',
                opacity: 0.3
              }
            },
            '@keyframes float1': {
              '0%, 100%': {
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 0.2
              },
              '50%': {
                transform: 'translate(-40px, 40px) rotate(-5deg)',
                opacity: 0.35
              }
            },
            '@keyframes float2': {
              '0%, 100%': {
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 0.18
              },
              '50%': {
                transform: 'translate(20px, 50px) rotate(3deg)',
                opacity: 0.32
              }
            }
          }}
        >
          {keyword.text}
        </Box>
      ))}

      {/* 기하학적 도형들 */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: { xs: '100px', md: '150px' },
          height: { xs: '100px', md: '150px' },
          border: '3px solid rgba(196, 161, 255, 0.2)',
          borderRadius: '20px',
          transform: 'rotate(45deg)',
          animation: 'rotate 30s linear infinite',
          '@keyframes rotate': {
            from: { transform: 'rotate(45deg)' },
            to: { transform: 'rotate(405deg)' }
          }
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: { xs: '80px', md: '120px' },
          height: { xs: '80px', md: '120px' },
          border: '3px solid rgba(168, 216, 255, 0.2)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              transform: 'scale(1)',
              opacity: 0.2
            },
            '50%': {
              transform: 'scale(1.2)',
              opacity: 0.35
            }
          }
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: 0,
          height: 0,
          borderLeft: { xs: '50px solid transparent', md: '70px solid transparent' },
          borderRight: { xs: '50px solid transparent', md: '70px solid transparent' },
          borderBottom: { xs: '100px solid rgba(255, 196, 232, 0.15)', md: '140px solid rgba(255, 196, 232, 0.15)' },
          animation: 'bounce 5s ease-in-out infinite',
          '@keyframes bounce': {
            '0%, 100%': {
              transform: 'translateY(0px)'
            },
            '50%': {
              transform: 'translateY(-30px)'
            }
          }
        }}
      />
    </Box>
  );
});

export default FloatingTechKeywords;
