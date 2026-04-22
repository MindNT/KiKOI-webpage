import React, { useEffect, useState, useRef } from 'react';

// Pseudo-category ID for the virtual "Promociones" tab
export const PROMOS_CATEGORY_ID = '__promotions__';

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

                    // Always default to Promociones on first load
                    if (!selectedCategoryId) {
                        setActiveCategory(PROMOS_CATEGORY_ID);
                        onCategoryChange(PROMOS_CATEGORY_ID);
                    } else {
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

    // Build the full list: Promociones tab first, then real categories
    const allTabs = [
        { id: PROMOS_CATEGORY_ID, name: 'Promociones', isPromo: true },
        ...categories.map(c => ({ ...c, isPromo: false })),
    ];

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
                {allTabs.map((tab) => {
                    const isActive = activeCategory === tab.id;

                    // ── Promociones tab styles ──────────────────────────────
                    let bg, border, color, fontWeight, shadow;

                    if (tab.isPromo) {
                        if (isActive) {
                            bg = '#E11D48';
                            border = 'none';
                            color = '#FFFFFF';
                            fontWeight = 700;
                            shadow = 'none';
                        } else {
                            bg = 'rgba(225, 29, 72, 0.10)';
                            border = '1.5px solid rgba(225, 29, 72, 0.35)';
                            color = '#BE123C';
                            fontWeight = 600;
                            shadow = 'none';
                        }
                    } else {
                        // ── Regular category styles ─────────────────────────
                        if (isActive) {
                            bg = '#E36414';
                            border = 'none';
                            color = '#FFFFFF';
                            fontWeight = 500;
                            shadow = 'none';
                        } else {
                            bg = '#F5F5F5';
                            border = '1px solid #F5F5F5';
                            color = '#535353';
                            fontWeight = 400;
                            shadow = 'none';
                        }
                    }

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleCategoryClick(tab.id)}
                            className="flex-shrink-0 transition-all duration-200 ease-in-out transform active:scale-95 flex items-center justify-center cursor-pointer"
                            style={{
                                height: '40px',
                                boxSizing: 'border-box',
                                background: bg,
                                border,
                                borderRadius: '25px',
                                outline: 'none',
                                boxShadow: shadow,
                                padding: tab.isPromo ? '0 14px 0 11px' : '0 16px',
                                gap: tab.isPromo ? '5px' : '0',
                            }}
                        >
                            {/* Lightning icon — only for Promo tab */}
                            {tab.isPromo && (
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/disccount.svg`}
                                    alt="Promo"
                                    className="w-[14px] h-[14px] object-contain flex-shrink-0"
                                    style={isActive ? { filter: 'brightness(0) invert(1)' } : {}}
                                />
                            )}
                            <span
                                className="whitespace-nowrap"
                                style={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight,
                                    fontSize: '14px',
                                    lineHeight: '17px',
                                    color,
                                }}
                            >
                                {tab.name}
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
