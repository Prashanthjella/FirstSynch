'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("SstudentProfile", ["ngRoute","ngFileUpload"]);

/////////////////////////////////// controllers ////////////////////////////////////

// student details
FirstSynch.controller("student_student_profile" ,function ($timeout,$window,$scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/student/api/v1/student_profile/"+$routeParams.studentid+"/")
      .then(function successCallback(response){
          $scope.student_profile_details = response.data;
          jwplayer("jwplayerforprofile").setup({
            "file": response.data.video,
            "primary": 'flash'
          });
      }, function errorCallback(response){
          console.log("Unable to perform get student profile details");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );
  });

});
FirstSynch.controller("companyprofileform" ,function (Upload,$rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl) {
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
            url: apiUrl+"api/v1/student/api/v1/studentprofile/"+$scope.basicprofileform.id+"/",
            data: {user:$scope.basicprofileform.user,profile_picture: file},
            method:'PUT',
        });
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/student/api/v1/studentprofile/"+$scope.basicprofileform.id+"/",data)
        .then(function (response) {
            $scope.basicprofilemessage = 'Successfully updated';
        });
    };
    $scope.hobbiessubmit = function(){
        var hobbies_data = {
            name : $scope.hobbiesform.name,
            student : $scope.hobbiesform.stud_id
        }
        //alert(JSON.stringify(hobbies_data));
        $http.post(apiUrl+"api/v1/student/api/v1/hobbyinfo/",JSON.stringify(hobbies_data))
        .then(function (response) {
            $scope.hobbiesmessage = 'Successfully updated';
            $scope.hobbiesform.splice(0, 0, response.data);
            $scope.hobbiesform.name = "";
        });
    };
    $scope.selectedCharacter = {};

    $scope.charactersubmit = function(){
        $scope.selectchar = [];
        angular.forEach($scope.selectedCharacter, function (selected, characters) {
            if (selected) {
                $scope.selectchar.push({student:$rootScope.stud_id,character:characters});

            }
        });
        //alert(JSON.stringify($scope.selectchar));

        $http.post(apiUrl+"api/v1/student/api/v1/studentcharacteristic/",JSON.stringify($scope.selectchar))
        .then(function (response) {
            $scope.charactermessage = 'Successfully updated';
        });
    };
    $scope.personnalskillsubmit = function(){
        var personnal_skill_data = {
            student : $scope.skillsetpersonnalform.student,
            skill_type : $scope.skillsetpersonnalform.skill_type,
            name : $scope.skillsetpersonnalform.name,
            rating : $scope.skillsetpersonnalform.rating
        }
        //alert(JSON.stringify(personnal_skill_data));
        $http.post(apiUrl+"api/v1/student/api/v1/skillinfo/",JSON.stringify(personnal_skill_data))
        .then(function (response) {
            $scope.personnalskillmessage = 'Successfully updated';
            $scope.skillsetpersonnalform.splice(0, 0, response.data);
            $scope.skillsetpersonnalform.name = "";
            $scope.skillsetpersonnalform.rating = "";
        });
    };
    $scope.professionalskillsubmit = function(){
        var professional_skill_data = {
            student : $scope.skillsetprofessionalform.student,
            skill_type : $scope.skillsetprofessionalform.skill_type,
            name : $scope.skillsetprofessionalform.name,
            rating : $scope.skillsetprofessionalform.rating
        }
        //alert(JSON.stringify(personnal_skill_data));
        $http.post(apiUrl+"api/v1/student/api/v1/skillinfo/",JSON.stringify(professional_skill_data))
        .then(function (response) {
            $scope.professionalskillmessage = 'Successfully updated';
            $scope.skillsetprofessionalform.splice(0, 0, response.data);
            $scope.skillsetprofessionalform.name = "";
            $scope.skillsetprofessionalform.rating = "";
        });
    };
    $scope.softwareskillsubmit = function(){
        var software_skill_data = {
            student : $scope.skillsetsoftwareform.student,
            skill_type : $scope.skillsetsoftwareform.skill_type,
            name : $scope.skillsetsoftwareform.name,
            rating : $scope.skillsetsoftwareform.rating,
        }
        // alert(JSON.stringify(software_skill_data));
        $http.post(apiUrl+"api/v1/student/api/v1/skillinfo/",JSON.stringify(software_skill_data))
        .then(function (response) {
            $scope.softwareskillmessage = 'Successfully updated';
            $scope.skillsetsoftwareform.splice(0, 0, response.data);
            $scope.skillsetsoftwareform.name = "";
            $scope.skillsetsoftwareform.rating = "";
        });
    };
    $scope.workhistroyformsubmit = function(){
        var workhistroy_data = {
            student : $scope.workhistroyform.user,
            //company : $scope.workhistroyform.company,
            company : 1,
            start_date : $scope.workhistroyform.start_date,
            leave_date : $scope.workhistroyform.leave_date,
            job_title : $scope.workhistroyform.job_title,
            job_description : $scope.workhistroyform.job_description
        }
        // alert(JSON.stringify(workhistroy_data));
        $http.post(apiUrl+"api/v1/student/api/v1/experiencedetails/",workhistroy_data)
        .then(function (response) {
            $scope.workhistroymessage = 'Successfully updated';
            $scope.workhistroyform.splice(0, 0, response.data);
        });
    };
    $scope.projectsubmit = function(){
        var projects_data = {
            student : $scope.projectsform.user,
            title : $scope.projectsform.title,
            start_date : $scope.projectsform.start_date,
            completation_date : $scope.projectsform.completation_date,
            project_description : $scope.projectsform.project_description
        }
        //alert(JSON.stringify(projects_data));
        $http.post(apiUrl+"api/v1/student/api/v1/projectdetails/",JSON.stringify(projects_data))
        .then(function (response) {
            $scope.personnalskillmessage = 'Successfully updated';
            $scope.projectsform.splice(0, 0, response.data);

        });
    };
    $scope.educationsubmit = function(){
        var education_data = {
            student : $scope.educationform.user,
            school_name : $scope.educationform.school_name,
            year_started : $scope.educationform.year_started,
            year_graduated : $scope.educationform.year_graduated,
            major : $scope.educationform.major,
            gpa : $scope.educationform.gpa,
            gpa_rating : $scope.educationform.gpa_rating
        }
        //alert(JSON.stringify(education_data));
        $http.post(apiUrl+"api/v1/student/api/v1/educationdetails/",JSON.stringify(education_data))
        .then(function (response) {
            $scope.educationmessage = 'Successfully updated';
            $scope.educationform.splice(0, 0, response.data);

        });
    };
    $scope.leadershipsubmit = function(){
        var leadership_data = {
            student : $scope.leadershipform.student,
            leadership_role : $scope.leadershipform.leadership_role,
            description : $scope.leadershipform.description
        }
        //alert(JSON.stringify(education_data));
        $http.post(apiUrl+"api/v1/student/api/v1/leadershipdetails/",JSON.stringify(leadership_data))
        .then(function (response) {
            $scope.leadershipmessage = 'Successfully updated';
            $scope.leadershipform.splice(0, 0, response.data);
            $scope.leadershipform.leadership_role = "";
            $scope.leadershipform.description ="";

        });
    };
});
