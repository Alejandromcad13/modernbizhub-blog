/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //enable experimental app feature
  experimental:{
    appDir:true
  },
  images: {
		domains: ['cdn.sanity.io']
	}
}

module.exports = nextConfig
