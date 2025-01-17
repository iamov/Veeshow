import Apicore from "./Api/ApiCore";

export default async function sitemap() {
    const api = new Apicore()
    const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    const url1 = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';

  
    const res = await api.get(url);
    const result =  res;

    const sec = await api.get(url1)
    const result2 = sec

    const post = result.results
    .filter((pos) => {
      const date = new Date(pos.release_date);
      return !isNaN(date.getTime());
    })
    .map((pos) => {
      const lastModifiedDate = new Date(pos.release_date);
      return {
        url: `https://letstream.site/details/movie/${pos.id}/1`,
        lastModified: lastModifiedDate.toISOString(),
      };
    });
    const post2 = result2.results
    .filter((pos) => {
      const date = new Date(pos.first_air_date);
      return !isNaN(date);
    })
    .map((pos) => {
      const lastModifiedDate = new Date(pos.first_air_date);
      return {
        url: `https://letstream.site/details/tv/${pos.id}/1`,
        lastModified: lastModifiedDate.toISOString(),
      };
    });

  
    return [
      {
        url: 'https://letstream.site',
        lastModified: new Date(),
        priority: 1,
      },
      ...post, ...post2,
    ];
  }
  