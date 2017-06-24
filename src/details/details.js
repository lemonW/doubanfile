(function (angular) {
  //1.创建模块.
  var app = angular.module("moviecat_details", ["ngRoute", "myService"]);

  //2.定义路由.
  app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/details/:id", {
      templateUrl: "details/details.html",
      controller: "detailsCtrl"
    })
  }]);

  app.controller("detailsCtrl", ["$scope", "$routeParams", "myJsonp", function ($scope, $routeParams, myJsonp) {

    $scope.isShow = true;
    //1.拿到传递过来的参数.
    var id = $routeParams.id;
    //2. 发送请求.
    myJsonp.jsonp({
      url: "http://api.douban.com/v2/movie/subject/" + id,
      params: {},
      callback: function (data) {
        $scope.movie = data;
        $scope.isShow = false;
        $scope.$apply();
      }
    });
  }]);
})(angular);