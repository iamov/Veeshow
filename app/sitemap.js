import Apicore from "./Api/ApiCore";

export default async function sitemap() {
    const api = new Apicore();
    const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    const url1 = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';

    try {
        // Fetch movie data with error handling
        const res = await api.get(url);
        if (!res || !res.results) {
            console.error('Invalid movie data response:', res);
            throw new Error('Failed to fetch movie data');
        }

        // Fetch TV data with error handling
        const sec = await api.get(url1);
        if (!sec || !sec.results) {
            console.error('Invalid TV data response:', sec);
            throw new Error('Failed to fetch TV data');
        }

        // Process movie results
        const post = res.results
            .filter((pos) => {
                if (!pos.release_date) return false;
                const date = new Date(pos.release_date);
                return !isNaN(date.getTime());
            })
            .map((pos) => ({
                url: `https://letstream.site/details/movie/${pos.id}/1`,
                lastModified: new Date(pos.release_date).toISOString(),
            }));

        // Process TV results
        const post2 = sec.results
            .filter((pos) => {
                if (!pos.first_air_date) return false;
                const date = new Date(pos.first_air_date);
                return !isNaN(date.getTime());
            })
            .map((pos) => ({
                url: `https://letstream.site/details/tv/${pos.id}/1`,
                lastModified: new Date(pos.first_air_date).toISOString(),
            }));

        return [
            {
                url: 'https://letstream.site',
                lastModified: new Date().toISOString(),
                priority: 1,
            },
            ...post,
            ...post2,
        ];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return at least the homepage if other data fails
        return [
            {
                url: 'https://letstream.site',
                lastModified: new Date().toISOString(),
                priority: 1,
            }
        ];
    }
}