import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const localData = localStorage.getItem('favorites');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (book) => {
        setFavorites((prev) => {
            if (prev.some(b => b.id === book.id)) return prev;
            return [...prev, book];
        });
    };

    const removeFavorite = (bookId) => {
        setFavorites((prev) => prev.filter(b => b.id !== bookId));
    };

    const isFavorite = (bookId) => {
        return favorites.some(b => b.id === bookId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
