const mix = require("laravel-mix");

mix

  .sass("src/public/css/main.scss", "dist/public/css")
  .copy("src/public/js/lib", "dist/public/js/lib")
  .copy("src/public/fonts", "dist/public/fonts")
  .copy("src/public/images", "dist/public/images")
  .setPublicPath("dist");
