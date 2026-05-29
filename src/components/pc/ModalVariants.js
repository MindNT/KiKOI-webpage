import React, { useState, useEffect } from 'react';

const ModalVariants = ({ isOpen, onClose, onConfirm, item }) => {
    const [variantCatalog, setVariantCatalog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selections, setSelections] = useState([]);

    useEffect(() => {
        if (!isOpen) return;
        const fetchVariants = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('https://kikoi-management.mindnt.com.mx/orders/variants');
                if (!res.ok) throw new Error('No se pudo cargar variantes');
                const data = await res.json();
                if (data.status === 'success') {
                    setVariantCatalog(data.data);
                } else {
                    throw new Error('Respuesta inesperada');
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVariants();
        setSelections([]);
    }, [isOpen, item]);

    if (!isOpen || !item) return null;

    const handleSelect = (category, option, price) => {
        setSelections(prev => {
            const existingIndex = prev.findIndex(s => s.category === category && s.option === option);
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated.splice(existingIndex, 1);
                return updated;
            }
            return [...prev, { category, option, price }];
        });
    };

    const handleConfirm = () => {
        if (!variantCatalog) {
            onConfirm(item);
            return;
        }

        onConfirm({
            ...item,
            variants: selections
        });
    };

    const extraTotal = selections.reduce((sum, s) => sum + s.price, 0);

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position: 'fixed', inset: 0, zIndex: 10000,
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            }}
        >
            <style>{`
        @keyframes slideUpWeb { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .mv-panel-web { animation: slideUpWeb 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

            <div
                className="mv-panel-web w-full sm:max-w-[480px] bg-white rounded-t-3xl sm:rounded-3xl sm:mb-auto sm:mt-auto sm:h-auto flex flex-col"
                style={{
                    maxHeight: '90vh',
                    boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
                    <div>
                        <h2 className="text-[22px] font-bold text-[#1A1A1A] font-inter">Personaliza tu pedido</h2>
                        <p className="text-[14px] text-[#969696] font-inter mt-1">Agrega opciones a tu {item.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {loading && (
                        <div className="py-10 flex flex-col items-center justify-center gap-3">
                            <div className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-[#E36414] animate-spin" />
                            <span className="text-[#969696] text-sm font-inter">Cargando opciones...</span>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-500 rounded-xl text-center text-sm font-inter">
                            {error}
                        </div>
                    )}

                    {!loading && !error && variantCatalog && (
                        <div className="flex flex-col gap-8">
                            {Object.entries(variantCatalog).map(([category, options]) => {
                                const selectedOptions = selections.filter(s => s.category === category).map(s => s.option);

                                return (
                                    <div key={category}>
                                        <h3 className="text-[14px] font-bold text-[#1A1A1A] font-inter mb-3 uppercase tracking-wider">{category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(options).map(([option, price]) => {
                                                const active = selectedOptions.includes(option);
                                                return (
                                                    <button
                                                        key={option}
                                                        onClick={() => handleSelect(category, option, price)}
                                                        className="transition-all duration-200 active:scale-95"
                                                        style={{
                                                            padding: '8px 16px',
                                                            borderRadius: '999px',
                                                            fontSize: '14px',
                                                            fontFamily: 'Inter',
                                                            fontWeight: active ? '600' : '400',
                                                            border: active ? '1.5px solid #E36414' : '1.5px solid #E0E0E0',
                                                            background: active ? '#FFF3ED' : '#FFFFFF',
                                                            color: active ? '#E36414' : '#535353',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '6px'
                                                        }}
                                                    >
                                                        {option}
                                                        {price > 0 && (
                                                            <span style={{ fontSize: '12px', opacity: 0.8 }}>+${price.toFixed(0)}</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-gray-100 flex-shrink-0 bg-white sm:rounded-b-3xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[13px] text-[#969696] font-inter font-medium mb-1">Precio con extras</span>
                            <span className="text-[24px] text-[#E36414] font-inter font-extrabold tracking-tight">
                                <span className="text-[#E36414]">$</span>{((item.price + extraTotal) * (item.qty || 1)).toFixed(2)}
                            </span>
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={loading || error !== null}
                            className="flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50"
                            style={{
                                width: '150px',
                                height: '48px',
                                background: '#E36414',
                                borderRadius: '25px',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(227, 100, 20, 0.25)',
                                color: '#FFFFFF',
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                fontSize: '15px'
                            }}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalVariants;
