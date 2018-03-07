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

mix.js('resources/assets/js/app.js', 'public/js')
  .styles([
    'resources/assets/css/theme.css',
    'resources/assets/css/icomoon.css',
  ], 'public/css/app.css')
  .sourceMaps()
  .setResourceRoot();

mix.webpackConfig({
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'resources/assets/js'),
    },
  },
  plugins: mix.inProduction() ? [
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ] : [],
});

mix.extract([
  'vue',
  'axios',
  'lodash',
  'vue-router',
  'v-tooltip',
  'vue-lazyload',
  'vue-infinite-loading',
]);

if (mix.inProduction()) {
  mix.version();
}
