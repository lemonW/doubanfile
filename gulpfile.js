//获取gulp模块
var gulp = require('gulp');
//以下功能都需要安装插件
//js压缩
var uglify = require("gulp-uglify");
//css压缩
var cssmin = require("gulp-cssmin");
//html压缩
var htmlmin = require("gulp-htmlmin");
//文件合并
var concat = require("gulp-concat");

//任务定义好后
//在命令行输入 gulp 任务名 即可执行任务
gulp.task("test", function () {
  console.log("hello world")
});

//gulp对象本身只有5个方法.
//  task方法 创建1个任务.
//  src 设置待处理文件的路径.
//  pipe 设置管道中的关卡
//  dest 方法.存储处理完毕之后的文件的路径.
//  watch方法.监视. 一旦文件发生了改变 就自动执行任务.

gulp.task("ysJs", function () {
  //选择文件
  gulp.src("src/movie_list/movie_list.js")
    //执行js压缩
    //任务之间必须用pipe连接
    .pipe(uglify())
    //放入指定文件夹
    .pipe(gulp.dest("dist"))
});

gulp.task("ysCss", function () {
  //这里的{base:"./src"}表示要在dist文件夹下将处理后的文件放入与原来的路径相同的地方
  //相当于 dist/assets/css
  gulp.src("src/assets/css/*.css", {
      base: "./src"
    })
    .pipe(cssmin())
    .pipe(gulp.dest("dist"))
});


//   参数1: 监视的文件的路径
//   参数2
//     可以是1个回调. 当文件发生变化 就会执行这个回调.
//     还可以是1个数组,数组中写上任务的名称.一旦文件的内容发生变化 就会执行指定的任务.
gulp.task("watchTest", function () {
  gulp.watch("./src/assets/css/reset.css", ["ysCss"]);
});

gulp.task("ysHtml", function () {
  gulp.src("./src/index.html")
    //htmlmin要求传入一个对象
    .pipe(htmlmin({
      removeComments: true, //清除HTML注释
      collapseWhitespace: true, //压缩HTML
      collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
      minifyJS: true, //压缩页面的JS
      minifyCSS: true //压缩页面的CSS
    }))
    .pipe(gulp.dest("dist"))
});

gulp.task("heBing", function () {
  //  **表示任意文件夹， ！则表示要排除的文件
  gulp.src(["./src/**/*.js", "!./src/assets/js/*.js", "!./src/gulp*.js"])
    .pipe(uglify())
    //合并后的文件名
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./dist/assets/js"));
});