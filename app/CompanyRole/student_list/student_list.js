'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CStudentList", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

//student page - top 3 details
FirstSynch.controller("company_top_three_students" ,function ($timeout,$window,$scope,$compile, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/toplist/top3students/")
      .then(function successCallback(response){
          $scope.top_three_student = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });
  $http.get(apiUrl+"api/v1/student/api/v1/student_major_list/")
      .then(function successCallback(response){
          $scope.student_indus_list = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get student_city_list");
  });
  $http.get(apiUrl+"api/v1/student/api/v1/student_univeristy_list/")
      .then(function successCallback(response){
          $scope.student_univ_list = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get student_city_list");
  });
  $http.get(apiUrl+"api/v1/student/api/v1/student_city_list/")
      .then(function successCallback(response){
          $scope.student_city_list = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get student_city_list");
  });
  $scope.student_filters = function(obj){
    obj.currentTarget.parentElement.parentElement.childNodes[1].attributes.datastudentval.value = obj.currentTarget.attributes.datavalue.value;
	var city_data = $('#all_stu_city').attr('datastudentval');
    var univ_data = $('#all_stu_univ').attr('datastudentval');
	var major_data = $('#all_stu_major').attr('datastudentval');
	var query_string = '';
	if(city_data != ''){
		query_string += 'city='+city_data;
	}
    if(univ_data != ''){
		query_string += '&school='+univ_data;
	}
	if(major_data != ''){
		query_string += '&major='+major_data;
	}

    $('.top_three_student_act').hide();
    $('.student_act_categ').hide();
    $('.all_studeent_act').hide();
    $('.student_search_result').empty();
    $('.video_filter_search_result_empty').addClass('hide');
    $http.get(apiUrl+"api/v1/student/api/v1/student_filters/?"+query_string)
    .then(function successCallback(response){
        if(!response.data.length){
            $('.video_filter_search_result_empty').removeClass('hide');
            $('#stud_count').text(response.data.length+" Students");
        }
       jQuery.each(response.data, function(i) {
           var city = ''
           if(response.data[i].city  == null || response.data[i].city == '' || typeof response.data[i].city == "undefined"){
               city = '';
           }
           else{
               city = response.data[i].city;
           }
           var state = ''
           if(response.data[i].state  == null || response.data[i].state == '' || typeof response.data[i].state == "undefined"){
               state = '';
           }
           else{
               state = ','+response.data[i].state;
           }
           var aboutme = ''
           if(response.data[i].about_me  == null || response.data[i].about_me == '' || typeof response.data[i].about_me == "undefined"){
               aboutme = '';
           }
           else{
               aboutme = response.data[i].state;
           }
        var search_result = '<a href="/student/'+response.data[i].id+'">'
                            +'<div class="grid-item col-sm-4">'
                            +'<div class="thumbnail custom-thumbnail-company-visit-gallery">'
                                +'<div class="media custom-media-company-gallery">'
                                    +'<div class="media-left media-middle custom-media-left">'
                                        +'<img class="media-object custom-media-object" src="'+(response.data[i].profile_picture != null?response.data[i].profile_picture:"assets/images/profileicon.png")+'" alt="Student Profile Image">'
                                    +'</div>'
                                    +'<div class="media-body">'
                                        +'<h4 class="media-heading">'+response.data[i].first_name+'</h4>'
                                        +'<h5 class="media-eading-h5">'+city+''+state+'</h5>'
                                    +'</div>'
                                    +'<div> </div>'
                                +'</div>'
                                +'<p class="para-company">'+aboutme+'</p>'
                                +'<div class="row custom-row-5">'
                                +'</div>'
                            +'</div></a>';
        angular.element(jQuery('.student_search_result')).append($compile(search_result)($scope));
        $('#stud_count').text(response.data.length+" Students");
       });
    }, function errorCallback(response){
        console.log("Unable to perform get upcoming career fair");
    });
  };
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );
  });

});


//studnet page - All studetns
FirstSynch.controller("company_all_studentss" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/student/api/v1/student_list/")
      .then(function successCallback(response){
          $scope.all_student = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform student all");
  });

});
/////////////////////////////////// filters ////////////////////////////////////

//student page - student category
FirstSynch.controller("company_student_category" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/student/api/v1/student_categories/")
      .then(function successCallback(response){
          $scope.student_cate = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get student details as category wise");
  });

});/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
