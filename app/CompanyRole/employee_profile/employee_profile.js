'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CemployeeProfile", ["ngRoute","ngFileUpload"]);

/////////////////////////////////// controllers ////////////////////////////////////

// student details
FirstSynch.controller("company_employee_profile" ,function ($rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl) {
  $scope.basicprofileform = {
    id:"",
    user:""
  };
  $scope.hobbiesform = {
    id:""
  };
  $scope.characteristic = {
    id:""
  };
  $scope.looking = {
    id:""
  };
  $scope.leadershipform = {
    id:""
  };
  $scope.educationform = {
    id:""
  };
  $scope.workhistroyform = {
    id:""
  };
  $scope.projectsform = {
    id:""
  };
  $scope.skillsetpersonnalform = {
    id:""
  };
  $scope.skillsetsoftwareform = {
    id:""
  };
  $scope.skillsetprofessionalform = {
    id:""
  };


  $http.get(apiUrl+"api/v1/employee/api/v1/get_employee_profile/"+$routeParams.profileid+"/",{
    headers: {'Authorization' : 'Token '+$rootScope.token_id}
  }).then(function successCallback(response){
    $scope.employee_profile_details = response.data;
    $scope.basicprofileform.id = response.data.id;
    $scope.hobbiesform.id = response.data.id;
    $scope.characteristic.id = response.data.id;
    $scope.looking.id = response.data.id;
    $scope.leadershipform.id = response.data.id;
    $scope.educationform.id = response.data.id;
    $scope.workhistroyform.id = response.data.id;
    $scope.projectsform.id = response.data.id;
    $scope.skillsetpersonnalform.id = response.data.id;
    $scope.skillsetsoftwareform.id = response.data.id;
    $scope.skillsetprofessionalform.id = response.data.id;
    $scope.basicprofileform.user = response.data.user;
  }, function errorCallback(response){
    console.log("Unable to perform get student profile details");
  });
  $scope.$watch('$viewContentLoaded', function(){
    $timeout( function(){
      $window.loading_screen.finish();
    }, 3000 );
  });

});
FirstSynch.controller("employeeprofileform" ,function (Upload,$rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl) {
  $scope.basicprofilesubmit = function(file){
    //var pro_image = new FormData();
    //for (var i in $scope.files) {
    //    pro_image.append("profile_picture", $scope.files[i]);
    //}
    var data = {
      user:$scope.basicprofileform.user,
      first_name : $scope.basicprofileform.first_name,
      last_name: $scope.basicprofileform.last_name,
      dob: $scope.basicprofileform.dob,
      gender: $scope.basicprofileform.gender,
      category: $scope.basicprofileform.category,
      facebook_url: $scope.basicprofileform.facebook_url,
      linkedin_url: $scope.basicprofileform.linkedin_url,
      twitter_url: $scope.basicprofileform.twitter_url,
      website: $scope.basicprofileform.website,
      github_url:$scope.basicprofileform.github_url,
      stackoverflow_url:$scope.basicprofileform.stackoverflow_url,
      about_me:$scope.basicprofileform.about_me

    };
    file.upload = Upload.upload({
      url: apiUrl+"api/v1/employee/api/v1/employeeprofile/"+$scope.basicprofileform.id+"/",
      data: {user:$scope.basicprofileform.user,profile_picture: file},
      method:'PUT',
    });
    //alert(JSON.stringify(data));
    $http.patch(apiUrl+"api/v1/employee/api/v1/employeeprofile/"+$scope.basicprofileform.id+"/",data)
    .then(function (response) {
      $('#student_profile_basic_information').fadeOut();
      $scope.employee_profile_details.profile_picture = response.data.profile_picture;
      $scope.employee_profile_details.first_name = response.data.first_name;
      $scope.employee_profile_details.last_name = response.data.last_name;
      $scope.employee_profile_details.about_me = response.data.about_me;
      $scope.employee_profile_details.facebook_url = response.data.facebook_url;
      $scope.employee_profile_details.linkedin_url = response.data.linkedin_url;
      $scope.employee_profile_details.twitter_url = response.data.twitter_url;
      $scope.employee_profile_details.stackoverflow_url = response.data.stackoverflow_url;
      $scope.employee_profile_details.github_url = response.data.github_url;
      $scope.employee_profile_details.website = response.data.website;
    });
  };
  $scope.hobbiessubmit = function(hobbiesimage){

    var hobbyupload = Upload.upload({
      url: apiUrl+"api/v1/employee/api/v1/hobbyinfo/",
      data: {employee:$scope.hobbiesform.id,image: hobbiesimage,name:$scope.hobbiesform.name},
      method:'POST',
    });
    hobbyupload.then(function(resp) {
      // file is uploaded successfully
      $('#student_profile_hobbies').fadeOut();
      $http.get(apiUrl+"api/v1/employee/api/v1/get_employee_profile/"+$routeParams.profileid+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
        $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
        console.log("Unable to perform get employee profile details");
      });
      //   $scope.student_profile_details.hobby = resp.data;
    }, function(resp) {
      // handle error
    }, function(evt) {
      // progress notify
    });
  };
  // $scope.pselectedCharacter = {};
  //
  // $scope.charactersubmit = function(){
  //     $scope.selectchar = [];
  //     angular.forEach($scope.pselectedCharacter, function (selected, characters) {
  //         if (selected) {
  //             $scope.selectchar.push({student:$scope.characteristic.id,character:characters});
  //
  //         }
  //     });
  //     //alert(JSON.stringify($scope.selectchar));
  //
  //     $http.post(apiUrl+"api/v1/student/api/v1/studentcharacteristic/",JSON.stringify($scope.selectchar))
  //     .then(function (response) {
  //         $('#student_profile_characteristics').fadeOut();
  //         $scope.student_profile_details.student_characteristic=$scope.student_profile_details.student_characteristic.concat(response.data);
  //     });
  // };
  // $scope.pwhatiamlooking = {};
  //
  // $scope.whatiamlooksubmit = function(){
  //     $scope.selectlook = [];
  //     angular.forEach($scope.pwhatiamlooking, function (selected, lookgin) {
  //         if (selected) {
  //             $scope.selectlook.push({student:$scope.looking.id,whatimlooking:lookgin});
  //
  //         }
  //     });
  //     // alert(JSON.stringify($scope.selectlook));
  //
  //     $http.post(apiUrl+"api/v1/student/api/v1/whatiamlooking/",JSON.stringify($scope.selectlook))
  //     .then(function (response) {
  //         $('#student_profile_whatiamlooking').fadeOut();
  //         $scope.student_profile_details.whatimlooking=$scope.student_profile_details.whatimlooking.concat(response.data);
  //     });
  // };
  $scope.personnalskillsubmit = function(){
    var personnal_skill_data = {
      employee : $scope.skillsetpersonnalform.id,
      skill_type: 'Personal',
      name : $scope.skillsetpersonnalform.name,
      rating : $scope.skillsetpersonnalform.rating
    }
    //alert(JSON.stringify(personnal_skill_data));
    $http.post(apiUrl+"api/v1/employee/api/v1/skillinfo/",JSON.stringify(personnal_skill_data))
    .then(function (response) {
      $('#student_profile_personnal').fadeOut();
      $scope.employee_profile_details.skill=$scope.employee_profile_details.skill.concat(response.data);
      $http.get(apiUrl+"api/v1/employee/api/v1/get_employee_profile/"+$routeParams.profileid+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
        $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
        console.log("Unable to perform get employee profile details");
      });

    });
  };
  $scope.professionalskillsubmit = function(){
    var professional_skill_data = {
      employee : $scope.skillsetprofessionalform.id,
      skill_type : 'Professional',
      name : $scope.skillsetprofessionalform.name,
      rating : $scope.skillsetprofessionalform.rating
    }
    //alert(JSON.stringify(personnal_skill_data));
    $http.post(apiUrl+"api/v1/employee/api/v1/skillinfo/",JSON.stringify(professional_skill_data))
    .then(function (response) {
      $('#student_profile_professional').fadeOut();
      $scope.employee_profile_details.skill=$scope.employee_profile_details.skill.concat(response.data);
      $http.get(apiUrl+"api/v1/employee/api/v1/get_employee_profile/"+$routeParams.profileid+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
        $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
        console.log("Unable to perform get employee profile details");
      });

    });
  };
  $scope.softwareskillsubmit = function(){
    var software_skill_data = {
      employee : $scope.skillsetsoftwareform.id,
      skill_type : 'Software',
      name : $scope.skillsetsoftwareform.name,
      rating : $scope.skillsetsoftwareform.rating,
    }
    // alert(JSON.stringify(software_skill_data));
    $http.post(apiUrl+"api/v1/employee/api/v1/skillinfo/",JSON.stringify(software_skill_data))
    .then(function (response) {
      $('#student_profile_software').fadeOut();
      $scope.employee_profile_details.skill=$scope.employee_profile_details.skill.concat(response.data);
      $http.get(apiUrl+"api/v1/employee/api/v1/get_employee_profile/"+$routeParams.profileid+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
        $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
        console.log("Unable to perform get employee profile details");
      });

    });
  };
  $scope.workhistroyformsubmit = function(){
    var workhistroy_data = {
      employee : $scope.workhistroyform.id,
      company : $scope.workhistroyform.company,
      start_date : $scope.workhistroyform.start_date,
      leave_date : $scope.workhistroyform.leave_date,
      job_title : $scope.workhistroyform.job_title,
      job_description : $scope.workhistroyform.job_description
    }
    // alert(JSON.stringify(workhistroy_data));
    $http.post(apiUrl+"api/v1/employee/api/v1/experiencedetails/",workhistroy_data)
    .then(function (response) {
      $('#student_profile_histroy').fadeOut();
      $scope.employee_profile_details.experience=$scope.employee_profile_details.experience.concat(response.data);
      $http.get(apiUrl+"api/v1/employee/api/v1/get_employee_profile/"+$routeParams.profileid+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
        $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
        console.log("Unable to perform get employee profile details");
      });

    });
  };
  $scope.projectsubmit = function(projectimage){

    var projectupload = Upload.upload({
      url: apiUrl+"api/v1/employee/api/v1/projectdetails/",
      data: { employee : $scope.projectsform.id,title : $scope.projectsform.title,start_date : $scope.projectsform.start_date,completation_date : $scope.projectsform.completation_date,project_description : $scope.projectsform.project_description,image:projectimage},
      method:'POST',
    });
    projectupload.then(function(resp) {
      // file is uploaded successfully
      $('#student_profile_projects').fadeOut();
      $scope.employee_profile_details.project=$scope.employee_profile_details.project.concat(response.data);
      $http.get(apiUrl+"api/v1/employee/api/v1/get_employee_profile/"+$routeParams.profileid+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
        $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
        console.log("Unable to perform get employee profile details");
      });

    }, function(resp) {
    }, function(evt) {
    });
  };
  $scope.educationsubmit = function(){
    var education_data = {
      employee : $scope.educationform.id,
      school_name : $('#university-name').val(),
      year_started : $scope.educationform.year_started,
      year_graduated : $scope.educationform.year_graduated,
      major : $scope.educationform.major,
      gpa : $scope.educationform.gpa,
      gpa_rating : $scope.educationform.gpa_rating
    }
    //alert(JSON.stringify(education_data));
    $http.post(apiUrl+"api/v1/employee/api/v1/educationdetails/",JSON.stringify(education_data))
    .then(function (response) {
      $('#student_profile_myschool').fadeOut();
      $scope.employee_profile_details.education=$scope.employee_profile_details.education.concat(response.data);
      $http.get(apiUrl+"api/v1/employee/api/v1/get_employee_profile/"+$routeParams.profileid+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
        $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
        console.log("Unable to perform get employee profile details");
      });

    });
  };
  $scope.leadershipsubmit = function(){
    var leadership_data = {
      employee : $scope.leadershipform.id,
      leadership_role : $scope.leadershipform.leadership_role,
      description : $scope.leadershipform.description
    }
    //alert(JSON.stringify(education_data));
    $http.post(apiUrl+"api/v1/employee/api/v1/leadershipdetails/",JSON.stringify(leadership_data))
    .then(function (response) {
      $('#student_profile_leadership').fadeOut();
      $scope.employee_profile_details.leadship_role=$scope.employee_profile_details.leadship_role.concat(response.data);
      $http.get(apiUrl+"api/v1/employee/api/v1/get_employee_profile/"+$routeParams.profileid+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
      }).then(function successCallback(response){
        $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
        console.log("Unable to perform get employee profile details");
      });

    });
  };
});
