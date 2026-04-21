import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useCartStore } from '../cartStore';
import WelcomeUser from '../components/pc/WelcomeUser';
import BrownButton from '../utils/OrangeButton';
import PhoneInput from '../utils/PhoneInput';

const Inicio = () => {
	const [, setLocation] = useLocation();
	const [phoneNumber, setPhoneNumber] = useState('');
	const [customerName, setCustomerName] = useState('');
	const [showNameInput, setShowNameInput] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [showWelcomeUser, setShowWelcomeUser] = useState(false);
	const [welcomeUserName, setWelcomeUserName] = useState('');

	const setGlobalPhoneNumber = useCartStore(state => state.setPhoneNumber);
	const setGlobalCustomerName = useCartStore(state => state.setCustomerName);

	const handleStart = async () => {
		if (phoneNumber.trim().length < 10) {
			alert('Por favor ingresa un número de teléfono válido (10 dígitos)');
			return;
		}

		setIsProcessing(true);

		try {
			// Verify if phone exists
			const verifyRes = await fetch(`https://kikoi-management.mindnt.com.mx/customers/verify-phone?phone=${phoneNumber.trim()}`);
			const verifyData = await verifyRes.json();

			if (verifyData.status === 'success') {
				if (verifyData.exists === 1) {
					// User exists, save data to sessionStorage and show welcome screen
					sessionStorage.setItem('kikoi_phone', phoneNumber.trim());
					sessionStorage.setItem('kikoi_customer_name', verifyData.name || '');
					setGlobalPhoneNumber(phoneNumber.trim());
					setGlobalCustomerName(verifyData.name || '');
					setWelcomeUserName(verifyData.name || '');
					setShowWelcomeUser(true);
				} else {
					// User doesn't exist, ask for name
					setShowNameInput(true);
				}
			} else {
				throw new Error('Error al verificar teléfono');
			}
		} catch (error) {
			console.error("Error verifying phone:", error);
			alert("Hubo un error al verificar tu número. Por favor intenta de nuevo.");
		} finally {
			setIsProcessing(false);
		}
	};

	const handleRegisterAndStart = async () => {
		if (!customerName.trim()) {
			alert("Por favor ingresa tu nombre");
			return;
		}

		setIsProcessing(true);

		try {
			// Register new customer
			const regRes = await fetch(`https://kikoi-management.mindnt.com.mx/customers/add-customer?name=${encodeURIComponent(customerName.trim())}&phone=${phoneNumber.trim()}`, { method: 'POST' });
			const regData = await regRes.json();

			if (regData.status === 'success') {
				// Save new user data to sessionStorage
				sessionStorage.setItem('kikoi_phone', phoneNumber.trim());
				sessionStorage.setItem('kikoi_customer_name', customerName.trim());
				setGlobalPhoneNumber(phoneNumber.trim());
				setGlobalCustomerName(customerName.trim());
				setWelcomeUserName(customerName.trim());
				setShowWelcomeUser(true);
			} else {
				throw new Error("Error registrando cliente");
			}
		} catch (error) {
			console.error("Error registering:", error);
			alert("Error al registrar. Por favor intenta de nuevo.");
		} finally {
			setIsProcessing(false);
		}
	};

	// If showing welcome user screen
	if (showWelcomeUser) {
		return <WelcomeUser customerName={welcomeUserName} onComplete={() => setLocation('/menu')} />;
	}

	return (
		<div className="min-h-screen bg-white flex flex-col justify-between">
			{/* Max-width container for mobile - responsive */}
			<div className="w-full sm:max-w-[480px] mx-auto min-h-screen flex flex-col justify-between">
				<main className="flex-1 flex flex-col items-center justify-center px-6 relative">

					{/* Title Text */}
					<div className="mb-6 font-['Inter'] font-[800] text-[32px] leading-[38px] flex flex-col items-center justify-center text-center text-[#2C2C2C] z-10 w-full max-w-[314px]">
						<span>
							Ordena <span className="text-[#CE5C28]">mas rapido</span>
						</span>
						<span>
							tu cafe favorito
						</span>
					</div>

					{/* Brand Image/Logo */}
					<div className="mb-8 w-64 h-64 flex items-center justify-center flex-shrink-0">
						<img
							src={`${process.env.PUBLIC_URL}/images/landing.png`}
							alt="KiKOI Logo"
							className="w-full h-full object-contain"
						/>
					</div>

					{/* Welcome Text */}
					<div className="text-center mb-10 flex flex-col items-center">
						<p className="font-normal text-[14px] leading-[17px] w-[268px] text-center text-[#535353]">
							{showNameInput
								? '¡Es tu primera vez! ¿Cuál es tu nombre?'
								: 'Ingresa tu numero para comenzar a ordenar tus bebidas favoritas'}
						</p>
					</div>

					{/* Input Section */}
					<div className="w-full max-w-xs space-y-6">
						{!showNameInput ? (
							<>
								<div className="flex justify-center">
									<PhoneInput
										type="tel"
										placeholder="Teléfono (10 dígitos)"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</div>

								{/* Action Button */}
								<div className="flex justify-center">
									<BrownButton
										onClick={handleStart}
										disabled={!phoneNumber || isProcessing}
									>
										{isProcessing ? 'Verificando...' : 'Comenzar'}
									</BrownButton>
								</div>
							</>
						) : (
							<>
								<div>
									<input
										type="text"
										placeholder="Tu nombre"
										value={customerName}
										onChange={(e) => setCustomerName(e.target.value)}
										className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-base focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange transition-all placeholder-gray-300"
										autoFocus
									/>
								</div>

								{/* Register Button */}
								<button
									onClick={handleRegisterAndStart}
									disabled={!customerName || isProcessing}
									className="w-full bg-brand-orange text-white text-lg font-medium py-4 rounded-xl hover:opacity-90 transition-all transform active:scale-[0.98] duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isProcessing ? 'Registrando...' : 'Continuar'}
								</button>
							</>
						)}
					</div>

				</main>
			</div>
		</div>
	);
};

export default Inicio;