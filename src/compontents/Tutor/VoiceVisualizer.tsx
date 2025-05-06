import React, { useEffect, useRef } from 'react';
import { useTutor } from '../../context/TutorContext';

const VoiceVisualizer: React.FC<{
  isActive: boolean;
  type: 'listening' | 'speaking';
}> = ({ isActive, type }) => {
  const { isSpeaking, isListening } = useTutor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  
  // Determine if we should be active based on context and props
  const shouldBeActive = type === 'listening' ? isListening : isSpeaking;
  const active = isActive && shouldBeActive;
  
  // Colors based on type
  const color = type === 'listening' ? 'rgb(168, 85, 247)' : 'rgb(59, 130, 246)';
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const barCount = 30;
    const barWidth = (canvas.width / barCount) * 0.8;
    const barGap = (canvas.width / barCount) * 0.2;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (active) {
        // Generate random heights for the bars
        for (let i = 0; i < barCount; i++) {
          const height = active 
            ? Math.random() * (canvas.height * 0.7) + (canvas.height * 0.3)
            : canvas.height * 0.1;
          
          const x = i * (barWidth + barGap);
          const y = (canvas.height - height) / 2;
          
          ctx.fillStyle = color;
          ctx.fillRect(x, y, barWidth, height);
        }
      } else {
        // Draw flat line when inactive
        const height = canvas.height * 0.1;
        const y = (canvas.height - height) / 2;
        
        ctx.fillStyle = color;
        ctx.fillRect(0, y, canvas.width, height);
      }
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [active, color]);
  
  return (
    <canvas
      ref={canvasRef}
      width={150}
      height={40}
      className="rounded"
    />
  );
};

export default VoiceVisualizer;