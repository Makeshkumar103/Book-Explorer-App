import { Link, useLocation } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-bold text-xl text-slate-800 tracking-tight">Book<span className="text-primary">Explorer</span></span>
                    </Link>

                    <div className="flex gap-4">
                        <Link
                            to="/"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${location.pathname === '/'
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            Search
                        </Link>
                        <Link
                            to="/favorites"
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${location.pathname === '/favorites'
                                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-rose-600'
                                }`}
                        >
                            <Heart className={`w-4 h-4 ${location.pathname === '/favorites' ? 'fill-current' : ''}`} />
                            Favorites
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
