import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { getCoverUrl } from '../services/api';

const BookCard = ({ book }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(book.id);

    const toggleFavorite = (e) => {
        e.preventDefault(); // Prevent navigation when clicking heart
        if (favorite) {
            removeFavorite(book.id);
        } else {
            addFavorite(book);
        }
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative">
            <Link to={`/book/${book.id}`} className="block h-full flex flex-col">
                <div className="aspect-[2/3] overflow-hidden bg-slate-100 relative">
                    <img
                        src={getCoverUrl(book.cover_id, 'M')}
                        alt={book.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-md px-2 py-1 rounded-full">View Details</span>
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-slate-800 line-clamp-1 mb-1 group-hover:text-primary transition-colors" title={book.title}>
                        {book.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-3 line-clamp-1">{book.author}</p>
                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                            {book.first_publish_year || 'N/A'}
                        </span>
                        <button
                            onClick={toggleFavorite}
                            className={`p-2 rounded-full transition-all active:scale-95 ${favorite
                                    ? 'bg-rose-50 text-rose-500'
                                    : 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500'
                                }`}
                        >
                            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BookCard;
