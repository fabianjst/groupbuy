
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DealCard from '../components/DealCard';
import { useDeals } from '../context/DealsContext';

export default function FeaturedDeals() {
    const [category, setCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const { deals } = useDeals();

    const filteredDeals = useMemo(() => {
        let result = [...deals];

        // Filter
        if (category !== 'All') {
            result = result.filter(deal => deal.category === category);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'expiring-soon') return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
            return 0; // Default to existing order (mock data is roughly 'newest')
        });

        return result;
    }, [category, sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Featured Deals</h1>
                    <p className="text-muted mt-1">Explore all active group buying opportunities.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-surface border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                        <option value="All">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Beverage">Beverage</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Cleaning">Cleaning</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-surface border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                        <option value="newest">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="expiring-soon">Expiring Soon</option>
                    </select>
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                ))}
            </motion.div>
        </div>
    );
}
