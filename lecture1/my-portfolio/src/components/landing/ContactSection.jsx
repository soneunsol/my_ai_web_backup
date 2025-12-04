/**
 * ContactSection 컴포넌트
 *
 * Props: 없음
 *
 * 주요 기능:
 * - 이메일 연락처 표시
 * - SNS 링크 (Instagram, GitHub, LinkedIn) 표시
 * - 방명록 입력 폼
 * - 방명록 목록 표시
 *
 * Example usage:
 * <ContactSection />
 */
import { Box, Container, Typography, IconButton, Link as MuiLink } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GuestbookForm from './GuestbookForm';
import GuestbookList from './GuestbookList';

function ContactSection() {
  return (
    <Box
      id="contact"
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        backgroundColor: '#FAFAFA'
      }}
    >
      <Container maxWidth="md">
        {/* Contact Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2
            }}
          >
            Contact
          </Typography>
          <Box
            sx={{
              width: '60px',
              height: '4px',
              backgroundColor: '#CFFF00',
              margin: '0 auto',
              mb: 4
            }}
          />
        </Box>

        {/* Email */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 4,
            p: 4,
            backgroundColor: '#FFFFFF',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <EmailIcon sx={{ fontSize: 28, color: '#666666', mr: 1.5 }} />
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: '#333333',
                fontWeight: 500
              }}
            >
              eunsol229@gmail.com
            </Typography>
          </Box>
        </Box>

        {/* SNS Links */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mb: 8
          }}
        >
          <IconButton
            component={MuiLink}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 56,
              height: 56,
              backgroundColor: '#FFFFFF',
              border: '2px solid #E8E8E8',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#CFFF00',
                borderColor: '#CFFF00',
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(207, 255, 0, 0.3)'
              }
            }}
          >
            <InstagramIcon sx={{ fontSize: 28, color: '#333333' }} />
          </IconButton>

          <IconButton
            component={MuiLink}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 56,
              height: 56,
              backgroundColor: '#FFFFFF',
              border: '2px solid #E8E8E8',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#CFFF00',
                borderColor: '#CFFF00',
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(207, 255, 0, 0.3)'
              }
            }}
          >
            <GitHubIcon sx={{ fontSize: 28, color: '#333333' }} />
          </IconButton>

          <IconButton
            component={MuiLink}
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 56,
              height: 56,
              backgroundColor: '#FFFFFF',
              border: '2px solid #E8E8E8',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#CFFF00',
                borderColor: '#CFFF00',
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(207, 255, 0, 0.3)'
              }
            }}
          >
            <LinkedInIcon sx={{ fontSize: 28, color: '#333333' }} />
          </IconButton>
        </Box>

        {/* Guestbook Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              fontWeight: 600,
              mb: 1
            }}
          >
            방명록
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              fontSize: '0.95rem'
            }}
          >
            소중한 메시지를 남겨주세요 ✨
          </Typography>
        </Box>

        {/* Guestbook Form */}
        <GuestbookForm />

        {/* Guestbook List */}
        <GuestbookList />
      </Container>
    </Box>
  );
}

export default ContactSection;
