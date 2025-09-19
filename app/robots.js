export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/watch", "/admin"], // 🚫 block these paths
      },
    ],
    sitemap: "https://letstream.site/sitemap.xml",
  };
}
