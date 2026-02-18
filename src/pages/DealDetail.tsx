import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Package, Tag, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { useDeals } from '../context/DealsContext';
import { useUser } from '../context/UserContext';
import NumberStepper from '../components/NumberStepper';
import { useState } from 'react';

export default function DealDetail() {
    const { id } = useParams();
    const { deals, updateDeal } = useDeals();
    const { addOrder } = useUser();
    const deal = deals.find(d => d.id === id);
    const [hasJoined, setHasJoined] = useState(false);
    // Initialize quantity
    const [quantity, setQuantity] = useState(deal ? deal.minQuantity : 1);

    if (!deal) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-4">Deal not found</h2>
                <Link to="/" className="text-primary hover:text-indigo-400 font-medium flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Deals
                </Link>
            </div>
        );
    }

    const currentDiscount = deal.discountTiers.reduce((acc, tier) => {
        return deal.currentQuantity >= tier.threshold ? tier.discountPercentage : acc;
    }, 0);

    const nextTier = deal.discountTiers.find(tier => tier.threshold > deal.currentQuantity);
    const progress = nextTier
        ? (deal.currentQuantity / nextTier.threshold) * 100
        : 100;

    const timeLeft = new Date(deal.expiresAt).toLocaleDateString();

    const handlePlaceOrder = () => {
        if (!deal) return;

        addOrder({
            dealId: deal.id,
            quantity: quantity,
            totalPrice: deal.price * (1 - currentDiscount / 100) * quantity,
            date: new Date().toISOString()
        });

        updateDeal(deal.id, {
            currentQuantity: deal.currentQuantity + quantity
        });

        setHasJoined(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Deals
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-square bg-surface border border-white/5"
                >
                    <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white flex items-center gap-2 font-medium">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Ends {timeLeft}</span>
                    </div>
                </motion.div>

                {/* Right Column: Details */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                Active Groupbuy
                            </span>
                            {deal.supplier.verified && (
                                <span className="flex items-center gap-1 text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">
                                    <ShieldCheck className="w-3 h-3" /> Verified Supplier
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{deal.title}</h1>
                        <div className="flex items-center gap-4 text-muted">
                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-primary" />
                                <span className="text-white font-medium">{deal.currentQuantity}</span> {deal.unit} sold
                            </div>
                            <span>•</span>
                            <div>
                                Min. order: <span className="text-white font-medium">{deal.minQuantity}</span> {deal.unit}
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface border border-white/10 rounded-xl p-6 space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-muted text-sm uppercase tracking-wider mb-1">Current Price / Unit</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-bold text-white">
                                        €{(deal.price * (1 - currentDiscount / 100)).toFixed(2)}
                                    </span>
                                    {currentDiscount > 0 && (
                                        <span className="text-xl text-muted line-through">
                                            €{deal.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-bold text-lg inline-flex items-center gap-2">
                                    <Tag className="w-5 h-5" />
                                    {currentDiscount}% OFF
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-white font-medium">Progress to next tier</span>
                                {nextTier ? (
                                    <span className="text-primary">
                                        {nextTier.threshold - deal.currentQuantity} more {deal.unit} needed for {nextTier.discountPercentage}% off
                                    </span>
                                ) : (
                                    <span className="text-green-400 font-medium">Max discount reached!</span>
                                )}
                            </div>
                            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {deal.discountTiers.map((tier) => (
                                    <div
                                        key={tier.threshold}
                                        className={`text-center p-2 rounded-lg border ${deal.currentQuantity >= tier.threshold
                                            ? 'bg-primary/20 border-primary/50 text-white'
                                            : 'bg-white/5 border-white/10 text-muted'
                                            }`}
                                    >
                                        <div className="font-bold">{tier.discountPercentage}% OFF</div>
                                        <div className="text-xs">{tier.threshold}+ {deal.unit}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {deal.supplier.id === 's1' ? (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                <h4 className="text-white font-bold mb-2">This is your deal</h4>
                                <p className="text-muted text-sm mb-4">
                                    You can't buy your own deal, but you can track its performance.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Link
                                        to="/analytics"
                                        className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        View Analytics
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-muted mb-2">Quantity</label>
                                    <NumberStepper
                                        value={quantity}
                                        onChange={setQuantity}
                                        min={deal.minQuantity}
                                        step={10}
                                    />
                                    <p className="text-xs text-muted mt-1">Minimum order: {deal.minQuantity} {deal.unit}</p>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={hasJoined}
                                    className={`w-full py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${hasJoined
                                        ? 'bg-green-500 cursor-default'
                                        : 'bg-primary hover:bg-indigo-600 text-white'
                                        }`}
                                >
                                    {hasJoined ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <CheckCircle className="w-5 h-5" /> Order Placed!
                                        </span>
                                    ) : (
                                        `Place Order for €${(deal.price * (1 - currentDiscount / 100) * quantity).toFixed(2)}`
                                    )}
                                </button>
                                <p className="text-center text-muted text-sm">
                                    Your card will only be charged when the group buy ends.
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-white mb-3">About this product</h3>
                        <p className="text-muted leading-relaxed">
                            {deal.description}
                        </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Supplier Information</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl font-bold text-white">
                                {deal.supplier.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-white">{deal.supplier.name}</p>
                                <p className="text-sm text-muted">Verified Business • 98% positive delivery rate</p>
                            </div>
                            <button className="ml-auto text-primary hover:text-white text-sm font-medium transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
