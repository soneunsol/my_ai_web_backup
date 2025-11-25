/**
 * AboutMe 페이지
 *
 * Props: 없음
 *
 * 주요 기능:
 * - 상세한 자기소개 섹션 (추후 개발 예정)
 * - 네온 옐로우 컬러를 활용한 강조 효과
 * - 반응형 중앙정렬 레이아웃
 */
import { Box, Container, Typography, Card, CardContent } from '@mui/material';

function AboutMe() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2
            }}
          >
            About Me
          </Typography>
          <Box
            sx={{
              width: '60px',
              height: '4px',
              backgroundColor: '#CFFF00',
              mb: 3
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: '#666666',
              lineHeight: 1.8
            }}
          >
            상세한 자기소개가 들어갈 예정입니다.
          </Typography>
        </Box>

        <Card
          sx={{
            backgroundColor: '#FAFAFA',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            mb: 3
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                mb: 2
              }}
            >
              소개
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                lineHeight: 1.8,
                mb: 2
              }}
            >
              여기에 자신에 대한 소개 내용이 추가될 예정입니다.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                lineHeight: 1.8
              }}
            >
              경력, 학력, 관심 분야 등 다양한 정보를 담을 수 있습니다.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: '#FAFAFA',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            mb: 3
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                mb: 2
              }}
            >
              기술 스택
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                lineHeight: 1.8
              }}
            >
              사용 가능한 프로그래밍 언어, 프레임워크, 도구 등의 정보가 추가될 예정입니다.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: '#FAFAFA',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                mb: 2
              }}
            >
              연락처
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                lineHeight: 1.8
              }}
            >
              이메일, 소셜 미디어 링크 등의 연락처 정보가 추가될 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AboutMe;
