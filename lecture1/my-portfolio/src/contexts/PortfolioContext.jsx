/**
 * PortfolioContext - 포트폴리오 전역 상태 관리
 *
 * Props: 없음
 *
 * 주요 기능:
 * - About Me 기본 정보 관리
 * - 콘텐츠 섹션 관리 (showInHome 속성 포함)
 * - 스킬 데이터 관리
 * - 홈 페이지용 데이터 자동 생성
 * - 로딩 상태 및 에러 처리
 * - 성능 최적화 (useMemo, useCallback)
 */
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [aboutMeData, setAboutMeData] = useState({
    basicInfo: {
      name: '손은솔',
      education: 'sbs아카데미 컴퓨터 학원',
      major: '웹 개발',
      experience: '신입',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    sections: [
      {
        id: 'dev-story',
        title: '나의 개발 스토리',
        showInHome: true,
        content: {
          start: {
            title: '개발을 시작하게 된 계기',
            text: '나를 간략히 표현하는 웹사이트를 만들고 싶었습니다. 처음에는 단순히 나를 소개하는 페이지를 만들고 싶다는 생각이었지만, 코드를 작성하면서 점점 더 깊이 빠져들게 되었습니다.'
          },
          value: {
            title: '핵심 가치관',
            text: '즐겁게 디자인하기. 개발은 단순히 기능을 구현하는 것이 아니라, 사용자에게 즐거움을 주는 경험을 만드는 일이라고 생각합니다. 아름다운 UI와 부드러운 UX를 통해 사용자가 웃을 수 있는 웹을 만들고 싶습니다.'
          },
          personal: {
            title: '개인적 매력',
            hobby: '취미: 줌바 💃',
            hobbyDesc: '리듬을 타며 스트레스를 날려버립니다. 코드를 짜는 것도 일종의 춤이라고 생각해요!',
            interest: '관심사: AI 🤖',
            interestDesc: 'ChatGPT와 함께 코딩하는 시대. AI를 도구로 활용하는 개발자가 되고 싶습니다.'
          },
          goal: {
            title: '성장 목표',
            text: '시니어 프론트엔드 개발자가 되는 것이 목표입니다. React의 깊은 이해, 성능 최적화, 아키텍처 설계 능력을 갖춘 개발자로 성장하고 싶습니다.',
            roadmap: [
              { year: '2025', goal: '주니어 개발자 취업', status: '진행 중' },
              { year: '2026', goal: '중급 프로젝트 리드', status: '목표' },
              { year: '2028', goal: '시니어 개발자 도달', status: '목표' }
            ]
          }
        }
      },
      {
        id: 'philosophy',
        title: '개발 철학',
        showInHome: true,
        content: {
          principles: [
            {
              title: '사용자 중심 개발',
              description: '항상 사용자의 입장에서 생각하고, 사용자가 편리하게 사용할 수 있는 인터페이스를 만들기 위해 노력합니다.'
            },
            {
              title: '코드의 가독성',
              description: '좋은 코드는 다른 개발자가 읽기 쉬운 코드입니다. 명확한 변수명, 함수명, 그리고 적절한 주석을 통해 유지보수가 쉬운 코드를 작성합니다.'
            },
            {
              title: '지속적인 학습',
              description: '기술은 빠르게 변화합니다. 새로운 기술을 배우는 것을 두려워하지 않고, 항상 더 나은 방법을 찾기 위해 노력합니다.'
            }
          ]
        }
      },
      {
        id: 'personal',
        title: '개인적인 이야기',
        showInHome: false,
        content: {
          background: '컴퓨터 학원에서 웹 개발을 처음 배우기 시작했습니다. 처음에는 HTML, CSS부터 시작했지만, JavaScript를 배우면서 프로그래밍의 재미를 느꼈습니다.',
          motivation: '웹 개발자가 되고 싶은 이유는 내가 만든 것이 실제로 사람들에게 사용되는 것을 보고 싶기 때문입니다. 작은 기능 하나라도 누군가의 일상을 편리하게 만들 수 있다는 것이 매력적입니다.',
          future: '앞으로는 프론트엔드뿐만 아니라 백엔드, 데이터베이스까지 전체적인 웹 개발 프로세스를 이해하는 풀스택 개발자로 성장하고 싶습니다.'
        }
      }
    ],
    skills: [
      {
        id: 1,
        name: 'HTML',
        description: '웹의 뼈대를 만듭니다',
        level: '中',
        levelValue: 80,
        category: 'Frontend',
        detail: 'HTML5 시맨틱 태그를 활용하여 구조적이고 접근성 높은 웹 페이지를 작성합니다.',
        experience: 'sbs아카데미에서 기초부터 학습하여 다양한 웹 페이지 구조를 이해하고 있습니다.',
        icon: '🔶',
        tooltip: '시맨틱 태그를 활용한 구조적인 마크업'
      },
      {
        id: 2,
        name: 'CSS',
        description: '아름다운 스타일을 입힙니다',
        level: '中',
        levelValue: 75,
        category: 'Frontend',
        detail: 'CSS3, Flexbox, Grid를 활용한 반응형 레이아웃 디자인과 애니메이션 효과를 구현합니다.',
        experience: 'MUI를 사용한 컴포넌트 스타일링과 테마 커스터마이징 경험이 있습니다.',
        icon: '🎨',
        tooltip: 'Flexbox, Grid, 애니메이션을 활용한 스타일링'
      },
      {
        id: 3,
        name: 'JavaScript',
        description: '생명을 불어넣습니다',
        level: '下',
        levelValue: 70,
        category: 'Frontend',
        detail: 'ES6+ 문법을 활용한 모던 JavaScript 개발과 DOM 조작, 이벤트 처리를 수행합니다.',
        experience: '비동기 처리, Promise, async/await를 활용한 데이터 통신을 구현하고 있습니다.',
        icon: '⚡',
        tooltip: 'ES6+, 비동기 처리, DOM 조작'
      },
      {
        id: 4,
        name: 'React',
        description: '컴포넌트로 세상을 만듭니다',
        level: '下',
        levelValue: 60,
        category: 'Framework',
        detail: 'React Hooks를 활용한 함수형 컴포넌트 개발과 상태 관리를 수행합니다.',
        experience: 'React Router, MUI를 활용한 SPA 개발 경험과 Supabase 연동 프로젝트를 진행했습니다.',
        icon: '⚛️',
        tooltip: 'Hooks, 상태관리, SPA 개발'
      },
      {
        id: 5,
        name: 'Figma',
        description: '디자인을 현실로',
        level: '下',
        levelValue: 65,
        category: 'Design',
        detail: 'Figma를 활용한 UI/UX 디자인과 프로토타이핑을 수행합니다.',
        experience: '웹 애플리케이션의 와이어프레임 및 프로토타입 제작 경험이 있습니다.',
        icon: '🎯',
        tooltip: 'UI/UX 디자인, 프로토타이핑'
      },
      {
        id: 6,
        name: 'Node.js',
        description: '서버와 대화합니다',
        level: '下',
        levelValue: 55,
        category: 'Backend',
        detail: 'Node.js 기반 백엔드 개발의 기초를 이해하고 API 통신을 구현합니다.',
        experience: 'Express를 활용한 간단한 REST API 개발 경험이 있습니다.',
        icon: '🟢',
        tooltip: 'Express, REST API 개발'
      }
    ]
  });

  // 홈 페이지용 데이터 자동 생성 (useMemo로 최적화)
  const homeData = useMemo(() => {
    try {
      // showInHome이 true인 섹션만 필터링
      const homeSections = aboutMeData.sections
        .filter(section => section.showInHome)
        .map(section => {
          let summary = '';

          // 각 섹션 타입에 맞게 요약 생성
          if (section.id === 'dev-story') {
            summary = section.content.start.text;
          } else if (section.id === 'philosophy') {
            summary = section.content.principles[0].description;
          }

          return {
            id: section.id,
            title: section.title,
            summary: summary
          };
        });

      // 상위 4개 스킬 (levelValue 기준)
      const topSkills = [...aboutMeData.skills]
        .sort((a, b) => b.levelValue - a.levelValue)
        .slice(0, 4);

      return {
        sections: homeSections,
        skills: topSkills,
        basicInfo: aboutMeData.basicInfo
      };
    } catch (err) {
      console.error('Error generating home data:', err);
      setError('홈 데이터 생성 중 오류가 발생했습니다.');
      return {
        sections: [],
        skills: [],
        basicInfo: aboutMeData.basicInfo
      };
    }
  }, [aboutMeData]);

  // About Me 데이터 업데이트 함수들 (useCallback으로 최적화)
  const updateBasicInfo = useCallback((newInfo) => {
    try {
      setLoading(true);
      setAboutMeData(prev => ({
        ...prev,
        basicInfo: { ...prev.basicInfo, ...newInfo }
      }));
      setError(null);
    } catch (err) {
      console.error('Error updating basic info:', err);
      setError('기본 정보 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSection = useCallback((sectionId, newContent) => {
    try {
      setLoading(true);
      setAboutMeData(prev => ({
        ...prev,
        sections: prev.sections.map(section =>
          section.id === sectionId
            ? { ...section, content: { ...section.content, ...newContent } }
            : section
        )
      }));
      setError(null);
    } catch (err) {
      console.error('Error updating section:', err);
      setError('섹션 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleShowInHome = useCallback((sectionId) => {
    try {
      setLoading(true);
      setAboutMeData(prev => ({
        ...prev,
        sections: prev.sections.map(section =>
          section.id === sectionId
            ? { ...section, showInHome: !section.showInHome }
            : section
        )
      }));
      setError(null);
    } catch (err) {
      console.error('Error toggling showInHome:', err);
      setError('홈 표시 설정 변경 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSkill = useCallback((skillId, updates) => {
    try {
      setLoading(true);
      setAboutMeData(prev => ({
        ...prev,
        skills: prev.skills.map(skill =>
          skill.id === skillId
            ? { ...skill, ...updates }
            : skill
        )
      }));
      setError(null);
    } catch (err) {
      console.error('Error updating skill:', err);
      setError('스킬 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({
    aboutMeData,
    homeData,
    loading,
    error,
    updateBasicInfo,
    updateSection,
    toggleShowInHome,
    updateSkill
  }), [aboutMeData, homeData, loading, error, updateBasicInfo, updateSection, toggleShowInHome, updateSkill]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom Hook
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

export default PortfolioContext;
