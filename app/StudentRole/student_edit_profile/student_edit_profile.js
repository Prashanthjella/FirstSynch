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
});

FirstSynch.controller("studentbasicprofileupload" , function ($rootScope,$scope, $http, apiUrl) {
    $scope.user ="";
    $scope.basicprofilesubmit = function(){
        var data = {
            user:$scope.user,
            first_name : $scope.first_name,
            last_name: $scope.last_name,
            dob: $scope.dob,
            gender: $scope.gender,
            facebook_url: $scope.facebook_url,
            linkedin_url: $scope.linkedin_url,
            twitter_url: $scope.twitter_url,
            website: $scope.website,
            followers:[12,5,42],
            viewed:[12,5,42],
            liked:[5,42],
            disliked:[12,42],
            watched:[12,5],
            watch_later:[5]
        };
        $http.post(apiUrl+"api/v1/user_profile/api/v1/userprofile/",JSON.stringify(data))
        .then(function (response) {
            alert(JSON.stringify(response.data));
        });
    };
});
