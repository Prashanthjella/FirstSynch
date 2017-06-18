'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("StudentList", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

//student page - top 3 details
FirstSynch.controller("top_three_students" ,function ($scope,$compile, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/toplist/top3students/")
      .then(function successCallback(response){
          $scope.top_three_student = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 student details");
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
    $http.get(apiUrl+"api/v1/student/api/v1/student_filters/?"+query_string)
    .then(function successCallback(response){

       jQuery.each(response.data, function(i) {
        var search_result = '<a href="/student/'+response.data[i].id+'">'
        					+'<div class="grid-item col-sm-4">'
                            +'<div class="thumbnail custom-thumbnail-company-visit-gallery">'
                                +'<div class="media custom-media-company-gallery">'
                                    +'<div class="media-left media-middle custom-media-left">'
                                        +'<img class="media-object custom-media-object" src="'+response.data[i].profile_picture+'" alt="forester-logo.jpg">'
                                    +'</div>'
                                    +'<div class="media-body">'
                                        +'<h4 class="media-heading">'+response.data[i].first_name+'</h4>'
                                        +'<h5 class="media-eading-h5">'+response.data[i].city+', '+response.data[i].state+'</h5>'
                                    +'</div>'
                                    +'<div> </div>'
                                +'</div>'
                                +'<p class="para-company">'+response.data[i].about_me+'</p>'
                                +'<div class="row custom-row-5">'
                                +'</div>'
                            +'</div></a>';
        angular.element(jQuery('.student_search_result')).append($compile(search_result)($scope));
       });
    }, function errorCallback(response){
        console.log("Unable to perform get upcoming career fair");
    });
  };

});

//studnet page - All studetns
FirstSynch.controller("all_studentss" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/student/api/v1/student_list/")
      .then(function successCallback(response){
          $scope.all_student = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform student all");
  });

});
/////////////////////////////////// filters ////////////////////////////////////

//student page - student category
FirstSynch.controller("student_category" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/student/api/v1/student_categories/")
      .then(function successCallback(response){
          $scope.student_cate = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get student details as category wise");
  });

});

////////////////////////////////// Directives //////////////////////////////////////
FirstSynch.directive('univMenu', function() {
    return {
      restrict: 'A',
      scope: {
        univMenu: '='
      },
      link: function(scope, element) {
        // set the initial value
        var $el = $(element);
        scope.univMenu = $el.find('li:first').text();

        // listen for changes
        $el.on('click', 'li', function() {
          scope.univMenu = $(this).text();
          scope.$apply();
        });
      }
    };
  });
  FirstSynch.directive('majorMenu', function() {
      return {
        restrict: 'A',
        scope: {
          majorMenu: '='
        },
        link: function(scope, element) {
          // set the initial value
          var $el = $(element);
          scope.majorMenu = $el.find('li:first').text();

          // listen for changes
          $el.on('click', 'li', function() {
            scope.majorMenu = $(this).text();
            scope.$apply();
          });
        }
      };
    });
