export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://14flick.com/sitemap.xml', // Replace with your domain
  }
}