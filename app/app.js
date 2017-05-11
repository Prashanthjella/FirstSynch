'use strict';

// Declare app level module which depends on views, and components
var FirstSynch = angular.module("firstSync", [
  "ngRoute",
  "hoMe",
  "careerFair",
  "careerFairDetail",
  "CompanyList",
  "GstudentProfile",
  "GcompanyProfile",
  "GemployeeProfile",
  "StudentDashboard",
  "StudentcareerFair",
  "StudentcareerFairDetail",
  "StudentCompanyList",
  "SstudentProfile",
  "ScompanyProfile",
  "SemployeeProfile",
  "CompanyDashboard",
  "CompanycareerFair",
  "CompanycareerFairDetail",
  "CompanyCompanyList",
  "CstudentProfile",
  "CcompanyProfile",
  "CemployeeProfile"
]);

FirstSynch.constant('apiUrl', 'http://52.43.26.31:8000/');
FirstSynch.constant('companyusertype','48KL3');
FirstSynch.constant('studentusertype','38OD2');

/////////////////////////////////////////////////Popup - Video, Login, Registration, Activate, Reset password, forgot password, logout///////////////
//Video Popup Functionality
FirstSynch.run(function($rootScope, $http, apiUrl,companyusertype,studentusertype) {
    // condition based header show
    if(companyusertype == window.sessionStorage.getItem("usertype")){
      $rootScope.companyuserInfo = window.sessionStorage.getItem("token");
      $rootScope.profileimage = window.sessionStorage.getItem("profileimage");
    }
    else if(studentusertype == window.sessionStorage.getItem("usertype")){
      $rootScope.studentuserInfo = window.sessionStorage.getItem("token");
      $rootScope.profileimage = window.sessionStorage.getItem("profileimage");
    }

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
      }).then(function successCallback(response, status, headers, config) {

              $window.sessionStorage.setItem('token', response.data.token);
              $window.sessionStorage.setItem('usertype', response.data.usertype);
              $window.sessionStorage.setItem('profileimage', response.data.profile_image);
              $rootScope.profileimage = response.data.profile_image;
              jQuery(".modal-backdrop.in").hide();
              if(companyusertype == response.data.usertype){
                $rootScope.companyuserInfo = window.sessionStorage.getItem("token");
                $location.path( "/company/dashboard" );
              }
              else if(studentusertype == response.data.usertype){
                $rootScope.studentuserInfo = window.sessionStorage.getItem("token");
                $location.path( "/student/dashboard" );
              }

      },function errorCallback(data, status, headers, config) {
              //$('#logIn').modal('show');
              $scope.status = data.data;
      });

    };// user login - function end

});


FirstSynch.controller("IdentifyUser", function ($scope, $http, apiUrl, $rootScope) {
    $scope.SendData = function () {
        var data = 'e_mail=' + $scope.e_mail;
        $http({
            url: apiUrl+'api/v1/accounts/signupemail/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data, status, headers, config) {
              if(data.data.user_type == '380D2'){
                jQuery("#registration").modal('hide');
                jQuery("#signUp").modal('show');
                $rootScope.e_mail = $scope.e_mail;
              }else{
                jQuery("#registration").modal('hide');
                jQuery("#companyregistration").modal('show');
                $rootScope.e_mail = $scope.e_mail;
              }
        },function errorCallback(data, status, headers, config) {
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
      }).then(function successCallback(data, status, headers, config) {
            jQuery("#signUp").modal('hide');
            jQuery("#signUpSuccess").modal('show');
      },function errorCallback(data, status, headers, config) {
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
        }).then(function successCallback(data, status, headers, config) {
            jQuery("#companyregistration").modal('hide');
            jQuery("#signUpSuccess").modal('show');
        },function errorCallback(data, status, headers, config) {
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
              url: 'http://52.43.26.31:8000/api/v1/accounts/forgotpassword/',
              method: "POST",
              data: data,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(function successCallback(data, status, headers, config) {
              $scope.success = data.data.output;
              $('.hide1').hide();
          },function errorCallback(data, status, headers, config) {
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
        }).then(function successCallback(data, status, headers, config) {
              $scope.success = data.output;
              $('.hide1').hide();
              $scope.Login = $scope.Login + '<a data-toggle="modal" data-target="#logIn" href="#" data-dismiss="modal">Login</a>';
        },function errorCallback(data, status, headers, config) {
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
        }).then(function successCallback(data, status, headers, config) {
                 $window.sessionStorage.removeItem('token');
                 $window.sessionStorage.removeItem('profileimage');
                 $window.sessionStorage.removeItem('usertype');
                 delete $rootScope.companyuserInfo
                 delete $rootScope.studentuserInfo
                 $location.path( "/" );
        },function errorCallback(data, status, headers, config) {
                $scope.status = 'Please provide valid login credentials.';
        });

    };// user logout - function end
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
