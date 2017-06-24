//由于douban不支持带.的callback
//因此我们就自己封装一个jsonp函数
(function (angular) {
  //建立一个名为myService的模块
  var app = angular.module("myService", []);
  //为该模块自定义一个名为myJsonp的服务
  app.service("myJsonp", ["$window", function ($window) {
    this.jsonp = function (obj) {
      //拼接url字符串
      var url = obj.url + "?";
      for (var key in obj.params) {
        url += (key + "=" + obj.params[key] + "&");
      };
      //确保每一个callback都有一个唯一的name
      //这样多次接收数据后callback函数的内容就不会被覆盖
      //给一个6位数的随机编号
      var random = $window.Math.random().toString().slice(2, 8);
      var callbackName = "jsonp_" + random;
      //为函数赋予函数体
      //这里用$window.callbackName就没用
      $window[callbackName] = obj.callback;
      //最后的拼接
      url += "callback=" + callbackName;
      var script = document.createElement("script");
      //利用src天然的跨域
      script.src = url;
      $window.document.body.appendChild(script);

      //删除刚刚新建的script标签
      setTimeout(function () {
        script.remove();
      }, 1000);
    };
  }]);
})(angular);