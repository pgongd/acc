const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// SCSS → CSS 변환
function scss() {
  return gulp.src('./컴포넌트/scss/**/*.scss')  // SCSS 경로
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./컴포넌트/css'));        // 결과 CSS 저장 폴더
}

// 변경 감시
function watch() {
  gulp.watch('./src/scss/**/*.scss', scss);
}

exports.scss = scss;
exports.watch = watch;
