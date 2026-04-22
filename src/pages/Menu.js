import React, { useEffect, useState, useMemo } from 'react';
import Footer from '../components/pc/Footer';
import Billingcar from '../components/pc/Billingcar';
import ProductCardMenu from '../components/pc/ProductCardMenu';
import ModalSuccessMobile from '../components/pc/ModalSuccessMobile';
import DynamicIslandTimer from '../components/pc/DynamicIslandTimer';
import BrownButton from '../utils/OrangeButton';
import BrownRounded from '../utils/OrangeCircle';
import OrangeRounded from '../utils/OrangeRounded';
import SearchBar from '../utils/searchbar';
import CarouselTag, { PROMOS_CATEGORY_ID } from '../components/pc/CarouselTag';
import InstallPWA from '../utils/InstallPWA';
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
	toast(
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
			<span style={{ fontWeight: 700, fontSize: '14px', lineHeight: '18px' }}>Agregado</span>
			<span style={{ fontWeight: 400, fontSize: '13px', lineHeight: '17px', opacity: 0.9 }}>
				{item.name} ha sido agregado al carrito
			</span>
		</div>,
		{
			position: 'top-left',
			duration: 2000,
			icon: false,
			style: {
				background: '#CE5C28',
				color: 'rgba(255,255,255,0.95)',
				fontFamily: 'Inter, sans-serif',
				borderRadius: '12px',
				border: 'none',
				boxShadow: '0 4px 16px rgba(206,92,40,0.4)',
				alignItems: 'flex-start',
			},
		}
	);
};

