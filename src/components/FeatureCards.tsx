import React, { useState, useEffect } from 'react';

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);

const DiamondIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/><path d="M2 12h20"/><path d="m12 2-5.5 10 5.5 10 5.5-10Z"/></svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);

// ==========================================
// CONFIGURACIÓN DE LAS TARJETAS (Feature Cards)
// ==========================================
// Aquí puedes editar fácilmente los títulos y descripciones de las 3 tarjetas para cada idioma.
const FEATURE_CARDS_CONTENT: Record<string, any[]> = {
  es: [
    {
      title: "Rendimiento Optimizado",
      desc: "Experimenta un mundo fluido sin lag ni interrupciones."
    },
    {
      title: "Sistemas y funciones mucho más avanzadas",
      desc: "Descubre nuevas mecánicas de interacción en el juego."
    },
    {
      title: "Personalización y nuevas opciones para jugadores",
      desc: "Tu avatar, tus reglas. Miles de combinaciones únicas."
    }
  ],
  en: [
    {
      title: "Optimized Performance",
      desc: "Experience a fluid world without lag or interruptions."
    },
    {
      title: "Much more advanced systems and functions",
      desc: "Discover new interaction mechanics in the game."
    },
    {
      title: "Customization and new options for players",
      desc: "Your avatar, your rules. Thousands of unique combinations."
    }
  ],
  pt: [
    {
      title: "Desempenho Otimizado",
      desc: "Experimente um mundo fluido sem lag ou interrupções."
    },
    {
      title: "Sistemas e funções muito mais avançados",
      desc: "Descubra novas mecânicas de interação no jogo."
    },
    {
      title: "Personalização e novas opções para jogadores",
      desc: "Seu avatar, suas regras. Milhares de combinações únicas."
    }
  ],
  ko: [
    {
      title: "최적화된 성능",
      desc: "지연이나 중단 없이 유연한 세계를 경험해 보세요."
    },
    {
      title: "훨씬 더 발전된 시스템과 기능",
      desc: "게임 내에서 새로운 상호작용 메커니즘을 발견해보세요."
    },
    {
      title: "플레이어를 위한 맞춤 설정 및 새로운 옵션",
      desc: "당신의 아바타, 당신의 규칙. 수천 가지의 독특한 조합."
    }
  ]
};

export default function FeatureCards() {
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

  const texts = FEATURE_CARDS_CONTENT[lang] || FEATURE_CARDS_CONTENT['es'];

  const features = [
    {
      icon: <RocketIcon />,
      title: texts[0].title,
      desc: texts[0].desc,
      iconBg: "#fae8ea",
      iconColor: "#b81d34"
    },
    {
      icon: <DiamondIcon />,
      title: texts[1].title,
      desc: texts[1].desc,
      iconBg: "#f5f0e6",
      iconColor: "#a88645"
    },
    {
      icon: <LockIcon />,
      title: texts[2].title,
      desc: texts[2].desc,
      iconBg: "#e8f5ed",
      iconColor: "#1d8a55"
    }
  ];

  return (
    <div className="features-container">
      {features.map((item, idx) => (
        <div key={idx} className="feature-card" style={{ '--hover-neon': item.iconColor } as React.CSSProperties}>
          <div className="feature-icon" style={{ backgroundColor: item.iconBg, color: item.iconColor }}>
            {item.icon}
          </div>
          <h3 className="feature-title">
            {item.title}
          </h3>
          <p className="feature-desc">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
