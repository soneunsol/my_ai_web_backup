/**
 * LoadingIndicator 컴포넌트 - 로딩 상태 표시
 *
 * Props:
 * @param {string} message - 로딩 메시지 [Optional, 기본값: '로딩 중...']
 * @param {string} size - 크기 (small, medium, large) [Optional, 기본값: 'medium']
 *
 * Example usage:
 * <LoadingIndicator message="데이터를 불러오는 중..." size="large" />
 */
import { memo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingIndicator = memo(function LoadingIndicator({ message = '로딩 중...', size = 'medium' }) {
  const sizeMap = {
    small: 30,
    medium: 50,
    large: 70
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 3
      }}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CircularProgress
          size={sizeMap[size]}
          sx={{
            color: '#C4A1FF',
            filter: 'drop-shadow(0 0 10px rgba(196, 161, 255, 0.6))'
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            color: '#E0D4FF',
            textAlign: 'center'
          }}
        >
          {message}
        </Typography>
      </motion.div>
    </Box>
  );
});

export default LoadingIndicator;
