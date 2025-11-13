
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
const fetchGalleryImages = async () => {
	// Simulación de API delay
	await new Promise(resolve => setTimeout(resolve, 500));
	
	// Datos simulados que vendrían del endpoint
	return {
		status: 'success',
		data: [
			{
				id: 1,
				imageUrl: 'https://drive.google.com/file/d/1Pst9dxo08fVrvrTZQJl8rWtoRDnQI4q5/view?usp=drive_link',
				description: 'Interior de la cafetería'
			},
			{
				id: 2,
				imageUrl: 'https://drive.google.com/file/d/1-XPu0t4bN9sPyp2x7-hBgdrUkxgUAdC9/view?usp=drive_link',
				description: 'Nuestros productos'
			},
			{
				id: 3,
				imageUrl: 'https://drive.google.com/file/d/1t6-6KSRK4sEK1b_zQunQ_Nb0wVxrVOm5/view?usp=drive_link',
				description: 'Ambiente acogedor'
			},
			{
				id: 4,
				imageUrl: 'https://drive.google.com/file/d/1fMOV0JZ6sniiZ_fCebXgf3jY9o8Al0xQ/view?usp=drive_link',
				description: 'Bebidas especiales'
			},
			{
				id: 5,
				imageUrl: 'https://drive.google.com/file/d/1X1j0sjlmuwYB5m-lEsI2fbW0dsjicrBT/view?usp=drive_link',
				description: 'Detalles del café'
			},
			{
				id: 6,
				imageUrl: 'https://drive.google.com/file/d/1nZgeOPGuyLgPJxVJRttsoLJYUADoOvpk/view?usp=drive_link',
				description: 'Experiencia KiKOI'
			}
		]
	};
};

const GalleryBox = () => {
	const [galleryImages, setGalleryImages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch imágenes de galería al montar el componente
		const loadGalleryImages = async () => {
			try {
				setLoading(true);
				const response = await fetchGalleryImages();
				if (response.status === 'success' && Array.isArray(response.data)) {
					setGalleryImages(response.data);
				}
			} catch (error) {
				console.error('Error al cargar galería:', error);
			} finally {
				setLoading(false);
			}
		};

		loadGalleryImages();
	}, []);

	if (loading) {
		return (
			<div className="max-w-6xl mx-auto">
				<h2 className="text-4xl font-extralight mb-16 text-center">Galería</h2>
				<div className="flex justify-center items-center py-16">
					<div className="text-gray-400 font-light">Cargando galería...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto">
			<h2 className="text-4xl font-extralight mb-16 text-center">Galería</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{galleryImages.map((item) => (
					<div key={item.id} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
						<img 
							src={formatGoogleDriveUrl(item.imageUrl)} 
							alt={item.description || `Galería ${item.id}`} 
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
						/>
					</div>
				))}
			</div>

			{/* Mensaje cuando no hay imágenes */}
			{galleryImages.length === 0 && !loading && (
				<div className="text-center py-16">
					<h3 className="text-xl font-light text-gray-400 mb-2">No hay imágenes disponibles</h3>
					<p className="text-gray-400 text-sm font-light">Vuelve pronto para ver nuestra galería</p>
				</div>
			)}
		</div>
	);
};

export default GalleryBox;
