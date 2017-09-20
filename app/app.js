'use strict';

// Declare app level module which depends on views, and components
var FirstSynch = angular.module("firstSync", [
  "ngRoute",
  "ngRateIt",
  "angularMoment",
  "angucomplete-alt",
  "ngTagsInput",
  "ngFileUpload",
  "slickCarousel",
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
  "SStudentSetting",
  "CompanyDashboard",
  "CompanycareerFair",
  "CompanycareerFairDetail",
  "CompanyCompanyList",
  "CStudentList",
  "CstudentProfile",
  "CcompanyProfile",
  "CemployeeProfile",
  "CompanyEditProfile",
  "CCompanySetting",
  "CCompanyRequest",
  "EmployeeEditProfile",
  "Search",
  "ui.bootstrap",
  "ngLetterAvatar",
  "StudentFollowCareerFair",
  "ngCookies",
]);

FirstSynch.constant('apiUrl', 'https://api.firstsynch.com/');
FirstSynch.constant('companyusertype','48KL3');
FirstSynch.constant('studentusertype','38OD2');
FirstSynch.constant('Personal','FDHD');
FirstSynch.constant('Software','FDDA');
FirstSynch.constant('Professional','RYRD');
FirstSynch.constant('guest_token', 'e4318eb2e222cd4f52427e272e0d1d670c2ce56e');

