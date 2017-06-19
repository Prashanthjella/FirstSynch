'use strict';

// Declare app level module which depends on views, and components
var FirstSynch = angular.module("firstSync", [
    "ngRoute",
    "angularMoment",
    "angucomplete-alt",
    "ngFileUpload",
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
    "StudentEditProfile",
    "CompanyDashboard",
    "CompanycareerFair",
    "CompanycareerFairDetail",
    "CompanyCompanyList",
    "CStudentList",
    "CstudentProfile",
    "CcompanyProfile",
    "CemployeeProfile",
    "CompanyEditProfile",
    "EmployeeEditProfile",
    "Search"
]);

FirstSynch.constant('apiUrl', 'http://52.43.26.31:8000/');
FirstSynch.constant('companyusertype','48KL3');
FirstSynch.constant('studentusertype','38OD2');
FirstSynch.constant('Personal','FDHD');
FirstSynch.constant('Software','FDDA');
FirstSynch.constant('Professional','RYRD');
FirstSynch.constant('guest_token', '8ce17dfd673572c3925f26043f9d378a44bdf942');

/////////////////////////////////////////////////Popup - Video, Login, Registration, Activate, Reset password, forgot password, logout///////////////
//Video Popup Functionality
FirstSynch.run(function($rootScope, $http, guest_token, apiUrl,companyusertype,studentusertype,$location) {
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
        if (angular.isDefined($rootScope.token_id)) {
          var token_id = $rootScope.token_id;
        } else {
          var token_id = guest_token;
        }
        $http.get(apiUrl+"api/v1/flat_pages/rest/video_detail/"+id, {
          headers: {'Authorization' : 'Token '+token_id}
        })
        .then(function successCallback(response){
            $rootScope.vid = response.data;
            jwplayer("jwplayer").setup({
              playlist: [{
                  image: response.data.video.thumbnail,
                  sources: [
                      {file: response.data.video.streaming_video},
                      {file: response.data.video.video_file}
                    ],
                    tracks: [{
                      file:response.data.video.vtt_file,
                      kind:'chapters'
                    }],
                  }],
              primary: "flash"
            });
            jwplayer("jwplayer").play();
        }, function errorCallback(response){
            console.log("Unable to perform get Video Details");
        });
    };//Common Video Popup - function end
    $rootScope.StudentvideoPopup = function (value) {
        jQuery("#VideoPopupStudent").modal('show');
        var id = value;
        $http.get(apiUrl+"api/v1/flat_pages/rest/video_detail/"+id)
        .then(function successCallback(response){
            $rootScope.vid = response.data;
            jwplayer("jwplayer").setup({
              playlist: [{
                  image: response.data.video.thumbnail,
                  sources: [{
                      file: response.data.video.streaming_video
                  },{
                      file: response.data.video.video_file
                  }]
              }],
              primary: "flash"
            });
            jwplayer("jwplayer").play();
        }, function errorCallback(response){
            console.log("Unable to perform get Video Details");
        });
    };//Common Video Popup - function end

});

// FirstSynch.config(['$httpProvider', function($httpProvider) {
//  $httpProvider.interceptors.push('noCacheInterceptor');
// }]).factory('noCacheInterceptor', function () {
//             return {
//                 request: function (config) {
//                     if(config.method=='GET'){
//                         var separator = config.url.indexOf('?') === -1 ? '?' : '&';
//                         config.url = config.url+separator+'noCache=' + new Date().getTime();
//                     }
//                     return config;
//                }
//            };
//     });
//LoginUser
FirstSynch.controller("Login", function ($scope, $http, apiUrl, $location, $window,$rootScope,companyusertype,studentusertype) {
    var url = window.location.href;
    var idexvalue = url.indexOf("/login");
    if(idexvalue != -1) {
        jQuery('#logIn').modal('show');
    }
    $scope.LoginUser = function () {
        $('.loader_icon').show();
        var redirectulrs = $('#redirecturl').val();
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
                $('.loader_icon').hide();
                $window.sessionStorage.setItem('token', response.data.token);
                $window.sessionStorage.setItem('usertype', response.data.usertype);
                $window.sessionStorage.setItem('profileimage', response.data.profile_image);
                $window.sessionStorage.setItem('user_id', response.data.user_id);
                $rootScope.profileimage = response.data.profile_image;
                $rootScope.user_id = response.data.user_id;
                $rootScope.token_id = response.data.token;
                jQuery(".modal-backdrop.in").hide();
                jQuery('#logIn').modal('hide');
                if(companyusertype == response.data.usertype){
                    $('#logIn').modal('hide');
                    $rootScope.companyuserInfo = window.sessionStorage.getItem("token");
                    $location.path( "/com"+redirectulrs );
                }
                else if(studentusertype == response.data.usertype){
                    $('#logIn').modal('hide');
                    $rootScope.studentuserInfo = window.sessionStorage.getItem("token");
                    $location.path( "/stu"+redirectulrs );
                }
        },
        function errorCallback(data, status, headers, config) {
              //$('#logIn').modal('show');
            $('.loader_icon').hide();
            $scope.status = data.data;
        });
    };// user login - function end
});


