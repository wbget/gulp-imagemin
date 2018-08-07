var gulp = require('gulp');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

var imgSrc = './image/**';
var imgDest = './build/image/';

// Minify any new images
gulp.task('images', function() {

  // Add the newer pipe to pass through newer images only
  return gulp.src(imgSrc)
      .pipe(newer(imgDest))
      .pipe(imagemin([imageminJpegtran(), imageminPngquant({quality: '65-80'})]))
      .pipe(gulp.dest(imgDest));

});

gulp.task('default', function() {
  gulp.watch(imgSrc, ['images']);
});