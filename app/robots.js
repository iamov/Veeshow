export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/','/watch']
      },
      sitemap: 'https://letstream.site/sitemap.xml',
    }
  }