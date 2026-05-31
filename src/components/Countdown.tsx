import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDate = '2026-06-01T00:00:00-05:00' }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isFinished, setIsFinished] = useState(false);
  
  const [lang, setLang] = useState('es');
  
  useEffect(() => {
    // Escuchar el evento de cambio de idioma
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setLang(customEvent.detail);
    };

    if (typeof window !== 'undefined') {
      setLang(localStorage.getItem('site_lang') || 'es');
      window.addEventListener('languageChanged', handleLanguageChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('languageChanged', handleLanguageChange);
      }
    };
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let targetTime = new Date(targetDate).getTime();
    if (isNaN(targetTime)) {
      targetTime = 0; // Prevenir NaN
    }

    const checkTime = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsFinished(true);
        return true; // Finished
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
      return false; // Not finished
    };

    // First check immediately
    const finishedNow = checkTime();
    
    if (!finishedNow) {
      const interval = setInterval(() => {
        if (checkTime()) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  const dict: Record<string, Record<string, string>> = {
    es: { d: 'Días', h: 'Horas', m: 'Mins', s: 'Segs' },
    en: { d: 'Days', h: 'Hours', m: 'Mins', s: 'Secs' },
    pt: { d: 'Dias', h: 'Horas', m: 'Mins', s: 'Segs' },
    ko: { d: '일', h: '시간', m: '분', s: '초' }
  };

  const l = dict[lang] || dict['es'];

  const units = [
    { label: l.d, value: timeLeft.days },
    { label: l.h, value: timeLeft.hours },
    { label: l.m, value: timeLeft.minutes },
    { label: l.s, value: timeLeft.seconds }
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '12px',
              padding: '0.8rem 1.5rem',
              boxShadow: isFinished ? '0 0 20px rgba(194, 26, 50, 0.6), inset 0 0 10px rgba(194, 26, 50, 0.2)' : '0 4px 15px rgba(0,0,0,0.08)',
              border: isFinished ? '1px solid rgba(194, 26, 50, 0.5)' : '1px solid rgba(0,0,0,0.05)',
              minWidth: '80px',
              textAlign: 'center',
              transition: 'all 0.5s ease',
              animation: isFinished ? 'pulse 2s infinite' : 'none'
            }}>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '2.8rem', 
                fontWeight: 800, 
                color: isFinished ? 'var(--primary)' : '#111',
                textShadow: isFinished ? '0 0 10px rgba(194, 26, 50, 0.4)' : 'none',
                transition: 'all 0.5s ease'
              }}>
                {unit.value.toString().padStart(2, '0')}
              </span>
            </div>
            <span style={{ 
              fontSize: '0.85rem', 
              color: isFinished ? 'var(--primary)' : 'var(--fg-dim)', 
              textTransform: 'uppercase', 
              marginTop: '0.6rem', 
              fontWeight: 700, 
              letterSpacing: '0.05em',
              transition: 'all 0.5s ease'
            }}>
              {unit.label}
            </span>
          </div>
          {index < units.length - 1 && (
            <span style={{ 
              color: 'var(--primary)', 
              fontSize: '2rem', 
              fontWeight: 900, 
              alignSelf: 'flex-start', 
              marginTop: '0.8rem',
              opacity: isFinished ? 0.5 : 1,
              transition: 'all 0.5s ease'
            }}>:</span>
          )}
        </React.Fragment>
      ))}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 20px rgba(194, 26, 50, 0.6); }
          50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(194, 26, 50, 0.8); }
          100% { transform: scale(1); box-shadow: 0 0 20px rgba(194, 26, 50, 0.6); }
        }
      `}</style>
    </div>
  );
}
