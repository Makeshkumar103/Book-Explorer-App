import { useFavorites } from '../context/FavoritesContext';
import BookCard from '../components/BookCard';
import { Heart } from 'lucide-react';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <Heart className="w-8 h-8 text-rose-500 fill-current" />
                    <h2 className="text-3xl font-bold text-slate-800">My Favorites</h2>
                    <span className="bg-slate-200 text-slate-600 text-sm font-semibold px-2.5 py-0.5 rounded-full ml-2">
                        {favorites.length}
                    </span>
                </div>

                {favorites.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <Heart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-slate-900 mb-2">No favorites yet</h3>
                        <p className="text-slate-500">Start exploring and save books you love!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {favorites.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
