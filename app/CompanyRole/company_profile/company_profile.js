'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CcompanyProfile", ["ngRoute","ngFileUpload"]);


/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("company_company_profile" ,function ($rootScope,Upload,$timeout,$window,$scope, $http,$routeParams,apiUrl) {

    $rootScope.company_profile_form = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$rootScope.company_userid+"/",{
          headers: {'Authorization' : 'Token '+$rootScope.token_id}
        }).then(function successCallback(response){
          $scope.company_profile_details = response.data;
          $rootScope.companyedit_id = response.data.id;
          $window.sessionStorage.setItem('companyedit_id', response.data.id);
        }, function errorCallback(response){
          console.log("Unable to perform get company profile details");
        });
        $http.get(apiUrl+"api/v1/setups/company_categories/")
        .then(function successCallback(response){
          $scope.company_cate = response.data;
        }, function errorCallback(response){
          console.log("Unable to perform get company details as category wise");
        });
    }

    $scope.$watch('$viewContentLoaded', function(){
        $timeout( function(){
          $window.loading_screen.finish();
        }, 3000 );
    });
});
FirstSynch.controller("companyprofileform" ,function (Upload,$rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl) {
  $scope.basicinfosubmit = function(logoimage){
    var data = {
      name:$scope.basicinfoform.name,
      category : $scope.basicinfoform.category,
      product_category : $scope.basicinfoform.product_category,
      website : $scope.basicinfoform.website,
      facebook_url : $scope.basicinfoform.facebook_url,
      linkedin_url : $scope.basicinfoform.linkedin_url,
      twitter_url : $scope.basicinfoform.twitter_url,
    };
    logoimage.upload = Upload.upload({
      url: apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.company_userid+"/",
      data: {user:$rootScope.user_id,logo: logoimage},
      method:'PUT',
    }).then(function(response){
      $rootScope.company_profile_form();
    });
    // alert(JSON.stringify(data));
    $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.company_userid+"/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_basic_information').fadeOut();
      $rootScope.company_profile_form();
    });
  };
  $scope.benefitperkscultrueform = {};
  $scope.benefitperkscultruesubmit = function(){
    var data = {
      company : $rootScope.companyedit_id,
      benefits:$scope.benefitperkscultrueform.benefits,
      perks : $scope.benefitperkscultrueform.perks,
      culture : $scope.benefitperkscultrueform.culture
    };

    $http.post(apiUrl+"api/v1/setups/api/v1/hiring/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_benefitperkscultrue').fadeOut();
      $rootScope.company_profile_form();
    });
  };
  $scope.establishmentform = {};
  $scope.establishmentsubmit = function(){
    var data = {
      establishment_date:$scope.establishmentform.establishment_date,
      est_date_description : $scope.establishmentform.est_date_description
    };
    // alert(JSON.stringify(data));
    $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.company_userid+"/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_dateofestablishment').fadeOut();
      $rootScope.company_profile_form();
    });
  };
  $scope.internshipform = {};
  $scope.internshipsubmit = function(){
    var data = {
      internships_to_jobs:$scope.internshipform.internships_to_jobs,
      internships_job_description : $scope.internshipform.internships_job_description
    };
    // alert(JSON.stringify(data));
    $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.company_userid+"/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_internship').fadeOut();
      $window.scrollTo(0, 0);
      $rootScope.company_profile_form();
    });
  };
  $scope.companysizeform = {};
  $scope.companysizesubmit = function(){
    var data = {
      company_size:$scope.companysizeform.company_size,
      company_size_description : $scope.companysizeform.company_size_description
    };
    // alert(JSON.stringify(data));
    $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.company_userid+"/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_companysize').fadeOut();
      $window.scrollTo(0, 0);
      $rootScope.company_profile_form();
    });
  };
  $scope.hirerateform = {};
  $scope.hireratesubmit = function(){
    var data = {
      hire_rates:$scope.hirerateform.hire_rates,
      hire_rates_description:$scope.hirerateform.hire_rates_description,
      departure_rate:$scope.hirerateform.departure_rate,
      departure_rate_description : $scope.hirerateform.departure_rate_description
    };
    // alert(JSON.stringify(data));
    $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.company_userid+"/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_hireanddeparture').fadeOut();
      $window.scrollTo(0, 0);
      $rootScope.company_profile_form();
    });
  };
  $scope.fundingform = {};
  $scope.fundingsubmit = function(){
    var data = {
      funding_size:$scope.fundingform.funding_size,
      funding_size_description : $scope.fundingform.funding_size_description
    };
    // alert(JSON.stringify(data));
    $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.company_userid+"/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_fundingsize').fadeOut();
      $rootScope.company_profile_form();
    });
  };
  $scope.growthrateform = {};
  $scope.growthratesubmit = function(){
    var data = {
      growth_rate:$scope.growthrateform.growth_rate,
      growth_rate_description : $scope.growthrateform.growth_rate_description
    };

    $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.company_userid+"/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_growthrate').fadeOut();
      $window.scrollTo(0, 0);
      $rootScope.company_profile_form();
    });
  };
  $scope.investorform = {};
  $scope.investorsubmit = function(){
    var data = {
      investor_confidence:$scope.investorform.investor_confidence,
      investor_conf_description : $scope.investorform.investor_conf_description
    };

    $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.company_userid+"/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_inverster').fadeOut();
      $window.scrollTo(0, 0);
      $rootScope.company_profile_form();
    });
  };
  $scope.salaryform = {};
  $scope.csalarysubmit = function(){
    var data = {
      average_entry_level_sal:$scope.salaryform.average_entry_level_sal,
      average_entry_level_sal_description : $scope.salaryform.average_entry_level_sal_description
    };
    // alert(JSON.stringify(data));
    $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.companyedit_id+"/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_averagesalary').fadeOut();
      $window.scrollTo(0, 0);
      $rootScope.company_profile_form();
    });
  };
  $scope.locationform = {};
  $scope.locationsubmit = function(){
    var data = {
      company : $rootScope.companyedit_id,
      address_1 : $scope.locationform.address_1,
      address_2 :$scope.locationform.address_2,
      city :$scope.locationform.city,
      state :$scope.locationform.state,
      country :$scope.locationform.country,
      zip_code :$scope.locationform.zip_code,
      contact_no :$scope.locationform.contact_no,
      e_mail :$scope.locationform.e_mail,
      fax_no :$scope.locationform.fax_no
    };
    $http.post(apiUrl+"api/v1/setups/api/v1/contact/",JSON.stringify(data))
    .then(function (response) {
      $('#company_profile_location').fadeOut();
      $window.scrollTo(0, 0);
      $rootScope.company_profile_form();
    });
  };
});
