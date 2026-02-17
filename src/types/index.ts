export interface Deal {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    originalPrice: number;
    discountTiers: DiscountTier[];
    currentQuantity: number;
    minQuantity: number;
    unit: string; // e.g., 'kg', 'units', 'boxes', 'pallets'
    category: 'Food' | 'Beverage' | 'Packaging' | 'Cleaning' | 'Other';
    expiresAt: string; // ISO date string
    supplier: Supplier;
}

export interface DiscountTier {
    threshold: number; // Quantity threshold
    discountPercentage: number;
}

export interface Supplier {
    id: string;
    name: string;
    verified: boolean;
}

export interface Buyer {
    id: string;
    name: string;
}
