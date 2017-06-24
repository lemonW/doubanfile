(function (angular) {
  //创建模块
  var app = angular.module("movie_list", ["myService", "ngRoute"]);
  //路由配置才能使用
  app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/:movieType/:page?", {
      templateUrl: "movie_list/movie_list.html",
      //与指定控制器关联以便渲染数据
      controller: "movie_listCtrl"
    });
  }]);
  app.controller("movie_listCtrl", ["$scope", "myJsonp", "$routeParams", "$route", "$window", function ($scope, myJsonp, $routeParams, $route, $window) {
    $scope.isShow = true;
    //页数，没有page参数就为1
    //隐式转化为number
    $scope.pageIndex = ($routeParams.page || 1) - 0;
    //一页的条目数
    $scope.pageSize = 20;

    myJsonp.jsonp({
      url: "http://api.douban.com/v2/movie/" + $routeParams.movieType,
      params: {
        count: $scope.pageSize,
        //每一页开始的条目的编号
        start: ($scope.pageIndex - 1) * $scope.pageSize,

        //我完全把这方法理解错了 /(ㄒoㄒ)/~~
        //$routeParams是$location的search()和path()的组合
        //通过$routeParams拿到之前设定hash时的文本值
        q: $routeParams.q
      },
      callback: function (data) {
        $scope.movies = data;
        $scope.isShow = false;
        //取得总条目后计算总页数
        $scope.pageCount = $window.Math.ceil(data.total / $scope.pageSize);
        //一旦$scope的数据有更新
        //就会重新渲染视图
        $scope.$apply();
      }
    });

    $scope.getPage = function (pageIndex) {
      //判断页数
      if (pageIndex < 1 || pageIndex > $scope.pageCount) return;
      //修改地址栏的参数. 将page改为修改后的pageIndex
      $route.updateParams({
        page: pageIndex
      });
    };
  }]);
})(angular);