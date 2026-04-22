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
			className="w-full flex justify-center pb-safe"
			style={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				zIndex: 1000,
				background: '#FFFFFF',
				paddingTop: '8px',
				paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
				borderTop: '1px solid rgba(0,0,0,0.04)',
				boxShadow: '0 -4px 20px rgba(0,0,0,0.02)'
			}}
		>
			{/* Minimalist Container */}
			<div className="flex justify-around items-center w-full max-w-[480px] px-6">
				{navItems.map((item) => {
					const active = item.path && isActive(item.path);
					const color = active ? '#E36414' : '#C4C4C4';

					return (
						<button
							key={item.label}
							onClick={item.action}
							className="flex flex-col items-center justify-center px-2 py-1 focus:outline-none transition-transform active:scale-95"
						>
							<div className="flex items-center justify-center w-[22px] h-[22px] mb-[4px]">
								{item.isWallet ? (
									<WalletIcon color={color} />
								) : (
									<img
										src={`${process.env.PUBLIC_URL}/assets/${item.icon}`}
										alt={item.label}
										className="w-full h-full object-contain"
										style={{
											filter: active
												? 'brightness(0) saturate(100%) invert(43%) sepia(87%) saturate(1458%) hue-rotate(346deg) brightness(97%) contrast(92%)' // #E36414
												: 'brightness(0) saturate(100%) invert(86%) sepia(1%) saturate(236%) hue-rotate(152deg) brightness(91%) contrast(85%)' // #C4C4C4
										}}
									/>
								)}
							</div>
							<span
								style={{
									fontFamily: 'Inter, sans-serif',
									fontWeight: active ? 600 : 500,
									fontSize: '11px',
									letterSpacing: '0.02em',
									color: color,
									transition: 'all 0.2s ease',
									marginTop: '2px'
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
