'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("careerFair", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

// career fair page - near by career fair
FirstSynch.controller("guest_career_fair_near_user" ,function ($timeout,$scope, $http,$routeParams,apiUrl,$rootScope) {
    $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?location="+$rootScope.current_state)
    .then(function successCallback(response){
        $scope.career_fair_near_current_user = response.data;
        $scope.guestfairNearfairLoaded = false;
        $timeout(function () {
            $scope.guestfairNearfairLoaded = true;
        });
        $scope.guestfairNearfairConfig = {
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
FirstSynch.controller("guest_upcoming_career_fair" ,function ($timeout,$window,$scope, $http,$routeParams,apiUrl) {
	$scope.visible = true;
    $scope.careerfairdata = true;
    $http.get(apiUrl+"api/v1/flat_pages/recent_career_fairs/?count=10")
    .then(function successCallback(response){
        $scope.upcoming_career = response.data;
        $scope.guestfairRecentfairLoaded = false;
        $timeout(function () {
            $scope.guestfairRecentfairLoaded = true;
        });
        $scope.guestfairRecentfairConfig = {
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
                $scope.careerfairdata = false;
            }
            else{
                $scope.careerfairdata = true;
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
FirstSynch.controller("all_career_fair_near_user" ,function ($rootScope,$scope, $http,$routeParams,apiUrl) {
    $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?location="+$rootScope.current_state)
    .then(function successCallback(response){
        $scope.all_career_fair_near_current_user = response.data;
    }, function errorCallback(response){
        console.log("Unable to perform get career fair near for current user");
    });
});
// career fair page - near by all career fair
FirstSynch.controller("all_career_fair_near_user_city" ,function ($scope, $http,$routeParams,apiUrl) {

    $http.get(apiUrl+"api/v1/career_fairs/api/v1/career_fair_city/")
    .then(function successCallback(response){
        $scope.all_career_fair_near_current_user_city = response.data;
    }, function errorCallback(response){
        console.log("Unable to perform get career fair near for current user");
    });

});
/////////////////////////////////// filters ////////////////////////////////////

FirstSynch.filter('unique', function() {
   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});



////////////////////////////////// Directives //////////////////////////////////////
FirstSynch.directive('upcomingMenu', function() {
    return {
      restrict: 'A',
      scope: {
        upcomingMenu: '='
      },
      link: function(scope, element) {
        // set the initial value
        var $el = $(element);
        scope.upcomingMenu = $el.find('li:first').text();

        // listen for changes
        $el.on('click', 'li', function() {
                scope.upcomingMenu = $(this).text();
                scope.$apply();
        });
      }
    };
  });

FirstSynch.directive('cityMenu', function() {
    return {
      restrict: 'A',
      scope: {
        cityMenu: '='
      },
      link: function(scope, element) {
        // set the initial value
        var $el = $(element);
        scope.cityMenu = $el.find('li:first').next().text();

        // listen for changes
        $el.on('click', 'li', function() {
            if($(this).text().length > 0){
                scope.cityMenu = $(this).text();
                scope.$apply();
            }
            $(this).parent().find('li > a').show();
            $(this).parent().find('li > input').val('');
        });
      }
    };
  });

FirstSynch.directive('companyMenu', function() {
    return {
      restrict: 'A',
      scope: {
        companyMenu: '='
      },
      link: function(scope, element) {
        // set the initial value
        var $el = $(element);
        scope.companyMenu = $el.find('li:first').next().text();

        // listen for changes
        $el.on('click', 'li', function() {
          if($(this).text().length > 0){
              scope.companyMenu = $(this).text();
              scope.$apply();
          }
          $(this).parent().find('li > a').show();
          $(this).parent().find('li > input').val('');
        });
      }
    };
  });
