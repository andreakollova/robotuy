import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/projects/'],
    },
    sitemap: ['https://robotuy.app/sitemap.xml', 'https://robotuy.app/sitemap.xml'],
  };
}
