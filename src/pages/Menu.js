import React, { useEffect, useState } from 'react';
import Navbar from '../components/pc/Navbar';
import Footer from '../components/pc/Footer';
import Billingcar from '../components/pc/Billingcar';
import ProductCard from '../components/pc/ProductCard';
import { useCartStore } from '../cartStore';
import { Toaster, toast } from 'sonner';


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



const addToCart = (item) => {
	useCartStore.getState().addToCart(item);
	toast.success(`Agregado: ${item.name}`, {
		position: 'bottom-left',
		duration: 2000,
	});
};




const Menu = () => {
       // Estado para categorías y productos (debe estar dentro del componente)
       const [categories, setCategories] = useState([]);
       const [menuItems, setMenuItems] = useState([]);

       // Fetch categorías y productos al montar el componente
       useEffect(() => {
	       // Obtener categorías
	       fetch('https://kikoi-management.mindnt.com.mx/items/categories')
		       .then(res => res.json())
		       .then(data => {
			       if (data.status === 'success' && Array.isArray(data.data)) {
				       setCategories(data.data.filter(cat => cat.is_active));
			       }
		       });
	       // Obtener productos
	       fetch('https://kikoi-management.mindnt.com.mx/items/get-items')
		       .then(res => res.json())
		       .then(data => {
			       if (data.status === 'success' && Array.isArray(data.data)) {
				       setMenuItems(data.data);
			       }
		       });
       }, []);

       return (
	       <>
		       <Toaster richColors position="bottom-left" />
		       <div className="min-h-screen bg-white font-inter relative">
			       {/* Navbar flotante */}
			       <div className="fixed top-0 left-0 w-full z-50 bg-white">
				       <Navbar />
			       </div>
			       {/* Contenido scrolleable */}
			       <div className="pt-20 pb-20 px-8 min-h-[calc(100vh-128px)] overflow-y-auto">
				       <h2 className="text-4xl font-extralight mb-16 text-center">Menú</h2>
				       {categories.map(category => {
					       const items = menuItems.filter(item => item.category_id === category.id);
					       return (
						       <div key={category.id} className="mb-20">
							       <h3 className="text-2xl font-extralight mb-8 text-gray-600">{category.name}</h3>
							       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
								       {items.map(item => (
									       <ProductCard
										       key={item.id}
										       id={item.id}
										       name={item.name}
										       price={item.price}
										       img={formatGoogleDriveUrl(item.img_item)}
										       description={item.description}
										       onAdd={addToCart}
									       />
								       ))}
							       </div>
						       </div>
					       );
				       })}
			       </div>
			       {/* Footer flotante */}
			       <div className="fixed bottom-0 left-0 w-full z-50 bg-white">
				       <Footer />
			       </div>
			       {/* Billingcar sidebar */}
			       <Billingcar />
		       </div>
	       </>
       );
};

export default Menu;
