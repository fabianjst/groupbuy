import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Deal } from '../types';
import { mockDeals as initialMockDeals } from '../data/mockDeals';

interface DealsContextType {
    deals: Deal[];
    addDeal: (deal: Deal) => void;
    updateDeal: (id: string, updates: Partial<Deal>) => void;
}

const DealsContext = createContext<DealsContextType | undefined>(undefined);

export function DealsProvider({ children }: { children: ReactNode }) {
    const [deals, setDeals] = useState<Deal[]>(initialMockDeals);

    const addDeal = (deal: Deal) => {
        setDeals(prev => [deal, ...prev]);
    };

    const updateDeal = (id: string, updates: Partial<Deal>) => {
        setDeals(prev => prev.map(deal =>
            deal.id === id ? { ...deal, ...updates } : deal
        ));
    };

    return (
        <DealsContext.Provider value={{ deals, addDeal, updateDeal }}>
            {children}
        </DealsContext.Provider>
    );
}

export function useDeals() {
    const context = useContext(DealsContext);
    if (context === undefined) {
        throw new Error('useDeals must be used within a DealsProvider');
    }
    return context;
}
