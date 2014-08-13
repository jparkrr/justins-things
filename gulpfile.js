/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Lint JavaScript
gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .pipe(reload({stream: true, once: true}));
});

gulp.task('jsx', function () {
    return browserify('./app/app.jsx')
        .require('react')
        .transform('reactify')
        .transform({global: true}, 'uglifyify')
        .bundle({ debug: false })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('app'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true, once: true}));
});

gulp.task('copy', function() {
    return gulp.src(['app/data.json'])
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true, once: true}));
});

// Optimize Images
gulp.task('images', function () {
    return gulp.src('app/assets/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets'))
        .pipe(reload({stream: true, once: true}))
        .pipe($.size({title: 'images'}));
});

// Automatically Prefix CSS
gulp.task('styles:css', function () {
    return gulp.src('app/styles/**/*.css')
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({stream: true}))
        .pipe($.size({title: 'styles:css'}));
});

// Compile Sass For Style Guide Components (app/styles/components)
gulp.task('styles:components', function () {
    return gulp.src('app/styles/components/components.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/styles/components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/styles/components'))
        .pipe($.size({title: 'styles:components'}));
});

// Compile Any Other Sass Files You Added (app/styles)
gulp.task('styles:scss', function () {
    return gulp.src(['app/styles/**/*.scss', '!app/styles/components/components.scss'])
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/styles']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size({title: 'styles:scss'}));
});

// Output Final CSS Styles
gulp.task('styles', ['styles:scss']);

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', ['jsx'], function () {
    return gulp.src('app/**/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        // Concatenate And Minify JavaScript
        .pipe($.if('*.js', $.uglify()))
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe($.useref.restore())
        .pipe($.useref())
        // Update Production Style Guide Paths
        .pipe($.replace('components/components.css', 'components/main.min.css'))
        .pipe($.inject(gulp.src(['./app/styles/sprites.html']), {
            starttag: '<!-- inject:svg:{{ext}} -->',
            transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8');
            }
        }))
        // Minify Any HTML
        .pipe($.minifyHtml())
        // Output Files
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', function (cb) {
    rimraf('dist', rimraf.bind({}, '.tmp', cb));
});

// Watch Files For Changes & Reload
gulp.task('serve', function () {
    browserSync.init(null, {
        server: {
            baseDir: ['app', '.tmp']
        },
        notify: false
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/data.json'], ['jsx']);
    gulp.watch(['app/styles/**/*.scss'], ['styles']);
    gulp.watch(['.tmp/styles/**/*.css'], reload);
    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    gulp.watch(['app/**/*.jsx'], ['jsx']);
    gulp.watch(['app/assets/**/*'], ['images']);
});

// Build Production Files
gulp.task('build', function (cb) {
    runSequence('styles', ['jshint', 'jsx', 'html', 'images', 'copy'], cb);
});

// Default Task
gulp.task('default', ['clean'], function (cb) {
    gulp.start('build', cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
    // By default, we use the PageSpeed Insights
    // free (no API key) tier. You can use a Google
    // Developer API key if you have one. See
    // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
    url: 'https://example.com',
    strategy: 'mobile'
}));
