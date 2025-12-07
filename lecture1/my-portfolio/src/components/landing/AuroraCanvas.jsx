/**
 * AuroraCanvas 컴포넌트 - 오로라 배경 애니메이션
 *
 * Props: 없음
 *
 * 주요 기능:
 * - Canvas 기반 오로라 그라디언트 애니메이션
 * - 마우스 추적 인터랙션
 * - 별 파티클 시스템
 * - 60fps 부드러운 애니메이션
 */
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

function AuroraCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Canvas 크기 설정
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setCanvasSize();

    // 오로라 상태
    const aurora = {
      position: { x: width / 2, y: height / 3 },
      target: { x: width / 2, y: height / 3 },
      easing: 0.05
    };

    // 별 파티클 클래스
    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update() {
        // 별 이동
        this.x += this.speedX;
        this.y += this.speedY;

        // 화면 밖으로 나가면 반대편에서 다시 등장
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // 반짝임 효과
        this.twinklePhase += this.twinkleSpeed;
        const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;

        // 오로라와의 거리에 따른 밝기 변화
        const distanceToAurora = Math.hypot(
          this.x - aurora.position.x,
          this.y - aurora.position.y
        );
        const auroraInfluence = Math.max(0, 1 - distanceToAurora / 400);
        this.currentOpacity = (this.opacity + auroraInfluence * 0.5) * twinkle;
      }

      draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // 별 글로우 효과
        if (this.currentOpacity > 0.6) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 3
          );
          gradient.addColorStop(0, `rgba(196, 161, 255, ${this.currentOpacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(196, 161, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 별 배열 생성
    const stars = [];
    const starCount = 25;
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // 마우스 추적
    const handleMouseMove = (e) => {
      aurora.target.x = e.clientX;
      aurora.target.y = e.clientY;
    };

    // 오로라 그리기
    const drawAurora = () => {
      // 오로라 위치 부드럽게 이동
      aurora.position.x += (aurora.target.x - aurora.position.x) * aurora.easing;
      aurora.position.y += (aurora.target.y - aurora.position.y) * aurora.easing;

      // 오로라 그라디언트 1 (연보라)
      const gradient1 = ctx.createRadialGradient(
        aurora.position.x,
        aurora.position.y,
        0,
        aurora.position.x,
        aurora.position.y,
        500
      );
      gradient1.addColorStop(0, 'rgba(196, 161, 255, 0.4)');
      gradient1.addColorStop(0.4, 'rgba(168, 216, 255, 0.2)');
      gradient1.addColorStop(0.7, 'rgba(255, 196, 232, 0.1)');
      gradient1.addColorStop(1, 'rgba(255, 196, 232, 0)');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      // 오로라 그라디언트 2 (보조)
      const gradient2 = ctx.createRadialGradient(
        aurora.position.x + 100,
        aurora.position.y + 100,
        0,
        aurora.position.x + 100,
        aurora.position.y + 100,
        350
      );
      gradient2.addColorStop(0, 'rgba(168, 216, 255, 0.3)');
      gradient2.addColorStop(0.5, 'rgba(196, 161, 255, 0.15)');
      gradient2.addColorStop(1, 'rgba(196, 161, 255, 0)');

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);
    };

    // 애니메이션 루프
    const animate = () => {
      // 배경 그라디언트
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#0A0E27');
      bgGradient.addColorStop(0.5, '#1A1F3A');
      bgGradient.addColorStop(1, '#2D3250');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 오로라 그리기
      drawAurora();

      // 별 업데이트 및 그리기
      stars.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // 이벤트 리스너 등록
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasSize);

    // 애니메이션 시작
    animate();

    // 클린업
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </Box>
  );
}

export default AuroraCanvas;
