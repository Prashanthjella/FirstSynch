'use strict';

// Declare app level module which depends on views, and components
var FirstSynch = angular.module("firstSync", [
    "ngRoute",
    "angularMoment",
    "angucomplete-alt",
    "hoMe",
    "careerFair",
    "careerFairDetail",
    "CompanyList",
    "StudentList",
    "GstudentProfile",
    "GcompanyProfile",
    "GemployeeProfile",
    "StudentDashboard",
    "StudentcareerFair",
    "StudentcareerFairDetail",
    "StudentCompanyList",
    "SStudentList",
    "SstudentProfile",
    "ScompanyProfile",
    "SemployeeProfile",
    "CompanyDashboard",
    "CompanycareerFair",
    "CompanycareerFairDetail",
    "CompanyCompanyList",
    "CStudentList",
    "CstudentProfile",
    "CcompanyProfile",
    "CemployeeProfile",
    "Search"
]);

FirstSynch.constant('apiUrl', 'http://52.43.26.31:8000/');
FirstSynch.constant('companyusertype','48KL3');
FirstSynch.constant('studentusertype','38OD2');

/////////////////////////////////////////////////Popup - Video, Login, Registration, Activate, Reset password, forgot password, logout///////////////
//Video Popup Functionality
FirstSynch.run(function($rootScope, $http, apiUrl,companyusertype,studentusertype,$location) {
    // condition based header show
    if(companyusertype == window.sessionStorage.getItem("usertype")){
        $rootScope.companyuserInfo = window.sessionStorage.getItem("token");
        $rootScope.profileimage = window.sessionStorage.getItem("profileimage");
        $rootScope.user_id = window.sessionStorage.getItem("user_id");
    }
    else if(studentusertype == window.sessionStorage.getItem("usertype")){
        $rootScope.studentuserInfo = window.sessionStorage.getItem("token");
        $rootScope.profileimage = window.sessionStorage.getItem("profileimage");
        $rootScope.user_id = window.sessionStorage.getItem("user_id");
    }
    $rootScope.current_url = $location.path();
    $rootScope.today = new Date();
    $rootScope.apiurl = apiUrl;
    $rootScope.videoPopup = function (value) {
        jQuery("#VideoPopup1").modal('show');
        var id = value;
        $http.get(apiUrl+"api/v1/flat_pages/rest/video_detail/"+id)
        .then(function successCallback(response){
            $rootScope.vid = response.data;
            jwplayer("jwplayer").setup({
                "file": response.data.video.video_file,
                "primary": 'flash'
            });
            jwplayer("jwplayer").play();
        }, function errorCallback(response){
            console.log("Unable to perform get Video Details");
        });
    };//Common Video Popup - function end
});


//LoginUser
FirstSynch.controller("Login", function ($scope, $http, apiUrl, $location, $window,$rootScope,companyusertype,studentusertype) {
    $scope.LoginUser = function () {
        var data = $.param({
            username: $scope.username,
            password: $scope.password,
        });
        $http({
            url: apiUrl+'api/v1/accounts/login/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function successCallback(response, status, headers, config) {

                $window.sessionStorage.setItem('token', response.data.token);
                $window.sessionStorage.setItem('usertype', response.data.usertype);
                $window.sessionStorage.setItem('profileimage', response.data.profile_image);
                $window.sessionStorage.setItem('user_id', response.data.user_id);
                $rootScope.profileimage = response.data.profile_image;
                $rootScope.user_id = response.data.user_id;
                jQuery(".modal-backdrop.in").hide();
                if(companyusertype == response.data.usertype){
                    $rootScope.companyuserInfo = window.sessionStorage.getItem("token");
                    $location.path( "/com/dashboard" );
                }
                else if(studentusertype == response.data.usertype){
                    $rootScope.studentuserInfo = window.sessionStorage.getItem("token");
                    $location.path( "/stu/dashboard" );
                }
        },
        function errorCallback(data, status, headers, config) {
              //$('#logIn').modal('show');
            $scope.status = data.data;
        });
    };// user login - function end
});