/////////////////////////////////////////////////Popup - Video, Login, Registration, Activate, Reset password, forgot password, logout///////////////
//Video Popup Functionality
FirstSynch.run(function($cookies,$anchorScroll,$rootScope, $http, guest_token, apiUrl,companyusertype,studentusertype,$location) {
  // condition based header show
  var getcompanyusertype = window.sessionStorage.getItem("usertype")?window.sessionStorage.getItem("usertype"):$cookies.get('usertype');
  if(companyusertype == getcompanyusertype){
    $rootScope.token_id = window.sessionStorage.getItem("token")?window.sessionStorage.getItem("token"):$cookies.get('token');
    $rootScope.companyuserInfo = window.sessionStorage.getItem("token")?window.sessionStorage.getItem("token"):$cookies.get('token');
    $rootScope.profileimage = window.sessionStorage.getItem("profileimage")?window.sessionStorage.getItem("profileimage"):$cookies.get('profileimage');
    $rootScope.user_id = window.sessionStorage.getItem("user_id")?window.sessionStorage.getItem("user_id"):$cookies.get('user_id');
    if(window.sessionStorage.getItem("company_userid")){
      $rootScope.company_userid = window.sessionStorage.getItem("company_userid")?window.sessionStorage.getItem("company_userid"):$cookies.get('company_userid');
    }
    if(window.sessionStorage.getItem("request_member_id")){
      $rootScope.request_member_id = window.sessionStorage.getItem("request_member_id")?window.sessionStorage.getItem("request_member_id"):$cookies.get('request_member_id');
    }
    if(window.sessionStorage.getItem("companyedit_id")){
      $rootScope.companyedit_id = window.sessionStorage.getItem("companyedit_id")?window.sessionStorage.getItem("companyedit_id"):$cookies.get('companyedit_id');
    }
    $rootScope.guest_login = false;
    $rootScope.company_login = true;
  }
  else if(studentusertype == getcompanyusertype){
    $rootScope.token_id = window.sessionStorage.getItem("token")?window.sessionStorage.getItem("token"):$cookies.get('token');
    $rootScope.studentuserInfo = window.sessionStorage.getItem("token")?window.sessionStorage.getItem("token"):$cookies.get('token');
    $rootScope.profileimage = window.sessionStorage.getItem("profileimage")?window.sessionStorage.getItem("profileimage"):$cookies.get('profileimage');
    $rootScope.user_id = window.sessionStorage.getItem("user_id")?window.sessionStorage.getItem("user_id"):$cookies.get('user_id');
    $rootScope.student_id = window.sessionStorage.getItem('student_id')?window.sessionStorage.getItem('student_id'):$cookies.get('student_id');
    $rootScope.guest_login = false;
    $rootScope.student_login = true;
  }else{
    $rootScope.token_id = guest_token;
    $rootScope.guest_login = true;
    $rootScope.student_login = false;
    $rootScope.company_login = false;
  }
  $rootScope.current_url = $location.path();
  $rootScope.today = new Date();
  $rootScope.dashboard = true;
  $rootScope.dashboardc = true;
  $rootScope.apiurl = apiUrl;
  $rootScope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $rootScope.LoginPopupopen = function(){
    if($rootScope.guest_login){
      jQuery("#VideoPopup1").modal('hide');
      jQuery('#logIn').modal('show');
    }
  }
  $http.get("https://ipinfo.io").then(function successCallback(response) {
    $rootScope.current_city = response.data.city;
    $rootScope.current_state = response.data.region;
  });
  $rootScope.userlogform = {
      username : '',
      password : ''
  }
  $rootScope.usersignup = {
      email : ''
  }
  $rootScope.reloadRoutec = function() {
      $rootScope.dashboardc = true;
      $rootScope.userlogform = {
          username : '',
          password : ''
      }
      $rootScope.usersignup = {
          email : ''
      }
      $('#username').removeClass('ng-valid ng-valid-email').addClass('ng-invalid ng-invalid-required');
      $('#password').removeClass('ng-valid ng-valid-pattern').addClass('ng-invalid ng-invalid-required')
      $('#loginbtn').attr('disabled','disabled');
      angular.element(jQuery('.filtered_kw_industryc,.filtered_kw_salary_c,.filtered_kw_employement_c,.filtered_kw_skills_c,.filtered_kw_company_c')).text('Not specified');
      angular.element(jQuery('.filter_job_countc,.video_filter_search_resultc')).empty();
      angular.element(jQuery('.video_filter_search_result_emptyc')).show();
      $("#dashboard-filterc input[type=radio],#dashboard-filterc input[type=checkbox]").prop('checked', false);
  }
  $rootScope.reloadRoute = function() {
      $rootScope.dashboard = true;
      angular.element(jQuery('.filtered_kw_industry,.filtered_kw_salary,.filtered_kw_employement,.filtered_kw_skills,.filtered_kw_company')).text('Not specified');
      angular.element(jQuery('.filter_job_count,.video_filter_search_result')).empty();
      angular.element(jQuery('.video_filter_search_result_empty')).show();
      $("#dashboard-filter input[type=radio],#dashboard-filter input[type=checkbox]").prop('checked', false);
  }
  $anchorScroll.yOffset = 100;
  $rootScope.videoPopup = function (value,verifyvideo=false) {
      $('#comment_succ_msg').hide();
    jQuery("#VideoPopup1").modal('show');
    $('.video_loader_bk').fadeIn();
    if(verifyvideo){
        $('#company_verify_popop').val('1');
        jQuery("#companyverify").modal('hide');
    }
    else{
        $('#company_verify_popop').val('0');
    }
    var id = value;
    if (angular.isDefined($rootScope.token_id)) {
      var token_id = $rootScope.token_id;
    } else {
      var token_id = guest_token;
    }
    $http.get(apiUrl+"api/v1/flat_pages/rest/video_detail/"+id+"/", {
      headers: {'Authorization' : 'Token '+token_id}
    })
    .then(function successCallback(response){
      $rootScope.vid = response.data;
      $rootScope.videolikedisable = false;
      $('#video_like_wrapper').text(response.data.video.liked.length);
      $('#videolikebtn').css({'color':'#303030'});
      $.each(response.data.video.liked, function(i,obj) {
        if(parseInt(obj.id) == parseInt($rootScope.user_id)){$('#videolikebtn').css({'color':'#00b58e'});$rootScope.videolikedisable = true;}
      });
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
      });
      //jwplayer("jwplayer").play();
      primary: "flash",
      $('.video_loader_bk').fadeOut();
    }, function errorCallback(response){
      console.log("Unable to perform get Video Details");
    });
  };//Common Video Popup - function end

  $rootScope.videolikesubmit = function(videoid){
    $http.get(apiUrl+"api/v1/career_fairs/video_like/"+videoid+"/",{
      headers: {'Authorization' : 'Token '+$rootScope.token_id}
    })
    .then(function successCallback(response){
      var video_coutn = parseInt($('#video_like_wrapper').text());
      $('#video_like_wrapper').text(video_coutn+1);
      $('#videolikebtn').css({'color':'#00b58e'});
      $rootScope.videolikedisable = true;
    }, function errorCallback(response){
      console.log("Unable to perform get career fair details");
    });
  };
  // facebook signin url
  $http.get(apiUrl+"api/v1/oauth/facebook_url/")
  .then(function successCallback(response){
    $rootScope.facebookloginurl = response.data.url;
  }, function errorCallback(response){
    console.log("Unable to perform get career fair near for current user");
  });

  $rootScope.datecheckErr = function (startDate, endDate) {
        $rootScope.dateerrcondition = true;
        $rootScope.dateerrMessage = '';
        $rootScope.curDate = new Date();
        if (new Date(startDate) > new Date(endDate)) {
            $rootScope.dateerrMessage = 'End Date should be greate than start date';
            $rootScope.dateerrcondition = false;
            return false;
        }

        if (new Date(startDate) > $rootScope.curDate) {
            $rootScope.dateerrMessage = 'Start date should not be before today.';
            $rootScope.dateerrcondition = false;
            return false;
        }
    };
    $rootScope.loadTags = function(query) {
        return $http.get(apiUrl+'api/v1/auto/skill_list/?format=list&q=' + query);
    };
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
FirstSynch.controller("video_cmt_form_controller", function ($cookies,$scope,guest_token,$http, apiUrl, $location, $window,$rootScope) {

  $scope.video_comment_form_submit = function(videoid){
    var token_id = $cookies.get('token');
    var videocomment_data = {
      comment : $scope.videocomment
    }
    //alert(JSON.stringify(personnal_skill_data));
    $http.post(apiUrl+"api/v1/career_fairs/add_video_comment/"+videoid+"/",JSON.stringify(videocomment_data),{
      headers: {'Authorization' : 'Token '+token_id}
    })
    .then(function (response) {

        $http.get(apiUrl+"api/v1/flat_pages/rest/video_detail/"+videoid, {
          headers: {'Authorization' : 'Token '+token_id}
        })
        .then(function successCallback(response){
          $rootScope.vid.video.comments = response.data.video.comments;
        }, function errorCallback(response){
          console.log("Unable to perform get Video Details");
        });

      //angular.element(jQuery(document).find('.video_cmt_append_act')).append($compile(append_data)($scope));
      $('#comment_succ_msg').show();
      $('#videocomment').val('');
    });
  };
});
FirstSynch.controller("Login", function ($compile, $timeout,$cookies,$scope ,$http, apiUrl, $location, $window,$rootScope,companyusertype,studentusertype) {
  $scope.resendactivation = function(value) {
    $http({
      url: apiUrl+'api/v1/accounts/resend/'+value+'/',
      method: "GET",
    })
    .then(function successCallback(data, status, headers, config) {
        $('.error_message').html('<b>Your activation email send to your register mail id</b>');
          $timeout(function() {
             $('.error_message').text('');
          }, 10000);
    },
    function errorCallback(data, status, headers, config) {
    });
  };

  var url = window.location.href;
  var idexvalue = url.indexOf("/login");
  if(idexvalue != -1) {
    jQuery('#logIn').modal('show');
  }
  $scope.LoginUser = function () {
    $('.error_message').text('');
    $('.loader_icon').show();
    var redirectulrs = $('#redirecturl').val();
    var videoid = $('#videoid').val();
    var data = $.param({
      username: $scope.userlogform.username,
      password: $scope.userlogform.password,
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
      $cookies.put('token', response.data.token);
      $window.sessionStorage.setItem('usertype', response.data.usertype);
      $cookies.put('usertype', response.data.usertype);
      $window.sessionStorage.setItem('profileimage', response.data.profile_image);
      $cookies.put('profileimage', response.data.profile_image);
      $window.sessionStorage.setItem('user_id', response.data.user_id);
      $cookies.put('user_id', response.data.user_id);
      $rootScope.profileimage = response.data.profile_image;
      $rootScope.user_id = response.data.user_id;
      $rootScope.token_id = response.data.token;
      $rootScope.guest_login = false;
      if(response.data.company_id){
        $rootScope.company_userid = response.data.company_id;
        $window.sessionStorage.setItem('company_userid', response.data.company_id);
        $cookies.put('company_userid', response.data.company_id);
      }else if(response.data.request_member_id){
        $rootScope.request_member_id = response.data.request_member_id;
        $window.sessionStorage.setItem('request_member_id', response.data.request_member_id);
        $cookies.put('request_member_id', response.data.request_member_id);
      } else if(response.data.student_id){
        $rootScope.student_id = response.data.student_id;
        $window.sessionStorage.setItem('student_id', response.data.student_id);
        $cookies.put('student_id', response.data.student_id);
      }
      jQuery(".modal-backdrop.in").hide();
      jQuery('#logIn').modal('hide');
      jQuery('form#reset_forms').trigger("reset");
      jQuery('#reset_forms label, #reset_forms input').removeClass('has-success');
      if(companyusertype == response.data.usertype){
        $rootScope.company_login = true;
        $('#logIn').modal('hide');
        $rootScope.companyuserInfo = window.sessionStorage.getItem("token");
        if(redirectulrs.indexOf("careerfair/") > -1){
          $location.path( "/com"+redirectulrs );
        }else{
          $location.path( "/com/dashboard");
        }
      }
      else if(studentusertype == response.data.usertype){
        $rootScope.student_login = true;
        $('#logIn').modal('hide');
        $rootScope.studentuserInfo = window.sessionStorage.getItem("token");
        if(redirectulrs.indexOf("careerfair/") > -1){
          $location.path( "/stu"+redirectulrs );
        }else{
          $location.path( "/stu/dashboard" );
        }
      }
    },
    function errorCallback(data, status, headers, config) {
      //$('#logIn').modal('show');
      $('.loader_icon').hide();
      $scope.status = data.data.non_field_errors[0];
      if ($scope.status == 'Please activate your Firstsynch account.'){
        $('.error_message').text('');
        var act_id = "'"+data.data.non_field_errors[1]+"'";
         var activation_link = '<b>'+data.data.non_field_errors[0]+'<a href="#" ng-click="resendactivation('+act_id+')"> Resend Activation Email.</a></b>';
         angular.element(jQuery('.error_message')).append($compile(activation_link)($scope));
      } else {
        $('.error_message').text($scope.status);
      }
      $timeout(function() {
         $('.error_message').text('');
      }, 10000);
    });
  };// user login - function end
});

