import React from 'react';
import WhiteRoundedReturn from '../../utils/WhiteRoundedReturn';
import ToggleSwitch from '../../utils/ToggleSwitch';
import Badge from '../../utils/Badge';

/**
 * CartHeader - Brown header card for shopping cart
 * Props:
 * - customerName: string
 * - phoneNumber: string
 * - onBack: function
 * - onChangePhone: function
 */
const CartHeader = ({ customerName, phoneNumber, onBack, onChangePhone }) => {
    return (
        <div
            className="relative px-6 py-6 sm:px-8 sm:py-8 rounded-b-3xl"
            style={{
                background: '#E36414', // Or #CE5C28 depending on exact color match intended
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)'
            }}
        >
            {/* Header Row with Title and Back Button */}
            <div className="flex items-center justify-between mb-6">
                <WhiteRoundedReturn onClick={onBack} />
                <h2
                    className="text-[20px] leading-[24px] sm:text-2xl sm:leading-[29px]"
                    style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        color: '#FFFFFF'
                    }}
                >
                    Tu carrito
                </h2>
            </div>

            {/* Client Information and Points */}
            <div className="flex items-start justify-between mb-4">
                {/* Left Area: Name and Phone */}
                <div className="flex flex-col">
                    <p
                        style={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '19px',
                            color: '#FFFFFF',
                            marginBottom: '2px'
                        }}
                    >
                        {customerName || 'Cliente'}
                    </p>
                    <p
                        className="flex items-center"
                        style={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '17px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            cursor: 'pointer'
                        }}
                        onClick={onChangePhone}
                    >
                        {phoneNumber || 'Sin número'}
                    </p>
                </div>

                {/* Right Area: Points Available */}
                <div className="flex flex-col items-end">
                    <p
                        style={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '19px',
                            color: '#FFFFFF',
                            marginBottom: '4px'
                        }}
                    >
                        Puntos disponibles
                    </p>
                    <Badge text="Próximamente" />
                </div>
            </div>

            {/* Bottom Row: Use Points Toggle */}
            {/* 
            <div className="flex items-center justify-between mt-6">
                <p
                    style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '17px',
                        color: '#FFFFFF'
                    }}
                >
                    Usar mis puntos en esta compra
                </p>
                <ToggleSwitch defaultChecked={true} />
            </div>
            */}
        </div>
    );
};

export default CartHeader;
