/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //   appDir: true,
    // },
    // webpack: (config) => {
    //   config.resolve.alias["@styles"] = path.resolve(__dirname, "./styles");
    //   config.resolve.alias["@public"] = path.resolve(__dirname, "./public");
    //   config.resolve.alias["@api"] = path.resolve(__dirname, "./pages/api");
    //   config.resolve.alias["@app"] = path.resolve(__dirname, "./app");
    //   return config;
    // },
    // async rewrites() {
    //   return [
    //     //接口请求 前缀带上/api-text/
    //     {
    //       source: "/api/:path*",
    //       destination: `http://127.0.0.1:8000/:path*`,
    //     },
    //   ];
    // },
    // typescript: {
    //     // WARN
    //     // Dangerously allow production builds to successfully complete even if
    //     // your project has type errors.
    //     // !! WARN !!
    //     ignoreBuildErrors: true,
    //   },
};

module.exports = nextConfig;