FirstSynch.controller("company_sigup_verify", function ($timeout,$route,$scope,Upload, $http, apiUrl, $rootScope) {
    $http({
      url: apiUrl+'api/v1/career_fairs/newcompany_careerfairs/',
      method: "GET",
    })
    .then(function successCallback(data, status, headers, config) {
        $scope.newcompany_careerfairs = data.data;
    },
    function errorCallback(data, status, headers, config) {
    });

    $scope.CompanyVerifying = function () {
        var data = {e_mail:$scope.companyemail}
        $http({
          url: apiUrl+'api/v1/companyadmin/careerfair_video/',
          method: "POST",
          data: data
        })
        .then(function successCallback(data, status, headers, config) {
            setTimeout(function(){ jQuery("body").addClass('modal-open'); }, 1000);
            $scope.companyverifyvideo = data.data;
        },
        function errorCallback(data, status, headers, config) {
          $scope.status = data.data.status;
          if(data.data.error){
              $rootScope.SendData($scope.companyemail);
          }
        });
    };
});
FirstSynch.controller("IdentifyUser", function ($timeout,$route,$scope,Upload, $http, apiUrl, $rootScope) {

  $rootScope.SendData = function (mailiid) {
    var data = 'e_mail=' + mailiid.toLowerCase().replace(/\s/g, '');
    $http({
      url: apiUrl+'api/v1/accounts/signupemail/',
      method: "POST",
      data: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function successCallback(data, status, headers, config) {
      if(data.data.user_type == '38OD2'){
        jQuery("#registration").modal('hide');
        jQuery("#companyverify").modal('hide');
        jQuery("#signUp").modal('show');
        $('.peoplesearch_remove').show();
        $('.peoplesearch_show').hide();
        setTimeout(function(){ jQuery("body").addClass('modal-open'); }, 3000);
        $rootScope.e_mail = ($scope.usersignup.email).toLowerCase().replace(/\s/g, '');
      }else{
        jQuery("#registration").modal('hide');
        jQuery("#companyverify").modal('hide');
        jQuery("#companyregistration").modal('show');
        $('.domainsearch_remove').show();
        $('.domainsearch_show').hide();
        setTimeout(function(){ jQuery("body").addClass('modal-open'); }, 3000);
        $rootScope.e_mail = ($scope.usersignup.email).toLowerCase().replace(/\s/g, '');
      }
    },
    function errorCallback(data, status, headers, config) {
    //   $scope.signuperrormgs = true;
    //   $scope.signuperror = data.data.data;
      $scope.error1 = data.data;
    //   alert(data.data.data)
      $('.signuperrormsg').text(data.data.data);
      $timeout(function() {
         $('.signuperrormsg').text('');
      }, 5000);
    });

  };//find user - function end
  $scope.student_signup_clear = function(){
      $scope.name = null;
      $scope.lname = null;
      $scope.selecteduniversity.originalObject.Institution_Name = null;
      $('#universities_value').val('');
      $scope.password = null;
      $scope.gpa = null;
      $scope.piplsearch = 'allow';
      $('#allow_pipl').val('1');
  }
  $scope.StudentRegistratoin = function (image) {
    //alert($scope.piplsearch);
    var allow_pipl_check = parseInt($('#allow_pipl').val());
    var workhistroy_arry = [];
    var education_arry = [];
    var data = {
      education : {school_name : $scope.selecteduniversity.originalObject.Institution_Name,gpa : $scope.gpa},
      user : {e_mail:$rootScope.e_mail,name:$scope.name,password:$scope.password}
    }
    if($rootScope.current_city != '' && $rootScope.current_state != '' ){
      data.student = {first_name : $scope.name,last_name:$scope.lname,city:$scope.current_city,state : $scope.current_state}
    }
    else{
      data.student = {first_name : $scope.name,last_name:$scope.lname}
    }
    if($scope.piplsearch == 'allow'){
      $http.get(apiUrl+"api/v1/piplapi/?email="+$rootScope.e_mail)
      .then(function successCallback(response){

        $scope.piplimage = response.data.image ? response.data.image : null ;
        $scope.piplschoolname = response.data.school_name ? response.data.school_name : null ;
        $scope.pipldateattended = response.data.dateattended ? response.data.dateattended : null;
        $scope.piplmajor = response.data.major ?response.data.major :null;
        $scope.pipljobs = response.data.jobs ? response.data.jobs : null ;
        if(response.data.jobs){
            $scope.workhistroy_count = response.data.jobs.length;
        }
        else {
            $scope.workhistroy_count = 1;
        }
        $('#allow_pipl').val('0');
        $('.peoplesearch_remove').hide();
        $('.peoplesearch_show').show();

      }, function errorCallback(response){
        console.log("Unable to perform get company basic profile details");
      });
    }
    else if($scope.piplsearch == 'deny') {
        $scope.piplimage = null ;
        $scope.piplschoolname =  null ;
        $scope.pipldateattended = null;
        $scope.piplmajor = null;
        $scope.pipljobs = null ;
        $scope.workhistroy_count = 1;
        $('#allow_pipl').val('0');
        $('.peoplesearch_remove').hide();
        $('.peoplesearch_show').show();
    }

    if(allow_pipl_check == 0){
      for(var w=0;w<parseInt($('#workhistroy_count').val());w++){
        workhistroy_arry.push({"company_name":$('#pipl_company_name'+w).val(),"datestarted":$('#pipl_datestarted'+w).val(),"leavedate":$('#pipl_leavedate'+w).val(),"jobtitle":$('#pipl_jobtitle'+w).val(),"jobdescription":$('#pipl_jobdescription'+w).val()});
      }
      education_arry.push({school_name : $scope.selecteduniversity.originalObject.Institution_Name,gpa : $scope.gpa});
      education_arry.push({school_name : $('#piplschool_name').val(),dateattended: $('#pipl_dateattended').val(),major:$('#pipl_major').val()});
      var datap = {
        educations : education_arry,
        student : {first_name : $scope.name},
        user : {e_mail:$rootScope.e_mail,name:$scope.name,password:$scope.password},
        jobs:workhistroy_arry,
        image : $('#piplimage').val()
      }
      if(image){
          Upload.upload({
              url: apiUrl+'api/v1/student/student_signup/',
              data: { json_data : JSON.stringify(datap), profile_picture : image },
              method:'POST',
          }).then(function(resp) {
              jQuery("#signUp").modal('hide');
              jQuery("#signUpSuccess").modal('show');
              $scope.student_signup_clear();
          }, function(resp) {
            // handle error
          }, function(evt) {
            // progress notify
          });
      }
      else{
          $http({
            url: apiUrl+'api/v1/student/student_signup/',
            method: "POST",
            data: { json_data : JSON.stringify(datap) },
          })
          .then(function successCallback(data, status, headers, config) {
            jQuery("#signUp").modal('hide');
            jQuery("#signUpSuccess").modal('show');
            $scope.student_signup_clear();
          },
          function errorCallback(data, status, headers, config) {
            $scope.status = data.data.status;
          });
      }
    }
    //alert(JSON.stringify(data));allow_pipl

  };//userStudentRegistratoin - function end

  $scope.company_signup_clear = function(){
      $scope.name = '';
      $scope.lname = '';
      $scope.cname = '';
      $scope.password = '';
  }

  $scope.CompanyRegistratoin = function (file) {
    var allow_domainsearch = parseInt($('#domain_search').val());

    if($scope.domainsearch == 'allow' && allow_domainsearch){
      var data = {
        allow_company_info: 'True',
        company_name:$scope.cname,
        //company_info: {name:$scope.cname, city:$scope.current_city,state : $scope.current_state},
        user : {name :$scope.name,e_mail:$rootScope.e_mail,password:$scope.password },
        employee : { first_name : $scope.name, last_name : $scope.lname, city:$scope.current_city,state : $scope.current_state}
      };
      $http({
        url: apiUrl+'api/v1/employee/api/employee_signup/',
        method: "POST",
        data: data,
        headers: {'Content-Type': 'application/json'}
      })
      .then(function successCallback(data, status, headers, config) {
        if(data.data.success){
          $('.peoplesearch_remove').show();
          jQuery("#companyregistration").modal('hide');
          jQuery("#companysignUpSuccess").modal('show');
          jQuery('form#reset_forms').trigger("reset");
          jQuery('#reset_forms label, #reset_forms input').removeClass('has-success');
          $scope.name = '';
          $scope.lname = '';
          $scope.cname = '';
          $scope.password = '';
        }
        else{
          if(!data.data.company_info.error){
              $scope.domainimage = data.data.company_info.logo ? data.data.company_info.logo : "" ;
              $scope.domaincmpy_name= data.data.company_info.name ? data.data.company_info.name : "" ;
              $scope.domainwebsite= data.data.company_info.website ? data.data.company_info.website :"";
              $scope.domain_est_date= data.data.company_info.establishment_date ?data.data.company_info.establishment_date :"";
              $scope.domainfburl= data.data.company_info.facebook_url ? data.data.company_info.facebook_url : "" ;
              $scope.domainliurl= data.data.company_info.linkedin_url ? data.data.company_info.linkedin_url : "" ;
              $scope.domaintotal_emp= data.data.company_info.employees ? data.data.company_info.employees : "" ;
              $scope.domaindescription= data.data.company_info.description ? data.data.company_info.description : "" ;
              $scope.domainaddress1= data.data.company_info.address.address_1 ? data.data.company_info.address.address_1 : "" ;
              $scope.domaincity= data.data.company_info.address.city ? data.data.company_info.address.city : "" ;
              $scope.domainstate= data.data.company_info.address.state ? data.data.company_info.address.state : "" ;
              $scope.domaincountry= data.data.company_info.address.country ? data.data.company_info.address.country : "" ;
              $scope.domainzip_code= data.data.company_info.address.zip_code ? data.data.company_info.address.zip_code : "" ;
              $scope.domaine_mail= data.data.company_info.address.e_mail ? data.data.company_info.address.e_mail : null ;
              $scope.domaincontact_no= data.data.company_info.address.contact_no ? data.data.company_info.address.contact_no : "" ;
              $('#domain_search').val('0');
              $('.domainsearch_remove').hide();
              $('.domainsearch_show').show();
          }
          else{
              $('#domain_search').val('0');
              $('.domainsearch_remove').hide();
            //   $('.domainsearch_show .edit_option').remove();
            //   $('.domainsearch_show input').removeAttr('readonly');
              $('.domainsearch_show').show();
          }
        }
      },
      function errorCallback(data, status, headers, config) {
        $scope.status = data.data.status;
      });
    }
    else if($scope.domainsearch == 'deny' && allow_domainsearch) {
         $('#domain_search').val('0');
         $('.domainsearch_remove').hide();
         $('.domainsearch_show').show();
    }
    if(allow_domainsearch == 0){
          var datae = {
            company_info : {
              address:{
                address_1:$('#domainaddress1').val(),
                city: $('#domaincity').val(),
                contact_no: $('#domaincontact_no').val(),
                country: $('#domaincountry').val(),
                e_mail: $('#domaine_mail').val(),
                state: $('#domainstate').val(),
                zip_code: $('#domainzip_code').val()?$('#domainzip_code').val():null,
              },
              description:$('#domaindescription').val(),
              employees : $('#domaintotal_emp').val()?$('#domaintotal_emp').val() : 0,
              establishment_date : $('#domain_est_date').val()?$('#domain_est_date').val():null,
              linkedin_url : $('#domainliurl').val(),
              facebook_url : $('#domainfburl').val(),
              logo : $('#domainimage').val(),
              name : $('#domaincmpy_name').val()?$('#domaincmpy_name').val():$scope.cname,
              website : $('#domainwebsite').val(),
              city:$scope.current_city,
              state : $scope.current_state,
              hire_rates:$scope.domainhiringrate,
              internships_to_jobs:$scope.domainintern,
              departure_rate:$scope.domaindeparturerate,
              average_entry_level_sal:$scope.domainsalary,
            },
            company_name:$scope.cname,
            user : {name :$scope.name+$scope.lname,e_mail:$rootScope.e_mail,password:$scope.password },
            employee : { first_name : $scope.name, last_name : $scope.lname, city:$scope.current_city, state : $scope.current_state}
          }
          if(file){
              Upload.upload({
                  url: apiUrl+'api/v1/employee/api/employee_signup/',
                  data: { json_data : JSON.stringify(datae), logo : file },
                  method:'POST',
              }).then(function(resp) {
                  $('.peoplesearch_remove').show();
                  jQuery("#companyregistration").modal('hide');
                  jQuery("#companysignUpSuccess").modal('show');
                  jQuery('form#reset_forms').trigger("reset");
                  jQuery('#reset_forms label, #reset_forms input').removeClass('has-success');
                  $('#domain_search').val('1');
                  $scope.domainsearch = 'allow';
                  $scope.name = '';
                  $scope.lname = '';
                  $scope.cname = '';
                  $scope.password = '';
                  $scope.domainimage = '';
                  $scope.domaincmpy_name= '';
                  $scope.domainwebsite= '';
                  $scope.domain_est_date= '';
                  $scope.domainfburl= '';
                  $scope.domainliurl= '';
                  $scope.domaintotal_emp= '';
                  $scope.domaindescription = '';
                  $scope.domainaddress1= '';
                  $scope.domaincity= '';
                  $scope.domainstate= '';
                  $scope.domaincountry= '';
                  $scope.domainzip_code= '';
                  $scope.domaine_mail= '';
                  $scope.domaincontact_no= '';
                  $timeout( function(){
                    $route.reload();
                  }, 5000 );
              }, function(resp) {
                // handle error
              }, function(evt) {
                // progress notify
              });
          }
          else{
              $http({
                url: apiUrl+'api/v1/employee/api/employee_signup/',
                method: "POST",
                data: { json_data : JSON.stringify(datae) },
              })
              .then(function successCallback(data, status, headers, config) {
                $('.peoplesearch_remove').show();
                jQuery("#companyregistration").modal('hide');
                jQuery("#companysignUpSuccess").modal('show');
                jQuery('form#reset_forms').trigger("reset");
                jQuery('#reset_forms label, #reset_forms input').removeClass('has-success');
                $('#domain_search').val('1');
                $scope.domainsearch = 'allow';
                $scope.name = '';
                $scope.lname = '';
                $scope.cname = '';
                $scope.password = '';
                $scope.domainimage = '';
                $scope.domaincmpy_name= '';
                $scope.domainwebsite= '';
                $scope.domain_est_date= '';
                $scope.domainfburl= '';
                $scope.domainliurl= '';
                $scope.domaintotal_emp= '';
                $scope.domaindescription = '';
                $scope.domainaddress1= '';
                $scope.domaincity= '';
                $scope.domainstate= '';
                $scope.domaincountry= '';
                $scope.domainzip_code= '';
                $scope.domaine_mail= '';
                $scope.domaincontact_no= '';
                $timeout( function(){
                  $route.reload();
                }, 5000 );
              },
              function errorCallback(data, status, headers, config) {
                $scope.status = data.data.status;
              });
          }
     //}
    }
  };//company Registratoin - function end

});


FirstSynch.controller("ForgotPassword", function ($timeout,$scope, $http, apiUrl) {
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
      $('#ForgotPassword').modal('hide');
      $('#forgot_success_msg').modal('show');
    },
    function errorCallback(data, status, headers, config) {
      $scope.failure = data.data.error;
      $('.forgot_pass_msg_act').html($scope.failure);
    });
  };//Forgot Password - function end
});


