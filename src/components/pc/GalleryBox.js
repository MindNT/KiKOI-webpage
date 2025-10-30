
import React from 'react';

const dummyImages = [
	process.env.PUBLIC_URL + '/images/gallery1.JPG',
	process.env.PUBLIC_URL + '/images/gallery2.JPG',
	process.env.PUBLIC_URL + '/images/gallery3.JPG',
	process.env.PUBLIC_URL + '/images/gallery4.JPEG',
	process.env.PUBLIC_URL + '/images/gallery5.JPG',
	process.env.PUBLIC_URL + '/images/gallery6.JPEG',
];

const GalleryBox = ({ galleryImages = dummyImages }) => {
	return (
		<div className="max-w-6xl mx-auto">
			<h2 className="text-4xl font-extralight mb-16 text-center">Galería</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{galleryImages.map((img, i) => (
					<div key={i} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
						<img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
					</div>
				))}
			</div>
		</div>
	);
};

export default GalleryBox;
