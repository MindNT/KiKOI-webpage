import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useCartStore } from '../../cartStore';
import CartHeader from './CartHeader';
import ProductCardCart from './ProductCardCart';
import BrownRounded from '../../utils/OrangeCircle';

const Billingcar = () => {
    const [, setLocation] = useLocation();
    const cartOpen = useCartStore(state => state.cartOpen);
    const setCartOpen = useCartStore(state => state.setCartOpen);
    const cart = useCartStore(state => state.cart);
    const updateQty = useCartStore(state => state.updateQty);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const cartTotal = useCartStore(state => state.cartTotal);
    const clearCart = useCartStore(state => state.clearCart);

    // States for order processing
    const setShowSuccess = useCartStore(state => state.setShowSuccess);
    const setOrderData = useCartStore(state => state.setOrderData);
    const globalPhoneNumber = useCartStore(state => state.phoneNumber);
    const globalCustomerName = useCartStore(state => state.customerName);
    const setGlobalPhoneNumber = useCartStore(state => state.setPhoneNumber);

    const [isProcessing, setIsProcessing] = useState(false);

    // Phone editing state
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [editedPhone, setEditedPhone] = useState('');

    // Helper: Format items for API
    const formatItemsForAPI = () => {
        const items = {};
        cart.forEach(item => {
            items[item.id.toString()] = item.qty;
        });
        return items;
    };

    // Helper: Generate Order Code
    const generateOrderCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    // Logic: Checkout
    const handleCheckout = async () => {
        if (!globalPhoneNumber) {
            alert("No se encontró un número de teléfono. Por favor regresa al inicio e ingresa tu número.");
            return;
        }

        setIsProcessing(true);

        try {
            await processOrder(globalPhoneNumber, globalCustomerName || '');
        } catch (error) {
            console.error("Error in checkout flow:", error);
            alert("Hubo un error al procesar tu solicitud.");
            setIsProcessing(false);
        }
    };

    const processOrder = async (phone, name) => {
        try {
            const orderCode = generateOrderCode();
            const items = formatItemsForAPI();
            const currentDate = new Date().toISOString();

            const orderDataBody = {
                data: {
                    sale_id: null,
                    customer_id: null,
                    code_order: orderCode,
                    phone: phone,
                    sale_date: currentDate,
                    items: items,
                    total_amount: cartTotal,
                    promotions: {},
                    maps_url: ""
                }
            };

            const params = new URLSearchParams({
                phone: phone,
                total_amount: cartTotal,
                items: JSON.stringify(items),
                maps_url: '',
                promotions: '{}',
                code_order: orderCode,
                delivery_datetime: currentDate
            });

            const response = await fetch(`https://kikoi-management.mindnt.com.mx/orders/save-order?${params}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDataBody)
            });

            const result = await response.json();

            if (result.status === 'success') {
                const successData = {
                    ...result.data,
                    orderCode,
                    totalAmount: cartTotal,
                    phoneNumber: phone,
                    cartItems: [...cart],
                    itemsCount: cart.length
                };
                setOrderData(successData);
                setShowSuccess(true);
                clearCart();
                setCartOpen(false);
            } else {
                throw new Error(result.message || "Error saving order");
            }

        } catch (e) {
            console.error("Process Order Error:", e);
            alert("Error al guardar la orden.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleChangePhone = () => {
        setEditedPhone(globalPhoneNumber || '');
        setIsEditingPhone(true);
    };

    const handleSavePhone = () => {
        if (editedPhone.trim()) {
            setGlobalPhoneNumber(editedPhone.trim());
        }
        setIsEditingPhone(false);
    };

    const handleBack = () => {
        setCartOpen(false);
        setLocation('/menu');
    };

    // Calculate breakdown
    const subtotal = cartTotal;
    const impuestos = 0.0;
    const descuentos = 0.0;
    const total = subtotal + impuestos - descuentos;

    return cartOpen ? (
        <div className="fixed inset-0 z-[100] bg-white">
            {/* Max-width container for mobile - responsive */}
            <div className="w-full sm:max-w-[480px] mx-auto h-full flex flex-col transform transition-transform duration-300">

                {/* Header */}
                <div className="bg-white flex-shrink-0">
                    {!isEditingPhone ? (
                        <CartHeader
                            customerName={globalCustomerName}
                            phoneNumber={globalPhoneNumber}
                            onBack={handleBack}
                            onChangePhone={handleChangePhone}
                        />
                    ) : (
                        /* Phone Edit Mode */
                        <div
                            className="relative px-6 py-8 rounded-b-3xl"
                            style={{ background: '#9E492B' }}
                        >
                            <h2
                                className="mb-4"
                                style={{
                                    fontFamily: 'Inter',
                                    fontWeight: 700,
                                    fontSize: '24px',
                                    color: '#FFFFFF'
                                }}
                            >
                                Editar Teléfono
                            </h2>
                            <input
                                type="tel"
                                value={editedPhone}
                                onChange={(e) => setEditedPhone(e.target.value)}
                                className="w-full px-4 py-3 mb-4 rounded-lg text-gray-900"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    border: 'none',
                                    outline: 'none',
                                    fontFamily: 'Inter',
                                    fontSize: '16px'
                                }}
                                placeholder="Ingresa tu teléfono"
                                autoFocus
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSavePhone}
                                    className="flex-1 py-2 rounded-full transition-all active:scale-95"
                                    style={{
                                        background: '#FFFFFF',
                                        color: '#9E492B',
                                        fontFamily: 'Inter',
                                        fontWeight: 700,
                                        fontSize: '14px'
                                    }}
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setIsEditingPhone(false)}
                                    className="flex-1 py-2 rounded-full transition-all active:scale-95"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        color: '#FFFFFF',
                                        fontFamily: 'Inter',
                                        fontWeight: 400,
                                        fontSize: '14px'
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tu orden Section */}
                <div className="px-6 mb-4 mt-6">
                    <h3
                        style={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '24px',
                            lineHeight: '29px',
                            color: '#2C2C2C'
                        }}
                    >
                        Tu orden
                    </h3>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto px-6 pb-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-50">
                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontWeight: 400
                                }}
                            >
                                Tu carrito está vacío
                            </p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <ProductCardCart
                                key={item.id}
                                item={item}
                                onIncrease={() => updateQty(item.id, 1)}
                                onDecrease={() => updateQty(item.id, -1)}
                                onDelete={removeFromCart}
                            />
                        ))
                    )}
                </div>

                {/* Footer / Summary & Checkout */}
                {cart.length > 0 && (
                    <div className="bg-white px-6 py-6 border-t border-gray-100">
                        {/* Summary */}
                        <div className="mb-6 space-y-3">
                            <div className="flex justify-between">
                                <span
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        color: '#2C2C2C'
                                    }}
                                >
                                    Subtotal
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        color: '#2C2C2C'
                                    }}
                                >
                                    $ {subtotal.toFixed(2)} MXN
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        color: '#2C2C2C'
                                    }}
                                >
                                    Impuestos
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        color: '#2C2C2C'
                                    }}
                                >
                                    $ {impuestos.toFixed(2)} MXN
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        color: '#2C2C2C'
                                    }}
                                >
                                    Descuentos
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        color: '#2C2C2C'
                                    }}
                                >
                                    $ {descuentos.toFixed(2)} MXN
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                                <span
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        color: '#2C2C2C'
                                    }}
                                >
                                    Total
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'Inter',
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        color: '#2C2C2C'
                                    }}
                                >
                                    $ {total.toFixed(2)} MXN
                                </span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <BrownRounded
                            text={isProcessing ? 'Procesando...' : 'Finalizar pedido'}
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full"
                        />
                    </div>
                )}
            </div>
        </div >
    ) : null;
};

export default Billingcar;
