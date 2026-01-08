import Apicore from "./ApiCore";

export const dynamic = "force-dynamic"; // 👈 add this line

export default async function sitemap() {
  const baseURL = process.env.NEXT_PUBLIC_URL
  const api = new Apicore();
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const url1 = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  const telenovelaUrl = `${baseURL}/api/listseries?page=1`;

  try {
    const res = await api.get(url);
    const sec = await api.get(url1);
    const tel = await api.get(telenovelaUrl);

    if (!res?.results || !sec?.results || !tel?.series) throw new Error();

    const post = res.results.map((pos) => ({
      url: `${baseURL}/details/movie/${pos.id}/1`,
      lastModified: new Date(pos.release_date || Date.now()).toISOString(),
    }));

    const post2 = sec.results.map((pos) => ({
      url: `${baseURL}/details/tv/${pos.id}/1`,
      lastModified: new Date(pos.first_air_date || Date.now()).toISOString(),
    }));

    const post3 = tel.series.map((pos) => ({
      url: `${baseURL}/telenovela/${pos._id}`,
      lastModified: new Date(pos.updatedAt || Date.now()).toISOString(),
    }));

    return [
      { url: baseURL, lastModified: new Date().toISOString(), priority: 1 },
      ...post,
      ...post2,
      ...post3,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      { url: baseURL, lastModified: new Date().toISOString(), priority: 1 },
    ];
  }
}
