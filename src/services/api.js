const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=20`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return {
            docs: data.docs.map(book => ({
                id: book.key.replace('/works/', ''),
                title: book.title,
                author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
                cover_id: book.cover_i,
                first_publish_year: book.first_publish_year,
            })),
            numFound: data.num_found,
        };
    } catch (error) {
        console.error("Error searching books:", error);
        throw error;
    }
};

export const getBookDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/works/${id}.json`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Fetch author details if available (often just keys in works)
        // For simplicity, we might just use the author name if we had it, but works API returns author keys.
        // We'll stick to basic details for now + description.

        return {
            id: id,
            title: data.title,
            description: typeof data.description === 'string' ? data.description : data.description?.value || 'No description available.',
            covers: data.covers || [],
            authors: data.authors || [], // These are author keys, handling them fully requires more calls, might skip for MVP or fetch one.
        };
    } catch (error) {
        console.error("Error fetching book details:", error);
        throw error;
    }
};

export const getCoverUrl = (coverId, size = 'M') => {
    if (!coverId) return 'https://placehold.co/128x192?text=No+Cover';
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
