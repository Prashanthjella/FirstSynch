'use strict';

// Declare app level module which depends on views, and components
var FirstSynch = angular.module("firstSync", [
  "ngRoute",
  "hoMe",
  "careerFair",
  "careerFairDetail",
  "CompanyList",
  "StudentDashboard",
  "StudentcareerFair",
  "StudentcareerFairDetail",
  "StudentCompanyList",
  "CompanyDashboard",
  "CompanycareerFair",
  "CompanycareerFairDetail",
  "CompanyCompanyList"
]);

FirstSynch.constant('apiUrl', 'http://52.43.26.31:8000/');
FirstSynch.constant('companyusertype','48KL3');
FirstSynch.constant('studentusertype','38OD2');

/////////////////////////////////////////////////Popup - Video, Login, Registration, Activate, Reset password, forgot password, logout///////////////
//Video Popup Functionality
FirstSynch.run(function($rootScope, $http, apiUrl) {
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


    $rootScope.LogoutUser = function () {

      var data = $.param({
          token: window.sessionStorage.getItem('token'),
        });
        $http({
            url: apiUrl+'api/v1/accounts/logout/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
                 $window.sessionStorage.removeItem('token');
                 $window.location.href = '/';
        }).error(function (data, status, headers, config) {
                $scope.status = 'Please provide valid login credentials.';
        });
    };//Common LogoutUser - function end
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
              $rootScope.userInfo = window.sessionStorage.getItem("token");
              $rootScope.profileimage = response.data.profile_image;
              if(companyusertype == response.data.usertype){
                $('#logIn').modal('hide');
                $location.path( "/company/dashboard" );
              }
              else if(studentusertype == response.data.usertype){
                $('#logIn').modal('hide');
                $location.path( "/student/dashboard" );
              }

      },function errorCallback(data, status, headers, config) {
              $scope.status = data.data;
      });

    };// user login - function end

});


FirstSynch.controller("IdentifyUser", function ($scope, $http, apiUrl) {
    $scope.SendData = function () {
        var data = 'e_mail=' + $scope.e_mail;
        $http({
            url: apiUrl+'api/v1/accounts/signupemail/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data, status, headers, config) {
              if(data.user_type == '380D2'){
                jQuery("#registration").modal('hide');
                jQuery("#signUp").modal('show');
                $("#email").val($scope.e_mail);
              }else{
                jQuery("#registration").modal('hide');
                jQuery("#companyregistration").modal('show');
                $("#email").val($scope.e_mail);
              }
        },function errorCallback(data, status, headers, config) {
                $scope.error = data.data;
        });

    };//find user - function end

    $scope.StudentRegistratoin = function () {

      var education_created = {
        school_name: $scope.school_name,
        gpa: $scope.gpa,
      };

      var data = $.param({
        e_mail: $scope.e_mail,
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
              $scope.status = status;
      });

    };//userStudentRegistratoin - function end

    $scope.CompanyRegistratoin = function () {
        var employee_created = {
          company_name: $scope.cname,
        };

        var data = $.param({
          e_mail: $scope.e_mail,
          iaccept: $scope.iaccept,
          name: $scope.name,
          password: $scope.password,
          employee_created:employee_created,
        });
        alert($scope.e_mail);
        $http({
            url: apiUrl+'api/v1/accounts/v2/createcompany/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data, status, headers, config) {
            jQuery("#companyregistration").modal('hide');
            jQuery("#signUpSuccess").modal('show');
        },function errorCallback(data, status, headers, config) {
            $scope.status = status;
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
              $scope.success = data.output;
              $('.hide1').hide();
          },function errorCallback(data, status, headers, config) {
              $scope.failure = data.error;
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


FirstSynch.controller("LogoutUser", function ($scope, $http, apiUrl, $window, $location) {
    $scope.LogoutUser = function () {
        var data = $.param({
          token: $window.sessionStorage.getItem('token'),
        });
        $http({
            url: apiUrl+'api/v1/accounts/logout/',
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
                 $window.sessionStorage.removeItem('token');
                 $window.location.href = '/';
        }).error(function (data, status, headers, config) {
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