FirstSynch.controller("IdentifyUser", function ($scope, $http, apiUrl, $rootScope) {

    $http.get("school.json")
        .then(function successCallback(response){
            $scope.university = response.data;
        }, function errorCallback(response){
            console.log("Unable to perform get company profile details");
    });

    $scope.SendData = function () {
        var data = 'e_mail=' + $scope.e_mail;
        $http({
            url: apiUrl+'api/v1/accounts/signupemail/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function successCallback(data, status, headers, config) {
            if(data.data.user_type == '380D2'){
                jQuery("#registration").modal('hide');
                jQuery("#signUp").modal('show');
                $rootScope.e_mail = $scope.e_mail;
            }else{
                jQuery("#registration").modal('hide');
                jQuery("#companyregistration").modal('show');
                $rootScope.e_mail = $scope.e_mail;
            }
        },
        function errorCallback(data, status, headers, config) {
            $scope.error = data.data.data;
        });

    };//find user - function end

    $scope.StudentRegistratoin = function () {
        var education_created = {
            school_name: $scope.school_name,
            gpa: $scope.gpa,
        };

        var data = $.param({
            e_mail: $rootScope.e_mail,
            iaccept: $scope.iaccept,
            name: $scope.name,
            password: $scope.password,
            education_created:education_created,
        });
        $http({
            url: apiUrl+'api/v1/accounts/v2/createstudent/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function successCallback(data, status, headers, config) {
            jQuery("#signUp").modal('hide');
            jQuery("#signUpSuccess").modal('show');
        },
        function errorCallback(data, status, headers, config) {
            $scope.status = data.data.status;
        });
    };//userStudentRegistratoin - function end

    $scope.CompanyRegistratoin = function () {
        var employee_created = {
            company_name: $scope.cname,
        };

        var data = $.param({
            e_mail: $rootScope.e_mail,
            iaccept: $scope.iaccept,
            name: $scope.name,
            password: $scope.password,
            employee_created:employee_created,
        });

        $http({
            url: apiUrl+'api/v1/accounts/v2/createcompany/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function successCallback(data, status, headers, config) {
            jQuery("#companyregistration").modal('hide');
            jQuery("#signUpSuccess").modal('show');
        },
        function errorCallback(data, status, headers, config) {
            $scope.status = data.data.status;
        });
    };//company Registratoin - function end

});


FirstSynch.controller("ForgotPassword", function ($scope, $http, apiUrl) {
    $scope.ForgotPassword = function () {
        var data = $.param({
            e_mail: $scope.e_mail,
        });
        $http({
            url: apiUrl+'api/v1/accounts/forgotpassword/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function successCallback(data, status, headers, config) {
            $scope.success = data.data.output;
            $('.hide1').hide();
        },
        function errorCallback(data, status, headers, config) {
            $scope.failure = data.data.error;
        });
    };//Forgot Password - function end
});


FirstSynch.controller("ResetPassword", function ($scope, $http, apiUrl) {
    $scope.ResetPassword = function () {
        var data = $.param({
            password: $scope.password,
            token: $scope.token,
        });
        $http({
            url: apiUrl+'api/v1/accounts/resetpasswordlink/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function successCallback(data, status, headers, config) {
            $scope.success = data.output;
            $('.hide1').hide();
            $scope.Login = $scope.Login + '<a data-toggle="modal" data-target="#logIn" href="#" data-dismiss="modal">Login</a>';
        },
        function errorCallback(data, status, headers, config) {
            $scope.failure = data.output;
        });
    };//Reset Password - function end
});


FirstSynch.controller("LogoutUser", function ($scope, $http, $location, apiUrl, $window, $rootScope) {
    $scope.LogoutUser = function () {
        var data = $.param({
          token: $window.sessionStorage.getItem('token'),
        });
        $http({
            url: apiUrl+'api/v1/accounts/logout/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function successCallback(data, status, headers, config) {
            $window.sessionStorage.removeItem('token');
            $window.sessionStorage.removeItem('profileimage');
            $window.sessionStorage.removeItem('usertype');
            delete $rootScope.companyuserInfo
            delete $rootScope.studentuserInfo
            $location.path( "/" );
        },
        function errorCallback(data, status, headers, config) {
            $scope.status = 'Please provide valid login credentials.';
        });
    };// user logout - function end
});

