var gulp = require("gulp");
var webserver = require("gulp-webserver");

gulp.task("webserver", function () {
  gulp.src("./dist/").pipe(
    webserver({
			port: 8008,//端口号
			host: "127.0.0.1",//主机名
			livereload: true,//是否热更新
			open: true,//是否打开浏览器
    })
  );
});
