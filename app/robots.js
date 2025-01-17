export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/dmca','/watch']
      },
      sitemap: 'https://vidplus.com.ng/sitemap.xml',
    }
  }