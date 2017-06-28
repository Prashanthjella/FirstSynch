'use strict';

FirstSynch.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider,apiUrl) {
    ////////////////////////////////////////// Common /////////////////////////////////

    // Term and conditions - general
    $routeProvider.when('/termsandcondtion', {
        templateUrl: 'common/terms.html',
    }).when('/privacy', {
        templateUrl: 'common/privacy.html',
    }).when('/search', {
        templateUrl: 'GuestRole/search/search.html',
    }).when('/login', {
        templateUrl: 'GuestRole/home/home.html',
    }).when('/', {
      templateUrl: 'GuestRole/home/home.html',
      resolve:{
        "check":function($location){
            if(window.sessionStorage.getItem("usertype") == '48KL3'){
                $location.path('/com/dashboard');
            }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                $location.path('/stu/dashboard');
            }
            else{
                $location.path('/');
            }
        }
      }
    }).when('/careerfair', {
        templateUrl: 'GuestRole/career_fair/career_fair.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/careerfair');
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/careerfair');
              }
              else{
                  $location.path('/careerfair');
              }
          }
        }
    }).when('/careerfair/:carredid', {
        templateUrl: 'GuestRole/career_fair_detail/career_fair.html',
        controller: 'careerfair_detail',
        resolve:{
          "check":function($location,$route){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/careerfair/'+$route.current.params.carredid);
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/careerfair/'+$route.current.params.carredid);
              }
          }
        }
    }).when('/companies', {
        templateUrl: 'GuestRole/company_list/company_list.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/companies');
              }
          }
        }
    }).when('/company/:companyid', {
        templateUrl: 'GuestRole/company_profile/company_profile.html',
        controller: 'guest_company_profile',
        resolve:{
          "check":function($location,$route){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/company/'+$route.current.params.companyid);
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/company/'+$route.current.params.companyid);
              }
          }
        }
    }).when('/students', {
        templateUrl: 'GuestRole/student_list/student_list.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/employee/profile');
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/employee/profile');
              }
              else{
                  $location.path('/students');
              }
          }
        }
    }).when('/student/:studentid', {
        templateUrl: 'GuestRole/student_profile/student_profile.html',
        controller: 'guest_student_profile',
        resolve:{
          "check":function($location,$route){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/student/'+$route.current.params.companyid);
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/student/'+$route.current.params.companyid);
              }
          }
        }
    }).when('/guest/employee/profile', {
        templateUrl: 'GuestRole/employee_profile/employee_profile.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/com/employee/profile');
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/employee/profile');
              }
              else{
                  $location.path('/guest/employee/profile');
              }
          }
        }
    }).when('/stu/dashboard', {
        templateUrl: 'StudentRole/dashboard/dashboard.html',
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/');
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/dashboard');
              }
              else{
                  $location.path('/login');
              }
          }
        }
    }).when('/stu', {
        resolve:{
          "check":function($location){
              if(window.sessionStorage.getItem("usertype") == '48KL3'){
                  $location.path('/');
              }else if(window.sessionStorage.getItem("usertype") == '38OD2'){
                  $location.path('/stu/dashboard');
              }
              else{
                  $location.path('/login');
              }
          }
        }
    })
    .when('/stu/careerfair', {
        templateUrl: 'StudentRole/career_fair/career_fair.html',
    }).when('/stu/careerfair/:carredid', {
        templateUrl: 'StudentRole/career_fair_detail/career_fair.html',
        controller: 'student_careerfair_detail'
    }).when('/stu/companies', {
        templateUrl: 'StudentRole/company_list/company_list.html'
    }).when('/stu/company/:companyid', {
        templateUrl: 'StudentRole/company_profile/company_profile.html',
        controller: 'student_company_profile'
    }).when('/stu/employee/profile', {
        templateUrl: 'StudentRole/employee_profile/employee_profile.html',
    }).when('/stu/student/:studentid', {
        templateUrl: 'StudentRole/student_profile/student_profile.html',
        controller: 'student_student_profile'
    }).when('/stu/editprofile', {
        templateUrl: 'StudentRole/student_edit_profile/student_edit_profile.html',
        controller: 'studenteditprofiles'
    }).when('/stu/setting', {
        templateUrl: 'StudentRole/student_setting/setting.html',
    }).when('/com/dashboard', {
        templateUrl: 'CompanyRole/dashboard/dashboard.html'
    }).when('/com', {
        resolve:{
          "check":function($location){
                  $location.path('/com/dashboard');
          }
        }
    })
    .when('/com/careerfair', {
        templateUrl: 'CompanyRole/career_fair/career_fair.html',
    }).when('/com/careerfair/:carredid', {
        templateUrl: 'CompanyRole/career_fair_detail/career_fair.html',
        controller: 'company_careerfair_detail'
    }).when('/com/company/:comid', {
        templateUrl: 'CompanyRole/company_profile/company_profile.html',
        controller: 'company_company_profile'
    }).when('/com/employee/profile/:profileid', {
        templateUrl: 'CompanyRole/employee_profile/employee_profile.html',
    }).when('/com/employee/editprofile', {
        templateUrl: 'CompanyRole/employee_edit_profile/employee_edit_profile.html',
        controller: 'employeeeditprofiles'
    }).when('/com/students', {
        templateUrl: 'CompanyRole/student_list/student_list.html'
    }).when('/com/student/:studentid', {
        templateUrl: 'CompanyRole/student_profile/student_profile.html',
    }).when('/com/editprofile', {
        templateUrl: 'CompanyRole/company_edit_profile/company_edit_profile.html',
        controller: 'companyeditprofiles'
    }).when('/com/setting', {
        templateUrl: 'CompanyRole/company_setting/setting.html'
    });

    // remove hash bang
    if(window.history && window.history.pushState){
         //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">
         // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
         // if you don't wish to set base URL then use this
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('');
    }
}]);
