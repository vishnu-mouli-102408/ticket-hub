/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: false,
	images: {
	  remotePatterns: [
		{ protocol: "https", hostname: "res.cloudinary.com" },
		{ protocol: "https", hostname: "img.clerk.com" },
		{ protocol: "https", hostname: "images.unsplash.com" },
		{ protocol: "https", hostname: "quixotic-salmon-28.convex.cloud" },
	  ],
	  minimumCacheTTL: 86400,
	  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	reactStrictMode: true,
	async headers() {
	  return [
		{
		  source: "/api/:path*",
		  headers: [
			{ key: "Access-Control-Allow-Credentials", value: "true" },
			{ key: "Access-Control-Allow-Origin", value: "*" },
			{
			  key: "Access-Control-Allow-Methods",
			  value: "GET,DELETE,PATCH,POST,PUT",
			},
			{
			  key: "Access-Control-Allow-Headers",
			  value:
				"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
			},
		  ],
		},
		{
		  source: "/:all*(svg|jpg|png)",
		  headers: [
			{
			  key: "Cache-Control",
			  value: "public, max-age=31536000, immutable",
			},
			{
			  key: "Content-Encoding",
			  value: "br", // Brotli compression for better performance
			},
		  ],
		},
		{
		  source: "/_next/static/:path*",
		  headers: [
			{
			  key: "Cache-Control",
			  value: "public, max-age=31536000, immutable",
			},
		  ],
		},
	  ];
	},
  };

  export default nextConfig;
