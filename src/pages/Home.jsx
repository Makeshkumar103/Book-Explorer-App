import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { searchBooks } from '../services/api';
import BookCard from '../components/BookCard';

const Home = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setSearched(true);
        try {
            const data = await searchBooks(query);
            setBooks(data.docs);
        } catch (err) {
            setError('Failed to fetch books. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 pt-10 pb-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Great Read</span>
                    </h1>
                    <p className="text-slate-500 mb-8 text-lg">
                        Search millions of books through the Open Library database.
                    </p>

                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner"
                                placeholder="Search by title, author, or ISBN..."
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute inset-y-2 right-2 px-6 bg-slate-900 text-white rounded-xl font-medium hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-500">{error}</p>
                    </div>
                )}

                {!loading && !error && searched && books.length === 0 && (
                    <div className="text-center py-20 text-slate-400">
                        <p>No books found for "{query}". Try a different search.</p>
                    </div>
                )}

                {!loading && !searched && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Start searching to see results</p>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
