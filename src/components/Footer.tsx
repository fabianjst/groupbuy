
import { Github, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-muted text-sm">
                            &copy; {new Date().getFullYear()} Groupbuy. All rights reserved.
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-muted hover:text-primary transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted hover:text-primary transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
