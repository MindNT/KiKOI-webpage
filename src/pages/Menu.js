import React, { useEffect, useState, useMemo, useRef } from 'react';
import Footer from '../components/pc/Footer';
import Billingcar from '../components/pc/Billingcar';
import ProductCardMenu from '../components/pc/ProductCardMenu';
import ModalSuccessMobile from '../components/pc/ModalSuccessMobile';
import BrownButton from '../utils/OrangeButton';
import BrownRounded from '../utils/OrangeCircle';
import OrangeRounded from '../utils/OrangeRounded';
import SearchBar from '../utils/searchbar';
import CarouselTag from '../components/pc/CarouselTag';
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
	toast.success(`✓ ${item.name} agregado al carrito`, {
		position: 'top-center',
		duration: 2000,
		className: 'bg-gray-900 text-white text-sm font-medium shadow-lg border-none',
	});
};

const Menu = () => {
	const [categories, setCategories] = useState([]);
	const [menuItems, setMenuItems] = useState([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [isMobile, setIsMobile] = useState(false);

	/* Logic for Swipe-based Category Selection */
	const productListRef = useRef(null);
	const touchStartX = useRef(0);
	const touchEndX = useRef(0);



	// Swipe handlers for product list
	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchMove = (e) => {
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		if (!touchStartX.current || !touchEndX.current) return;

		const swipeDistance = touchStartX.current - touchEndX.current;
		const minSwipeDistance = 50; // Minimum distance for a swipe

		if (Math.abs(swipeDistance) > minSwipeDistance) {
			const currentIndex = categories.findIndex(c => c.id === selectedCategoryId);

			if (swipeDistance > 0) {
				// Swiped left - go to previous category
				const prevIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
				setSelectedCategoryId(categories[prevIndex].id);
			} else {
				// Swiped right - go to next category
				const nextIndex = (currentIndex + 1) % categories.length;
				setSelectedCategoryId(categories[nextIndex].id);
			}
		}

		// Reset
		touchStartX.current = 0;
		touchEndX.current = 0;
	};

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

		// Filter by category if not searching globally (or even if searching, usually scoped to cat or global? 
		// Reference implies category view. I'll filter by category first unless searching.)
		// But mobile apps usually search *all*. I'll keep it simple: Search overrides category, else show category.
		if (searchTerm.trim()) {
			return items.filter(item =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
			);
		}

		if (selectedCategoryId) {
			return items.filter(item => item.category_id === selectedCategoryId);
		}

		return [];
	}, [menuItems, selectedCategoryId, searchTerm]);

	const selectedCategoryName = categories.find(c => c.id === selectedCategoryId)?.name || 'Menú';

	return (
		<>
			<Toaster richColors={false} position="top-center" />
			{/* Max-width container for mobile - responsive */}
			<div className="w-full sm:max-w-[480px] mx-auto">
				<div className="min-h-screen bg-white relative pb-[100px]">

					{/* Custom Header */}
					<header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-0 pt-6 pb-3 transition-all duration-300">
						<div className="flex items-center justify-between mb-4 px-6">
							<div className="flex flex-col">
								<h1
									style={{
										fontFamily: 'Inter',
										fontStyle: 'normal',
										fontWeight: 400,
										fontSize: '20px',
										lineHeight: '24px',
										color: '#CE5C28'
									}}
									className="text-left"
								>
									BIENVENIDO!
								</h1>
								<p
									style={{
										fontFamily: 'Inter',
										fontStyle: 'normal',
										fontWeight: 800,
										fontSize: '16px',
										lineHeight: '19px',
										color: '#2C2C2C'
									}}
									className="text-left"
								>
									{customerName || 'Invitado'}
								</p>
							</div>
							<div className="flex items-center gap-3">
								<BrownRounded
									text="Carrito"
									icon={`${process.env.PUBLIC_URL}/assets/icon_cart.svg`}
									onClick={() => setCartOpen(true)}
								/>
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
					< main
						ref={productListRef}
						className="px-3 py-4"
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
					>
						{
							filteredItems.length > 0 ? (
								<div className="grid grid-cols-2 gap-2 justify-items-center">
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