const Menu = () => {
	const [categories, setCategories] = useState([]);
	const [menuItems, setMenuItems] = useState([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState(PROMOS_CATEGORY_ID);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [isMobile, setIsMobile] = useState(false);


	// Detectar móvil
	useEffect(() => {
		const checkIsMobile = () => {
			const isSmall = window.innerWidth <= 768;
			setIsMobile(isSmall);
		};
		checkIsMobile();
		window.addEventListener('resize', checkIsMobile);
		return () => window.removeEventListener('resize', checkIsMobile);
	}, []);

	// Store data
	const showSuccess = useCartStore(state => state.showSuccess);
	const orderData = useCartStore(state => state.orderData);
	const customerName = useCartStore(state => state.customerName);
	const setShowSuccess = useCartStore(state => state.setShowSuccess);
	const setOrderData = useCartStore(state => state.setOrderData);
	const setCustomerNameGlobal = useCartStore(state => state.setCustomerName);
	const setCartOpen = useCartStore(state => state.setCartOpen);
	const cartCount = useCartStore(state => state.cart.reduce((sum, i) => sum + i.qty, 0));

	const handleCloseSuccess = () => {
		setShowSuccess(false);
		setOrderData(null);
		setCustomerNameGlobal('');
	};

	// Fetch Data
	const fetchMenuItems = () => {
		const today = new Date();
		const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

		fetch(`https://kikoi-management.mindnt.com.mx/items/get-items-day?day=${formattedDate}`)
			.then(res => res.json())
			.then(data => {
				if (data.status === 'success' && Array.isArray(data.data)) {
					const normalizedItems = data.data.map(item => ({
						...item,
						name: item.Nombre || item.name,
						atributo_1: item.Atributo_1 || item.atributo_1,
						atributo_2: item.Atributo_2 || item.atributo_2
					}));
					setMenuItems(normalizedItems);
				}
			})
			.catch(err => console.error('Error fetching items:', err));
	};

	const fetchCategories = () => {
		fetch('https://kikoi-management.mindnt.com.mx/items/categories')
			.then(res => res.json())
			.then(data => {
				if (data.status === 'success' && Array.isArray(data.data)) {
					const activeCats = data.data.filter(cat => cat.is_active);
					setCategories(activeCats);
					if (activeCats.length > 0 && !selectedCategoryId) {
						setSelectedCategoryId(activeCats[0].id);
					}
				}
			})
			.catch(err => console.error('Error fetching categories:', err));
	};

	useEffect(() => {
		fetchCategories();
		fetchMenuItems();
		const intervalId = setInterval(fetchMenuItems, 5000);
		return () => clearInterval(intervalId);
	}, []);

	// Filtering
	const filteredItems = useMemo(() => {
		let items = menuItems;

		// Search overrides category filter
		if (searchTerm.trim()) {
			return items.filter(item =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
			);
		}

		// Virtual Promociones category: show items with apply_promotions === 1
		if (selectedCategoryId === PROMOS_CATEGORY_ID) {
			return items.filter(item => item.apply_promotions === 1 || item.apply_promotions === true);
		}

		if (selectedCategoryId) {
			return items.filter(item => item.category_id === selectedCategoryId);
		}

		return [];
	}, [menuItems, selectedCategoryId, searchTerm]);

	const selectedCategoryName = categories.find(c => c.id === selectedCategoryId)?.name || 'Menú';

	return (
		<>
			<Toaster position="top-left" />
			{/* Responsive container: full-width on tablet, centered on very wide screens */}
			<div className="w-full max-w-[900px] mx-auto">
				<DynamicIslandTimer />
				<div className="min-h-screen bg-white relative pb-[100px]">

					{/* Custom Header */}
					<header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-0 pt-6 pb-3 transition-all duration-300">
						<div className="flex items-center justify-between mb-4 px-6">
							<div className="flex flex-col" style={{ gap: '2px' }}>
								<p
									style={{
										fontFamily: 'Inter',
										fontWeight: 400,
										fontSize: '12px',
										lineHeight: '15px',
										color: '#ABABAB',
										margin: 0,
									}}
								>
									Bienvenido
								</p>
								<h1
									style={{
										fontFamily: 'Inter',
										fontWeight: 700,
										fontSize: '22px',
										lineHeight: '27px',
										color: '#1A1A1A',
										margin: 0,
									}}
								>
									{customerName || 'Invitado'}
								</h1>
							</div>
							<div className="flex items-center gap-3">
								<InstallPWA />
								<button
									onClick={() => setCartOpen(true)}
									className="relative flex items-center gap-2 transition-all duration-200 active:scale-95"
									style={{
										background: '#E36414',
										borderRadius: '25px',
										border: 'none',
										outline: 'none',
										padding: '10px 16px',
										minHeight: '40px',
										cursor: 'pointer',
									}}
								>
									{/* Badge — top-left corner of the button */}
									{cartCount > 0 && (
										<span
											className="absolute flex items-center justify-center"
											style={{
												top: '-8px',
												left: '-8px',
												minWidth: '20px',
												height: '20px',
												padding: '0 5px',
												background: '#000000',
												borderRadius: '99px',
												fontFamily: 'Inter, sans-serif',
												fontWeight: 700,
												fontSize: '10px',
												lineHeight: '1',
												color: '#FFFFFF',
												border: '2px solid #FFFFFF',
												zIndex: 10,
											}}
										>
											{cartCount > 99 ? '99+' : cartCount}
										</span>
									)}
									{/* Cart icon */}
									<img
										src={`${process.env.PUBLIC_URL}/assets/icon_cart.svg`}
										alt="Carrito"
										className="w-[18px] h-[18px]"
										style={{ filter: 'brightness(0) invert(1)' }}
									/>
									<span style={{
										fontFamily: 'Inter',
										fontWeight: 400,
										fontSize: '14px',
										color: '#FFFFFF'
									}}>Carrito</span>
								</button>
							</div>
						</div>

						{/* Search Bar */}
						<div className="px-6 mb-2">
							<SearchBar
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{/* Category Carousel */}
						{!searchTerm && (
							<CarouselTag
								onCategoryChange={setSelectedCategoryId}
								selectedCategoryId={selectedCategoryId}
							/>
						)}
						{searchTerm && (
							<h2 className="text-2xl font-light text-gray-900 px-6">Resultados</h2>
						)}
					</header >

					{/* Product List */}
					<main className="px-3 py-4">
						{
							filteredItems.length > 0 ? (
								<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
									{filteredItems.map(item => (
										<ProductCardMenu
											key={item.id}
											id={item.id}
											name={item.name}
											price={item.price}
											img={formatGoogleDriveUrl(item.img_item)}
											description={item.description}
											atributo_1={item.atributo_1}
											atributo_2={item.atributo_2}
											apply_promotions={item.apply_promotions}
											onAdd={addToCart}
										/>
									))}
								</div>
							) : (
								<div className="flex flex-col items-center justify-center py-20 px-6 text-center">
									<p className="text-gray-400 font-light mb-2">No se encontraron productos en esta categoría o búsqueda.</p>
									<button
										onClick={() => { setSearchTerm(''); setSelectedCategoryId(categories[0]?.id); }}
										className="text-brand-orange text-sm font-medium hover:underline"
									>
										Limpiar filtros
									</button>
								</div>
							)
						}
					</main >

					{/* Footer Fixed */}
					<Footer />

					{/* Sidebars/Modals */}
					< Billingcar />
					<ModalSuccessMobile
						isOpen={showSuccess}
						orderData={orderData}
						customerName={customerName}
						onClose={handleCloseSuccess}
					/>

				</div >
			</div>
		</>
	);
};

export default Menu;
