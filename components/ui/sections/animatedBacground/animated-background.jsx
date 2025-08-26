'use client';

import { useEffect } from 'react';

export default function AnimatedBackground() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const root = document.documentElement;
      const { clientX, clientY } = e;
      root.style.setProperty('--x', `${(clientX / window.innerWidth - 0.5) * 30}px`);
      root.style.setProperty('--y', `${(clientY / window.innerHeight - 0.5) * 30}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-float"
        style={{ top: '20%', left: '15%', transform: 'translate(var(--x, 0), var(--y, 0))' }}
      />
      <div
        className="absolute w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl animate-float"
        style={{ top: '65%', right: '10%', transform: 'translate(var(--x, 0), var(--y, 0))' }}
      />
      <div
        className="absolute w-[28rem] h-[28rem] bg-gradient-to-br from-yellow-300/10 to-orange-300/10 rounded-full blur-2xl animate-float"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) translate(var(--x, 0), var(--y, 0))' }}
      />
    </div>
  );
}
