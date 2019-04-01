const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const minimist = require('minimist');
const lodash = require('lodash');

const options = minimist(process.argv.slice(2));
const path = require('path');

let { src, dest, json } = options;
if (!lodash.isEmpty(json)) {
  const config = require(path.resolve(json));
  src = config.src;
  dest = config.dest;
}
if (lodash.isEmpty(src)) {
  console.error('Error src 未配置');
  return;
}
if (lodash.isEmpty(dest)) {
  console.error('Error dest 未配置');
  return;
}
src = path.resolve(src);
const watch = src;
src = path.join(src, './**/*.{png,jpg,gif,ico}');
dest = path.resolve(dest);

console.log('src:', src);
console.log('dest:', dest);
// Minify any new images
gulp.task('images', function() {
  // Add the newer pipe to pass through newer images only
  return gulp
    .src(src)
    .pipe(newer(dest))
    .pipe(
      imagemin([imageminJpegtran(), imageminPngquant({ quality: '65-80' })], {
        optimizationLevel: 5
      })
    )
    .pipe(gulp.dest(dest));
});
gulp.task('default', ['images'], function() {
  gulp.watch(watch, ['images']);
});
