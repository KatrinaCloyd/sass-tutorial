const { src, dest, watch, series } = require("gulp");
const purgecss = require("gulp-purgecss");
const sass = require("gulp-sass")(require("sass"));

function buildStyles() {
  return (
    src("sass-library/**/*.scss")
      .pipe(sass())
      //purge any css classes that are not used in any html files
      .pipe(purgecss({ content: ["*.html"] }))
      .pipe(dest("css"))
  );
}

// watch for changes in sass files and html files to update css
function watchTask() {
  watch(["sass-library/**/*.scss", "*.html"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
