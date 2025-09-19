import Apicore from "./ApiCore";

export default async function sitemap() {
  const api = new Apicore();
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const url1 = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  const telenovelaUrl = "https://letstream.site/api/listseries?page=1"; // ✅ page 1, but can be looped later if needed

  try {
    // --- Fetch movie data ---
    const res = await api.get(url);
    if (!res || !res.results) {
      console.error("Invalid movie data response:", res);
      throw new Error("Failed to fetch movie data");
    }

    // --- Fetch TV data ---
    const sec = await api.get(url1);
    if (!sec || !sec.results) {
      console.error("Invalid TV data response:", sec);
      throw new Error("Failed to fetch TV data");
    }

    // --- Fetch Telenovela data ---
    const tel = await api.get(telenovelaUrl);
    if (!tel || !tel.series) {
      console.error("Invalid telenovela data response:", tel);
      throw new Error("Failed to fetch telenovela data");
    }

    // --- Process movies ---
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

    // --- Process TV ---
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

    // --- Process Telenovelas ---
    const post3 = tel.series.map((pos) => ({
      url: `https://letstream.site/telenovela/${pos._id}`, // ✅ use _id from your DB
      lastModified: new Date(pos.updatedAt || Date.now()).toISOString(), // fallback if no date
    }));

    return [
      {
        url: "https://letstream.site",
        lastModified: new Date().toISOString(),
        priority: 1,
      },
      ...post,
      ...post2,
      ...post3,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Fallback if errors
    return [
      {
        url: "https://letstream.site",
        lastModified: new Date().toISOString(),
        priority: 1,
      },
    ];
  }
}
