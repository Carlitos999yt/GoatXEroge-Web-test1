import React, { useState, useEffect } from 'react';

export default function NotifyForm() {
  // ==========================================
  // ESTADOS DEL COMPONENTE
  // ==========================================
  const [lang, setLang] = useState('es'); // Idioma actual seleccionado
  const [email, setEmail] = useState(''); // Valor del campo de texto de correo
  const [error, setError] = useState(''); // Mensaje de error (si el correo es inválido)
  const [success, setSuccess] = useState(false); // Indica si la suscripción fue exitosa
  const [loading, setLoading] = useState(false); // Indica si está en proceso de envío (animación)

  // ==========================================
  // EFECTOS
  // ==========================================
  useEffect(() => {
    // Función que escucha cuando el usuario cambia de idioma en la barra superior
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setLang(customEvent.detail);
      
      // Reiniciamos los estados visuales para que no se queden mensajes en el idioma anterior
      setError('');
      setSuccess(false);
    };

    // Solo nos suscribimos al evento del idioma si estamos en el cliente (navegador)
    if (typeof window !== 'undefined') {
      setLang(localStorage.getItem('site_lang') || 'es');
      window.addEventListener('languageChanged', handleLanguageChange);
    }

    return () => {
      // Limpiar el evento cuando se destruye el componente para evitar problemas de memoria
      if (typeof window !== 'undefined') {
        window.removeEventListener('languageChanged', handleLanguageChange);
      }
    };
  }, []);

  // ==========================================
  // DICCIONARIO DE TRADUCCIONES
  // ==========================================
  const dict: Record<string, Record<string, string>> = {
    es: { 
      placeholder: 'tu@email.com', 
      button: 'Avísame', 
      errEmpty: 'Ingresa tu correo electronico', 
      errInvalid: 'Correo invalido',
      successMsg: 'Te notificaremos cuando llegue el gran día'
    },
    en: { 
      placeholder: 'you@email.com', 
      button: 'Notify me', 
      errEmpty: 'Enter your email address', 
      errInvalid: 'Invalid email',
      successMsg: 'We will notify you when the big day arrives'
    },
    pt: { 
      placeholder: 'voce@email.com', 
      button: 'Avise-me', 
      errEmpty: 'Insira seu email', 
      errInvalid: 'Email inválido',
      successMsg: 'Avisaremos você quando o grande dia chegar'
    },
    ko: { 
      placeholder: '이메일@주소.com', 
      button: '알림 받기', 
      errEmpty: '이메일 주소를 입력하세요', 
      errInvalid: '유효하지 않은 이메일',
      successMsg: '큰 날이 오면 알려드리겠습니다'
    }
  };

  // Seleccionar los textos según el idioma actual (por defecto español)
  const t = dict[lang] || dict['es'];

  // ==========================================
  // MANEJADOR DE ENVÍO DE FORMULARIO
  // ==========================================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página recargue al darle enter o click al botón
    setSuccess(false);
    
    // Validación 1: ¿Está vacío el campo?
    if (!email.trim()) {
      setError(t.errEmpty);
      setTimeout(() => setError(''), 3000); // Ocultar después de 3 segundos
      return;
    }

    // Validación 2: ¿Tiene formato de correo válido? (ej: texto@texto.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t.errInvalid);
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Si todo está bien, simulamos que cargamos
    setError('');
    setLoading(true);
    
    // Simular tiempo de carga conectando al servidor (1.5 segundos)
    setTimeout(() => {
      setLoading(false); // Detenemos la ruedita de carga
      setSuccess(true); // Mostramos mensaje de éxito
      setEmail(''); // Limpiamos el texto
      
      // Ocultar mensaje de éxito después de unos segundos
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', width: '100%' }}>
      
      {/* =======================
          FORMULARIO PRINCIPAL 
          ======================= */}
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        justifyContent: 'center', 
        width: '100%', 
        maxWidth: '380px',
        background: 'white',
        borderRadius: '12px',
        padding: '4px',
        border: '1px solid #c21a32',
        boxShadow: '0 4px 15px rgba(194, 26, 50, 0.08)'
      }}>
        <input 
          type="text" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Si hay error y el usuario empieza a escribir, limpiamos el error
            if (error) setError('');
          }}
          placeholder={t.placeholder}
          style={{
            flex: 1,
            padding: '0.6rem 1rem',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: '#111'
          }}
        />
        
        {/* =======================
            BOTÓN DE ENVÍO Y CARGA 
            ======================= */}
        <button 
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#a31526',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '0.6rem 1.2rem',
            fontWeight: 700,
            cursor: loading ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease',
            opacity: loading ? 0.8 : 1
          }}
          onMouseOver={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#8a1120'; }}
          onMouseOut={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#a31526'; }}
        >
          {loading ? (
            // Icono de Ruedita Cargando
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          ) : (
            // Icono de Campanita
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          )}
          {t.button}
        </button>
      </form>
      
      {/* =======================
          NOTIFICACIÓN DE ERROR 
          ======================= */}
      {error && (
        <div style={{
          position: 'absolute',
          top: '100%',
          marginTop: '1rem',
          background: '#fff0f2',
          border: '1px solid rgba(194, 26, 50, 0.3)',
          color: '#d03045',
          padding: '0.6rem 1.5rem',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.85rem',
          fontWeight: 700,
          fontFamily: 'var(--font-body)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
          animation: 'fadeIn 0.3s ease',
          zIndex: 20
        }}>
          <div style={{
            width: '18px',
            height: '18px',
            background: '#d03045',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* ICONO DE EQUIS (X) PARA ERRORES */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          {error}
        </div>
      )}

      {/* =======================
          NOTIFICACIÓN DE ÉXITO 
          ======================= */}
      {success && (
        <div style={{
          position: 'absolute',
          top: '100%',
          marginTop: '1rem',
          background: '#e8f5ed',
          border: '1px solid #1d8a55',
          color: '#1d8a55',
          padding: '0.6rem 1.5rem',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.85rem',
          fontWeight: 700,
          fontFamily: 'var(--font-body)',
          animation: 'fadeIn 0.3s ease',
          zIndex: 20
        }}>
          <div style={{
            width: '18px',
            height: '18px',
            background: '#1d8a55',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* ICONO DE CHECK PARA ÉXITO */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L10 18L20 6" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          {t.successMsg}
        </div>
      )}
      
      {/* ANIMACIONES */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
