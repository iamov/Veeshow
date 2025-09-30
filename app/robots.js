export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/watch", "/admin", "/telestream", "/stream"], // 🚫 block these paths
      },
    ],
    sitemap: "https://letstream.site/sitemap.xml",
  };
}
