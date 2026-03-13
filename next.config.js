require('dotenv').config();
const nextConfig = {
  // basePath: '/',
   async headers() {
    return [
      {
        source: "/(.*)\\.(svg|js|webp|webm|mp4|jpg|png|woff2?)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'alliancerecruitmentagencyae.aistechnolabs.pro' },
      { protocol: 'https', hostname: 'www.alliancerecruitmentagency.ae' },
      { protocol: 'https', hostname: 'allianceae-10072.kxcdn.com' },
      { protocol: 'https', hostname: 'allianceaeapi.alliancerecruitmentagency.ae' },
      { protocol: 'https', hostname: 'apialliancerecruitmentagencyae.aistechnolabs.pro' },
      { protocol: 'https', hostname: 'alliancecomauapi.aistechnolabs.pro' },
      { protocol: 'https', hostname: 'cmsapi.alliancerecruitmentagency.com.au' },
      { protocol: 'https', hostname: 'cmsapi.alliancerecruitmentagency.ca' },
      { protocol: 'https', hostname: 'www.alliancerecruitmentagency.ca' },
      { protocol: 'https', hostname: 'cms.alliancerecruitmentagency.ca' },
    ],
  },
  turbopack: {},
  env: {
    LOCAL_HOST: process.env.LOCAL_HOST,
    PASSWORD: process.env.PASSWORD,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    )
    return config
  }
};

module.exports = nextConfig;