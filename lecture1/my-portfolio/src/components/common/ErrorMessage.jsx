/**
 * ErrorMessage 컴포넌트 - 에러 메시지 표시
 *
 * Props:
 * @param {string} message - 에러 메시지 [Required]
 * @param {function} onRetry - 재시도 콜백 [Optional]
 *
 * Example usage:
 * <ErrorMessage message="데이터를 불러오는 데 실패했습니다." onRetry={handleRetry} />
 */
import { memo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorMessage = memo(function ErrorMessage({ message, onRetry }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 3,
        p: 4
      }}
      role="alert"
      aria-live="assertive"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: '4rem',
            color: '#FFC4E8',
            filter: 'drop-shadow(0 0 10px rgba(255, 196, 232, 0.6))'
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.2rem',
            color: '#FFFFFF',
            textAlign: 'center',
            mb: 1
          }}
        >
          오류가 발생했습니다
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1rem',
            color: '#E0D4FF',
            textAlign: 'center'
          }}
        >
          {message}
        </Typography>
      </motion.div>

      {onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            onClick={onRetry}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #C4A1FF 0%, #A8D8FF 100%)',
              color: '#FFFFFF',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: '30px',
              '&:hover': {
                background: 'linear-gradient(135deg, #E0D4FF 0%, #C4E8FF 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(196, 161, 255, 0.5)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            다시 시도
          </Button>
        </motion.div>
      )}
    </Box>
  );
});

export default ErrorMessage;
