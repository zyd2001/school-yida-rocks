let mix = require('laravel-mix');

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

mix.js('resources/assets/js/entries/dependency.js', 'public/js')
    .js('resources/assets/js/entries/app.js', 'public/js')
    .js('resources/assets/js/entries/verify.js', 'public/js')
    .js('resources/assets/js/entries/assignment.js', 'public/js')
    .js('resources/assets/js/entries/home.js', 'public/js')
    .js('resources/assets/js/entries/course.js', 'public/js')
    .js('resources/assets/js/entries/localDependency.js', 'public/js')
    .scripts('resources/assets/js/global.js', 'public/js/global.js')
    .styles('resources/assets/css/main.css', 'public/css/main.css')
    .sass('resources/assets/sass/app.scss', 'public/css');
