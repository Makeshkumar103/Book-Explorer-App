import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookDetails, getCoverUrl } from '../services/api';
import { ArrowLeft, Loader2, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getBookDetails(id);
                setBook(data);
            } catch (err) {
                setError('Failed to load book details.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );

    if (error || !book) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500">
            <p className="mb-4">{error || 'Book not found'}</p>
            <button onClick={() => navigate(-1)} className="text-primary hover:underline">Go Back</button>
        </div>
    );

    const favorite = isFavorite(book.id || id);

    const handleFavorite = () => {
        // We construct a minimal book object for the favorite list if we're adding it
        // Ideally, we'd persist the whole object or fetch it again, but for this list view, we usually need minimal data.
        // However, since we are in details, we have full data.
        // Let's ensure we match the structure expected by BookCard (id, title, author, cover_id, etc)
        // Note: The API details response structure is slightly different from search results.
        // We'll map it to look like a search result for consistency in the Card view.

        if (favorite) {
            removeFavorite(book.id || id);
        } else {
            // We need to pass data compatible with BookCard
            // Search result has: id, title, author (string), cover_id, first_publish_year
            // Details has: id, title, description, covers (array), authors (array of keys)
            // We'll improvise for the MVP.
            const authorText = "View details for author info"; // API details is complex for authors
            const coverId = book.covers && book.covers.length > 0 ? book.covers[0] : null;

            addFavorite({
                id: book.id || id,
                title: book.title,
                author: authorText,
                cover_id: coverId,
                first_publish_year: 'N/A' // Not always in details
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Search
                </button>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden md:flex">
                    <div className="md:w-1/3 bg-slate-100 relative min-h-[400px]">
                        {book.covers && book.covers.length > 0 ? (
                            <img
                                src={getCoverUrl(book.covers[0], 'L')}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">No Cover</div>
                        )}
                    </div>

                    <div className="md:w-2/3 p-8 md:p-12">
                        <div className="flex justify-between items-start mb-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                                {book.title}
                            </h1>
                            <button
                                onClick={handleFavorite}
                                className={`p-3 rounded-full transition-all border ${favorite
                                        ? 'bg-rose-50 text-rose-500 border-rose-100'
                                        : 'bg-white text-slate-300 border-slate-200 hover:border-rose-200 hover:text-rose-500'
                                    }`}
                            >
                                <Heart className={`w-6 h-6 ${favorite ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* Description */}
                        <div className="prose prose-slate max-w-none text-slate-600 mb-8">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">About this book</h3>
                            <p className="leading-relaxed">
                                {typeof book.description === 'string'
                                    ? book.description
                                    : book.description?.value || "No description available for this book."}
                            </p>
                        </div>

                        {/* Metadata Tags (Optional MVP addition) */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {/* Placeholders for tags if we had them */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
