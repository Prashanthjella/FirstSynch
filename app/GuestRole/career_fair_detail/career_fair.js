'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("careerFairDetail", ["ngRoute"]);

/////////////////////////////////// Controllors ////////////////////////////////////

// career fair details
FirstSynch.controller("careerfair_detail" ,function ($filter, $scope, guest_token, $http,$routeParams,apiUrl) {
  $scope.guest_careerfair_notfound = true;
  $http.get(apiUrl+"api/v1/career_fairs/"+$routeParams.carredid+"/", {
        headers: {'Authorization' : 'Token '+guest_token}
      })
      .then(function successCallback(response){
          $scope.careerfair_details = response.data;
          $scope.guest_careerfair_notfound = true;
          $scope.todaydate = $filter('date')(new Date(), 'MM/dd/yy');
          $scope.careerfair_date = $filter('date')(response.data.start_time, 'MM/dd/yy');
          if ($scope.todaydate <= $scope.careerfair_date){
            $scope.request_follow_closed = true;
          }
          window.scrollTo(0, 0);
      }, function errorCallback(response){
          $scope.guest_careerfair_notfound = false;
  });

});

// students
FirstSynch.controller("cfdstudents" , function ($scope, $http, apiUrl, $compile, $routeParams) {
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
FirstSynch.controller("cfdcompany" , function ($scope, $http, apiUrl, $compile, $routeParams) {
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
                                      +'<a href="#" data-id="'+response.data[i].id+'" ng-click="videoPopup('+response.data[i].id+')"  class = "thumbnail customn-thumbs-color-{{10 | randomize}} custom-thumbnail-image-gallery">'
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
FirstSynch.controller("near_by_career_fair" ,function ($rootScope,$scope, $timeout,$http,$routeParams,apiUrl,$window,$compile) {

  $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?location="+$rootScope.current_state+"&count=10")
      .then(function successCallback(response){
          $scope.near_by_career = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get upcoming near by career");
  });

  // near by career - show all and less all
  $scope.showall_near_by_career = function(){
    $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?location="+$rootScope.current_state+"&count=10")
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
                                         +' <p class="date-location">'+moment(response.data[i].start_time).format("MMM, d, YYYY")+'<span> •</span> '+response.data[i].city+', '+response.data[i].state+'</p>'
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
/////////////////////////////////// Career fair participating companies list ////////////////////////////////////
FirstSynch.controller("fairparicipation" , function ($scope, $http, apiUrl, $compile, $routeParams) {

  $http.get(apiUrl+"api/v1/careerfairparticipation/companies_participated/"+$routeParams.carredid+"/")
      .then(function successCallback(response){
          $scope.participatingcompanies = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get participating companies list");
  });

  $scope.fairCompanyPopup = function(fair){
    jQuery("#fairparticipatedcompanypopup").modal('show');
    $http.get(apiUrl+"api/v1/careerfairparticipation/api/v1/fairparticipatecompanies/"+fair+"/")
        .then(function successCallback(response){
            $scope.faircompanydetails = response.data;
            if (response.data.video){
              jwplayer("careerfairjwplayer").setup({
                playlist: [{
                  image: response.data.video.thumbnail,
                  sources: [
                    {file: response.data.video.mp4_video},
                  ],
                  tracks: [{
                    file:response.data.video.vtt_file,
                    kind:'chapters'
                  }],
                }],
              });
              //jwplayer("jwplayer").play();
               jwplayer("careerfairjwplayer").getRenderingMode();
            }
            $('#fairparticipatedcompanypopup .video_loader_bk').fadeOut();
            setTimeout(function(){ jQuery("body").addClass('modal-open'); }, 3000);
        }, function errorCallback(response){
            console.log("Unable to perform get participating companies details");
    });
  }

});



////////////////////////////////// Directives //////////////////////////////////////
