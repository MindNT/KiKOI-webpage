import React from 'react';

const BlackRoundedButton = ({ children, onClick, className = '' }) => (
	<button
		onClick={onClick}
		className={`bg-black text-white rounded-full px-6 py-2 text-base font-medium transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black ${className}`}
		style={{ fontFamily: 'Inter, sans-serif' }}
	>
		{children}
	</button>
);

export default BlackRoundedButton;
