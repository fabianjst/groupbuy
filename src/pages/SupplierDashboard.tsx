
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Upload, Users, Calendar } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useDeals } from '../context/DealsContext';
import type { Deal } from '../types';

import NumberStepper from '../components/NumberStepper';

export default function SupplierDashboard() {
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();
    const { deals, addDeal } = useDeals();

    // Filter deals for the current supplier (mocked as 's1')
    const myDeals = deals.filter(d => d.supplier.id === 's1');

    const [tiers, setTiers] = useState([{ quantity: 50, discount: 5 }]);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [standardPrice, setStandardPrice] = useState(0);
    const [minQuantity, setMinQuantity] = useState(10);
    const [endDate, setEndDate] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
        }
    };

    const handleLaunchDeal = () => {
        const newDeal: Deal = {
            id: 'deal-' + Date.now(),
            title: title || 'New Deal',
            description: description || 'No description provided.',
            image: imagePreview || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',

            price: standardPrice,
            originalPrice: standardPrice,

            discountTiers: tiers.map(t => ({ threshold: t.quantity, discountPercentage: t.discount })),
            currentQuantity: 0,
            minQuantity: minQuantity,
            unit: 'units',
            category: 'Food',
            expiresAt: endDate ? new Date(endDate).toISOString() : new Date(Date.now() + 86400000 * 7).toISOString(),
            supplier: {
                id: 's1',
                name: 'Current User',
                verified: true
            }
        };

        addDeal(newDeal);
        setIsCreating(false);
        navigate('/features');
    };

    const addTier = () => {
        setTiers([...tiers, { quantity: 0, discount: 0 }]);
    };

    const removeTier = (index: number) => {
        setTiers(tiers.filter((_, i) => i !== index));
    };

    const updateTier = (index: number, field: 'quantity' | 'discount', value: number) => {
        const newTiers = [...tiers];
        newTiers[index][field] = value;
        setTiers(newTiers);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Supplier Dashboard</h1>
                    <p className="text-muted mt-1">Manage your active deals and create new group buys.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        to="/analytics"
                        className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors border border-white/10"
                    >
                        <Users className="w-5 h-5 text-secondary" /> Analytics
                    </Link>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-primary hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" /> Create New Deal
                    </button>
                </div>
            </div>

            {isCreating ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface border border-white/10 rounded-xl p-6 max-w-2xl mx-auto"
                >
                    {/* ... (keep form creation logic as is, it's just inside this block) */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Create New Deal</h2>
                        <button
                            onClick={() => setIsCreating(false)}
                            className="text-muted hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Deal Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="e.g. Premium Arabica Coffee Beans"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Description</label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="Describe the product and the deal..."
                            />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">Standard Price</label>
                                <NumberStepper
                                    value={standardPrice}
                                    onChange={setStandardPrice}
                                    step={0.50}
                                    prefix="$"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-muted">Volume Discounts</label>
                                    <button
                                        type="button"
                                        onClick={addTier}
                                        className="text-xs text-primary hover:text-indigo-400 font-medium flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add Tier
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {tiers.map((tier, index) => (
                                        <div key={index} className="flex gap-4 items-start">
                                            <div className="flex-1">
                                                <label className="text-xs text-muted mb-1 block">Min Qty</label>
                                                <NumberStepper
                                                    value={tier.quantity}
                                                    onChange={(val: number) => updateTier(index, 'quantity', val)}
                                                    step={5}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-xs text-muted mb-1 block">Discount</label>
                                                <NumberStepper
                                                    value={tier.discount}
                                                    onChange={(val: number) => updateTier(index, 'discount', val)}
                                                    step={1}
                                                    suffix="%"
                                                />
                                            </div>
                                            {tiers.length > 1 && (
                                                <div className="pt-6">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTier(index)}
                                                        className="p-3 text-muted hover:text-red-400 transition-colors bg-white/5 rounded-lg border border-white/10"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-muted mt-2">Adjust quantity thresholds and discount percentages.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">Min Quantity</label>
                                <NumberStepper
                                    value={minQuantity}
                                    onChange={setMinQuantity}
                                    step={10}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">End Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-muted" />
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Product Image</label>
                            <div className="relative">
                                {imagePreview ? (
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 group">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                }}
                                                className="text-white bg-red-500/80 hover:bg-red-500 px-4 py-2 rounded-lg font-medium transition-colors"
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-colors group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 text-muted group-hover:text-primary mb-2 transition-colors" />
                                            <p className="text-sm text-muted group-hover:text-white transition-colors">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-muted mt-1">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleLaunchDeal}
                            className="w-full bg-primary hover:bg-indigo-600 text-white py-3 rounded-lg font-bold transition-colors"
                        >
                            Launch Deal
                        </button>
                    </form>
                </motion.div>
            ) : (
                <>
                    {myDeals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myDeals.map((deal) => (
                                <Link key={deal.id} to={`/deal/${deal.id}`} className="block group">
                                    <div className="bg-surface rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all h-full flex flex-col">
                                        <div className="relative h-48">
                                            <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white">
                                                {new Date(deal.expiresAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{deal.title}</h3>
                                            <p className="text-muted text-sm line-clamp-2 mb-4">{deal.description}</p>

                                            <div className="mt-auto flex justify-between items-center text-sm">
                                                <span className="text-muted">{deal.currentQuantity} / {deal.minQuantity} units</span>
                                                <span className="text-primary font-bold">${deal.price}</span>
                                            </div>

                                            <div className="mt-3 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-primary h-full rounded-full"
                                                    style={{ width: `${Math.min((deal.currentQuantity / deal.minQuantity) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-surface border border-white/10 rounded-xl p-12 text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="w-8 h-8 text-muted" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No active deals</h3>
                            <p className="text-muted mb-6">You haven't created any deals yet. Start your first group buy today.</p>
                            <button
                                onClick={() => setIsCreating(true)}
                                className="text-primary hover:text-indigo-400 font-medium"
                            >
                                Create a new deal
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
