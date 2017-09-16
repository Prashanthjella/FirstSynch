'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("StudentcareerFairDetail", ["ngRoute"]);

/////////////////////////////////// Controllors ////////////////////////////////////

// career fair details
FirstSynch.controller("student_careerfair_detail" ,function ($filter, $scope, $http,$routeParams,apiUrl,$rootScope,$timeout, $window, $compile) {
  $scope.student_careerfair_notfound = true;
  $scope.initCareerFairDetails=function(){
      $http.get(apiUrl+"api/v1/career_fairs/"+$routeParams.carredid+"/", {
            headers: {'Authorization' : 'Token '+$rootScope.token_id}
          })
          .then(function successCallback(response){
              $scope.careerfair_details = response.data;
              $scope.student_careerfair_notfound = true;
              $scope.availability_followup = false;
              $scope.todaydate = $filter('date')(new Date(), 'MM/dd/yy');
              $scope.careerfair_date = $filter('date')(response.data.start_time, 'MM/dd/yy');
              if ($scope.todaydate <= $scope.careerfair_date){
                $scope.request_follow_closed = true;
              }
              $.each(response.data.followed, function(i,obj) {
                  if(parseInt(obj) == parseInt($rootScope.user_id)){$scope.availability_followup = true;}
              });
          }, function errorCallback(response){
              $scope.student_careerfair_notfound = false;
              console.log("Unable to perform get career fair details");
      });
   };

  //Career Fair follow
  $scope.student_career_follow = function(careerid){
      $http.get(apiUrl+"api/v1/career_fairs/career_fair_follow/"+careerid+"/",{headers: {'Authorization' : 'Token '+$rootScope.token_id}})
          .then(function successCallback(response){
              $scope.initCareerFairDetails();
              $scope.availability_requested = true;
          }, function errorCallback(response){
              console.log("Unable to perform follow action");
      });
  };

  //Career Fair unfollow
  $scope.student_career_unfollow = function(careerid){
      $http.get(apiUrl+"api/v1/career_fairs/career_fair_unfollow/"+careerid+"/",{headers: {'Authorization' : 'Token '+$rootScope.token_id}})
          .then(function successCallback(response){
              $scope.initCareerFairDetails();
          }, function errorCallback(response){
              console.log("Unable to perform unfollow action");
      });
  };

  //Upload New Video Here
      $scope.getCareerFileDetails = function (e) {
          $scope.files = [];
          $scope.$apply(function () {

              // STORE THE FILE OBJECT IN AN ARRAY.
              for (var i = 0; i < e.files.length; i++) {
                  $scope.files.push(e.files[i])
              }
              $scope.progressVisible = false
          });
      };

      $scope.uploadFile = function() {
        $('.custom_fade').show();
        $('#video_end').show();
          var fd = new FormData()
          for (var i in $scope.files) {
              fd.append("video_file", $scope.files[i])
          }
          fd.append("title", angular.element('#title')[0].value);
          fd.append("student", $rootScope.student_id);
          fd.append("skill_text", angular.element('#skill_text')[0].value);
          fd.append("video_chapters", angular.element('#result')[0].value);
          fd.append("description", angular.element('#description')[0].value);
          fd.append("career_fair", angular.element('#careerfair_details_id')[0].value);
          fd.append("active", 'True');
          fd.append("student_video", 'True');
          fd.append("created_by", $rootScope.user_id);
          var pub_date = $("input[name='published']:checked").val();
          if (pub_date == null && pub_date == undefined){
            var pub_date = 'True';
          }
          fd.append("published", pub_date);
          var xhr = new XMLHttpRequest()
          xhr.upload.addEventListener("progress", uploadProgress, false)
          xhr.addEventListener("load", uploadComplete, false)
          xhr.open("POST", apiUrl+"api/v1/career_fairs/api/v1/video/")
          $scope.progressVisible = true
          xhr.send(fd)
      }

      function uploadProgress(evt) {
          $scope.$apply(function(){
              if (evt.lengthComputable) {
                  $scope.progress = Math.round(evt.loaded * 100 / evt.total)
              } else {
                  $scope.progress = 'unable to compute'
              }
          })
      }

      function uploadComplete(evt) {
          /* This event is raised when the server send back a response */
          $timeout( function(){
              /* This event is raised when the server send back a response */
              $('#page-video-edit').modal('hide');
              $('.after_video_process').hide();
              $('.before_video_process').show();
              $('.custom_fade').hide();
              $('#video_end').hide();
              $('#chapterss ul').empty();
              $("#chapter_maker_thumb").show();
              $("#question").show();
              $('.second_video_data').hide();
              $('.none').show();
              $('#btn-upload').hide();
              $("#inoutbar").removeAttr("style");
              $('#inoutbar').empty();
              $('#chapterss ul').empty();
              $('#page-video-edit form').trigger("reset");
                $http.get(apiUrl+"api/v1/career_fairs/careerfair_student_videos/"+$routeParams.carredid+"/")
                  .then(function successCallback(response){
                      $scope.cfdstudents = response.data;
                  }, function errorCallback(response){
                      console.log("Unable to perform get dbstudents");
                  });
         }, 60000 );
      }

      function uploadFailed(evt) {
          console("There was an error attempting to upload the file.")
      }

      function uploadCanceled(evt) {
          $scope.$apply(function(){
              $scope.progressVisible = false
          })
          console("The upload has been canceled by the user or the browser dropped the connection.")
      }
  //Upload Video End

  // home page - students - default
    $http.get(apiUrl+"api/v1/career_fairs/careerfair_student_videos/"+$routeParams.carredid+"/")
      .then(function successCallback(response){
          $scope.cfdstudents = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get dbstudents");
    });
  //  students - showall and lessall
  $scope.showall_studentsvideo = function(){
      $http.get(apiUrl+"api/v1/career_fairs/careerfair_student_videos/"+$routeParams.carredid+"/")
      .then(function successCallback(response){
        if(jQuery('.for_home_stu_less_all').is(":visible")){
          jQuery('.for_home_stu_less_all').slideUp(500);
          jQuery('.home_students_all_link').text('Less All');
          jQuery('.for_home_stu_show_all').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var students_showall =   '<div class="col-sm-4">'
                                        +'<a data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')"  href="#" class = "thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbnail-image-gallery">'
                                          +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="arrow-triangle"></span>'
                                        +'<span class="link-new">New</span>'
                                          +'<div class="box-inside-content">'
                                              +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title+'</h1>'
                                          +'</div>'
                                        +'</a> '
                                      +'</div>';

              angular.element(jQuery('.for_home_stu_show_all')).append($compile(students_showall)($scope));
          })
        }else{
            jQuery('.for_home_stu_show_all').slideUp(500);
            jQuery('.for_home_stu_less_all').slideDown(500);
            jQuery('.home_students_all_link').text('Show All');
        }
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo showall");
    });
  }

});

