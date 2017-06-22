'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CcompanyProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("company_company_profile" ,function ($timeout,$window,$scope, $http,$routeParams,apiUrl) {
  $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$routeParams.comid+"/")
      .then(function successCallback(response){
          $scope.company_profile_details = response.data[0];
      }, function errorCallback(response){
          console.log("Unable to perform get company profile details");
  });
  $http.get(apiUrl+"api/v1/setups/company_categories/")
      .then(function successCallback(response){
          $scope.company_cate = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get company details as category wise");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );

  });
});
FirstSynch.controller("companyprofileform" ,function ($rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl) {
    $scope.basicinfosubmit = function(){
        var data = {
            name:$scope.basicinfoform.name,
            category : $scope.basicinfoform.category,
            product_category : $scope.basicinfoform.product_category,
            website : $scope.basicinfoform.website,
            facebook_url : $scope.basicinfoform.facebook_url,
            linkedin_url : $scope.basicinfoform.linkedin_url,
            twitter_url : $scope.basicinfoform.twitter_url,
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/18/",JSON.stringify(data))
        .then(function (response) {
            $('#company_profile_basic_information').fadeOut();
        });
    };
    $scope.establishmentsubmit = function(){
        var data = {
            establishment_date:$scope.establishmentform.establishment_date,
            est_date_description : $scope.establishmentform.est_date_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.establishmentform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $('#company_profile_dateofestablishment').fadeOut();
        });
    };
    $scope.internshipsubmit = function(){
        var data = {
            internships_to_jobs:$scope.internshipform.internships_to_jobs,
            internships_job_description : $scope.internshipform.internships_job_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.internshipform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $('#company_profile_internship').fadeOut();
        });
    };
    $scope.companysizesubmit = function(){
        var data = {
            company_size:$scope.companysizeform.company_size,
            company_size_description : $scope.companysizeform.company_size_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.companysizeform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $('#company_profile_companysize').fadeOut();
        });
    };
    $scope.hireratesubmit = function(){
        var data = {
            hire_rates:$scope.hirerateform.hire_rates,
            hire_rates_description:$scope.hirerateform.hire_rates_description,
            departure_rate:$scope.hirerateform.departure_rate,
            departure_rate_description : $scope.hirerateform.departure_rate_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.hirerateform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $('#company_profile_hireanddeparture').fadeOut();
        });
    };
    $scope.fundingsubmit = function(){
        var data = {
            funding_size:$scope.fundingform.funding_size,
            funding_size_description : $scope.fundingform.funding_size_description
        };
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.fundingform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $('#company_profile_fundingsize').fadeOut();
        });
    };
    $scope.growthratesubmit = function(){
        var data = {
            growth_rate:$scope.growthrateform.growth_rate,
            growth_rate_description : $scope.growthrateform.growth_rate_description
        };

        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.growthrateform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $('#company_profile_growthrate').fadeOut();
        });
    };
    $scope.investorsubmit = function(){
        var data = {
            investor_confidence:$scope.investorform.investor_confidence,
            investor_conf_description : $scope.investorform.investor_conf_description
        };

        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.investorform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $('#company_profile_inverster').fadeOut();
        });
    };
});
