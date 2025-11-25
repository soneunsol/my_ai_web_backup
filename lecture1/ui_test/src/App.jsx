import { Box, Container, Typography } from '@mui/material';
import ButtonSection from './components/sections/ButtonSection';
import InputSection from './components/sections/InputSection';
import NavigationSection from './components/sections/NavigationSection';
import DropdownSection from './components/sections/DropdownSection';
import CheckboxSection from './components/sections/CheckboxSection';
import RadioSection from './components/sections/RadioSection';
import SliderSection from './components/sections/SliderSection';
import ModalSection from './components/sections/ModalSection';
import CardSection from './components/sections/CardSection';
import DragDropSection from './components/sections/DragDropSection';
import ScrollSection from './components/sections/ScrollSection';
import AnimationSection from './components/sections/AnimationSection';
import MenuSection from './components/sections/MenuSection';
import SidebarSection from './components/sections/SidebarSection';
import HoverSection from './components/sections/HoverSection';
import SwipeSection from './components/sections/SwipeSection';
import FlexNavigationSection from './components/sections/FlexNavigationSection';

/**
 * App 컴포넌트
 *
 * UI 요소를 섹션별로 순차적으로 추가할 수 있는 구조
 * 각 섹션은 src/components/sections/ 폴더에 별도 컴포넌트로 관리
 * 개별 UI 요소는 src/components/ui/ 폴더에서 관리
 */
function App() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      py: { xs: 2, md: 4 },
      bgcolor: '#f5f5f5'
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 프로젝트 제목 */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          UI Test Project
        </Typography>

        {/* 섹션 추가 영역 */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          {/* Section 1: Button Components */}
          <ButtonSection />

          {/* Section 2: Input Components */}
          <InputSection />

          {/* Section 3: Navigation Components */}
          <NavigationSection />

          {/* Section 4: Dropdown Components */}
          <DropdownSection />

          {/* Section 5: Checkbox Components */}
          <CheckboxSection />

          {/* Section 6: Radio Button Components */}
          <RadioSection />

          {/* Section 7: Slider Components */}
          <SliderSection />

          {/* Section 8: Modal Components */}
          <ModalSection />

          {/* Section 9: Card Components */}
          <CardSection />

          {/* Section 10: Drag & Drop Components */}
          <DragDropSection />

          {/* Section 11: Scroll Components */}
          <ScrollSection />

          {/* Section 12: Animation Components */}
          <AnimationSection />

          {/* Section 13: Menu Components */}
          <MenuSection />

          {/* Section 14: Sidebar Components */}
          <SidebarSection />

          {/* Section 15: Hover Effect Components */}
          <HoverSection />

          {/* Section 16: Swipe Components */}
          <SwipeSection />

          {/* Section 17: Flex Navigation Components */}
          <FlexNavigationSection />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
