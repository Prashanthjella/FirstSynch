'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("StudentEditProfile", ["ngRoute","firstSync"]);

/////////////////////////////////// Module ////////////////////////////////////

// Student edit profile - studenteditprofiles
FirstSynch.controller("studenteditprofiles" , function ($rootScope,$scope, $http, apiUrl) {
    $http.get(apiUrl+"api/v1/user_profile/api/v1/student_profile/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.student_datas = response.data;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });

    $scope.tellmeaboutyourvideo = function(){
        alert('Page under construction');
    };
    $scope.yourgoalsvideo = function(){
        alert('Page under construction');
    };
    $scope.yourhobbivideo = function(){
        alert('Page under construction');
    };
    $scope.wehireyouvideo = function(){
        alert('Page under construction');
    };
    $scope.yourstrengthvideo = function(){
        alert('Page under construction');
    };
    $scope.hobbiesform = {
        user:"",
        name : ""
    };
    $scope.hobbies_edit = function(){

        $http.get(apiUrl+"api/v1/user_profile/api/v1/get_hobby_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.hobbiesform = response.data;
                $scope.hobbiesform.user = response.data[0].user;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.hobbiessubmit = function(){
        var hobbies_data = {
            user : $scope.hobbiesform.user,
            name : $scope.hobbiesform.name
        }
        // /alert(JSON.stringify(hobbies_data));
        $http.post(apiUrl+"api/v1/user_profile/api/v1/hobbyinfo/",JSON.stringify(hobbies_data))
        .then(function (response) {
            $scope.hobbiesmessage = 'Successfully updated';
        });
    };
});

FirstSynch.controller("studentbasicprofileupload" , function ($rootScope, $scope, $http, apiUrl) {
    $scope.basicprofileform = {
        id:"",
        user:"",
        first_name : "",
        last_name : "",
        dob : "",
        gender : "",
        facebook_url : "",
        linkedin_url : "",
        twitter_url : "",
        website : ""
    };
    // student basic profile get information
    $http.get(apiUrl+"api/v1/user_profile/api/v1/get_basicprofile_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.basicprofileform.id = response.data[0].id;
            $scope.basicprofileform.user = response.data[0].user;
            $scope.basicprofileform.first_name = response.data[0].first_name;
            $scope.basicprofileform.last_name = response.data[0].last_name;
            $scope.basicprofileform.dob = response.data[0].dob;
            $scope.basicprofileform.gender = response.data[0].gender;
            $scope.basicprofileform.facebook_url = response.data[0].facebook_url;
            $scope.basicprofileform.linkedin_url = response.data[0].linkedin_url;
            $scope.basicprofileform.twitter_url = response.data[0].twitter_url;
            $scope.basicprofileform.website = response.data[0].website;
        }, function errorCallback(response){
            console.log("Unable to perform get student basic profile details");
    });

    $scope.basicprofilesubmit = function(){
        var data = {
            user:$scope.basicprofileform.user,
            first_name : $scope.basicprofileform.first_name,
            last_name: $scope.basicprofileform.last_name,
            dob: $scope.basicprofileform.dob,
            gender: $scope.basicprofileform.gender,
            facebook_url: $scope.basicprofileform.facebook_url,
            linkedin_url: $scope.basicprofileform.linkedin_url,
            twitter_url: $scope.basicprofileform.twitter_url,
            website: $scope.basicprofileform.website
        };
        //alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/user_profile/api/v1/userprofile/"+$scope.basicprofileform.user+"/",JSON.stringify(data))
        .then(function (response) {
            $scope.basicprofilemessage = 'Successfully updated';
        });
    };
});
