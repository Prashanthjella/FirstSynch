'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("EmployeeEditProfile", ["ngRoute","firstSync","ngFileUpload"]);

/////////////////////////////////// Module ////////////////////////////////////

// Student edit profile - studenteditprofiles
FirstSynch.controller("employeeeditprofiles" , function (Upload,$window,$rootScope,$scope, $http, apiUrl,$timeout) {
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
        $http.get(apiUrl+"api/v1/setups/api/v1/company_uploadedvideo_list/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.video_list = response.data;
            }, function errorCallback(response){
                console.log("Unable to perform get Company videos details");
        });
      };

      $scope.getFileDetails = function (e) {
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
        if ($rootScope.request_member_id){
          $scope.companypk = $rootScope.request_member_id;
        }
        if($rootScope.company_userid){
          $scope.companypk = $rootScope.company_userid;
        }
        $('.custom_fade').show();
        $('#video_end').show();
          var fd = new FormData()
          for (var i in $scope.files) {
              fd.append("video_file", $scope.files[i])
          }
          fd.append("title", angular.element('#title')[0].value);
          fd.append("company", $scope.companypk);
          fd.append("skill_text", angular.element('#skill_text')[0].value);
          fd.append("video_chapters", angular.element('#result')[0].value);
          fd.append("description", angular.element('#description')[0].value);
          fd.append("company_video", 'True');
          fd.append("active", 'True');
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
              $scope.$apply(function(){
                $http.get(apiUrl+"api/v1/setups/api/v1/company_uploadedvideo_list/"+$rootScope.user_id+"/")
                    .then(function successCallback(response){
                        $scope.video_list = response.data;
                    }, function errorCallback(response){
                        console.log("Unable to perform get Company videos details");
                });
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

    $scope.epehobbyformadd = {
        user:"",
        name : "",
        existing_id : 0
    };

    $http.get(apiUrl+"api/v1/employee/api/v1/get_hobby_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.epehobbyform = response.data;
            $scope.epehobbyformadd.stud_id = $rootScope.stud_id;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });

    $scope.epehobbies_edit = function(){
        $http.get(apiUrl+"api/v1/employee/api/v1/get_hobby_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.epehobbyform = response.data;
                $scope.epehobbyformadd.stud_id = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.employee_edit_profile_hobbies_reset = function(){
        $scope.epehobbyformadd.name = "";
        $scope.epehobbyformadd.description = "";
        $scope.epehobbyformadd.imagesrc = "";
        $scope.epehobbyformadd.existing_id = 0;
    }
    $scope.epehobbyupdatesubmit = function(hobbiesimag,idd,name,ds){
          if(hobbiesimag && (typeof(hobbiesimag) === 'object')){
              var data = {employee:$rootScope.stud_id,image: hobbiesimag,name:name,description:ds};
          }else{
              var data = {employee:$rootScope.stud_id,name:name,description:ds};
          }
          Upload.upload({
              url: apiUrl+"api/v1/employee/api/v1/hobbyinfo/"+idd+"/",
              data: data,
              method:'PUT',
          }).then(function(resp) {
            // file is uploaded successfully
            $scope.epehobbiesmessage = 'Successfully updated';
            $scope.epehobbies_edit();
            $scope.epehobbyformadd.name = "";
            $scope.epehobbyformadd.description = "";
            $scope.epehobbyformadd.image = "";
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
          }, function(resp) {
            // handle error
          }, function(evt) {
            // progress notify
          });
    };

    $scope.epehobbysubmit = function(hobbiesimag,existid){
            if(hobbiesimag){
                var data = {employee:$rootScope.stud_id,image: hobbiesimag,name:$scope.epehobbyformadd.name,description:$scope.epehobbyformadd.description};
            }else{
                var data = {employee:$rootScope.stud_id,name:$scope.epehobbyformadd.name,description:$scope.epehobbyformadd.description};
            }
            Upload.upload({
                url: apiUrl+"api/v1/employee/api/v1/hobbyinfo/",
                data: data,
                method:'POST',
            }).then(function(resp) {
              // file is uploaded successfully
              $scope.epehobbiesmessage = 'Successfully updated';
              $scope.epehobbies_edit();
              $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
              $scope.epehobbyformadd.name = "";
              $scope.epehobbyformadd.description = "";
              $scope.epehobbyformadd.image = "";
            }, function(resp) {
              // handle error
            }, function(evt) {
              // progress notify
            });

    };
    $scope.epeedithobby= function(hobby){
        $scope.epehobbyformadd.existing_id = hobby.id;
        $scope.epehobbyformadd.imagesrc = hobby.image;
        $scope.epehobbyformadd.name = hobby.name;
        $scope.epehobbyformadd.description = hobby.description;
    };
    $scope.eperemovehobby = function(id){
        $http.delete(apiUrl+"api/v1/employee/api/v1/hobbyinfo/"+id+"/")
        .then(function (response) {
            $scope.epehobbiesmessage = 'Successfully Deleted';
            $scope.epehobbies_edit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };
    $scope.epecharacterbtndisable =  false;
    $scope.selectedCharacter = {};
    //$scope.selectedcharid = [];
    $scope.availablecharacter = [
        {'charac':'Realistic'},
        {'charac':'Investigative'},
        {'charac':'Artistic'},
        {'charac':'Social'},
        {'charac':'Enterprising'},
        {'charac':'Conventional'},
        {'charac':'Rule Follower'},
        {'charac':'Self-Motivated'},
        {'charac':'Responsibility'},
        {'charac':'Accustomed to Routine'},
        {'charac':'Learned Study Skills'},
        {'charac':'Love of Reading'}
    ]

    $scope.character_edit = function(){
        $http.get(apiUrl+"api/v1/employee/get_studentcharacteristics_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                //$scope.selection = [];
                $scope.seshouldDisablecount = 0;
                angular.forEach(response.data, function (characters) {
                    //$scope.selection.push(characters.character);
                    $scope.selectedCharacter[characters.character] = true;
                    //$scope.selectedcharid.push({id:characters.id});
                    $scope.seshouldDisablecount++;
                });
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
        if($scope.seshouldDisablecount > 0){
            $scope.secharacterbtndisable = true;
        }
    };
    $scope.employee_edit_profile_character_reset = function(){
        $scope.character_edit();
    }
    $scope.charactercheck = function(event,charackey){
        if(event.target.checked){
            $scope.seshouldDisablecount++;
            $scope.selectedCharacter[charackey] = true;
        }
        else{
            $scope.seshouldDisablecount--;
            $scope.selectedCharacter[charackey] = false;
        }
        if($scope.seshouldDisablecount > 5){
            $scope.selectedCharacter[charackey] = false;
            $scope.seshouldDisablecount--;
        }
        if($scope.seshouldDisablecount > 0){
            $scope.epecharacterbtndisable = true;
        }
        else{
            $scope.epecharacterbtndisable = false;
        }
    }
    $scope.charactersubmit = function(){
        $scope.selectchar = [];
        angular.forEach($scope.selectedCharacter, function (selected, characters) {
            if (selected) {
                $scope.selectchar.push({employee:$rootScope.stud_id,character:characters});
            }
        });

        $http.post(apiUrl+"api/v1/employee/api/v1/characteristic/",JSON.stringify($scope.selectchar))
        .then(function (response) {
            $scope.charactermessage = 'Successfully updated';
            $scope.character_edit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
        //alert(JSON.stringify($scope.selectchar));
    };
    $scope.epewhatiamlookingbtndisable =  false;
    $scope.availablelooking = [
        {'looking':'A role in a large company'},
        {'looking':'Build a career'},
        {'looking':'Career growth'},
        {'looking':'Explain your motivation'},
        {'looking':'Extremely productive and creative'},
        {'looking':'Friendly staff'},
        {'looking':'High earnings'},
        {'looking':'Interesting projects'},
        {'looking':'Learn new things'},
        {'looking':'Official employment'}
    ]
    $scope.whatiamlooking = {};
    $scope.what_i_am_edit = function(){
        $http.get(apiUrl+"api/v1/employee/api/v1/get_whatiamlooking_details/"+$rootScope.stud_id+"/")
            .then(function successCallback(response){
                //$scope.selection = [];
                $scope.sewlshouldDisablecount = 0;
                angular.forEach(response.data, function (looking) {
                    //$scope.selection.push(characters.character);
                    $scope.whatiamlooking[looking.whatimlooking] = true;
                    //$scope.selectedcharid.push({id:characters.id});
                    $scope.sewlshouldDisablecount++;
                });
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
        if($scope.sewlshouldDisablecount > 0){
            $scope.epewhatiamlookingbtndisable = true;
        }
    };
    $scope.employee_edit_profile_looking_reset = function(){
        $scope.what_i_am_edit();
    }
    $scope.lookingcheck = function(event,looking){
        if(event.target.checked){
            $scope.sewlshouldDisablecount++;
        }
        else{
            $scope.sewlshouldDisablecount--;
        }
        if($scope.sewlshouldDisablecount > 5){
            $scope.whatiamlooking[looking] = false;
            $scope.sewlshouldDisablecount--;
        }
        if($scope.sewlshouldDisablecount > 0){
            $scope.epewhatiamlookingbtndisable = true;
        }
        else{
            $scope.epewhatiamlookingbtndisable = false;
        }
    }
    $scope.whatiamlookingsubmit = function(){
        $scope.selectlook = [];
        angular.forEach($scope.whatiamlooking, function (selected, lookgin) {
            if (selected) {
                $scope.selectlook.push({employee:$rootScope.stud_id,whatimlooking:lookgin});

            }
        });
        // alert(JSON.stringify($scope.selectlook));

        $http.post(apiUrl+"api/v1/employee/api/v1/whatiamlooking/",JSON.stringify($scope.selectlook))
        .then(function (response) {
            $scope.whatiammessage = 'Successfully updated';
            $scope.what_i_am_edit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
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
        job_description : "",
        editid : 0
    };
    $scope.employee_edit_workhistroy_reset = function(){
        $scope.workhistroyform.student="";
        $scope.workhistroyform.company = "";
        $scope.workhistroyform.start_date = "";
        $scope.workhistroyform.leave_date = "";
        $scope.workhistroyform.job_title = "";
        $scope.workhistroyform.job_description = "";
        $scope.workhistroyform.editid = 0;
        $rootScope.dateerrMessage = false;
    }
    $http.get(apiUrl+"api/v1/employee/get_experience_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.workhistroyform = response.data;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });
    $scope.workhistroyeedit = function(){
        $http.get(apiUrl+"api/v1/employee/get_experience_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.workhistroyform = response.data;
                $scope.workhistroyform.user = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.workhistroyupdateformsubmit = function(idd,cm,sd,ld,jt,jd){
        var workhistroy_data = {
            employee : $rootScope.stud_id,
            company : cm,
            start_date : sd,
            leave_date : ld,
            job_title : jt,
            job_description : jd
        }
        // alert(JSON.stringify(workhistroy_data));
            $http.patch(apiUrl+"api/v1/employee/api/v1/experiencedetails/"+idd+"/",workhistroy_data)
            .then(function (response) {
                $scope.workhistroyeedit();
                $scope.workhistroymessage = 'Successfully updated';
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            });
    };

    $scope.workhistroyformsubmit = function(){
        var workhistroy_data = {
            employee : $rootScope.stud_id,
            company : $scope.workhistroyform.company,
            start_date : $scope.workhistroyform.start_date,
            leave_date : $scope.workhistroyform.leave_date,
            job_title : $scope.workhistroyform.job_title,
            job_description : $scope.workhistroyform.job_description
        }
        // alert(JSON.stringify(workhistroy_data));
          $http.post(apiUrl+"api/v1/employee/api/v1/experiencedetails/",workhistroy_data)
          .then(function (response) {
              $scope.workhistroymessage = 'Successfully Added';
              $scope.workhistroyeedit();
              $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
          });
    };

    $scope.editworkinghistroy = function(workhistroy){
        $scope.workhistroyform.user = workhistroy.user;
        $scope.workhistroyform.editid = workhistroy.id;
        $scope.workhistroyform.company = workhistroy.company;
        $scope.workhistroyform.start_date = workhistroy.start_date;
        $scope.workhistroyform.leave_date= workhistroy.leave_date;
        $scope.workhistroyform.job_title= workhistroy.job_title;
        $scope.workhistroyform.job_description = workhistroy.job_description;
    };
    $scope.removeWorkinghistrory = function(workhistroyid){
        $http.delete(apiUrl+"api/v1/employee/api/v1/experiencedetails/"+workhistroyid+"/")
        .then(function (response) {
            $scope.workhistroymessage = 'Successfully Deleted';
            $scope.workhistroyeedit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };


    //student edit profile - projects
    $scope.projecteditform = {
        student:"",
        title : "",
        start_date : "",
        completation_date : "",
        project_description : "",
        editid : 0
    };
    $scope.employee_edit_project_reset = function(){
        $scope.projecteditform.student="";
        $scope.projecteditform.title = "";
        $scope.projecteditform.start_date = "";
        $scope.projecteditform.completation_date = "";
        $scope.projecteditform.project_description = "";
        $scope.projecteditform.editid = 0;
        $scope.projecteditform.images = '';
        $rootScope.dateerrMessage = false;
    }
    $http.get(apiUrl+"api/v1/employee/get_project_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.projecteditform = response.data;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });
    $scope.projectsedit = function(){
        $http.get(apiUrl+"api/v1/employee/get_project_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.projecteditform = response.data;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.projectsupdatesubmit = function(projectsimage,idd,tl,sd,cd,pd){
        if(projectsimage && (typeof(projectsimage) === 'object')){
            var projectdata = { employee : $rootScope.stud_id,title : tl,start_date : sd,completation_date : cd,project_description : pd,image:projectsimage}
        }
        else{
            var projectdata = { employee : $rootScope.stud_id,title : tl,start_date : sd,completation_date : cd,project_description : pd}
        }
        Upload.upload({
            url: apiUrl+"api/v1/employee/api/v1/projectdetails/"+idd+"/",
            data: projectdata,
            method:'PUT',
        }).then(function(resp) {
            $scope.projectmessage = 'Successfully updated';
            $scope.projectsedit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            //$scope.projecteditform.splice(0, 0, response.data);
        }, function(resp) {
        }, function(evt) {
        });
    };

    $scope.projectssubmit = function(projectsimage){
        if(projectsimage){
            var projectdata = { employee : $rootScope.stud_id,title : $scope.projecteditform.title,start_date : $scope.projecteditform.start_date,completation_date : $scope.projecteditform.completation_date,project_description : $scope.projecteditform.project_description,image:projectsimage}
        }
        else{
            var projectdata = { employee : $rootScope.stud_id,title : $scope.projecteditform.title,start_date : $scope.projecteditform.start_date,completation_date : $scope.projecteditform.completation_date,project_description : $scope.projecteditform.project_description}
        }
        Upload.upload({
            url: apiUrl+"api/v1/employee/api/v1/projectdetails/",
            data: projectdata,
            method:'POST',
        }).then(function(resp) {
            $scope.projectmessage = 'Successfully Added';
            $scope.projectsedit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            //$scope.projecteditform.splice(0, 0, response.data);
        }, function(resp) {
        }, function(evt) {
        });
    };
    $scope.editproject = function(projects){
        $scope.projecteditform.editid = projects.id;
        $scope.projecteditform.project_picture = projects.image;
        $scope.projecteditform.user = projects.user;
        $scope.projecteditform.title = projects.title;
        $scope.projecteditform.start_date = projects.start_date;
        $scope.projecteditform.completation_date= projects.completation_date;
        $scope.projecteditform.project_description = projects.project_description;
    };
    $scope.removeprojects = function(projectsid){
        $http.delete(apiUrl+"api/v1/employee/api/v1/projectdetails/"+projectsid+"/")
        .then(function (response) {
            $scope.projectmessage = 'Successfully Deleted';
            $scope.projectsedit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };


    //student edit profile - education
    $scope.educationform = {
        student:"",
        school_name : "",
        year_started : "",
        year_graduated : "",
        major : "",
        gpa : "",

    };
    $http.get(apiUrl+"api/v1/employee/api/v1/get_education_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.educationform = response.data;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });
    $scope.educationedit = function(){
        $http.get(apiUrl+"api/v1/employee/api/v1/get_education_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.educationform = response.data;
                $scope.educationform.user = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.removeeducation = function(id){
        $http.delete(apiUrl+"api/v1/employee/api/v1/educationdetails/"+id+"/")
            .then(function successCallback(response){
              $scope.educationedit();
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.employee_edit_school_reset = function(){
        $scope.educationform.school_name = ""
        $scope.educationform.year_started = ""
        $scope.educationform.year_graduated = "";
        $scope.educationform.major  = "";
        $scope.educationform.gpa = "";
    }

    $scope.educationupdatesubmit = function(idd,sn,ys,yg,mr,gp){
        var education_data = {
            employee : $rootScope.stud_id,
            school_name : sn,
            year_started : ys,
            year_graduated : yg,
            major : mr,
            gpa : gp,
        }
        //alert(JSON.stringify(education_data));
          $http.patch(apiUrl+"api/v1/employee/api/v1/educationdetails/"+idd+"/",JSON.stringify(education_data))
          .then(function (response) {
              $scope.educationedit();
              $scope.educationmessage = 'Successfully updated';
              $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
          });
    };

    $scope.educationsubmit = function(){
        var education_data = {
            employee : $rootScope.stud_id,
            school_name : $scope.educationform.school_name,
            year_started : $scope.educationform.year_started,
            year_graduated : $scope.educationform.year_graduated,
            major : $scope.educationform.major,
            gpa : $scope.educationform.gpa,
        }
        //alert(JSON.stringify(education_data));
          $http.post(apiUrl+"api/v1/employee/api/v1/educationdetails/",JSON.stringify(education_data))
          .then(function (response) {
              $scope.educationedit();
              $scope.educationmessage = 'Successfully updated';
              $scope.educationform.splice(0, 0, response.data);
              $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
          });
    };

    $scope.editeducation = function(education){
        $scope.educationform.user = education.user;
        $scope.educationform.existing_id = education.id;
        $scope.educationform.school_name = education.school_name;
        $scope.educationform.year_started = education.year_started;
        $scope.educationform.year_graduated= education.year_graduated
        $scope.educationform.major = education.major;
        $scope.educationform.gpa = education.gpa;
    };

    //student edit profile - leadership role
    $scope.leadershipform = {
        student:"",
        leadership_role : "",
        description : "",
        editid : 0,

    };
    $http.get(apiUrl+"api/v1/employee/get_leadershiproles_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.leadershipform = response.data;
            $scope.leadershipform.student = $rootScope.stud_id;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });
    $scope.leadershipedit = function(){
        $http.get(apiUrl+"api/v1/employee/get_leadershiproles_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.leadershipform = response.data;
                $scope.leadershipform.student = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.employee_edit_leadership_reset = function(){
        $scope.leadershipform.student = "";
        $scope.leadershipform.leadership_role = "";
        $scope.leadershipform.description = "";
        $scope.leadershipform.editid = 0;
    }

    $scope.leadershipupdatesubmit = function(idd,lr,des){
        var leadership_data = {
            employee : $rootScope.stud_id,
            leadership_role : lr,
            description : des
        }
            // update leadershipform
            $http.patch(apiUrl+"api/v1/employee/api/v1/leadershipdetails/"+idd+"/",JSON.stringify(leadership_data))
            .then(function (response) {
                $scope.leadershipmessage = 'Successfully updated';
                $scope.leadershipedit();
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
                $scope.leadershipform.leadership_role = "";
                $scope.leadershipform.description ="";

            });
    };

    $scope.leadershipsubmit = function(){
        var leadership_data = {
            employee : $rootScope.stud_id,
            leadership_role : $scope.leadershipform.leadership_role,
            description : $scope.leadershipform.description
        }
            $http.post(apiUrl+"api/v1/employee/api/v1/leadershipdetails/",JSON.stringify(leadership_data))
            .then(function (response) {
                $scope.leadershipmessage = 'Successfully Added';
                $scope.leadershipedit();
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
                $scope.leadershipform.leadership_role = "";
                $scope.leadershipform.description ="";
            });
    };

    $scope.editleadership = function(leadership){
        $scope.leadershipform.leadership_role = leadership.leadership_role;
        $scope.leadershipform.description = leadership.description;
        $scope.leadershipform.editid = leadership.id;
    };
    $scope.removeleadership = function(leadershipid){
        $http.delete(apiUrl+"api/v1/employee/api/v1/leadershipdetails/"+leadershipid+"/")
        .then(function (response) {
            $scope.leadershipmessage = 'Successfully Deleted';
            $scope.leadershipedit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            $scope.leadershipform.leadership_role = "";
            $scope.leadershipform.description ="";

        });
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
    $scope.getEmployeeBasicProfileDetials = function(){
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
            }, function errorCallback(response){
                console.log("Unable to perform get student basic profile details");
        });
    }
    $scope.employee_edit_profile_reset = function(){
        $scope.getEmployeeBasicProfileDetials();
    };
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
            Upload.upload({
                url: apiUrl+"api/v1/employee/api/v1/employeeprofile/"+$scope.basicprofileform.id+"/",
                data: {user:$scope.basicprofileform.user,profile_picture: file},
                method:'PUT',
            }).then(function (resp) {
                $scope.basicprofileform.profile_picture = resp.data.profile_picture;
                $rootScope.profileimage = resp.data.profile_picture;
                $window.sessionStorage.setItem('profileimage', resp.data.profile_picture);
                //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                //console.log('Error status: ' + resp.status);
            }, function (evt) {
                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }
        // alert(JSON.stringify(data));
        $http.patch(apiUrl+"api/v1/employee/api/v1/employeeprofile/"+$scope.basicprofileform.id+"/",data)
        .then(function (response) {
            $scope.basicprofilemessage = 'Successfully updated';
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };
    $scope.$watch('$viewContentLoaded', function(){
        $timeout( function(){
            $window.loading_screen.finish();
       }, 3000 );
    });
});
