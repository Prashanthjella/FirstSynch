'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("EmployeeEditProfile", ["ngRoute","firstSync","ngFileUpload"]);

/////////////////////////////////// Module ////////////////////////////////////

// Student edit profile - studenteditprofiles
FirstSynch.controller("employeeeditprofiles" , function (Upload,$rootScope,$scope, $http, apiUrl,$timeout) {
      $scope.videoEditPopup = function (value) {
          $("#edit_video_popup").modal('show');
          var id = value;
          var token_id = $rootScope.token_id;
          alert(token_id);
          $http.get(apiUrl+"api/v1/flat_pages/rest/video_detail/"+id, {
            headers: {'Authorization' : 'Token '+token_id}
          })
          .then(function successCallback(response){
              $scope.vid = response.data;
          }, function errorCallback(response){
              console.log("Unable to perform get Video Details");
          });
      };//CEdit Video Popup - function end

      $scope.uploadvideolist = function(){
          $http.get(apiUrl+"api/v1/student/api/v1/student_uploadedvideo_list/"+$rootScope.user_id+"/")
              .then(function successCallback(response){
                  $scope.video_list = response.data;
              }, function errorCallback(response){
                  console.log("Unable to perform get student videos details");
          });
      };
      // GET THE FILE INFORMATION.
      $scope.getFileDetails = function (e) {

          $scope.files = [];
          $scope.$apply(function () {

              // STORE THE FILE OBJECT IN AN ARRAY.
              for (var i = 0; i < e.files.length; i++) {
                  $scope.files.push(e.files[i])
              }

          });
      };

      // NOW UPLOAD THE FILES.
      $scope.uploadFiles = function () {
          //FILL FormData WITH FILE DETAILS.
          $('#video_end').modal('show');
          var data = new FormData();
          for (var i in $scope.files) {
              data.append("video_file", $scope.files[i]);
          }
          //alert(angular.element('#result')[0].value);
          data.append("title", angular.element('#title')[0].value);
          data.append("student", $rootScope.stud_id);
          data.append("skill_text", angular.element('#skill_text')[0].value);
          data.append("video_chapters", angular.element('#result')[0].value);
          data.append("description", angular.element('#description')[0].value);
          data.append("student_video", 'True');
          data.append("active", 'True');
          data.append("published", angular.element('#published')[0].value);

          // ADD LISTENERS.
          var objXhr = new XMLHttpRequest();
          objXhr.addEventListener("progress", updateProgress, false);
          objXhr.addEventListener("load", transferComplete, false);

          // SEND FILE DETAILS TO THE API.
          objXhr.open("POST", apiUrl+"api/v1/career_fairs/api/v1/video/");
          objXhr.send(data);
      }

      // UPDATE PROGRESS BAR.
      function updateProgress(e) {
          if (e.lengthComputable) {
              document.getElementById('pro').setAttribute('value', e.loaded);
              document.getElementById('pro').setAttribute('max', e.total);
          }
      }

      // CONFIRMATION.
      function transferComplete(e) {
          //alert("Files uploaded successfully.");
          $('#video_end').modal('hide');
          $('#page-video-edit').modal('hide');
      }


    // student edit profile - hobbies
    $scope.hobbyform = {
        user:"",
        name : ""
    };
    $scope.hobbies_edit = function(){

        $http.get(apiUrl+"api/v1/employee/api/v1/get_hobby_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.hobbyform = response.data;
                $scope.hobbyform.stud_id = $rootScope.stud_id;
                //alert(JSON.stringify(response.data));
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.hobbysubmit = function(hobbiesimag){
        // var hobbies_data = {
        //     name : $scope.hobbiesform.name,
        //     student : $scope.hobbiesform.stud_id
        // }
        // //alert(JSON.stringify(hobbies_data));
        // $http.post(apiUrl+"api/v1/student/api/v1/hobbyinfo/",JSON.stringify(hobbies_data))
        // .then(function (response) {
        //     $scope.hobbiesmessage = 'Successfully updated';
        //     $scope.hobbiesform.splice(0, 0, response.data);
        //     $scope.hobbiesform.name = "";
        // });
        Upload.upload({
            url: apiUrl+"api/v1/employee/api/v1/hobbyinfo/",
            data: {employee:$scope.hobbyform.stud_id,image: hobbiesimag,name:$scope.hobbyform.name,description:$scope.hobbyform.description},
            method:'POST',
        }).then(function(resp) {
          // file is uploaded successfully
          $scope.hobbiesmessage = 'Successfully updated';
          $scope.hobbyform.splice(0, 0, response.data);
          $scope.hobbyform.name = "";
          $scope.hobbyform.description = "";
        }, function(resp) {
          // handle error
        }, function(evt) {
          // progress notify
        });
    };

    $scope.selectedCharacter = {};

    $scope.charactersubmit = function(){
        $scope.selectchar = [];
        angular.forEach($scope.selectedCharacter, function (selected, characters) {
            if (selected) {
                $scope.selectchar.push({employee:$rootScope.stud_id,character:characters});

            }
        });
        //alert(JSON.stringify($scope.selectchar));

        $http.post(apiUrl+"api/v1/employee/api/v1/characteristic/",JSON.stringify($scope.selectchar))
        .then(function (response) {
            $scope.charactermessage = 'Successfully updated';
        });
    };


    //student edit profile - personal skill set
    $scope.skillsetpersonnalform = [{
        employee:"",
        skill_type : "",
        name : "",
        rating : ""
    }];
    $scope.skillpersonnaledit = function(){
        $http.get(apiUrl+"api/v1/employee/api/v1/get_skillset_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.skillsetpersonnalform = response.data;
                $scope.skillsetpersonnalform.student = $rootScope.stud_id;
                $scope.skillsetpersonnalform.skill_type = "Personal";
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };

    $scope.personnalskillsubmit = function(){
        var personnal_skill_data = {
            employee : $scope.skillsetpersonnalform.student,
            skill_type : $scope.skillsetpersonnalform.skill_type,
            name : $scope.skillsetpersonnalform.name,
            rating : $scope.skillsetpersonnalform.rating
        }
        //alert(JSON.stringify(personnal_skill_data));
        $http.post(apiUrl+"api/v1/employee/api/v1/skillinfo/",JSON.stringify(personnal_skill_data))
        .then(function (response) {
            $scope.personnalskillmessage = 'Successfully updated';
            $scope.skillsetpersonnalform.splice(0, 0, response.data);
            $scope.skillsetpersonnalform.name = "";
            $scope.skillsetpersonnalform.rating = "";
        });
    };


    //student edit profile - professional skill set
    $scope.skillsetprofessionalform = [{
        employee:"",
        skill_type : "",
        name : "",
        rating : ""
    }];
    $scope.skillprofessionaledit = function(){
        $http.get(apiUrl+"api/v1/employee/api/v1/get_skillset_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.skillsetprofessionalform = response.data;
                $scope.skillsetpersonnalform.student = $rootScope.stud_id;
                $scope.skillsetprofessionalform.skill_type = "Professional";
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.professionalskillsubmit = function(){
        var professional_skill_data = {
            employee : $scope.skillsetprofessionalform.student,
            skill_type : $scope.skillsetprofessionalform.skill_type,
            name : $scope.skillsetprofessionalform.name,
            rating : $scope.skillsetprofessionalform.rating
        }
        //alert(JSON.stringify(personnal_skill_data));
        $http.post(apiUrl+"api/v1/employee/api/v1/skillinfo/",JSON.stringify(professional_skill_data))
        .then(function (response) {
            $scope.professionalskillmessage = 'Successfully updated';
            $scope.skillsetprofessionalform.splice(0, 0, response.data);
            $scope.skillsetprofessionalform.name = "";
            $scope.skillsetprofessionalform.rating = "";
        });
    };

    //student edit profile - software skill set
    $scope.skillsetsoftwareform = [{
        employee:"",
        skill_type : "",
        name : "",
        rating : ""
    }];
    $scope.skillsoftwareedit = function(){
        $http.get(apiUrl+"api/v1/employee/api/v1/get_skillset_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.skillsetsoftwareform = response.data;
                $scope.skillsetpersonnalform.student = $rootScope.stud_id;
                $scope.skillsetsoftwareform.skill_type = "Software";
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.softwareskillsubmit = function(){
        var software_skill_data = {
            employee : $scope.skillsetsoftwareform.student,
            skill_type : $scope.skillsetsoftwareform.skill_type,
            name : $scope.skillsetsoftwareform.name,
            rating : $scope.skillsetsoftwareform.rating,
        }
        // alert(JSON.stringify(software_skill_data));
        $http.post(apiUrl+"api/v1/employee/api/v1/skillinfo/",JSON.stringify(software_skill_data))
        .then(function (response) {
            $scope.softwareskillmessage = 'Successfully updated';
            $scope.skillsetsoftwareform.splice(0, 0, response.data);
            $scope.skillsetsoftwareform.name = "";
            $scope.skillsetsoftwareform.rating = "";
        });
    };

    //student edit profile - work histroy
    $scope.workhistroyform = {
        student:"",
        company : "",
        start_date : "",
        leave_date : "",
        job_title : "",
        job_description : ""
    };
    $scope.workhistroyeedit = function(){
        $http.get(apiUrl+"api/v1/employee/get_experience_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.workhistroyform = response.data;
                $scope.workhistroyform.user = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.workhistroyformsubmit = function(){
        var workhistroy_data = {
            employee : $scope.workhistroyform.user,
            company : $scope.workhistroyform.company,
            start_date : $scope.workhistroyform.start_date,
            leave_date : $scope.workhistroyform.leave_date,
            job_title : $scope.workhistroyform.job_title,
            job_description : $scope.workhistroyform.job_description
        }
        // alert(JSON.stringify(workhistroy_data));
        $http.post(apiUrl+"api/v1/employee/api/v1/experiencedetails/",workhistroy_data)
        .then(function (response) {
            $scope.workhistroymessage = 'Successfully updated';
            $scope.workhistroyform.splice(0, 0, response.data);
        });
    };
    $scope.editworkinghistroy = function(workhistroy){
        $scope.workhistroyform.user = workhistroy.user;
        $scope.workhistroyform.company = workhistroy.company;
        $scope.workhistroyform.start_date = workhistroy.start_date;
        $scope.workhistroyform.leave_date= workhistroy.leave_date;
        $scope.workhistroyform.job_title= workhistroy.job_title
        $scope.workhistroyform.job_description = workhistroy.job_description
    };


    //student edit profile - projects
    $scope.projecteditform = {
        student:"",
        title : "",
        start_date : "",
        completation_date : "",
        project_description : ""
    };
    $scope.projectsedit = function(){
        $http.get(apiUrl+"api/v1/employee/get_project_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.projecteditform = response.data;
                $scope.projecteditform.user = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.projectssubmit = function(projectsimage){
        // var projects_data = {
        //     student : $scope.projectform.user,
        //     title : $scope.projectform.title,
        //     start_date : $scope.projectform.start_date,
        //     completation_date : $scope.projectform.completation_date,
        //     project_description : $scope.projectform.project_description
        // }
        // //alert(JSON.stringify(projects_data));
        // $http.post(apiUrl+"api/v1/student/api/v1/projectdetails/",JSON.stringify(projects_data))
        // .then(function (response) {
        //     $scope.personnalskillmessage = 'Successfully updated';
        //     $scope.projectform.splice(0, 0, response.data);
        //
        // });
        Upload.upload({
            url: apiUrl+"api/v1/employee/api/v1/projectdetails/",
            data: { employee : $scope.projecteditform.user,title : $scope.projecteditform.title,start_date : $scope.projecteditform.start_date,completation_date : $scope.projecteditform.completation_date,project_description : $scope.projecteditform.project_description,image:projectsimage},
            method:'POST',
        }).then(function(resp) {
            $scope.projectmessage = 'Successfully updated';
            //$scope.projecteditform.splice(0, 0, response.data);
        }, function(resp) {
        }, function(evt) {
        });
    };
    $scope.editproject = function(projects){
        $scope.projecteditform.user = projects.user;
        $scope.projecteditform.title = projects.title;
        $scope.projecteditform.start_date = projects.start_date;
        $scope.projecteditform.completation_date= projects.completation_date;
        $scope.projecteditform.project_description = projects.project_description;
    };


    //student edit profile - education
    $scope.educationform = {
        student:"",
        school_name : "",
        year_started : "",
        year_graduated : "",
        major : "",
        gpa : "",
        gpa_rating : ""

    };
    $scope.educationedit = function(){
        $http.get(apiUrl+"api/v1/employee/api/v1/get_education_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.educationform = response.data;
                $scope.educationform.user = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.educationsubmit = function(){
        var education_data = {
            employee : $scope.educationform.user,
            school_name : $scope.educationform.school_name,
            year_started : $scope.educationform.year_started,
            year_graduated : $scope.educationform.year_graduated,
            major : $scope.educationform.major,
            gpa : $scope.educationform.gpa,
            gpa_rating : $scope.educationform.gpa_rating
        }
        //alert(JSON.stringify(education_data));
        $http.post(apiUrl+"api/v1/employee/api/v1/educationdetails/",JSON.stringify(education_data))
        .then(function (response) {
            $scope.educationmessage = 'Successfully updated';
            $scope.educationform.splice(0, 0, response.data);

        });
    };
    $scope.editeducation = function(education){
        $scope.educationform.user = education.user;
        $scope.educationform.school_name = education.school_name;
        $scope.educationform.year_started = education.year_started;
        $scope.educationform.year_graduated= education.year_graduated
        $scope.educationform.major = education.major;
        $scope.educationform.gpa = education.gpa;
        $scope.educationform.gpa_rating = education.gpa_rating;
    };

    //student edit profile - leadership role
    $scope.leadershipform = {
        student:"",
        leadership_role : "",
        description : ""

    };
    $scope.leadershipedit = function(){
        $http.get(apiUrl+"api/v1/employee/get_leadershiproles_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.leadershipform = response.data;
                $scope.leadershipform.student = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.leadershipsubmit = function(){
        var leadership_data = {
            employee : $scope.leadershipform.student,
            leadership_role : $scope.leadershipform.leadership_role,
            description : $scope.leadershipform.description
        }
        //alert(JSON.stringify(education_data));
        $http.post(apiUrl+"api/v1/employee/api/v1/leadershipdetails/",JSON.stringify(leadership_data))
        .then(function (response) {
            $scope.leadershipmessage = 'Successfully updated';
            $scope.leadershipform.splice(0, 0, response.data);
            $scope.leadershipform.leadership_role = "";
            $scope.leadershipform.description ="";

        });
    };
    $scope.editleadership = function(leadership){
        $scope.leadershipform.leadership_role = leadership.leadership_role;
        $scope.leadershipform.description = leadership.description;
    };


});





FirstSynch.controller("employeebasicprofileupload" , function ($timeout,$window,$rootScope,Upload, $scope, $http, apiUrl) {
    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {
        $scope.files = [];
        $scope.$apply(function () {
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }

        });
    };

    $scope.basicprofileform = {
        id:"",
        user:"",
        first_name : "",
        last_name : "",
        dob : "",
        gender : "",
        category : "",
        facebook_url : "",
        linkedin_url : "",
        twitter_url : "",
        website : "",
        stackoverflow_url:"",
        github_url:"",
        profile_picture:"",
        about_me:""
    };
    // student basic profile get information
    $http.get(apiUrl+"api/v1/employee/get_student_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $rootScope.stud_id = response.data[0].id;
            $scope.basicprofileform.id = response.data[0].id;
            $scope.basicprofileform.user = response.data[0].user;
            $scope.basicprofileform.first_name = response.data[0].first_name;
            $scope.basicprofileform.last_name = response.data[0].last_name;
            $scope.basicprofileform.dob = response.data[0].dob;
            $scope.basicprofileform.gender = response.data[0].gender;
            $scope.basicprofileform.category = response.data[0].category;
            $scope.basicprofileform.facebook_url = response.data[0].facebook_url;
            $scope.basicprofileform.linkedin_url = response.data[0].linkedin_url;
            $scope.basicprofileform.twitter_url = response.data[0].twitter_url;
            $scope.basicprofileform.website = response.data[0].website;
            $scope.basicprofileform.stackoverflow_url = response.data[0].stackoverflow_url;
            $scope.basicprofileform.github_url = response.data[0].github_url;
            $scope.basicprofileform.stackoverflow_url = response.data[0].stackoverflow_url;
            $scope.basicprofileform.profile_picture = response.data[0].profile_picture;
            $scope.basicprofileform.about_me = response.data[0].about_me;
            $scope.basicprofileform.about_me = response.data[0].profile_picture;
        }, function errorCallback(response){
            console.log("Unable to perform get student basic profile details");
    });

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
        if(file){
            file.upload = Upload.upload({
                url: apiUrl+"api/v1/employee/api/v1/employeeprofile/"+$scope.basicprofileform.id+"/",
                data: {user:$scope.basicprofileform.user,profile_picture: file},
                method:'PUT',
            });
        }
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/employee/api/v1/employeeprofile/"+$scope.basicprofileform.id+"/",data)
        .then(function (response) {
            $scope.basicprofilemessage = 'Successfully updated';
        });
    };
    $scope.$watch('$viewContentLoaded', function(){
        $timeout( function(){
            $window.loading_screen.finish();
       }, 3000 );
    });
});
