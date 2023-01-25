let mix = require('laravel-mix');
const glob = require('glob');
const path = require('path');
const Dotenv = require('dotenv-webpack');

mix.webpackConfig({
    module: {
        rules: [{
            test: /\.mp3$/,
            options: {
                name: '[path][name].[ext]'
            },
            loader: 'file-loader'
        }]
    },
        plugins: [
            //new Dotenv()
            new Dotenv({
                path: path.resolve(__dirname,'.env')
            }),
        ],
})

function mixAssetsDir(query, cb) {
    (glob.sync('resources/' + query) || []).forEach(f => {
        f = f.replace(/[\\\/]+/g, '/');
        cb(f, f.replace('resources', 'public'));
    });
}

const sassOptions = {
    precision: 5
};

// plugins Core stylesheets
mixAssetsDir('sass/plugins/**/!(_)*.scss', (src, dest) => mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css'), sassOptions));

// themes Core stylesheets
mixAssetsDir('sass/themes/**/!(_)*.scss', (src, dest) => mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css'), sassOptions));

// pages Core stylesheets
mixAssetsDir('sass/pages/**/!(_)*.scss', (src, dest) => mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css'), sassOptions));

// Core stylesheets
mixAssetsDir('sass/core/**/!(_)*.scss', (src, dest) => mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css'), sassOptions));
// script js
//mixAssetsDir('assets/js/scripts/**/*.js', (src, dest) => mix.scripts(src, dest));


// mixAssetsDir('vendors/js/charts/apexcharts.min.js', (src, dest) => mix.scripts(src, dest));
// mixAssetsDir('vendors/js/**/*.js', (src, dest) => mix.scripts(src, dest));
//mixAssetsDir('vendors/css/**/*.css', (src, dest) => mix.copy(src, dest));
mix.copyDirectory('resources/images', 'public/images');
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

// mix.js([
//     'resources/assets/js/bootstrap.min.js',
// ], 'public/js/bootstrap.min.js');

// mix.js([
//     'resources/assets/js/popper.min.js',
// ],'public/js/popper.min.js');


// mix.js([
//         'resources/assets/js/app.js',
//         'resources/assets/js/top-bar.js',
//     ], 'public/js/app.js')
   //.sass('resources/assets/sass/fundament.scss', 'public/css');
   // .sass('resources/assets/sass/app.scss', 'public/css')

mix.sourceMaps().js([
        'resources/assets/js/main.js',
    ], 'public/js/admin.js').vue()
    .sass('resources/assets/@core/scss/core.scss', 'public/css').webpackConfig({
        resolve: {
            alias: {
              '@scss': path.resolve(__dirname, 'resources/assets/scss'),
              '@core': path.resolve(__dirname, 'resources/assets/@core'),
              //'bootstrap': path.resolve(__dirname, '~bootstrap'),
            },
        },
    })
    // .js('resources/assets/js/core/app-menu.js', 'public/js/core')
    // .js('resources/assets/js/core/app.js', 'public/js/core');


mix.sass('resources/assets/sass/main.scss', 'public/css')