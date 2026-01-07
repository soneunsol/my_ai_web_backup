/**
 * SkillsSection 컴포넌트 - 스킬 섹션
 *
 * Props:
 * @param {Array} skills - 스킬 데이터 배열 [Required]
 * @param {boolean} showTooltip - 툴팁 표시 여부 [Optional, 기본값: true]
 *
 * 주요 기능:
 * - 카테고리별 스킬 그룹핑
 * - 반응형 그리드 레이아웃 (모바일: 1열, 태블릿: 2열, 데스크탑: 3열)
 * - 프로그래스 바 애니메이션
 * - 카테고리별 색상 구분
 * - 호버 툴팁
 * - 접근성 개선 (ARIA, 키보드 네비게이션)
 * - React.memo로 성능 최적화
 *
 * Example usage:
 * <SkillsSection skills={skillsData} />
 */
import { memo, useMemo } from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

const SkillsSection = memo(function SkillsSection({ skills, showTooltip = true }) {
  // 카테고리별 색상 맵핑
  const categoryColors = {
    Frontend: {
      primary: '#C4A1FF',
      secondary: 'rgba(196, 161, 255, 0.15)',
      gradient: 'linear-gradient(135deg, #C4A1FF 0%, #A8D8FF 100%)'
    },
    Framework: {
      primary: '#A8D8FF',
      secondary: 'rgba(168, 216, 255, 0.15)',
      gradient: 'linear-gradient(135deg, #A8D8FF 0%, #FFC4E8 100%)'
    },
    Design: {
      primary: '#FFC4E8',
      secondary: 'rgba(255, 196, 232, 0.15)',
      gradient: 'linear-gradient(135deg, #FFC4E8 0%, #C4A1FF 100%)'
    },
    Backend: {
      primary: '#A8FFC4',
      secondary: 'rgba(168, 255, 196, 0.15)',
      gradient: 'linear-gradient(135deg, #A8FFC4 0%, #A8D8FF 100%)'
    }
  };

  // 카테고리별로 스킬 그룹핑 (useMemo로 최적화)
  const groupedSkills = useMemo(() => {
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    // 각 카테고리 내에서 레벨 순으로 정렬
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => b.levelValue - a.levelValue);
    });

    return grouped;
  }, [skills]);

  return (
    <Box>
      {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
        <Box key={category} sx={{ mb: 6 }}>
          {/* 카테고리 헤더 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              pb: 2,
              borderBottom: `2px solid ${categoryColors[category]?.primary || '#C4A1FF'}`
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.8rem' },
                fontWeight: 700,
                color: '#FFFFFF',
                textShadow: `0 0 15px ${categoryColors[category]?.primary || '#C4A1FF'}`
              }}
            >
              {category}
            </Typography>
            <Box
              sx={{
                px: 2,
                py: 0.5,
                background: categoryColors[category]?.gradient || 'linear-gradient(135deg, #C4A1FF 0%, #A8D8FF 100%)',
                borderRadius: '20px',
                boxShadow: `0 4px 12px ${categoryColors[category]?.secondary || 'rgba(196, 161, 255, 0.3)'}`
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}
              >
                {categorySkills.length}개
              </Typography>
            </Box>
          </Box>

          {/* 스킬 그리드 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 3
            }}
          >
            {categorySkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 + index * 0.05 }}
              >
                <Tooltip
                  title={showTooltip ? skill.tooltip : ''}
                  placement="top"
                  arrow
                  sx={{
                    '& .MuiTooltip-tooltip': {
                      background: 'linear-gradient(135deg, rgba(196, 161, 255, 0.95) 0%, rgba(168, 216, 255, 0.95) 100%)',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(196, 161, 255, 0.4)'
                    }
                  }}
                >
                  <Card
                    component="article"
                    role="article"
                    aria-label={`${skill.name} 스킬 정보`}
                    tabIndex={0}
                    sx={{
                      background: `linear-gradient(135deg, ${categoryColors[category]?.secondary || 'rgba(196, 161, 255, 0.15)'} 0%, rgba(45, 50, 80, 0.3) 100%)`,
                      backdropFilter: 'blur(10px)',
                      border: `2px solid ${categoryColors[category]?.primary}40` || 'rgba(196, 161, 255, 0.25)',
                      borderRadius: '16px',
                      height: '100%',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'visible',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        borderColor: categoryColors[category]?.primary || '#C4A1FF',
                        boxShadow: `0 12px 32px ${categoryColors[category]?.secondary || 'rgba(196, 161, 255, 0.4)'}`,
                        background: `linear-gradient(135deg, ${categoryColors[category]?.secondary || 'rgba(196, 161, 255, 0.25)'} 0%, rgba(45, 50, 80, 0.5) 100%)`,
                        '& .skill-icon': {
                          transform: 'scale(1.2) rotate(10deg)',
                          filter: `drop-shadow(0 0 15px ${categoryColors[category]?.primary || '#C4A1FF'})`
                        },
                        '& .skill-progress': {
                          '& .MuiLinearProgress-bar': {
                            animation: 'glow 1.5s ease-in-out infinite'
                          }
                        }
                      },
                      '@keyframes glow': {
                        '0%, 100%': { boxShadow: `0 0 10px ${categoryColors[category]?.primary || '#C4A1FF'}50` },
                        '50%': { boxShadow: `0 0 20px ${categoryColors[category]?.primary || '#C4A1FF'}` }
                      }
                    }}
                  >
                    {/* 숙련도 레벨 뱃지 */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: 10,
                        px: 1.5,
                        py: 0.5,
                        background: categoryColors[category]?.gradient || 'linear-gradient(135deg, #C4A1FF 0%, #A8D8FF 100%)',
                        borderRadius: '12px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: `0 4px 12px ${categoryColors[category]?.secondary || 'rgba(196, 161, 255, 0.4)'}`
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          fontStyle: 'italic'
                        }}
                      >
                        {skill.level}
                      </Typography>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      {/* 아이콘 + 스킬명 */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mb: 3
                        }}
                      >
                        <Box
                          className="skill-icon"
                          sx={{
                            fontSize: '2.5rem',
                            transition: 'all 0.4s ease',
                            filter: `drop-shadow(0 0 8px ${categoryColors[category]?.primary || '#C4A1FF'}50)`
                          }}
                        >
                          {skill.icon}
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            textShadow: `0 0 10px ${categoryColors[category]?.primary || '#C4A1FF'}40`
                          }}
                        >
                          {skill.name}
                        </Typography>
                      </Box>

                      {/* 프로그래스 바 */}
                      <Box className="skill-progress">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: '0.85rem',
                              color: '#B8B8D0',
                              fontWeight: 600
                            }}
                            id={`skill-label-${skill.id}`}
                          >
                            숙련도
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: '0.85rem',
                              color: categoryColors[category]?.primary || '#C4A1FF',
                              fontWeight: 700
                            }}
                          >
                            {skill.levelValue}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={skill.levelValue}
                          aria-labelledby={`skill-label-${skill.id}`}
                          aria-valuenow={skill.levelValue}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          sx={{
                            height: '8px',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: '10px',
                              background: categoryColors[category]?.gradient || 'linear-gradient(90deg, #C4A1FF 0%, #A8D8FF 100%)',
                              boxShadow: `0 0 10px ${categoryColors[category]?.primary || '#C4A1FF'}50`,
                              transition: 'all 0.4s ease'
                            }
                          }}
                        />
                      </Box>

                      {/* 설명 */}
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 2,
                          fontSize: '0.9rem',
                          color: '#E0D4FF',
                          fontStyle: 'italic',
                          lineHeight: 1.5
                        }}
                      >
                        {skill.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Tooltip>
              </motion.div>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
});

export default SkillsSection;
