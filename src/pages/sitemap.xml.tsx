import { GetServerSideProps } from 'next';

const SiteMap = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    // Get the host from the request
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const apiUrl = `${protocol}://${host}/api/sitemap.xml`;

    // Fetch the sitemap from the API route
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const sitemap = await response.text();

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error fetching sitemap from API:', error);
    
    // Return a basic error sitemap
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.alliancerecruitmentagency.ca/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.write(errorSitemap);
    res.end();

    return {
      props: {},
    };
  }
};

export default SiteMap;


