import React from 'react';
import { useLocation } from 'wouter';
import { useCartStore } from '../../cartStore';

const Footer = () => {
	const [location, setLocation] = useLocation();
	const setCartOpen = useCartStore(state => state.setCartOpen);
	const cartOpen = useCartStore(state => state.cartOpen);

	if (cartOpen) return null;

	// Normalize location
	const isActive = (path) => location === path;

	// Add custom SVG icon for Wallet instead of relying on missing public asset
	const WalletIcon = ({ color }) => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 4H14V14H4V4Z" stroke={color} strokeWidth="2" />
			<path d="M7 17H17V7H17" stroke={color} strokeWidth="2" />
			<path d="M14 14V20H4V14H14Z" stroke={color} strokeWidth="2" />
			<path d="M20 14V10H14V14H20Z" stroke={color} strokeWidth="2" />
			<path d="M17 17V20H20V17H17Z" stroke={color} strokeWidth="2" />
		</svg>
	);

	const navItems = [
		{
			label: 'Inicio',
			path: '/',
			icon: 'icon_home.svg',
			action: () => setLocation('/')
		},
		{
			label: 'Menu',
			path: '/menu',
			icon: 'coffee_icon.svg', // using coffee icon for menu based on the image provided
			action: () => setLocation('/menu')
		},
		{
			label: 'Wallet',
			path: '/wallet', // or null if coming soon
			isWallet: true,
			action: () => setLocation('/wallet') // Navigate instead of alert
		}
	];

	return (
		<footer 
			className="w-full flex justify-center pb-safe pointer-events-none" 
			style={{ 
				position: 'fixed', 
				bottom: 0, 
				left: 0, 
				zIndex: 1000, 
				background: '#FFFFFF',
				paddingTop: '12px',
				paddingBottom: '12px'
			}}
		>
			{/* Pill Container */}
			<div 
				className="pointer-events-auto flex justify-between items-center px-4"
				style={{
					width: '347px',
					height: '60px',
					background: '#F5F5F5',
					borderRadius: '100px',
					boxShadow: '0 4px 12px rgba(0,0,0,0.05)' // Optional subtle shadow for visibility over content
				}}
			>
				{navItems.map((item) => {
					const active = item.path && isActive(item.path);
					const color = active ? '#CE5C28' : '#B2B2B2';

					return (
						<button
							key={item.label}
							onClick={item.action}
							className="flex flex-col items-center justify-center p-2 focus:outline-none flex-1 transition-transform active:scale-95"
						>
							<div className="flex items-center justify-center w-6 h-6 mb-[2px]">
								{item.isWallet ? (
									<WalletIcon color={color} />
								) : (
									<img
										src={`${process.env.PUBLIC_URL}/assets/${item.icon}`}
										alt={item.label}
										className="w-full h-full object-contain"
										style={{
											filter: active
												? 'brightness(0) saturate(100%) invert(43%) sepia(87%) saturate(1458%) hue-rotate(346deg) brightness(97%) contrast(92%)' // #CE5C28
												: 'brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(83%) hue-rotate(152deg) brightness(96%) contrast(85%)'  // #B2B2B2
										}}
									/>
								)}
							</div>
							<span
								style={{
									fontFamily: 'Inter',
									fontStyle: 'normal',
									fontWeight: 400,
									fontSize: '14px',
									lineHeight: '17px',
									display: 'flex',
									alignItems: 'center',
									textAlign: 'center',
									color: color,
									transition: 'color 0.2s ease'
								}}
							>
								{item.label}
							</span>
						</button>
					);
				})}
			</div>
		</footer>
	);
};

export default Footer;
