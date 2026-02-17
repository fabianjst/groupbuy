import type { Deal } from '../types';

export const mockDeals: Deal[] = [
    {
        id: '1',
        title: 'Italian Espresso Beans (Bulk)',
        description: 'Premium Arabica coffee beans directly from Italian roasters. Perfect for cafes and offices. Sold in 10kg batches.',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        price: 150.00, // Price per unit (e.g., per 10kg sack)
        originalPrice: 220.00,
        discountTiers: [
            { threshold: 50, discountPercentage: 10 },
            { threshold: 200, discountPercentage: 20 },
            { threshold: 500, discountPercentage: 35 },
        ],
        currentQuantity: 124,
        minQuantity: 20,
        unit: 'bags (10kg)',
        category: 'Beverage',
        expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(),
        supplier: {
            id: 's1',
            name: 'Milano Roastery',
            verified: true
        }
    },
    {
        id: '2',
        title: 'Organic Extra Virgin Olive Oil',
        description: 'Cold-pressed organic olive oil from Crete. High polyphenol count. 5L tins.',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        price: 45.00,
        originalPrice: 65.00,
        discountTiers: [
            { threshold: 100, discountPercentage: 15 },
            { threshold: 300, discountPercentage: 25 },
        ],
        currentQuantity: 87,
        minQuantity: 50,
        unit: 'tins (5L)',
        category: 'Food',
        expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
        supplier: {
            id: 's2',
            name: 'Cretan Gold',
            verified: true
        }
    },
    {
        id: '3',
        title: 'Biodegradable Takeout Containers',
        description: 'Eco-friendly, compostable food containers. 500 units per box. Ideal for restaurants.',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        price: 85.00,
        originalPrice: 120.00,
        discountTiers: [
            { threshold: 50, discountPercentage: 10 },
            { threshold: 150, discountPercentage: 20 },
            { threshold: 400, discountPercentage: 30 },
        ],
        currentQuantity: 342,
        minQuantity: 20,
        unit: 'boxes (500pcs)',
        category: 'Packaging',
        expiresAt: new Date(Date.now() + 86400000 * 2).toISOString(),
        supplier: {
            id: 's3',
            name: 'EcoPack Solutions',
            verified: true
        }
    },
    {
        id: '4',
        title: 'Industrial Heavy-Duty Floor Cleaner',
        description: 'Concentrated formula for commercial kitchens and warehouses. 20L drums.',
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', // Generic cleaning/chemical image
        price: 55.00,
        originalPrice: 89.00,
        discountTiers: [
            { threshold: 20, discountPercentage: 15 },
            { threshold: 50, discountPercentage: 25 },
        ],
        currentQuantity: 15,
        minQuantity: 10,
        unit: 'drums (20L)',
        category: 'Cleaning',
        expiresAt: new Date(Date.now() + 86400000 * 5).toISOString(),
        supplier: {
            id: 's4',
            name: 'Sparkle Industrial',
            verified: false
        }
    },
    {
        id: '5',
        title: 'Sparkling Mineral Water (Glass Bottles)',
        description: 'Premium sparkling water in 750ml glass bottles. Sold in pallets of 10 cases (120 bottles).',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        price: 180.00,
        originalPrice: 250.00,
        discountTiers: [
            { threshold: 10, discountPercentage: 10 },
            { threshold: 25, discountPercentage: 18 },
            { threshold: 50, discountPercentage: 25 },
        ],
        currentQuantity: 8,
        minQuantity: 5,
        unit: 'pallets',
        category: 'Beverage',
        expiresAt: new Date(Date.now() + 86400000 * 4).toISOString(),
        supplier: {
            id: 's5',
            name: 'Alpine Springs',
            verified: true
        }
    }
];