FirstSynch.controller("UserActivation", function ($scope, $http, apiUrl,$location) {
    if($location.search()['activate']){
        var data = 'token='+$location.search()['activate'];
        $http({
            url: apiUrl+'api/v1/accounts/activate/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function successCallback(response, status, headers, config) {
            jQuery('#activate').modal('show');
            $scope.activate_msg = response.data.output;
        },
        function errorCallback(response, status, headers, config) {
            jQuery('#activate').modal('show');
            $scope.activate_msg = response.data.output;
        });
    }
});
FirstSynch.controller("UserSearch", function ($scope, $http, apiUrl,$location,$compile)
    {
    $scope.SearchsubmitFunc = function ()
        {
            $http.get(apiUrl+"api/v1/search/?q="+$scope.keywords)
                .then(function successCallback(response)
                    {
                        jQuery('.search_result_remove_act').remove();
                        jQuery('.search_result_show_act').show();
                        jQuery('.search_results_career_page_act').empty();
                        jQuery('.search_results_companies_act').empty();
                        if(response.data.careerfair){
                            jQuery('.search_results_career_page_container_act').show();
                            jQuery.each(response.data.careerfair, function(i) {
                                var career_fair_result = '<div class="media custom-media">'
                                                            +'<a href="/careerfair/'+response.data.careerfair[i].id+'" class="search-link">'
                                                                +'<div class="media-left media-middle custom-media-left"> <img style="height:117px;" class="media-object custom-media-object" src="http://firstsynchvideos.s3.amazonaws.com/'+response.data.careerfair[i].image+'" alt="">  </div>'
                                                                +'<div class="media-body custom-media-body">'
                                                                    +'<h4 class="media-heading custom-media-heading">'+response.data.careerfair[i].title+'</h4>'
                                                                    +'<h5 class="media-eading-h5">'+response.data.careerfair[i].start_date+' &bull; '+response.data.careerfair[i].city+'</h5>'
                                                                    +'<div class="searech-folow pull-left">'
                                                                        +'<span class="group-followers"><span class="total-followers">36</span> Posts</span>'
                                                                        +'<span class="group-followers"><span class="total-followers">41</span> Companies</span>'
                                                                        +'<span class="group-followers"><span class="total-followers">5</span> followers</span>'
                                                                    +'</div>'
                                                                +'</div>'
                                                            +'</a>'
                                                            +'<div>'
                                                            +'</div>'
                                                        +'</div>';
                                angular.element(jQuery('.search_results_career_page_act')).append($compile(career_fair_result)($scope));
                            });
                        }
                        else{
                            jQuery('.search_results_career_page_container_act').hide();
                        }
                        if(response.data.company){
                            jQuery('.search_results_companies_container_act').show();
                            jQuery.each(response.data.company, function(i) {
                                var companies_result ='<div class="media custom-media">'
                                                        +'<a href="/company/'+response.data.company[i].id+'" class="search-link">'
                                                            +'<div class="media-left media-middle custom-media-left">'
                                                                +'<div class="search-img-container">'
                                                                    +'<img src="http://firstsynchvideos.s3.amazonaws.com/'+response.data.company[i].logo+'" class="logo-companies-box">'
                                                                +'</div>'
                                                            +'</div>'
                                                            +'<div class="media-body custom-media-body">'
                                                                +'<h4 class="media-heading custom-media-heading">'+response.data.company[i].name+'</h4>'
                                                                +'<h5 class="media-eading-h5">'+response.data.company[i].city+'&bull; '+response.data.company[i].state+'</h5>'
                                                                +'<div class="searech-folow pull-left">'
                                                                    +'<span class="group-followers"><span class="total-followers">36</span> Posts</span>'
                                                                    +'<span class="group-followers"><span class="total-followers">41</span> Companies</span>'
                                                                    +'<span class="group-followers"><span class="total-followers">5</span> followers</span>'
                                                                +'</div>'
                                                            +'</div>'
                                                        +'</a>'
                                                        +'<div>'
                                                        +'</div>'
                                                    +'</div>';
                            angular.element(jQuery('.search_results_companies_act')).append($compile(companies_result)($scope));
                            });
                        }
                        else{
                            jQuery('.search_results_companies_container_act').show();
                        }
                    },
                    function errorCallback(response)
                    {
                        console.log("Unable to perform get featurevideo");
                    }
                );
        };
    });

///////////////////////////////////////////////// directive ////////////////////////////////////////

FirstSynch.directive('uixBxslider', function(){
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs, controller) {
            $scope.$on('repeatFinished', function () {
                iElm.bxSlider($scope.$eval('{' + iAttrs.uixBxslider + '}'));
            });
        }
    }
}).directive('notifyWhenRepeatFinished', ['$timeout',
    function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, iElm, iAttrs) {
                if ($scope.$last === true) {
                    $timeout(function () {
                        $scope.$emit('repeatFinished');
                    });
                }
            }
        }
    }
]);
