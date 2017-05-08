'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CompanycareerFair", ["ngRoute"]);


/////////////////////////////////// Configuration ////////////////////////////////////

FirstSynch.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider) {
  $routeProvider.when('/company/careerfair', {
    templateUrl: 'GuestRole/career_fair/career_fair.html',
  });
  if(window.history && window.history.pushState){
     //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">
     // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
     // if you don't wish to set base URL then use this
    $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
    }).hashPrefix('!');
   }
}]);


/////////////////////////////////// Controllors ////////////////////////////////////

// career fair page - near by career fair
FirstSynch.controller("company_career_fair_near_user" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?count=10")
      .then(function successCallback(response){
          $scope.career_fair_near_current_user = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get career fair near for current user");
  });

});

// career fair page - near by career fair
FirstSynch.controller("company_upcoming_career_fair" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/flat_pages/recent_career_fairs/?count=10")
      .then(function successCallback(response){
          $scope.upcoming_career = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get upcoming career fair");
  });

});

// career fair page - near by all career fair
FirstSynch.controller("company_all_career_fair_near_user" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?count=all&location=Chennai&fields=id,image,start_date,city,state,title")
      .then(function successCallback(response){
          $scope.all_career_fair_near_current_user = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get career fair near for current user");
  });

});
/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
