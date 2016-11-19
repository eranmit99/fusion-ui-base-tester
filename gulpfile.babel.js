'use strict';
import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import sync     from 'run-sequence';
import fs       from 'fs';
import yargs    from 'yargs';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import inject   from 'gulp-inject';
import svgSprite from 'gulp-svg-sprite';
import clean from 'gulp-clean';

let root = 'src';
let temp = 'temp';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
  return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
let mainHtmlFile = path.join(root, 'index.html');
let paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.styl'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    mainHtmlFile
  ],
  entry: path.join(__dirname, root, 'index.js'),
  output: root,
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**')
};

// use webpack.config.js to build modules
gulp.task('webpack',['generate-svg'], (cb) => {
  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if(err)  {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('generate-svg', ['clean-temp'], () => {
	console.log('generate');
});

gulp.task('sprites', () => {
	return gulp.src(resolveToApp('icons/*.svg'))
		.pipe(svgSprite(
			{
				mode: {
        	        symbol: {
        	        	dest: './',
        	        	sprite: 'sprite.svg'
        	        }
	            }
	        }
		))
		.pipe(gulp.dest('temp/icons'))
});

gulp.task('inject', ['sprites'], () => {
	return gulp.src(mainHtmlFile)
		.pipe( inject( gulp.src(['./temp/icons/sprite.svg'], {read: true}), {
			name: 'sprite',
			transform: function (filePath, file) {
				return file.contents.toString('utf8')
			}
		}))
		.pipe(gulp.dest(root))
});

gulp.task('copyfonts', function() {
	gulp.src('./app/**/*.{ttf,woff,eof,svg}')
	.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('clean-temp', ['inject'], () => {
	return gulp.src(temp, {read: false})
	.pipe(clean());
});

gulp.task('serve', ['generate-svg'], () => {
  const config = require('./webpack.dev.config');
  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
    paths.entry
  ];

  var compiler = webpack(config);

  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {baseDir: root},
    middleware: [
      webpackDevMiddelware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpachHotMiddelware(compiler)
    ]
  });
});

gulp.task('watch', ['serve']);

gulp.task('default', ['serve']);
