'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("StudentCompanyList", ["ngRoute"]);


/////////////////////////////////// Configuration ////////////////////////////////////

FirstSynch.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider) {
  $routeProvider.when('/student/companies', {
    templateUrl: 'StudentRole/company_list/company_list.html'
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

//company page - top 3 details
FirstSynch.controller("top_three" ,function ($scope, $http,$routeParams,apiUrl) {
 
  $http.get(apiUrl+"api/v1/setups/top3_companies/?count=3&fields=name,logo,city,state,country")
      .then(function successCallback(response){
          $scope.top_three_company = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

});
//company page - company category
FirstSynch.controller("company_category" ,function ($scope, $http,$routeParams,apiUrl) {
 
  $http.get(apiUrl+"api/v1/setups/company_categories/?fields=id,industry_type,related_company,name,logo,city,state")
      .then(function successCallback(response){
          $scope.company_cate = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get company details as category wise");
  });

});

//company page - All companies
FirstSynch.controller("all_companies" ,function ($scope, $http,$routeParams,apiUrl) {
 
  $http.get(apiUrl+"api/v1/setups/top3_companies/?count=all&fields=name,logo,city,state,country")
      .then(function successCallback(response){
          $scope.all_company = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

});
/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
