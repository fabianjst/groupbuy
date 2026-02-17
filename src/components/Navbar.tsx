import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">

                            <img src="/img/pb_logo.svg" alt="PB Logo" className="h-9 w-auto img-smooth" />
                            <img src="/img/groupbuy_font_nohalo.svg" alt="Groupbuy" className="h-8 w-auto mt-1" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Start</Link>
                        <Link to="/features" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Deals</Link>
                        <Link to="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Supplier Dashboard</Link>
                        <button className="bg-primary hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer shadow-sm hover:shadow-md">
                            Connect Wallet
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 hover:text-slate-900 p-2"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Start</Link>
                        <Link to="/features" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">Deals</Link>
                        <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">Supplier Dashboard</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
