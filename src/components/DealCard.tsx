
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Package, Tag } from 'lucide-react';
import type { Deal } from '../types';

interface DealCardProps {
    deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
    const currentDiscount = deal.discountTiers.reduce((acc, tier) => {
        return deal.currentQuantity >= tier.threshold ? tier.discountPercentage : acc;
    }, 0);

    const nextTier = deal.discountTiers.find(tier => tier.threshold > deal.currentQuantity);
    const progress = nextTier
        ? (deal.currentQuantity / nextTier.threshold) * 100
        : 100;

    const calculateTimeLeft = () => {
        const expiryDate = new Date(deal.expiresAt);
        const now = new Date();
        const diffTime = expiryDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let text = expiryDate.toLocaleDateString();
        let color = "text-white";
        // Default icon color remains primary unless critical
        let iconColor = "text-primary";

        if (diffDays <= 7 && diffDays > 0) {
            text = `${diffDays} day${diffDays !== 1 ? 's' : ''} left`;
        }

        if (diffDays <= 1) {
            color = "text-red-400"; // Red for critical
            iconColor = "text-red-400";
        } else if (diffDays <= 3) {
            color = "text-orange-400"; // Orange for warning
            iconColor = "text-orange-400";
        }

        if (diffDays <= 0) {
            text = "Expired";
            color = "text-muted";
            iconColor = "text-muted";
        }

        return { text, color, iconColor };
    };

    const { text: timeText, color: timeColor, iconColor } = calculateTimeLeft();

    return (
        <Link to={`/deal/${deal.id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-surface rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/50 transition-colors group cursor-pointer h-full flex flex-col"
            >
                <div className="relative h-48 overflow-hidden shrink-0">
                    <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1">
                        <Clock className={`w-4 h-4 ${iconColor}`} />
                        <span className={timeColor}>{timeText}</span>
                    </div>
                </div>

                <div className="p-5 space-y-4 flex-grow flex flex-col">
                    <div>
                        <h3 className="text-xl font-bold text-white line-clamp-1">{deal.title}</h3>
                        <p className="text-muted text-sm line-clamp-2 mt-1">{deal.description}</p>
                    </div>

                    <div className="space-y-2 mt-auto">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted flex items-center gap-1">
                                <Package className="w-4 h-4" /> {deal.currentQuantity} {deal.unit} sold
                            </span>
                            {nextTier && (
                                <span className="text-primary font-medium">
                                    {nextTier.threshold - deal.currentQuantity} more for {nextTier.discountPercentage}% off
                                </span>
                            )}
                            {!nextTier && (
                                <span className="text-green-400 font-medium">Max discount unlocked!</span>
                            )}
                        </div>

                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-primary to-secondary"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-end pt-2 border-t border-white/5">
                        <div>
                            <p className="text-muted text-xs uppercase tracking-wider">Current Price / Unit</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-white">
                                    ${(deal.price * (1 - currentDiscount / 100)).toFixed(2)}
                                </span>
                                {currentDiscount > 0 && (
                                    <span className="text-sm text-muted line-through">
                                        ${deal.price.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="bg-primary/10 px-3 py-1 rounded-lg text-primary text-sm font-bold flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {currentDiscount}% OFF
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
