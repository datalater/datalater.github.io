const withNextra = require('nextra')({
  theme: './packages/nextra-theme-blog/src/index',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra({
  // I want to use mp3 file. So I need to config webpack to use file-loader.
  // @link https://velog.io/@brgndy/Next.js13-%EC%97%90%EC%84%9C-audio-%ED%8C%8C%EC%9D%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          esModule: false,
        },
      },
    });
    return config;
  },
});

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
