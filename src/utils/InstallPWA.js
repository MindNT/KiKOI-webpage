import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import WhiteRoundedReturn from './WhiteRoundedReturn';

/**
 * InstallPWA
 * - Si Chrome lanza `beforeinstallprompt`, instala automáticamente.
 * - Si no, muestra modal naranja de pantalla completa estática (sin scroll).
 * - Usa ReactDOM.createPortal para escapar cualquier stacking context de ancestros.
 */
const InstallPWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;
        if (isStandalone) setIsInstalled(true);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
        });
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    if (isInstalled) return null;

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') setIsInstalled(true);
            setDeferredPrompt(null);
        } else {
            setShowModal(true);
        }
    };

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

    const steps = isIOS
        ? [
            { num: 1, text: 'Abre Safari y visita la página de KiKOI' },
            { num: 2, text: 'Toca Compartir en la barra inferior (caja con flecha ↑)' },
            { num: 3, text: 'Selecciona "Agregar a pantalla de inicio"' },
            { num: 4, text: 'Confirma tocando "Agregar" arriba a la derecha' },
        ]
        : [
            { num: 1, text: 'Toca los tres puntos ⋮ en la esquina superior derecha de Chrome' },
            { num: 2, text: 'Selecciona "Instalar aplicación" o "Agregar a pantalla de inicio"' },
            { num: 3, text: 'Confirma tocando "Instalar" en el diálogo que aparece' },
        ];

    const modalContent = (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: '#CE5C28',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',           // No scroll en ningún nivel
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '480px',
                    margin: '0 auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between', // Distribuye el espacio entre secciones
                    padding: '24px 24px 36px',
                    boxSizing: 'border-box',
                }}
            >
                {/* ── Top: back button ── */}
                <div style={{ flexShrink: 0 }}>
                    <WhiteRoundedReturn onClick={() => setShowModal(false)} />
                </div>

                {/* ── Center: icon + title + subtitle ── */}
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.20)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 18px',
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 3v13m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h2
                        style={{
                            fontFamily: 'Inter',
                            fontWeight: 800,
                            fontSize: '26px',
                            lineHeight: '32px',
                            color: '#FFFFFF',
                            margin: '0 0 10px',
                        }}
                    >
                        Instala KiKOI
                    </h2>
                    <p
                        style={{
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '1.55',
                            color: 'rgba(255,255,255,0.80)',
                            margin: 0,
                        }}
                    >
                        Accede más rápido desde tu pantalla de inicio, sin abrir el navegador
                    </p>
                </div>

                {/* ── Steps — no scroll, gap proporcional ── */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p
                        style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '11px',
                            letterSpacing: '0.10em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.60)',
                            margin: '0 0 6px',
                        }}
                    >
                        Pasos a seguir
                    </p>

                    {steps.map((step) => (
                        <div
                            key={step.num}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                background: 'rgba(255,255,255,0.15)',
                                borderRadius: '16px',
                                padding: '14px 16px',
                            }}
                        >
                            <div
                                style={{
                                    width: 34,
                                    height: 34,
                                    borderRadius: '50%',
                                    background: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <span style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: '15px', color: '#CE5C28' }}>
                                    {step.num}
                                </span>
                            </div>
                            <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', lineHeight: '1.45', color: '#FFFFFF' }}>
                                {step.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── Bottom: action button ── */}
                <div style={{ flexShrink: 0 }}>
                    <button
                        onClick={() => setShowModal(false)}
                        onPointerDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                        onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        style={{
                            width: '100%',
                            height: '50px',
                            background: '#FFFFFF',
                            borderRadius: '25px',
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Inter',
                            fontWeight: 700,
                            fontSize: '16px',
                            color: '#CE5C28',
                            transition: 'transform 0.1s',
                        }}
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Install Button — icon only */}
            <button
                onClick={handleInstallClick}
                style={{
                    background: 'transparent',
                    border: '1.5px solid rgba(227,100,20,0.35)',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    outline: 'none',
                    flexShrink: 0,
                }}
                title="Instalar aplicación"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 3v13m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                        stroke="#E36414"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {showModal && ReactDOM.createPortal(modalContent, document.body)}
        </>
    );
};

export default InstallPWA;