// students
FirstSynch.controller("student_cfdstudents" , function ($scope, $http, apiUrl, $compile, $routeParams) {
  // home page - students - default
    $http.get(apiUrl+"api/v1/career_fairs/careerfair_student_videos/"+$routeParams.carredid+"/")
      .then(function successCallback(response){
          $scope.cfdstudents = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get dbstudents");
  });
  //  students - showall and lessall
  $scope.showall_studentsvideo = function(){
      $http.get(apiUrl+"api/v1/career_fairs/careerfair_student_videos/"+$routeParams.carredid+"/")
      .then(function successCallback(response){
        if(jQuery('.for_home_stu_less_all').is(":visible")){
          jQuery('.for_home_stu_less_all').slideUp(500);
          jQuery('.home_students_all_link').text('Less All');
          jQuery('.for_home_stu_show_all').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var students_showall =   '<div class="col-sm-4">'
                                        +'<a data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')"  href="#" class = "thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbnail-image-gallery">'
                                          +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="arrow-triangle"></span>'
                                        +'<span class="link-new">New</span>'
                                          +'<div class="box-inside-content">'
                                              +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title+'</h1>'
                                          +'</div>'
                                        +'</a> '
                                      +'</div>';

              angular.element(jQuery('.for_home_stu_show_all')).append($compile(students_showall)($scope));
          })
        }else{
            jQuery('.for_home_stu_show_all').slideUp(500);
            jQuery('.for_home_stu_less_all').slideDown(500);
            jQuery('.home_students_all_link').text('Show All');
        }
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo showall");
    });
  }

});

