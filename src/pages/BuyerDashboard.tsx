import { motion } from 'framer-motion';
import { Package, Clock, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeals } from '../context/DealsContext';
import { useUser } from '../context/UserContext';

export default function BuyerDashboard() {
    const { deals } = useDeals();
    const { orders } = useUser();

    // Derived state for orders with deal details
    const myOrders = orders.map(order => {
        const deal = deals.find(d => d.id === order.dealId);
        return {
            ...order,
            deal
        };
    }).filter(item => item.deal !== undefined);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Orders</h1>
                    <p className="text-muted mt-1">Track your group buy participations and purchase history.</p>
                </div>
            </div>

            {myOrders.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {myOrders.map((item, index) => {
                        const deal = item.deal!;
                        return (
                            <motion.div
                                key={`${deal.id}-${index}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-surface border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-primary/50 transition-colors group"
                            >
                                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                                    <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-bold text-white mb-2">{deal.title}</h3>
                                            <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                Confirmed
                                            </span>
                                        </div>
                                        <p className="text-muted text-sm line-clamp-2 mb-4">{deal.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-6 text-sm">
                                        <div className="flex items-center gap-2 text-white">
                                            <Package className="w-4 h-4 text-primary" />
                                            <span>Ordered: <span className="font-bold">{item.quantity} {deal.unit}</span></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span>Ends: <span className="font-bold">{new Date(deal.expiresAt).toLocaleDateString()}</span></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white">
                                            <span className="text-primary font-bold">Total:</span>
                                            <span className="font-bold">${item.totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-end items-end gap-3 min-w-[150px]">
                                    <Link
                                        to={`/deal/${deal.id}`}
                                        className="text-primary hover:text-white font-medium flex items-center gap-1 text-sm transition-colors"
                                    >
                                        View Details <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-surface border border-white/5 rounded-xl p-12 text-center">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted opacity-50" />
                    <h2 className="text-xl font-bold text-white mb-2">No active orders</h2>
                    <p className="text-muted mb-6">You haven't placed any orders yet. Check out the latest deals!</p>
                    <Link
                        to="/features"
                        className="bg-primary hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold transition-colors inline-block"
                    >
                        Browse Deals
                    </Link>
                </div>
            )}

            {/* Past Purchases (Static for now as we don't distinguish yet) */}
            <div className="mt-12">
                <h2 className="text-xl font-bold text-white mb-6">Past Purchases</h2>
                <div className="bg-surface border border-white/5 rounded-xl p-8 text-center text-muted">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No past orders found.</p>
                </div>
            </div>
        </div>
    );
}
