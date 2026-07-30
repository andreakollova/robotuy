import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/projects/'],
    },
    sitemap: ['https://robotuy.com/sitemap.xml', 'https://robotuy.sk/sitemap.xml'],
  };
}