// company
FirstSynch.controller("student_cfdcompany" , function ($scope, $http, apiUrl, $compile, $routeParams) {
 // company - default
  $http.get(apiUrl+"api/v1/career_fairs/careerfair_company_videos/"+$routeParams.carredid+"/")
      .then(function successCallback(response){
          $scope.cfdcompany = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get dbcompany");
  });
  // company - show all and less all
  $scope.showall_companyvideo = function(){
    $http.get(apiUrl+"api/v1/career_fairs/careerfair_company_videos/"+$routeParams.carredid+"/")
      .then(function successCallback(response){
        if(jQuery('.for_home_com_less_all').is(":visible")){
          jQuery('.for_home_com_less_all').slideUp(500);
          jQuery('.home_company_all_link').text('Less All');
          jQuery('.for_home_com_show_all').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var company_showall =   '<div class="col-sm-4">'
                                      +'<a href="#" data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')"  class = "thumbnail  customn-thumbs-color-{{10 | randomize}} custom-thumbnail-image-gallery">'
                                        +'<img src="'+response.data[i].thumbnail+'" class="img-responsive custom-img-responsive">'
                                        +'<div class="overlay "></div>'
                                        +'<span class="arrow-triangle"></span>'
                                        +'<span class="link-new">New</span>'
                                        +'<div class="box-inside-content">'
                                            +'<span class="logo-companies">'
                                              +'<img src="'+response.data[i].company.logo+'" class="img-responsive">'
                                            +'</span>'
                                              +'<h6 class="h6 custom-h6">'+response.data[i].company.name+'</h6>'
                                              +'<h1 class="h1 custom-gallery-h1">'+response.data[i].title+'</h1>'
                                        +'</div>'
                                      +'</a>'
                                    +'</div>';
              angular.element(jQuery('.for_home_com_show_all')).append($compile(company_showall)($scope));
          })
        }else{
            jQuery('.for_home_com_show_all').slideUp(500);
            jQuery('.for_home_com_less_all').slideDown(500);
            jQuery('.home_company_all_link').text('Show All');
        }
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo showall");
    });
  }
});

// near by career fair
FirstSynch.controller("student_near_by_career_fair" ,function ($rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl, $compile) {

  $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?location="+$rootScope.current_city+"&count=10")
      .then(function successCallback(response){
          $scope.near_by_career = response.data;
          window.scrollTo(0, 0);
      }, function errorCallback(response){
          console.log("Unable to perform get upcoming near by career");
  });

  // near by career - show all and less all
  $scope.showall_near_by_career = function(){
    $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?location="+$rootScope.current_city+"&count=10")
      .then(function successCallback(response){
        if(jQuery('.for_cfd_nc_less_all').is(":visible")){
          jQuery('.for_cfd_nc_less_all').slideUp(500);
          jQuery('.cfd_nc_all_link').text('Less All');
          jQuery('.for_cfd_nc_show_all').slideDown(500).empty();
          jQuery.each(response.data, function(i) {
            var company_showall =   '<div class="col-sm-4">'
                                      +'<a href="/careerfair/'+response.data[i].id+'" style="color:#fff;">'
                                      +'<div class="thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbnail-image-gallery"> <img src="'+response.data[i].image+'">'
                                        +'<div class="overlay"></div>'
                                        +'<div class="box-inside-content">'
                                         +' <p class="date-location">'+response.data[i].start_date+'<span> •</span> '+response.data[i].city+', '+response.data[i].state+'</p>'
                                          +'<h1 class="custom-gallery-h1">'+response.data[i].title+'</h1>'
                                        +'</div>'
                                      +'</div>'
                                      +'</a>'
                                    +'</div>';
            angular.element(jQuery('.for_cfd_nc_show_all')).append($compile(company_showall)($scope));
          })
        }else{
            jQuery('.for_cfd_nc_show_all').slideUp(500);
            jQuery('.for_cfd_nc_less_all').slideDown(500);
            jQuery('.cfd_nc_all_link').text('Show All');
        }
      }, function errorCallback(response){
          console.log("Unable to perform get featurevideo showall");
    });
  }
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );

  });
});
/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
