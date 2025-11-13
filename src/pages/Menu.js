import React, { useEffect, useState } from 'react';
import Navbar from '../components/pc/Navbar';
import Footer from '../components/pc/Footer';
import Billingcar from '../components/pc/Billingcar';
import ProductCard from '../components/pc/ProductCard';
import ModalSuccess from '../components/pc/ModalSuccess';
import ModalSuccessMobile from '../components/pc/ModalSuccessMobile';
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
	toast.success(`✓ ${item.name} agregado al carrito · $${item.price}`, {
		position: 'top-center',
		duration: 3000,
		className: 'bg-gray-50 text-gray-800 border border-gray-200 font-inter text-sm font-normal shadow-sm',
	});
};




const Menu = () => {
       // Estado para categorías y productos (debe estar dentro del componente)
       const [categories, setCategories] = useState([]);
       const [menuItems, setMenuItems] = useState([]);
       const [searchTerm, setSearchTerm] = useState('');
       
       // Hook para detectar dispositivos móviles
       const [isMobile, setIsMobile] = useState(false);
       
       useEffect(() => {
               const checkIsMobile = () => {
                       const userAgent = navigator.userAgent || navigator.vendor || window.opera;
                       const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
                       const isMobileUA = mobileRegex.test(userAgent.toLowerCase());
                       const isSmallScreen = window.innerWidth <= 768;
                       setIsMobile(isMobileUA || isSmallScreen);
               };

               checkIsMobile();
               window.addEventListener('resize', checkIsMobile);
               return () => window.removeEventListener('resize', checkIsMobile);
       }, []);
       
       // Estados del modal de éxito
       const showSuccess = useCartStore(state => state.showSuccess);
       const orderData = useCartStore(state => state.orderData);
       const customerName = useCartStore(state => state.customerName);
       const setShowSuccess = useCartStore(state => state.setShowSuccess);
       const setOrderData = useCartStore(state => state.setOrderData);
       const setCustomerNameGlobal = useCartStore(state => state.setCustomerName);

       // Función para cerrar el modal de éxito
       const handleCloseSuccess = () => {
               setShowSuccess(false);
               setOrderData(null);
               setCustomerNameGlobal('');
       };

       // Función para scroll suave a una categoría
       const scrollToCategory = (categoryId) => {
               const element = document.getElementById(`category-${categoryId}`);
               if (element) {
                       const navbarHeight = 80; // Altura del navbar fijo
                       const offset = navbarHeight + 20; // Espacio adicional
                       const elementPosition = element.getBoundingClientRect().top;
                       const offsetPosition = elementPosition + window.pageYOffset - offset;
                       
                       window.scrollTo({
                               top: offsetPosition,
                               behavior: 'smooth'
                       });
               }
       };

       // Función para filtrar productos por búsqueda
       const filterItemsBySearch = (items) => {
               if (!searchTerm.trim()) return items;
               return items.filter(item => 
                       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                       (item.atributo_1 && item.atributo_1.toLowerCase().includes(searchTerm.toLowerCase())) ||
                       (item.atributo_2 && item.atributo_2.toLowerCase().includes(searchTerm.toLowerCase()))
               );
       };

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
		       <Toaster 
			       richColors={false} 
			       position="top-center"
			       toastOptions={{
				       className: 'bg-gray-50 text-gray-800 border border-gray-200 font-inter text-sm font-normal shadow-sm',
			       }}
		       />
		       <div className="min-h-screen bg-white font-inter relative">
			       {/* Navbar flotante */}
			       <div className="fixed top-0 left-0 w-full z-50 bg-white">
				       <Navbar />
			       </div>
			       {/* Contenido scrolleable */}
			       <div className="pt-20 pb-20 px-8 min-h-[calc(100vh-128px)] overflow-y-auto">
				       <h2 className="text-4xl font-extralight mb-8 text-center">Menú</h2>
				       
				       {/* Barra de búsqueda */}
				       <div className="max-w-md mx-auto mb-8">
					       <div className="relative">
						       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
								       <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							       </svg>
						       </div>
						       <input
							       type="text"
							       placeholder="Buscar productos..."
							       value={searchTerm}
							       onChange={(e) => setSearchTerm(e.target.value)}
							       className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm font-light transition-all duration-200"
							       style={{
								       background: 'rgba(249, 250, 251, 0.8)',
								       backdropFilter: 'blur(10px)'
							       }}
						       />
						       {searchTerm && (
							       <button
								       onClick={() => setSearchTerm('')}
								       className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
							       >
								       <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
									       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								       </svg>
							       </button>
						       )}
					       </div>
				       </div>
				       
				       {/* Navegación por categorías - Principios de Ive: simplicidad y funcionalidad */}
				       {!searchTerm && categories.length > 0 && (
					       <div className="mb-8">
						       <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
							       {categories.map(category => {
								       const items = menuItems.filter(item => item.category_id === category.id);
								       if (items.length === 0) return null;
								       
								       return (
									       <button
										       key={category.id}
										       onClick={() => scrollToCategory(category.id)}
										       className="px-4 md:px-6 py-2 md:py-3 rounded-full border border-gray-200 text-sm md:text-base font-light transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm active:scale-95"
										       style={{
											       background: 'rgba(255, 255, 255, 0.9)',
											       backdropFilter: 'blur(10px)',
											       WebkitBackdropFilter: 'blur(10px)'
										       }}
									       >
										       {category.name}
									       </button>
								       );
							       })}
						       </div>
					       </div>
				       )}
				       
				       {/* Leyenda de instrucciones */}
				       <div className="flex items-center justify-center gap-2 mb-16 text-gray-500">
					       <img 
						       src={process.env.PUBLIC_URL + '/assets/click.svg'} 
						       alt="Click" 
						       className="w-4 h-4 opacity-60" 
					       />
					       <p className="text-sm font-light">
						       Toca el botón <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-xs font-semibold text-gray-600 mx-1">i</span> para ver la descripción
					       </p>
				       </div>
				       {categories.map(category => {
					       const items = menuItems.filter(item => item.category_id === category.id);
					       const filteredItems = filterItemsBySearch(items);
					       
					       // Solo mostrar la categoría si tiene productos que coincidan con la búsqueda
					       if (filteredItems.length === 0) return null;
					       
					       return (
						       <div key={category.id} className="mb-20" id={`category-${category.id}`}>
							       <h3 className="text-2xl font-extralight mb-8 text-gray-600">
								       {category.name}
								       {searchTerm && (
									       <span className="text-sm text-gray-400 font-normal ml-2">
										       ({filteredItems.length} resultado{filteredItems.length !== 1 ? 's' : ''})
									       </span>
								       )}
							       </h3>
							       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
							       {filteredItems.map(item => (
								       <ProductCard
									       key={item.id}
									       id={item.id}
									       name={item.name}
									       price={item.price}
									       img={formatGoogleDriveUrl(item.img_item)}
									       description={item.description}
									       atributo_1={item.atributo_1}
									       atributo_2={item.atributo_2}
									       onAdd={addToCart}
								       />
							       ))}
							       </div>
						       </div>
					       );
				       })}
				       
				       {/* Mensaje cuando no hay resultados */}
				       {searchTerm && categories.every(category => {
					       const items = menuItems.filter(item => item.category_id === category.id);
					       const filteredItems = filterItemsBySearch(items);
					       return filteredItems.length === 0;
				       }) && (
					       <div className="text-center py-16">
						       <div className="mb-4">
							       <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
								       <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							       </svg>
						       </div>
						       <h3 className="text-xl font-light text-gray-400 mb-2">No se encontraron productos</h3>
						       <p className="text-gray-400 text-sm">
							       Intenta con otro término de búsqueda o 
							       <button 
								       onClick={() => setSearchTerm('')}
								       className="text-gray-600 hover:text-gray-800 underline ml-1"
							       >
								       ver todos los productos
							       </button>
						       </p>
					       </div>
				       )}
			       </div>
		       {/* Footer flotante */}
		       <div className="fixed bottom-0 left-0 w-full z-50 bg-white">
			       <Footer />
		       </div>
		       {/* Billingcar sidebar */}
		       <Billingcar />
		       
		       {/* Modal de éxito - Condicional según dispositivo */}
		       {isMobile ? (
			       <ModalSuccessMobile 
				       isOpen={showSuccess}
				       orderData={orderData}
				       customerName={customerName}
				       onClose={handleCloseSuccess}
			       />
		       ) : (
			       <ModalSuccess 
				       isOpen={showSuccess}
				       orderData={orderData}
				       customerName={customerName}
				       onClose={handleCloseSuccess}
			       />
		       )}
	       </div>
       </>
       );
};

export default Menu;
