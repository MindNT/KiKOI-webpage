import React, { useEffect, useState, useRef } from 'react';

const CarouselTag = ({ onCategoryChange, selectedCategoryId }) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const scrollContainerRef = useRef(null);

    // Fetch categories from endpoint
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://kikoi-management.mindnt.com.mx/items/categories');
                const data = await response.json();

                if (data.status === 'success' && Array.isArray(data.data)) {
                    const activeCats = data.data.filter(cat => cat.is_active);
                    setCategories(activeCats);

                    // Set first category as active if none selected
                    if (activeCats.length > 0 && !selectedCategoryId) {
                        const firstCat = activeCats[0];
                        setActiveCategory(firstCat.id);
                        onCategoryChange(firstCat.id);
                    } else if (selectedCategoryId) {
                        setActiveCategory(selectedCategoryId);
                    }
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Sync with external selectedCategoryId changes
    useEffect(() => {
        if (selectedCategoryId !== null && selectedCategoryId !== activeCategory) {
            setActiveCategory(selectedCategoryId);
        }
    }, [selectedCategoryId]);

    // Handle category click
    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        onCategoryChange(categoryId);
    };



    return (
        <div className="relative w-full px-6 py-4">
            {/* Carousel container - Touch-friendly scrolling */}
            <div
                ref={scrollContainerRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-x'
                }}
            >
                {categories.map((category) => {
                    const isActive = activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className="flex-shrink-0 transition-transform duration-200 ease-in-out transform active:scale-95 flex items-center justify-center cursor-pointer"
                            style={{
                                width: '105px',
                                height: '40px',
                                boxSizing: 'border-box',
                                background: isActive ? '#CE5C28' : '#F5F5F5',
                                border: isActive ? 'none' : '1px solid #F5F5F5',
                                borderRadius: '25px',
                                outline: 'none'
                            }}
                        >
                            <span 
                                className="whitespace-nowrap overflow-hidden text-ellipsis px-2"
                                style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: isActive ? 500 : 400,
                                    fontSize: '16px',
                                    lineHeight: '19px',
                                    color: isActive ? '#FFFFFF' : '#535353',
                                }}
                            >
                                {category.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Hide scrollbar CSS */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default CarouselTag;
