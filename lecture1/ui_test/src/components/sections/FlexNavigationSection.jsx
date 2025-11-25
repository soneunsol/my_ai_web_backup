import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * FlexNavigationSection 컴포넌트
 *
 * Flexbox를 사용한 네비게이션 레이아웃 데모
 * - justify-content로 양 끝 정렬
 * - 로고와 메뉴 항목 배치
 * - 호버 효과 적용
 * - 다양한 flexbox 패턴 소개
 */
function FlexNavigationSection() {
  const menuItems = ['홈', '소개', '상품', '연락처', '설정'];

  return (
    <Box sx={{
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: 1,
      p: { xs: 3, md: 4 }
    }}>
      {/* 섹션 제목 */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        Flex Navigation Components
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: 'text.secondary'
        }}
      >
        Flexbox를 사용한 다양한 네비게이션 레이아웃 패턴을 확인해보세요.
      </Typography>

      <Grid container spacing={3}>
        {/* 기본 네비게이션 (양 끝 정렬) */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              1. 기본 네비게이션 (justify-content: space-between)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              로고는 왼쪽, 메뉴는 오른쪽에 배치
            </Typography>
          </Box>
          <Box sx={{
            width: '100%',
            height: '60px',
            bgcolor: '#2d3748',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            borderRadius: 1
          }}>
            {/* 로고 */}
            <Box sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              MyWebsite
            </Box>

            {/* 메뉴들 */}
            <Box sx={{
              display: 'flex',
              gap: '15px'
            }}>
              {menuItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    color: '#cbd5e0',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* 중앙 정렬 네비게이션 */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              2. 중앙 정렬 (justify-content: center)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              로고와 메뉴를 중앙에 배치
            </Typography>
          </Box>
          <Box sx={{
            width: '100%',
            height: '60px',
            bgcolor: '#1a202c',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            borderRadius: 1
          }}>
            {/* 로고 */}
            <Box sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              MyWebsite
            </Box>

            {/* 메뉴들 */}
            <Box sx={{
              display: 'flex',
              gap: '15px'
            }}>
              {menuItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    color: '#cbd5e0',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* 균등 분배 네비게이션 */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              3. 균등 분배 (justify-content: space-around)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              메뉴 항목들을 균등하게 분배
            </Typography>
          </Box>
          <Box sx={{
            width: '100%',
            height: '60px',
            bgcolor: '#2c5282',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: 1
          }}>
            {/* 로고 포함 모든 항목 */}
            <Box sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              MyWebsite
            </Box>
            {menuItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  color: '#cbd5e0',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: 'white'
                  }
                }}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Grid>

        {/* 3분할 네비게이션 */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              4. 3분할 레이아웃 (로고 - 메뉴 - 버튼)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              로고, 메뉴, 액션 버튼을 분리하여 배치
            </Typography>
          </Box>
          <Box sx={{
            width: '100%',
            height: '60px',
            bgcolor: '#2d3748',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            borderRadius: 1
          }}>
            {/* 로고 */}
            <Box sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              flex: '0 0 auto'
            }}>
              MyWebsite
            </Box>

            {/* 중앙 메뉴 */}
            <Box sx={{
              display: 'flex',
              gap: '20px',
              flex: '1 1 auto',
              justifyContent: 'center'
            }}>
              {menuItems.slice(0, 3).map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    color: '#cbd5e0',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>

            {/* 오른쪽 버튼 */}
            <Box sx={{
              display: 'flex',
              gap: '10px',
              flex: '0 0 auto'
            }}>
              <Box sx={{
                px: 2,
                py: 1,
                bgcolor: '#4299e1',
                color: 'white',
                borderRadius: 1,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#3182ce'
                }
              }}>
                로그인
              </Box>
              <Box sx={{
                px: 2,
                py: 1,
                border: '1px solid #4299e1',
                color: '#4299e1',
                borderRadius: 1,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#4299e1',
                  color: 'white'
                }
              }}>
                회원가입
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* 세로 정렬 네비게이션 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              5. 세로 네비게이션 (flex-direction: column)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              사이드바 형태의 세로 메뉴
            </Typography>
          </Box>
          <Box sx={{
            width: '100%',
            bgcolor: '#2d3748',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            borderRadius: 1,
            gap: 1
          }}>
            {/* 로고 */}
            <Box sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              mb: 2,
              pb: 2,
              borderBottom: '1px solid #4a5568'
            }}>
              MyWebsite
            </Box>

            {/* 세로 메뉴들 */}
            {menuItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  color: '#cbd5e0',
                  fontSize: '16px',
                  py: 1.5,
                  px: 2,
                  cursor: 'pointer',
                  borderRadius: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'white',
                    bgcolor: '#4a5568'
                  }
                }}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Grid>

        {/* 역순 네비게이션 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              6. 역순 정렬 (flex-direction: row-reverse)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              메뉴가 왼쪽, 로고가 오른쪽
            </Typography>
          </Box>
          <Box sx={{
            width: '100%',
            height: '60px',
            bgcolor: '#2d3748',
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            borderRadius: 1
          }}>
            {/* 로고 (오른쪽에 표시됨) */}
            <Box sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              MyWebsite
            </Box>

            {/* 메뉴들 (왼쪽에 표시됨) */}
            <Box sx={{
              display: 'flex',
              gap: '15px'
            }}>
              {menuItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    color: '#cbd5e0',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* 추가 설명 */}
      <Box sx={{
        mt: 4,
        p: 2,
        bgcolor: '#e3f2fd',
        borderRadius: 1
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          💡 <strong>Flexbox 네비게이션 속성:</strong>
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>display: flex</strong>: Flexbox 레이아웃 활성화
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>justify-content</strong>: 주 축(가로) 정렬 (space-between, center, space-around 등)
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>align-items</strong>: 교차 축(세로) 정렬 (center, flex-start, flex-end 등)
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>flex-direction</strong>: 정렬 방향 (row, column, row-reverse, column-reverse)
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>gap</strong>: 자식 요소 간 간격 설정
          </Typography>
          <Typography component="li" variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>flex</strong>: 자식 요소의 크기 조절 (flex-grow, flex-shrink, flex-basis)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default FlexNavigationSection;
