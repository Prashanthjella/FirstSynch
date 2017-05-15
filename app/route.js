'use strict';

FirstSynch.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider,apiUrl) {
    ////////////////////////////////////////// Common /////////////////////////////////

    // Term and conditions - general
    $routeProvider.when('/termsandcondtion', {
        templateUrl: 'common/terms.html',
    });

    // Privacy policy - general
    $routeProvider.when('/privacy', {
        templateUrl: 'common/privacy.html',
    });



    //////////////////////////////////////////Guest role ///////////////////////////////
    //  home page
    $routeProvider.when('/', {
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
    });
    // guest - careerfair
    $routeProvider.when('/careerfair', {
        templateUrl: 'GuestRole/career_fair/career_fair.html',
    });
    // guest - careerfair details
    $routeProvider.when('/careerfair/:carredid', {
        templateUrl: 'GuestRole/career_fair_detail/career_fair.html',
        controller: 'careerfair_detail'
    });

    //  guest - company list
    $routeProvider.when('/companies', {
        templateUrl: 'GuestRole/company_list/company_list.html'
    });

    //  guest - student profile
    $routeProvider.when('/student/:studentid', {
        templateUrl: 'GuestRole/student_profile/student_profile.html',
        controller: 'guest_student_profile'
    });

    //  guest - company profile
    $routeProvider.when('/company/:companyid', {
        templateUrl: 'GuestRole/company_profile/company_profile.html',
        controller: 'guest_company_profile'
    });

    //  guest - employee profile
    $routeProvider.when('/guest/employee/profile', {
        templateUrl: 'GuestRole/employee_profile/employee_profile.html',
    });

    //  guest - student list
    $routeProvider.when('/students', {
        templateUrl: 'GuestRole/student_list/student_list.html'
    });

    //  guest - search landing
    $routeProvider.when('/search', {
        templateUrl: 'GuestRole/search/search.html',
    });

    // student - dashboard page
    $routeProvider.when('/stu/dashboard', {
        templateUrl: 'StudentRole/dashboard/dashboard.html'
    });

    // student - career fair
    $routeProvider.when('/stu/careerfair', {
        templateUrl: 'StudentRole/career_fair/career_fair.html',
    });

    // student - career fair details
    $routeProvider.when('/stu/careerfair/:carredid', {
        templateUrl: 'StudentRole/career_fair_detail/career_fair.html',
        controller: 'student_careerfair_detail'
    });

    // student - companies list
    $routeProvider.when('/stu/companies', {
        templateUrl: 'StudentRole/company_list/company_list.html'
    });

    // student - companies profile
    $routeProvider.when('/stu/company/profile', {
        templateUrl: 'StudentRole/company_profile/company_profile.html',
    });

    // student - employee profile
    $routeProvider.when('/stu/employee/profile', {
        templateUrl: 'StudentRole/employee_profile/employee_profile.html',
    });

    // student - student profile
    $routeProvider.when('/stu/student/profile', {
        templateUrl: 'StudentRole/student_profile/student_profile.html',
    });

    // company - dashboard
    $routeProvider.when('/com/dashboard', {
        templateUrl: 'CompanyRole/dashboard/dashboard.html'
    });

    // company - careerfair
    $routeProvider.when('/com/careerfair', {
        templateUrl: 'GuestRole/career_fair/career_fair.html',
    });

    // company - careerfair details
    $routeProvider.when('/com/careerfair/:carredid', {
        templateUrl: 'GuestRole/career_fair_detail/career_fair.html',
        controller: 'company_careerfair_detail'
    });

    // company - companies
    $routeProvider.when('/com/companies', {
        templateUrl: 'GuestRole/company_list/company_list.html'
    });

    // company - company profile
    $routeProvider.when('/com/company/profile', {
        templateUrl: 'CompanyRole/company_profile/company_profile.html',
    });

    // company - employee profile
    $routeProvider.when('/com/employee/profile', {
        templateUrl: 'CompanyRole/employee_profile/employee_profile.html',
    });

    // company - student profile
    $routeProvider.when('/com/student/profile', {
        templateUrl: 'CompanyRole/student_profile/student_profile.html',
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