FirstSynch.controller("IdentifyUser", function ($scope, $http, apiUrl, $rootScope) {

    // $http.get("school.json")
    //     .then(function successCallback(response){
    //         $scope.university = response.data;
    //     }, function errorCallback(response){
    //         console.log("Unable to perform get company profile details");
    // });

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
                setTimeout(function(){ jQuery("body").addClass('modal-open'); }, 3000);
                $rootScope.e_mail = $scope.e_mail;
            }else{
                jQuery("#registration").modal('hide');
                jQuery("#companyregistration").modal('show');
                setTimeout(function(){ jQuery("body").addClass('modal-open'); }, 3000);
                $rootScope.e_mail = $scope.e_mail;
            }
        },
        function errorCallback(data, status, headers, config) {
            $scope.error = data.data.data;
        });

    };//find user - function end

    $scope.StudentRegistratoin = function () {
        var allow_pipl_check = parseInt($('#allow_pipl').val());
        var workhistroy_arry = [];
        var data = {
            education : {school_name : $('#university-name').val(),gpa : $scope.gpa},
            student : {first_name : $scope.name},
            user : {e_mail:$rootScope.e_mail,name:$scope.name,password:$scope.password}
        }
        if($scope.piplsearch == 'allow'){
            $http.get(apiUrl+"api/v1/piplapi/?email="+$rootScope.e_mail)
                .then(function successCallback(response){
                    $scope.piplimage = response.data.image ? response.data.image : "" ;
                    $scope.piplschool_name= response.data.school_name ? response.data.school_name : "" ;
                    $scope.pipldateattended= response.data.dateattended ? response.data.dateattended :"";
                    $scope.piplmajor= response.data.major ?response.data.major :"";
                    $scope.pipljobs= response.data.jobs ? response.data.jobs : "" ;
                    $scope.workhistroy_count= response.data.jobs ? response.data.jobs.length : 0 ;
                    if($scope.piplimage || $scope.piplschool_name || $scope.pipldateattended || $scope.piplmajor || $scope.pipljobs){
                        $('#allow_pipl').val('0');
                        $('.peoplesearch_remove').hide();
                        $('.peoplesearch_show').show();
                    }
                    else{
                        $http({
                            url: apiUrl+'api/v1/student/student_signup/',
                            method: "POST",
                            data: data
                        })
                        .then(function successCallback(data, status, headers, config) {
                            jQuery("#signUp").modal('hide');
                            jQuery("#signUpSuccess").modal('show');
                        },
                        function errorCallback(data, status, headers, config) {
                            $scope.status = data.data.status;
                        });
                    }

                }, function errorCallback(response){
                    console.log("Unable to perform get company basic profile details");
            });
        }
        else if($scope.piplsearch == 'deny') {
            $http({
                url: apiUrl+'api/v1/student/student_signup/',
                method: "POST",
                data: data
            })
            .then(function successCallback(data, status, headers, config) {
                jQuery("#signUp").modal('hide');
                jQuery("#signUpSuccess").modal('show');
            },
            function errorCallback(data, status, headers, config) {
                $scope.status = data.data.status;
            });
        }

        if(allow_pipl_check == 0){
            for(var w=0;w<parseInt($('#workhistroy_count').val());w++){
                workhistroy_arry.push({"company_name":$('#pipl_company_name'+w).val(),"datestarted":$('#pipl_datestarted'+w).val(),"leavedate":$('#pipl_leavedate'+w).val(),"jobtitle":$('#pipl_jobtitle'+w).val(),"jobdescription":$('#pipl_jobdescription'+w).val()});
            }
            var datap = {
                education : {school_name : $('#pipl_school_name').val(),gpa : $scope.gpa,dateattended: $('#pipl_dateattended').val(),major:$('#pipl_major').val()},
                student : {first_name : $scope.name},
                user : {e_mail:$rootScope.e_mail,name:$scope.name,password:$scope.password},
                jobs:workhistroy_arry
            }
            $http({
                url: apiUrl+'api/v1/student/student_signup/',
                method: "POST",
                data: datap
            })
            .then(function successCallback(data, status, headers, config) {
                jQuery("#signUp").modal('hide');
                jQuery("#signUpSuccess").modal('show');
            },
            function errorCallback(data, status, headers, config) {
                $scope.status = data.data.status;
            });
        }
        //alert(JSON.stringify(data));

    };//userStudentRegistratoin - function end


    $scope.CompanyRegistratoin = function () {
        var data = {
            company_name:$scope.cname,
            user : {name :$scope.name,e_mail:$rootScope.e_mail,password:$scope.password },
            employee : {}
        };

        $http({
            url: apiUrl+'api/v1/employee/api/employee_signup/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/json'}
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
            delete $rootScope.token_id
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
FirstSynch.controller("UserSearch", function ($rootScope, $scope, $http,guest_token, apiUrl,$location,$compile)
    {
    $scope.SearchsubmitFunc = function ()
        {
            if (angular.isDefined($rootScope.token_id)) {
              var token_id = $rootScope.token_id;
            } else {
              var token_id = guest_token;
            }
            $http.get(apiUrl+"api/v1/search/?q="+$scope.keywords, {
                  headers: {'Authorization' : 'Token '+token_id}
                })
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
                            jQuery('.search_results_companies_container_act').hide();
                        }
                        if(response.data.student){
                            jQuery('.search_results_student_container_act').show();
                            jQuery.each(response.data.student, function(i) {
                                var student_result ='<div class="media custom-media">'
                                                        +'<a href="/company/'+response.data.student[i].id+'" class="search-link">'
                                                            +'<div class="media-left media-middle custom-media-left">'
                                                                +'<div class="search-img-container">'
                                                                    +'<img src="http://firstsynchvideos.s3.amazonaws.com/'+response.data.student[i].profile_picture+'" class="logo-companies-box">'
                                                                +'</div>'
                                                            +'</div>'
                                                            +'<div class="media-body custom-media-body">'
                                                                +'<h4 class="media-heading custom-media-heading">'+response.data.student[i].first_name+'</h4>'
                                                                +'<h5 class="media-eading-h5">'+response.data.student[i].city+'&bull; '+response.data.student[i].state+'</h5>'
                                                                +'<div class="searech-folow pull-left">'
                                                                    +'<span class="group-followers"><span class="total-followers">'+response.data.student[i].viewed+'</span> Views</span>'
                                                                    +'<span class="group-followers"><span class="total-followers">'+response.data.student[i].liked+'</span> Likes</span>'
                                                                    +'<span class="group-followers"><span class="total-followers">'+response.data.student[i].followers+'</span> followers</span>'
                                                                +'</div>'
                                                            +'</div>'
                                                        +'</a>'
                                                        +'<div>'
                                                        +'</div>'
                                                    +'</div>';
                            angular.element(jQuery('.search_results_student_act')).append($compile(student_result)($scope));
                            });
                        }
                        else{
                            jQuery('.search_results_companies_container_act').hide();
                        }
                    },
                    function errorCallback(response)
                    {
                        console.log("Unable to perform get featurevideo");
                    }
                );
        };
    });

    // FirstSynch.controller("MyCtrl", function ($scope, Upload,apiUrl) {
    //     // upload later on form submit or something similar
    //     $scope.submit = function() {
    //       if ($scope.form.file.$valid && $scope.file) {
    //         $scope.upload($scope.file);
    //       }
    //     };
    //
    //     // upload on file select or drop
    //     $scope.upload = function (file) {
    //         Upload.upload({
    //             url: apiUrl+"api/v1/career_fairs/videos/",
    //             data: {file: file}
    //         }).then(function (resp) {
    //             console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //         }, function (resp) {
    //             console.log('Error status: ' + resp.status);
    //         }, function (evt) {
    //             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //             console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //         });
    //     };
    // });
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

////////////////add overlay class in random manner////////////////////
FirstSynch.filter('randomize', function() {
  return function(input, scope) {
    if (input!=null && input!=undefined && input > 1) {
      return Math.floor((Math.random()*input)+1);
    }
  }
});
