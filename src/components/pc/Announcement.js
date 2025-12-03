import React, { useEffect, useState } from 'react';

const Announcement = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Fade in: aparecer el contenido
        const fadeInTimer = setTimeout(() => {
            setIsVisible(true);
        }, 200);

        return () => {
            clearTimeout(fadeInTimer);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden font-inter p-6">
            <div
                className={`text-center max-w-2xl transition-all duration-700 ease-in-out ${isVisible
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                    }`}
            >
                {/* Icono de tienda cerrada */}
                <div className="mb-12">
                    <svg
                        className="w-24 h-24 mx-auto text-white opacity-70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                        />
                    </svg>
                </div>

                {/* Título */}
                <h1
                    className="text-white text-4xl md:text-5xl font-extralight tracking-wide mb-8"
                    style={{
                        textShadow: '0 0 40px rgba(255, 255, 255, 0.1)',
                        letterSpacing: '0.08em'
                    }}
                >
                    TEMPORALMENTE CERRADO
                </h1>

                {/* Mensaje principal */}
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10">
                    En este momento no estamos recibiendo pedidos.<br />
                    Vuelve pronto cuando el negocio esté abierto.
                </p>

                {/* Línea decorativa */}
                <div className="w-20 h-px bg-gray-700 mx-auto mb-10"></div>

                {/* Información adicional */}
                <p className="text-gray-500 text-base font-light leading-relaxed">
                    Podrás realizar pedidos nuevamente<br />
                    cuando <span className="text-white/80">reabramos nuestras puertas</span>
                </p>

                {/* Logo o footer */}
                <div className="mt-16">
                    <p className="text-gray-700 text-xs font-light tracking-widest uppercase">
                        KiKOi
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
