import { useEffect, useState } from 'react';

export function useScrollEffects(sectionSelector = '.reveal') {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target.id) {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.02 },
    );

    document.querySelectorAll(sectionSelector).forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionSelector]);

  return { activeSection, scrollProgress };
}

export function usePointerGlow() {
  const [pointer, setPointer] = useState({ x: -120, y: -120 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      const xRatio = event.clientX / window.innerWidth - 0.5;
      const yRatio = event.clientY / window.innerHeight - 0.5;
      setPointer({ x: event.clientX, y: event.clientY });
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
      document.documentElement.style.setProperty('--parallax-x', `${xRatio * 18}px`);
      document.documentElement.style.setProperty('--parallax-y', `${yRatio * 18}px`);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return pointer;
}
