'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CompanycareerFair", ["ngRoute"]);


/////////////////////////////////// Controllors ////////////////////////////////////

// career fair page - near by career fair
FirstSynch.controller("company_career_fair_near_user" ,function ($timeout,$rootScope,$scope, $http,$routeParams,apiUrl) {

    $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?location="+$rootScope.current_state+"&count=10")
    .then(function successCallback(response){
        $scope.career_fair_near_current_user = response.data;
        $scope.companyfairNearfairLoaded = false;
        $timeout(function () {
            $scope.companyfairNearfairLoaded = true;
        });
        $scope.companyfairNearfairConfig = {
            dots:true,
            enabled: true,
            autoplay: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow :'<a class="bx-prev" href=""></a>',
            nextArrow : '<a class="bx-next" href=""></a>',
            method: {}
          };
    }, function errorCallback(response){
        console.log("Unable to perform get career fair near for current user");
    });

});

// career fair page - near by career fair
FirstSynch.controller("company_upcoming_career_fair" ,function ($window,$scope, $http,$routeParams,apiUrl,$timeout) {
    $scope.visible = true;
    $scope.careerfairdatac = true;
  $http.get(apiUrl+"api/v1/flat_pages/recent_career_fairs/?count=10")
      .then(function successCallback(response){
          $scope.upcoming_career = response.data;
          $scope.companyfairRecentfairLoaded = false;
          $timeout(function () {
              $scope.companyfairRecentfairLoaded = true;
          });
          $scope.companyfairRecentfairConfig = {
              enabled: true,
              autoplay: false,
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 2,
              prevArrow :'<a class="bx-prev" href=""></a>',
              nextArrow : '<a class="bx-next" href=""></a>',
              method: {}
            };
      }, function errorCallback(response){
          console.log("Unable to perform get upcoming career fair");
  });

  $scope.careerfair_filters = function(obj){

    	obj.currentTarget.parentElement.parentElement.childNodes[1].attributes.dataupcomingval.value = obj.currentTarget.attributes.datavalue.value;
    	var upcoming_data = $('#upcoming').attr('dataupcomingval');
    	var city_data = $('#all_cer_city').attr('dataupcomingval');
    	var company_data = $('#all_cer_company').attr('dataupcomingval');
    	var query_string = '';
    	if(upcoming_data != ''){
    		query_string += 'when='+upcoming_data;
    	}
    	if(city_data != ''){
    		query_string += '&city='+city_data;
    	}
    	if(company_data != ''){
    		query_string += '&company='+company_data;
    	}

 		$http.get(apiUrl+"api/v1/flat_pages/recent_career_fairs/?"+query_string)
	    .then(function successCallback(response){
	    	$scope.visible = false;
	        $scope.upcoming_career = response.data;
            if(response.data.length <= 0){
                $scope.careerfairdatac = false;
            }
            else{
                $scope.careerfairdatac = true;
            }
	        $timeout(function() {
      			$scope.visible = true;
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

// career fair page - near by all career fair
FirstSynch.controller("company_all_career_fair_near_user" ,function ($rootScope,$scope, $http,$routeParams,apiUrl) {

    $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?location="+$rootScope.current_state)
    .then(function successCallback(response){
        $scope.all_career_fair_near_current_user = response.data;
    }, function errorCallback(response){
        console.log("Unable to perform get career fair near for current user");
    });

});
/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
