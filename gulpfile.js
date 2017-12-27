var gulp = require('gulp');
var browserSync=require('browser-sync').create();
var sass = require('gulp-sass');

//compile sass into css & auto-inject into browser
//Para HEROKU: debe ir en ruta:
//  '/app/node_modules/bootstrap/scss/bootstrap.scss'
gulp.task('sass',function(){
  return gulp.src(['/node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
          .pipe(sass())
          .pipe(gulp.dest("src/css"))//para Heroku añadir app/src/scss
          .pipe(browserSync.stream());
});


//Move the JavaScript files into our /src/js folder
//Para HEROKU: debe ir en ruta:
//   ''/app/node_modules/bootstrap/dist/js/bootstrap.min.js'
gulp.task('js',function(){
  return gulp.src(['/node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/tether/dist/js/tether.min.js'])
  .pipe(gulp.dest("src/js")) //para Heroku añadir app/
  .pipe(browserSync.stream());
});


//Static server +watching scss/html files
gulp.task('serve',['sass'],function(){
browserSync.init({
  server:"./src"
});
  gulp.watch(['/node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass']);
  gulp.watch("src/*.html").on('change',browserSync.reload); //para Heroku añadir app/
});


gulp.task('default',['js','serve']);
