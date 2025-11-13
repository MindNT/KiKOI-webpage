import React, { useState, useEffect } from 'react';

// Función para formatear URLs de Google Drive
const formatGoogleDriveUrl = (url) => {
	if (!url) return '';
	let fileId = '';
	const fileIdMatch = url.match(/\/d\/(.*?)(\/|$|\?)/);
	if (fileIdMatch) {
		fileId = fileIdMatch[1];
	}
	const ucMatch = url.match(/id=(.*?)($|&)/);
	if (ucMatch) {
		fileId = ucMatch[1];
	}
	if (!fileId) return url;
	return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
};

// Endpoint simulado - Próximamente vendrá del backend
const fetchPromotions = async () => {
  // Simulación de API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Datos simulados que vendrían del endpoint
  return {
    status: 'success',
    data: [
      { 
        id: 1,
        title: '2 Lattes x $80',
        description: 'Disfruta de dos deliciosos lattes por solo $80 pesos',
        validUntil: 'Martes y jueves',
        posterImage: 'https://drive.google.com/file/d/1NlXubNA51bjLKIyQlWWuhJPdtP16fExq/view?usp=drive_link',
        discount: '$80',
        active: true
      },
      { 
        id: 2,
        title: 'Desayuno Completo',
        description: 'Sandwich + Café por solo $89 pesos',
        validUntil: 'Hasta las 10:00 AM',
        posterImage: 'https://drive.google.com/file/d/1Sk2Sdpx8hkfVlgk4-UwJqGqxMTOlIWsp/view?usp=drive_link',
        discount: '$89',
        active: true
      }
    ]
  };
};

const PromotionsBox = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch promociones al montar el componente
    const loadPromotions = async () => {
      try {
        setLoading(true);
        const response = await fetchPromotions();
        if (response.status === 'success' && Array.isArray(response.data)) {
          setPromotions(response.data);
        }
      } catch (error) {
        console.error('Error al cargar promociones:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPromotions();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extralight mb-16 text-center">Promociones</h2>
        <div className="flex justify-center items-center py-16">
          <div className="text-gray-400 font-light">Cargando promociones...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-extralight mb-16 text-center">Promociones</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {promotions.map((promo) => (
          <div 
            key={promo.id} 
            className="group bg-gray-50 rounded-2xl overflow-hidden hover:bg-gray-100 transition-colors"
          >
            {/* Poster Image - Minimalista */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img 
                src={formatGoogleDriveUrl(promo.posterImage)}
                alt={promo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback minimalista
                  e.target.style.display = 'none';
                  const parent = e.target.parentElement;
                  parent.innerHTML = `
                    <div class="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gray-100">
                      <div class="text-gray-900 text-6xl font-extralight mb-4">${promo.discount}</div>
                      <div class="text-gray-600 text-xl font-light">${promo.title}</div>
                    </div>
                  `;
                }}
              />
              
              {/* Badge de descuento - Minimalista */}
              {promo.discount && (
                <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-light">
                  {promo.discount}
                </div>
              )}
            </div>
            
            {/* Información de la promoción */}
            <div className="p-6">
              <h3 className="text-xl font-light mb-2 text-gray-900">
                {promo.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 font-light">
                {promo.description}
              </p>
              
              {/* Validez */}
              <div className="text-xs text-gray-400 font-light">
                {promo.validUntil}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mensaje cuando no hay promociones */}
      {promotions.length === 0 && !loading && (
        <div className="text-center py-16">
          <h3 className="text-xl font-light text-gray-400 mb-2">No hay promociones activas</h3>
          <p className="text-gray-400 text-sm font-light">Vuelve pronto para ver nuestras nuevas ofertas</p>
        </div>
      )}
    </div>
  );
};

export default PromotionsBox;
