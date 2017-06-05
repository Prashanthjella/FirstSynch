'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("CompanyEditProfile", ["ngRoute","firstSync","ngFileUpload"]);

/////////////////////////////////// Module ////////////////////////////////////

// Student edit profile - studenteditprofiles
FirstSynch.controller("companyeditprofiles" , function ($rootScope,$scope, $http, apiUrl,$timeout) {


    // company profile date of establishmentform edit
    $scope.establishmentform = {
        id:"",
        establishment_date : "",
        est_date_description : ""
    };
    $scope.establishment_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.establishmentform.id = response.data.id;
                $scope.establishmentform.establishment_date = response.data.establishment_date;
                $scope.establishmentform.est_date_description = response.data.est_date_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
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
            $scope.establishmentmessage = 'Successfully updated';
        });
    };

    // company profile   internshipform edit
    $scope.internshipform = {
        id:"",
        internships_to_jobs : "",
        internships_job_description : ""
    };
    $scope.internship_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.internshipform.id = response.data.id;
                $scope.internshipform.internships_to_jobs = response.data.internships_to_jobs;
                $scope.internshipform.internships_job_description = response.data.internships_job_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
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
            $scope.internshipmessage = 'Successfully updated';
        });
    };

    // company profile - comapnaysizeform edit
    $scope.companysizeform = {
        id:"",
        company_size : "",
        company_size_description : ""
    };
    $scope.companysize_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.companysizeform.id = response.data.id;
                $scope.companysizeform.company_size = response.data.company_size;
                $scope.companysizeform.company_size_description = response.data.company_size_description;
            }, function errorCallback(response){
                console.log("Unable to perform get company basic profile details");
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
            $scope.companysizemessage = 'Successfully updated';
        });
    };

    // company profile date of hirerateform edit
    $scope.hirerateform = {
        id:"",
        hire_rates : "",
        hire_rates_description : "",
        departure_rate : "",
        departure_rate_description : ""
    };
    $scope.hirerate_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.hirerateform.id = response.data.id;
                $scope.hirerateform.hire_rates = response.data.hire_rates;
                $scope.hirerateform.hire_rates_description = response.data.hire_rates_description;
                $scope.hirerateform.departure_rate = response.data.departure_rate;
                $scope.hirerateform.departure_rate_description = response.data.departure_rate_description;
            }, function errorCallback(response){
                console.log("Unable to perform get departure_rate details");
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
            $scope.hireratemessage = 'Successfully updated';
        });
    };

    // company profile salary edit
    $scope.fundingform = {
        id:"",
        funding_size : "",
        funding_size_description : ""
    };
    $scope.funding_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.fundingform.id = response.data.id;
                $scope.fundingform.funding_size = response.data.funding_size;
                $scope.fundingform.funding_size_description = response.data.funding_size_description;
            }, function errorCallback(response){
                console.log("Unable to perform getfunding details");
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
            $scope.fundingmessage = 'Successfully updated';
        });
    };

    // company profile growth edit
    $scope.growthrateform = {
        id:"",
        growth_rate : "",
        growth_rate_description : ""
    };
    $scope.growthrate_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.growthrateform.id = response.data.id;
                $scope.growthrateform.growth_rate = response.data.growth_rate;
                $scope.growthrateform.growth_rate_description = response.data.growth_rate_description;
            }, function errorCallback(response){
                console.log("Unable to perform growthrate_edit details");
        });
    };

    $scope.growthratesubmit = function(){
        var data = {
            growth_rate:$scope.growthrateform.growth_rate,
            growth_rate_description : $scope.growthrateform.growth_rate_description
        };

        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.growthrateform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.growthratemessage = 'Successfully updated';
        });
    };

    // company profile investor edit
    $scope.investorform = {
        id:"",
        investor_confidence : "",
        investor_conf_description : ""
    };
    $scope.investor_edit = function(){
        $http.get(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.investorform.id = response.data.id;
                $scope.investorform.investor_confidence = response.data.investor_confidence;
                $scope.investorform.investor_conf_description = response.data.investor_conf_description;
            }, function errorCallback(response){
                console.log("Unable to perform growthrate_edit details");
        });
    };

    $scope.investorsubmit = function(){
        var data = {
            investor_confidence:$scope.investorform.investor_confidence,
            investor_conf_description : $scope.investorform.investor_conf_description
        };

        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.investorform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.investormessage = 'Successfully updated';
        });
    };

});
FirstSynch.controller("companybasicprofileupload" , function ($rootScope, $scope, $http, apiUrl) {
    $scope.basicinfoform = {
        id:"",
        name : "",
        category : "",
        product_category : "",
        website : "",
        facebook_url : "",
        linkedin_url : "",
        twitter_url : "",
    };
    // student basic profile get information
    $http.get(apiUrl+"api/v1/setups/api/v1/company/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $rootScope.comp_id = response.data.id;
            $scope.basicinfoform.id = response.data.id;
            $scope.basicinfoform.name = response.data.name;
            $scope.basicinfoform.category = response.data.category;
            $scope.basicinfoform.product_category = response.data.product_category;
            $scope.basicinfoform.website = response.data.website;
            $scope.basicinfoform.linkedin_url = response.data.linkedin_url;
            $scope.basicinfoform.twitter_url = response.data.twitter_url;
            $scope.basicinfoform.facebook_url = response.data.facebook_url;
        }, function errorCallback(response){
            console.log("Unable to perform get company basic profile details");
    });

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
        $http.patch(apiUrl+"api/v1/setups/api/v1/company/"+$scope.basicinfoform.id+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.basicinfomessage = 'Successfully updated';
        });
    };
});
