import { createContext, useContext, useState, type ReactNode } from 'react';

type UserRole = 'buyer' | 'supplier';

export interface Order {
    dealId: string;
    quantity: number;
    totalPrice: number;
    date: string;
}

interface UserContextType {
    role: UserRole;
    setRole: (role: UserRole) => void;
    toggleRole: () => void;
    orders: Order[];
    addOrder: (order: Order) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole>('buyer');
    const [orders, setOrders] = useState<Order[]>([]);

    const toggleRole = () => {
        setRole(prev => prev === 'buyer' ? 'supplier' : 'buyer');
    };

    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    };

    return (
        <UserContext.Provider value={{ role, setRole, toggleRole, orders, addOrder }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
