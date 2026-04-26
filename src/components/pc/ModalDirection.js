import React, { useState } from 'react';

const fraccionamientosData = {
    "45": ["Localidad 1", "Localidad 2"],
    "50": ["Localidad 3", "Localidad 4"]
};

const ModalDirection = ({ isOpen, onClose, onConfirm }) => {
    const [selectedFracc, setSelectedFracc] = useState('');
    const [cost, setCost] = useState(0);

    const [formData, setFormData] = useState({
        dir1: '',
        dir2: '',
        num: '',
        calle: '',
        colonia: '',
        quienRecibe: ''
    });

    if (!isOpen) return null;

    const allFraccs = Object.values(fraccionamientosData).flat();

    const handleFraccChange = (e) => {
        const val = e.target.value;
        setSelectedFracc(val);
        if (val === 'otro') {
            setCost(60);
        } else if (val !== '') {
            let foundCost = 0;
            for (const [c, list] of Object.entries(fraccionamientosData)) {
                if (list.includes(val)) {
                    foundCost = parseInt(c);
                    break;
                }
            }
            setCost(foundCost);
        } else {
            setCost(0);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!selectedFracc) {
            alert('Selecciona un fraccionamiento.');
            return;
        }
        const { dir1, dir2, num, calle, colonia, quienRecibe } = formData;
        // Parsear por ","
        const addressString = `${selectedFracc === 'otro' ? 'Otro' : selectedFracc},${dir1},${dir2},${num},${calle},${colonia},${quienRecibe},Costo de envio: $${cost}`;
        onConfirm(addressString, cost);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black bg-opacity-50" style={{ backdropFilter: 'blur(4px)' }}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative" style={{ animation: 'slideUp 0.3s ease-out' }}>
                <style>{`
                    @keyframes slideUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}</style>
                
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Inter', color: '#2C2C2C' }}>
                    Dirección de envío a domicilio
                </h3>

                <div className="mb-4">
                    <label className="block mb-2 font-semibold text-sm" style={{ fontFamily: 'Inter', color: '#2C2C2C' }}>Fraccionamiento</label>
                    <select 
                        value={selectedFracc} 
                        onChange={handleFraccChange}
                        className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#E36414] transition-colors"
                        style={{ fontFamily: 'Inter' }}
                    >
                        <option value="">Selecciona uno...</option>
                        {allFraccs.map(f => <option key={f} value={f}>{f}</option>)}
                        <option value="otro">Otro</option>
                    </select>
                </div>

                {selectedFracc && (
                    <div className="space-y-3" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                        <style>{`
                            @keyframes fadeIn {
                                from { opacity: 0; }
                                to { opacity: 1; }
                            }
                        `}</style>

                        {cost > 0 && (
                            <div className="p-3 rounded-xl bg-[#FFF3ED] text-[#E36414] font-semibold text-sm text-center mb-4" style={{ fontFamily: 'Inter' }}>
                                Costo de envío: ${cost} MXN
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase">Dir 1</label>
                                <input type="text" name="dir1" value={formData.dir1} onChange={handleChange} placeholder="Ej. Casa blanca" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#E36414]" />
                            </div>
                            <div>
                                <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase">Dir 2</label>
                                <input type="text" name="dir2" value={formData.dir2} onChange={handleChange} placeholder="Ej. Portón negro" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#E36414]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase">Calle</label>
                                <input type="text" name="calle" value={formData.calle} onChange={handleChange} placeholder="Nombre de calle" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#E36414]" />
                            </div>
                            <div>
                                <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase">Num</label>
                                <input type="text" name="num" value={formData.num} onChange={handleChange} placeholder="Ej. 123" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#E36414]" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase">Colonia</label>
                            <input type="text" name="colonia" value={formData.colonia} onChange={handleChange} placeholder="Tu colonia" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#E36414]" />
                        </div>

                        <div>
                            <label className="block mb-1 text-xs font-semibold text-gray-600 uppercase">Quien recibe</label>
                            <input type="text" name="quienRecibe" value={formData.quienRecibe} onChange={handleChange} placeholder="Nombre completo" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#E36414]" />
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button 
                                onClick={onClose}
                                className="flex-1 py-3 rounded-full font-semibold border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                                style={{ fontFamily: 'Inter' }}
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSubmit}
                                className="flex-1 py-3 rounded-full font-bold text-white transition-transform active:scale-95"
                                style={{ fontFamily: 'Inter', background: '#E36414', boxShadow: '0 4px 14px rgba(227, 100, 20, 0.3)' }}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                )}
                
                {!selectedFracc && (
                    <button 
                        onClick={onClose}
                        className="w-full py-3 mt-4 rounded-full font-semibold border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                        style={{ fontFamily: 'Inter' }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </div>
    );
};

export default ModalDirection;
