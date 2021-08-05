'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const minimist = require('minimist');
const lodash = require('lodash');

const options = minimist(process.argv.slice(2));
const path = require('path');

const { src, dest, json } = options;
let targets = [];
if (!lodash.isEmpty(json)) {
  const config = require(path.resolve(json));
  if (config instanceof Array) {
    targets = config;
  } else {
    targets.push({
      src,
      dest,
    });
  }
}
gulp.task('images', function() {
  return targets.map(({ src, dest }) => {
    if (lodash.isEmpty(src)) {
      console.error('Error src 未配置');
      return null;
    }
    if (lodash.isEmpty(dest)) {
      console.error('Error dest 未配置');
      return null;
    }
    src = path.resolve(src);
    // const watch = src;
    src = path.join(src, './**');
    dest = path.resolve(dest);

    console.log('src:', src);
    console.log('dest:', dest);
    return gulp
      .src(src)
    // .pipe(newer(dest))
      .pipe(
        imagemin([ imageminJpegtran(), imageminPngquant({ quality: '100' }) ], {
          optimizationLevel: 5,
        })
      )
      .pipe(gulp.dest(dest));
  });
});
gulp.task('default', [ 'images' ], () => {
  console.log(new Date().toLocaleString());
});
