/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['unsplash.com', 'picsum.photos'], // Add any other domains you want to allow
	},
};

module.exports = nextConfig;
