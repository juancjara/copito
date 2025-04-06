/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@copito/api"],
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
    };
    return config;
  },
};

module.exports = nextConfig;
