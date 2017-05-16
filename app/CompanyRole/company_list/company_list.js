'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CompanyCompanyList", ["ngRoute"]);


/////////////////////////////////// Controllors ////////////////////////////////////

//company page - top 3 details
FirstSynch.controller("company_top_three" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/toplist/top3companies/")
      .then(function successCallback(response){
          $scope.top_three_company = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

});
//company page - company category
FirstSynch.controller("company_company_category" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/setups/company_categories/?fields=id,industry_type,related_company,name,logo,city,state")
      .then(function successCallback(response){
          $scope.company_cate = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get company details as category wise");
  });

});

//company page - All companies
FirstSynch.controller("company_all_companies" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/setups/top3_companies/?count=all&fields=id,name,logo,city,state,country")
      .then(function successCallback(response){
          $scope.all_company = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

});
/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