FirstSynch.controller("ResetPassword", function ($location,$scope, $http, apiUrl) {
  if($location.search()['resetpassword']){
    $('#resetpassword').modal('show');
  }
  $scope.ResetPassword = function () {
    var data = {
      password: $scope.password,
      token: $location.search()['resetpassword'],
    };
    $http({
      url: apiUrl+'api/v1/accounts/resetpasswordlink/',
      method: "POST",
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
    .then(function successCallback(data, status, headers, config) {
      $scope.success = data.output;
      $('#resetpassword').modal('hide');
      $('#reset_pass_success').modal('show');
    },
    function errorCallback(data, status, headers, config) {
      $scope.failure = data.output;
    });
  };//Reset Password - function end
});


FirstSynch.controller("LogoutUser", function ($cookies,guest_token,$scope, $http, $location, apiUrl, $window, $rootScope) {
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
      $cookies.remove('token');
      $window.sessionStorage.removeItem('profileimage');
      $cookies.remove('profileimage');
      $window.sessionStorage.removeItem('usertype');
      $cookies.remove('usertype');
      $window.sessionStorage.removeItem('request_member_id');
      $cookies.remove('request_member_id');
      $window.sessionStorage.removeItem('company_userid');
      $cookies.remove('company_userid');
       $cookies.remove('user_id');
      $window.sessionStorage.removeItem('student_id');
      $cookies.remove('student_id');

      $rootScope.guest_login = true;
      $rootScope.dashboard = true;
      $rootScope.dashboardc = true;
      $rootScope.student_login = false;
      $rootScope.company_login = false;
      $scope.username = '';
      $scope.password = '';
      delete $rootScope.companyuserInfo
      delete $rootScope.studentuserInfo
      delete $rootScope.token_id
      delete $rootScope.request_member_id
      delete $rootScope.company_userid
      delete $rootScope.student_id
      $window.sessionStorage.setItem('token', guest_token);
      $cookies.put('token', guest_token);
      $rootScope.token_id = guest_token;
      $location.path( "/" );
    },
    function errorCallback(data, status, headers, config) {
      $scope.status = 'Please provide valid login credentials.';
      $window.sessionStorage.removeItem('token');
      $window.sessionStorage.removeItem('profileimage');
      $window.sessionStorage.removeItem('usertype');
      $window.sessionStorage.removeItem('request_member_id');
      $window.sessionStorage.removeItem('student_id');
      $cookies.remove('token');
      $cookies.remove('profileimage');
      $cookies.remove('usertype');
      $cookies.remove('request_member_id');
      $cookies.remove('company_userid');
      $cookies.remove('student_id');
      $scope.username = '';
      $scope.password = '';
      delete $rootScope.companyuserInfo
      delete $rootScope.studentuserInfo
      delete $rootScope.token_id
      delete $rootScope.request_member_id
      delete $rootScope.student_id
      $location.path( "/" );
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
FirstSynch.controller("FbLogin", function (Upload,$cookies,$window,$rootScope,$scope, $http, apiUrl,$location,companyusertype,studentusertype) {
  $scope.facebookform = {
    fbfirstname:"",
    fblastname : "",
    fbimage : "",
    fbemail : "",
    fbgender : "",
    fbeducation : "",
    fbjobs : "",
    fbdob:"",

  };


  $scope.fbsignup = function(image){
    var fbworkhistroy_arry = [];
    $http({
      url: apiUrl+'api/v1/accounts/signupemail/',
      method: "POST",
      data: 'e_mail=' + $scope.facebookform.fbemail,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function successCallback(data, status, headers, config) {
      if(data.data.user_type == '38OD2'){
        //student
        for(var w=0;w<parseInt($('#fbjob_count').val());w++){
          fbworkhistroy_arry.push({"company_name":$('#fb_company_name'+w).val(),"datestarted":$('#fb_datestarted'+w).val(),"leavedate":$('#fb_leavedate'+w).val(),"jobtitle":$('#fb_jobtitle'+w).val(),"jobdescription":$('#fb_jobdescription'+w).val()});
        }
        if(image){
            var data = {
              is_verified : true,
              education : {school_name : $('#fb_school_name0').val(),dateattended: $('#fb_dateattended0').val(),major:$('#fb_major0').val()},
              student : {first_name : $scope.facebookform.fbfirstname},
              user : {e_mail:$scope.facebookform.fbemail,name:$scope.facebookform.fbfirstname+$scope.facebookform.fblastname},
              jobs:fbworkhistroy_arry
            };
            Upload.upload({
                url: apiUrl+'api/v1/student/student_signup/',
                data: { json_data : JSON.stringify(data), profile_picture : image },
                method:'POST',
            }).then(function(resp) {
                $window.sessionStorage.setItem('token', resp.data.token);
                $rootScope.token_id = resp.data.token;
                $window.sessionStorage.setItem('user_id', resp.data.user_id);
                $window.sessionStorage.setItem('usertype', resp.data.usertype);
                $window.sessionStorage.setItem('profileimage', resp.data.profile_image);
                $cookies.put('profileimage', resp.data.profile_image);
                $rootScope.profileimage = resp.data.profile_image;
                $rootScope.user_id = resp.data.user_id;
                $rootScope.studentuserInfo = window.sessionStorage.getItem("token");
                $rootScope.e_mail = $scope.facebookform.fbemail;
                $location.search('code', null);
                $location.search('state', null);
                $cookies.put('token', resp.data.token);
                $cookies.put('usertype', resp.data.usertype);
                $cookies.put('user_id', resp.data.user_id);
                $cookies.put('student_id', resp.data.student_id);
                jQuery("#fbsignUp").modal('hide');
                $rootScope.guest_login = false;
                $rootScope.student_login = true;
                $location.path("/stu");
            }, function(resp) {
              // handle error
            }, function(evt) {
              // progress notify
            });
        }
        else{
            var data = {
              is_verified : true,
              education : {school_name : $('#fb_school_name0').val(),dateattended: $('#fb_dateattended0').val(),major:$('#fb_major0').val()},
              image : $scope.facebookform.fbimage,
              student : {first_name : $scope.facebookform.fbfirstname},
              user : {e_mail:$scope.facebookform.fbemail,name:$scope.facebookform.fbfirstname+$scope.facebookform.fblastname},
              jobs:fbworkhistroy_arry
            };
            $http({
              url: apiUrl+'api/v1/student/student_signup/',
              method: "POST",
              data: { json_data : JSON.stringify(data) },
            })
            .then(function successCallback(data, status, headers, config) {
              $window.sessionStorage.setItem('token', data.data.token);
              $rootScope.token_id = data.data.token;
              $window.sessionStorage.setItem('user_id', data.data.user_id);
              $window.sessionStorage.setItem('usertype', data.data.usertype);
              $window.sessionStorage.setItem('profileimage', data.data.profile_image);
              $cookies.put('profileimage', data.data.profile_image);
              $rootScope.profileimage = data.data.profile_image;
              $rootScope.user_id = data.data.user_id;
              $rootScope.studentuserInfo = window.sessionStorage.getItem("token");
              $rootScope.e_mail = $scope.facebookform.fbemail;
              $location.search('code', null);
              $location.search('state', null);
              $cookies.put('token', data.data.token);
              $cookies.put('usertype', data.data.usertype);
              $cookies.put('user_id', data.data.user_id);
              $cookies.put('student_id', data.data.student_id);
              jQuery("#fbsignUp").modal('hide');
              $rootScope.guest_login = false;
              $rootScope.student_login = true;
              $location.path("/stu");
            },
            function errorCallback(data, status, headers, config) {

            });
        }
      }else{
        //compzny
        var data = {
          is_verified : true,
          company_name:$scope.facebookform.fbfirstname+$scope.facebookform.fblastname,
          image : $scope.facebookform.fbimage,
          user : {name :$scope.facebookform.fbfirstname+$scope.facebookform.fblastname,e_mail:$scope.facebookform.fbemail},
          employee : {}
        };
        $http({
          url: apiUrl+'api/v1/employee/api/employee_signup/',
          method: "POST",
          data: data,
          headers: {'Content-Type': 'application/json'}
        })
        .then(function successCallback(data, status, headers, config) {
          $window.sessionStorage.setItem('token', data.data.token);
          $rootScope.token_id = data.data.token;
          $window.sessionStorage.setItem('usertype', data.data.usertype);
          $window.sessionStorage.setItem('user_id', data.data.user_id);
          $rootScope.user_id = data.data.user_id;
          $rootScope.companyuserInfo = window.sessionStorage.getItem("token");
          $rootScope.e_mail = $scope.facebookform.fbemail;
          $cookies.put('token', data.data.token);
          $cookies.put('usertype', data.data.usertype);
          $cookies.put('user_id', data.data.user_id);
          $cookies.put('company_userid', data.data.company_id);
          $location.search('code', null);
          $location.search('state', null);
          $location.search('_', null);
          jQuery("#fbsignUp").modal('hide');
          $rootScope.guest_login = false;
          $rootScope.company_login = true;
          $location.path("/com");
        },
        function errorCallback(data, status, headers, config) {
        });
      }
    },
    function errorCallback(data, status, headers, config) {
      $scope.signuperrormgs = true;
      $scope.signuperror = data.data.data;
      $timeout(function() {
         $scope.signuperrormgs = false;
      }, 5000);
    });
  };
  var url = window.location.href
  var split_url = url.split('?');
  if($location.search()['code']){
    var data = {'redirect_uri': apiUrl+'?'+split_url[1]};
    $http({
      url: apiUrl+'api/v1/oauth/facebook_auth/',
      method: "POST",
      data: data,
      headers: {'Accept':'application/json'}
    })
    .then(function successCallback(response, status, headers, config) {
      if(response.data.token){
        $window.sessionStorage.setItem('token', response.data.token);
        $window.sessionStorage.setItem('usertype', response.data.usertype);
        $window.sessionStorage.setItem('profileimage', response.data.profile_image);
        $window.sessionStorage.setItem('user_id', response.data.user_id);
        $cookies.put('token', response.data.token);
        $cookies.put('usertype', response.data.usertype);
        $cookies.put('profileimage', response.data.profile_image);
        $cookies.put('user_id', response.data.user_id);
        $rootScope.profileimage = response.data.profile_image;
        $rootScope.user_id = response.data.user_id;
        $rootScope.token_id = response.data.token;
        if(response.data.company_id){
          $rootScope.company_userid = response.data.company_id;
          $window.sessionStorage.setItem('company_userid', response.data.company_id);
          $cookies.put('company_userid', data.data.company_id);
        }
        if(companyusertype == response.data.usertype){
          $rootScope.companyuserInfo = window.sessionStorage.getItem("token");
          $location.search('code', null);
          $location.search('state', null);
          $location.search('_', null);
          $rootScope.guest_login = false;
          $rootScope.company_login = true;
          $location.path( "/com");
        }
        else if(studentusertype == response.data.usertype){
          $rootScope.studentuserInfo = window.sessionStorage.getItem("token");
          $location.search('code', null);
          $location.search('state', null);
          $location.search('_', null);
          $rootScope.guest_login = false;
          $rootScope.student_login = true;
          $location.path( "/stu" );
        }
      }
      else{
        $scope.facebookform.fbfirstname = response.data.first_name;
        $scope.facebookform.fblastname = response.data.last_name;
        $scope.facebookform.fbimage = response.data.image;
        $scope.facebookform.fbemail = response.data.email;
        $scope.facebookform.fbgender = response.data.gender?response.data.gender:"";
        $scope.facebookform.fbdob = response.data.dob?response.data.dob:"";
        $scope.facebookform.fbeducation = response.data.education?response.data.education:"";
        if(response.data.education){
            $scope.facebookform.fbeducationcount = response.data.education.length;
        }
        else {
            $scope.facebookform.fbeducationcount = 1;
        }
        $scope.facebookform.fbjobs = response.data.jobs?response.data.jobs:"";
        if(response.data.jobs){
            $scope.facebookform.fbjobscount = response.data.jobs;
        }
        else {
            $scope.facebookform.fbjobscount = 1;
        }
        $location.search('code', null);
        $location.search('state', null);
        $location.search('_', null);
        jQuery("#fbsignUp").modal('show');
      }
    },
    function errorCallback(response, status, headers, config) {
    });
  }
});
FirstSynch.controller("CommonLoaderClose" ,function ($timeout,$window,$scope) {
  $scope.$watch('$viewContentLoaded', function(){
    $timeout( function(){
      $window.loading_screen.finish();
    }, 3000 );
  });
});
FirstSynch.controller("UserSearch", function ($rootScope, $scope, $http,guest_token, apiUrl,$location,$compile)
{
  $scope.search_field_clean = function(){
    $scope.keywords = '';
    $('.search-result-container').hide();
    $('.search_result_remove_act').show();
  }
  $scope.SearchsubmitFunc = function ()
  {
    if (angular.isDefined($rootScope.token_id)) {
      var token_id = $rootScope.token_id;
    } else {
      var token_id = guest_token;
    }
    $('.video_filter_search_result_empty').addClass('hide');
    $http.get(apiUrl+"api/v1/search/?q="+$scope.keywords, {
      headers: {'Authorization' : 'Token '+token_id}
    })
    .then(function successCallback(response)
    {
      jQuery('.search_result_remove_act').hide();
      jQuery('.search_result_show_act').show();
      jQuery('.search_results_career_page_act').empty();
      jQuery('.search_results_companies_act').empty();
      jQuery('.search_results_student_act').empty();
      if((response.data.student && $rootScope.student_login && !response.data.careerfair && !response.data.company && !response.data.video) || (response.data.company && $rootScope.company_login && !response.data.careerfair && !response.data.student && !response.data.video) || (!response.data.careerfair && !response.data.company && !response.data.student && !response.data.video)){
        $('.video_filter_search_result_empty').removeClass('hide');
      }
      if(response.data.careerfair){
        jQuery('.search_results_career_page_container_act').show();
        jQuery.each(response.data.careerfair, function(i) {
          var career_fair_result = '<div class="media custom-media">'
          +'<a href="/careerfair/'+response.data.careerfair[i].slug+'" class="search-link">'
          +'<div class="media-left media-middle custom-media-left"> <img style="height:117px;" class="media-object custom-media-object" src="http://firstsynchvideos.s3.amazonaws.com/'+response.data.careerfair[i].image+'" alt="">  </div>'
          +'<div class="media-body custom-media-body">'
          +'<h4 class="media-heading custom-media-heading">'+response.data.careerfair[i].title+'</h4>'
          +'<h5 class="media-eading-h5">'+moment(response.data.careerfair[i].start_time).format("MMMM d, YYYY")+' &bull; '+(typeof response.data.careerfair[i].city != "undefined"?response.data.careerfair[i].city:"")+', '+response.data.careerfair[i].state+'</h5>'
          +'<div class="searech-folow pull-left">'
          +'<span class="group-followers"><span class="total-followers">'+(typeof response.data.careerfair[i].followed != "undefined"?response.data.careerfair[i].followed:"0")+'</span> followers</span>'
          +'<span class="group-followers"><span class="total-followers">'+(typeof response.data.careerfair[i].reuestedfor_careerfair != "undefined"?response.data.careerfair[i].reuestedfor_careerfair:"0")+'</span> Companies</span>'
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
      if(response.data.company && !$rootScope.company_login){
        jQuery('.search_results_companies_container_act').show();
        jQuery.each(response.data.company, function(i) {
          var companies_result ='<div class="media custom-media">'
          +'<a href="/company/'+response.data.company[i].slug+'" class="search-link">'
          +'<div class="media-left media-middle custom-media-left">'
          +'<div class="search-img-container">'
          +'<img src="http://firstsynchvideos.s3.amazonaws.com/'+response.data.company[i].logo+'" class="logo-companies-box">'
          +'</div>'
          +'</div>'
          +'<div class="media-body custom-media-body">'
          +'<h4 class="media-heading custom-media-heading">'+response.data.company[i].name+'</h4>'
          +'<h5 class="media-eading-h5">'+(typeof response.data.company[i].city != "undefined"?response.data.company[i].city+'&bull; ':"")+(typeof response.data.company[i].state != "undefined"?response.data.company[i].state:"")+'</h5>'
          +'<div class="searech-folow pull-left">'
          +'<span class="group-followers"><span class="total-followers">'+(typeof response.data.company[i].employees != "undefined"?response.data.company[i].employees:"0")+'</span> Employees</span>'
          +'<span class="group-followers"><span class="total-followers">'+(typeof response.data.company[i].followers != "undefined"?response.data.company[i].followers:"0")+'</span> followers</span>'
          +'<span class="group-followers"><span class="total-followers">'+(typeof response.data.company[i].careerfair_company != "undefined"?response.data.company[i].careerfair_company:"0")+'</span> Career fairs</span>'
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
      if(response.data.student && !$rootScope.student_login){
        jQuery('.search_results_student_container_act').show();
        jQuery.each(response.data.student, function(i) {
          var student_result ='<div class="media custom-media">'
          +'<a href="/student/'+response.data.student[i].slug+'" class="search-link">'
          +'<div class="media-left media-middle custom-media-left">'
          +'<div class="search-img-container">'
          +'<img src="http://firstsynchvideos.s3.amazonaws.com/'+response.data.student[i].profile_picture+'" class="logo-companies-box">'
          +'</div>'
          +'</div>'
          +'<div class="media-body custom-media-body">'
          +'<h4 class="media-heading custom-media-heading">'+response.data.student[i].first_name+'</h4>'
          +'<h5 class="media-eading-h5">'+(typeof response.data.student[i].city != "undefined"?response.data.student[i].city+'&bull; ':"")+(typeof response.data.student[i].state != "undefined"?response.data.student[i].state:"")+'</h5>'
          +'<div class="searech-folow pull-left">'
          +'<span class="group-followers"><span class="total-followers">'+(typeof response.data.student[i].viewed != "undefined"?response.data.student[i].viewed:"0")+'</span> Views</span>'
          +'<span class="group-followers"><span class="total-followers">'+(typeof response.data.student[i].liked != "undefined"?response.data.student[i].liked:"0")+'</span> Likes</span>'
          +'<span class="group-followers"><span class="total-followers">'+(typeof response.data.student[i].followers != "undefined"?response.data.student[i].followers:"0")+'</span> followers</span>'
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
        jQuery('.search_results_student_container_act').hide();
      }
      if(response.data.video){
        jQuery('.search_results_video_container_act').show();
        jQuery.each(response.data.video, function(i) {
          var video_result ='<div class="media custom-media">'
          +'<a href="#" ng-click="videoPopup('+response.data.video[i].id+')" class="search-link">'
          +'<div class="media-left media-middle custom-media-left">'
          +'<div class="search-img-container">'
          +'<img src="'+response.data.video[i].thumbnail+'" class="logo-companies-box">'
          +'</div>'
          +'</div>'
          +'<div class="media-body custom-media-body">'
          +'<h4 class="media-heading custom-media-heading">'+response.data.video[i].title+'</h4>'
          +'<h5 class="media-eading-h5"></h5>'
          +'<div class="searech-folow pull-left">'
          +'<span class="group-followers"><span class="total-followers">'+response.data.video[i].viewed+'</span> Views</span>'
          +'<span class="group-followers"><span class="total-followers">'+response.data.video[i].liked+'</span> Likes</span>'
          +'<span class="group-followers"><span class="total-followers">'+response.data.video[i].followers+'</span> followers</span>'
          +'</div>'
          +'</div>'
          +'</a>'
          +'<div>'
          +'</div>'
          +'</div>';
          angular.element(jQuery('.search_results_video_act')).append($compile(video_result)($scope));
        });
      }
      else{
        jQuery('.search_results_video_container_act').hide();
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
FirstSynch.directive('passwordVerify',passwordVerify);

function passwordVerify() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('passwordVerify', function(val) {
        validate();
      });

      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.passwordVerify;

        // set validity
        ngModel.$setValidity('passwordVerify', val1 === val2);
      };
    }
  }
}
////////////////add overlay class in random manner////////////////////
FirstSynch.filter('randomize', function() {
  return function(input, scope) {
    if (input!=null && input!=undefined && input > 1) {
      return Math.floor((Math.random()*input)+1);
    }
  }
});
///////////////URL MENU ACTIVE///////////////////
FirstSynch.directive('navMenu', function($location) {
  return function(scope, element, attrs) {
    var links = element.find('a'),
    currentLink,
    urlMap = {},
    activeClass = attrs.navMenu || 'active';

    for (var i = links.length - 1; i >= 0; i--) {
      var link = angular.element(links[i]);
      var url = link.attr('href');

      if (url.substring(0,1) === '#') {
        urlMap[url.substring(1)] = link;
      } else {
        urlMap[url] = link;
      }
    }
    scope.$on('$routeChangeStart', function() {
      var path = urlMap[$location.path()];
      links.parent('li').removeClass(activeClass);
      $('body').removeClass('body-career-fair-detail');

      if($location.path().indexOf("company/") > -1){
          $('.company_nav').addClass(activeClass);
          $('body').removeClass('body-career-fair-detail');
          $('.firstsynch_logo_act').attr("src","assets/images/firstsynch_logo_grey.png");
      } else if($location.path().indexOf("careerfair/") > -1){
          $('.carrer_nav').addClass(activeClass);
          $('body').addClass('body-career-fair-detail');
          $('.firstsynch_logo_act').attr("src","assets/images/firstsynch_logo_grey.png");
      } else if($location.path().indexOf("student/") > -1){
          $('.student_nav').addClass(activeClass);
          $('body').removeClass('body-career-fair-detail');
          $('.firstsynch_logo_act').attr("src","assets/images/firstsynch_logo_grey.png");
      } else {
          $('.firstsynch_logo_act').attr("src","assets/images/logo.png");

      }

      if($location.path().indexOf("companies") > 0){
          $('body').addClass('body-career-fair-detail');
          $('.firstsynch_logo_act').attr("src","assets/images/firstsynch_logo_grey.png");
      } else if($location.path().indexOf("students") > 0){
          $('body').addClass('body-career-fair-detail');
          $('.firstsynch_logo_act').attr("src","assets/images/firstsynch_logo_grey.png");
      } else if($location.path().indexOf("careerfair") > 0){
          $('.firstsynch_logo_act').attr("src","assets/images/firstsynch_logo_grey.png");
      } else if($location.path().indexOf("search") > 0){
          $('body').addClass('body-career-fair-detail');
          $('.firstsynch_logo_act').attr("src","assets/images/firstsynch_logo_grey.png");
      }

      if (path) {
        path.parent('li').addClass(activeClass);
        //Add body-career-fair-detail class in Body
        //var add_class_url = ['/companies', '/students', '/careerfair', '/search']
        //if (add_class_url.includes($location.path())) {
        //  $('body').addClass('body-career-fair-detail');
        //} else{
        //  $('body').removeClass('body-career-fair-detail');
        //}
      }

    });
  };
});

/////////Tab Navigation/////////////////////////////
FirstSynch.directive('scrollTo', function ($location, $anchorScroll) {
  return function(scope, element, attrs) {

    element.bind('click', function(event) {
      event.stopPropagation();
      var off = scope.$on('$locationChangeStart', function(ev) {
        off();
        ev.preventDefault();
      });
      var location = attrs.scrollTo;
      $location.hash(location);
      $anchorScroll();
    });

  };
});
//////////////Date Picker/////////////////////
FirstSynch.directive('datepicker', function () {
    return {
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    changeYear:true,
                    changeMonth:true,
                    dateFormat:'yy-mm-dd',
                    maxDate: new Date(),
                    yearRange: '1900:2050',
                    onSelect:function (dateText, inst) {
                        ngModelCtrl.$setViewValue(dateText);
                        scope.$apply();
                    }
                });
            });
        }
    }
});

//////////////Date Picker/////////////////////
FirstSynch.filter('truncate', function () {
  return function (input, chars, breakOnWord) {
    if (isNaN(chars)) return input;
    if (chars <= 0) return '';
    if (input && input.length > chars) {
      input = input.substring(0, chars);

      if (!breakOnWord) {
        var lastspace = input.lastIndexOf(' ');
        //get last space
        if (lastspace !== -1) {
          input = input.substr(0, lastspace);
        }
      }else{
        while(input.charAt(input.length-1) === ' '){
          input = input.substr(0, input.length -1);
        }
      }
      return input + '…';
    }
    return input;
  };
});
FirstSynch.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});
FirstSynch.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
