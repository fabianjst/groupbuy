
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DealCard from '../components/DealCard';
import { useDeals } from '../context/DealsContext';
import { useUser } from '../context/UserContext';

export default function Home() {
    const { deals } = useDeals();
    const { setRole } = useUser();
    // Slice to show only first 6 deals on home
    const displayDeals = deals.slice(0, 6);

    const scrollToDeals = () => {
        const dealsSection = document.getElementById('featured-deals');
        if (dealsSection) {
            dealsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 sm:py-32">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                            Buy together, <br />
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Save together
                            </span>
                        </h1>

                        <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
                            Join forces with other businesses to unlock exclusive volume discounts directly from suppliers. Food, drinks, packaging, and cleaning supplies at better prices.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={scrollToDeals}
                                className="bg-primary hover:bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-medium transition-colors flex items-center justify-center gap-2 group"
                            >
                                Explore Deals
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Link
                                to="/dashboard"
                                onClick={() => setRole('supplier')}
                                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl text-lg font-medium transition-colors inline-block"
                            >
                                Become a Supplier
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Deals */}
            <section id="featured-deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Trending Wholesale Deals</h2>
                        <p className="text-muted mt-2">Join these active group buys before time runs out.</p>
                    </div>
                    <Link to="/features" className="text-primary hover:text-indigo-400 font-medium hidden sm:flex items-center gap-1 transition-colors">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayDeals.map((deal) => (
                        <DealCard key={deal.id} deal={deal} />
                    ))}
                </div>
            </section>
        </div>
    );
}
