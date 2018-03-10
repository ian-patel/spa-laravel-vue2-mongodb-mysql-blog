/* eslint import/no-extraneous-dependencies: ["off"] */
const path = require('path');
const { mix } = require('laravel-mix');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/blog/blog.js', 'js/')
  .js('resources/assets/js/admin/admin.js', 'js/')
  .sass('resources/assets/sass/blog/blog.scss', 'css/')
  .sass('resources/assets/sass/admin/admin.scss', 'css/')
  .extract([
    'vue',
    'axios',
    'lodash',
    'v-tooltip',
    'js-cookie',
    'element-ui',
    'vue-router',
    'speakingurl',
    'vue-lazyload',
    'vue-infinite-loading',
    './resources/assets/js/bootstrap',
  ])
  .sourceMaps()
  .setResourceRoot()
  .webpackConfig({
    output: {
      path: path.resolve(Mix.isUsing('hmr') ? '/' : 'public/'),
      filename: '[name].js',
      chunkFilename: 'dist/js/chunks/[name].js?id=[chunkhash]',
      publicPath: Mix.isUsing('hmr') ? ('http://localhost:8080/') : '/',
    },
    resolve: {
      alias: {
        styles: path.resolve(__dirname, 'resources/assets/sass'),
        app: path.resolve(__dirname, 'resources/assets/js'),
      },
    },
    plugins: mix.inProduction() ? [
      new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ] : [],
  });

if (mix.inProduction()) {
  mix.version();
}
