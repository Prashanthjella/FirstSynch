'use strict';

/////////////////////////////////// Module ////////////////////////////////////

var FirstSynch = angular.module("StudentEditProfile", ["ngRoute","firstSync","ngFileUpload"]);

/////////////////////////////////// Module ////////////////////////////////////

// Student edit profile - studenteditprofiles


FirstSynch.controller("studenteditprofiles" , function (Upload,$rootScope,$scope, $http, apiUrl,$timeout, $window) {

      $scope.deleteVideo = function (value,index) {
          $http.delete(apiUrl+"api/v1/career_fairs/api/v1/video/"+value+"/",JSON.stringify({'id':value}))
          .then(function (response) {
              angular.element(event.target).parent().parent().parent().remove();
          });
          $('.student_uploaded_video'+index).fadeOut();
      };//Delete Video Popup - function end

      $scope.videoEditPopup = function (value) {
          var id = value;
          $http.get(apiUrl+"api/v1/flat_pages/rest/video_detail/"+id, {
            headers: {'Authorization' : 'Token '+$rootScope.token_id}
          })
          .then(function successCallback(response){
              $scope.editvid = response.data;
              $('#hidden_source').val(response.data.video.mp4_video);
              $("#page-editvideo-edit").modal('show');
          }, function errorCallback(response){
              console.log("Unable to perform get Video Details");
          });
      };//Edit Video Popup - function end

      $scope.uploadvideolist = function(){
          $http.get(apiUrl+"api/v1/student/api/v1/student_uploadedvideo_list/"+$rootScope.user_id+"/")
              .then(function successCallback(response){
                  $scope.video_list = response.data;
              }, function errorCallback(response){
                  console.log("Unable to perform get student videos details");
          });
      };

    //Upload New Video Here
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
          $('.custom_fade').show();
          $('#video_end').show();
            var fd = new FormData()
            for (var i in $scope.files) {
                fd.append("video_file", $scope.files[i])
            }
            fd.append("title", angular.element('#title')[0].value);
            fd.append("student", $rootScope.stud_id);
            fd.append("skill_text", angular.element('#skill_text')[0].value);
            fd.append("video_chapters", angular.element('#result')[0].value);
            fd.append("description", angular.element('#description')[0].value);
            fd.append("student_video", 'True');
            fd.append("active", 'True');
            fd.append("created_by", $rootScope.user_id);
            var pub_date = $("input[name='published']:checked").val();
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
                  $http.get(apiUrl+"api/v1/student/api/v1/student_uploadedvideo_list/"+$rootScope.user_id+"/")
                      .then(function successCallback(response){
                          $scope.video_list = response.data;
                      }, function errorCallback(response){
                          console.log("Unable to perform get student videos details");
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


    // student edit profile - hobbies
    $scope.hobbyformadd = {
        user:"",
        name : "",
        existing_id : 0
    };
    $http.get(apiUrl+"api/v1/student/api/v1/get_hobby_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.hobbydata = response.data;
            $scope.hobbyformadd.stud_id = $rootScope.stud_id;
            //alert(JSON.stringify(response.data));
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });

    $scope.hobbies_edit = function(){

        $http.get(apiUrl+"api/v1/student/api/v1/get_hobby_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.hobbydata = response.data;
                $scope.hobbyformadd.stud_id = $rootScope.stud_id;
                //alert(JSON.stringify(response.data));
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.student_edit_profile_hobbies_reset = function(){
        $scope.hobbyformadd.name = "";
        $scope.hobbyformadd.description = "";
        $scope.hobbyformadd.imagesrc = "";
        $scope.hobbyformadd.existing_id = 0;
    }
    $scope.hobbyupdatesubmit = function(hobbiesimag,existid,title, descriptions){
            if(hobbiesimag && (typeof(hobbiesimag) === 'object')){
                var data = {student:$rootScope.stud_id,image: hobbiesimag, name:title, description:descriptions};
            }else{
                var data = {student:$rootScope.stud_id, name:title, description:descriptions};
            }
            Upload.upload({
                url: apiUrl+"api/v1/student/api/v1/hobbyinfo/"+existid+"/",
                data: data,
                method:'PUT',
            }).then(function(resp) {
              // file is uploaded successfully
              $scope.hobbiesmessage = 'Successfully updated';
              $scope.hobbies_edit();
              $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            }, function(resp) {
              // handle error
            }, function(evt) {
              // progress notify
            });
    };

    $scope.hobbysubmit = function(hobbiesimag,existid){
            Upload.upload({
                url: apiUrl+"api/v1/student/api/v1/hobbyinfo/",
                data: {student:$scope.hobbyformadd.stud_id,image: hobbiesimag,name:$scope.hobbyformadd.name,description:$scope.hobbyformadd.description},
                method:'POST',
            }).then(function(resp) {
              // file is uploaded successfully
              $scope.hobbiesmessage = 'Successfully updated';
              $scope.hobbies_edit();
              $scope.hobbyformadd.name = "";
              $scope.hobbyformadd.description = "";
              $scope.hobbyformadd.imagesrc = "";
              $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            }, function(resp) {
              // handle error
            }, function(evt) {
              // progress notify
            });
    };

    $scope.edithobby= function(hobby){
        $scope.hobbyformadd.existing_id = hobby.id;
        $scope.hobbyformadd.imagesrc = hobby.image;
        $scope.hobbyformadd.name = hobby.name;
        $scope.hobbyformadd.description = hobby.description;
    };
    $scope.removehobby = function(id){
        $http.delete(apiUrl+"api/v1/student/api/v1/hobbyinfo/"+id+"/")
        .then(function (response) {
            $scope.hobbiesmessage = 'Successfully Deleted';
            $scope.hobbies_edit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };
    $scope.secharacterbtndisable =  false;
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
        $http.get(apiUrl+"api/v1/student/get_studentcharacteristics_details/"+$rootScope.user_id+"/")
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
    $scope.student_edit_profile_character_reset = function(){
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
            $scope.secharacterbtndisable = true;
        }
        else{
            $scope.secharacterbtndisable = false;
        }
    }
    $scope.charactersubmit = function(){
        $scope.selectchar = [];
        angular.forEach($scope.selectedCharacter, function (selected, characters) {
            if (selected) {
                $scope.selectchar.push({student:$rootScope.stud_id,character:characters});
            }
        });

        $http.post(apiUrl+"api/v1/student/api/v1/studentcharacteristic/",JSON.stringify($scope.selectchar))
        .then(function (response) {
            $scope.charactermessage = 'Successfully updated';
            $scope.character_edit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
        //alert(JSON.stringify($scope.selectchar));
    };
    $scope.sewhatiamlookingbtndisable =  false;
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
        $http.get(apiUrl+"api/v1/student/api/v1/get_whatiamlooking_details/"+$rootScope.stud_id+"/")
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
            $scope.sewhatiamlookingbtndisable = true;
        }
    };
    $scope.student_edit_profile_looking_reset = function(){
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
            $scope.sewhatiamlookingbtndisable = true;
        }
        else{
            $scope.sewhatiamlookingbtndisable = false;
        }
    }
    $scope.whatiamlookingsubmit = function(){
        $scope.selectlook = [];
        angular.forEach($scope.whatiamlooking, function (selected, lookgin) {
            if (selected) {
                $scope.selectlook.push({student:$rootScope.stud_id,whatimlooking:lookgin});

            }
        });
        // alert(JSON.stringify($scope.selectlook));

        $http.post(apiUrl+"api/v1/student/api/v1/whatiamlooking/",JSON.stringify($scope.selectlook))
        .then(function (response) {
            $scope.whatiammessage = 'Successfully updated';
            $scope.what_i_am_edit();
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
        });
    };


    //student edit profile - personal skill set
    $scope.skillsetpersonnalform = [{
        student:"",
        skill_type : "",
        name : "",
        rating : ""
    }];
    $scope.skillpersonnaledit = function(){
        $http.get(apiUrl+"api/v1/student/api/v1/get_skillset_details/"+$rootScope.user_id+"/")
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


    //student edit profile - professional skill set
    $scope.skillsetprofessionalform = [{
        student:"",
        skill_type : "",
        name : "",
        rating : ""
    }];
    $scope.skillprofessionaledit = function(){
        $http.get(apiUrl+"api/v1/student/api/v1/get_skillset_details/"+$rootScope.user_id+"/")
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

    //student edit profile - software skill set
    $scope.skillsetsoftwareform = [{
        student:"",
        skill_type : "",
        name : "",
        rating : ""
    }];
    $scope.skillsoftwareedit = function(){
        $http.get(apiUrl+"api/v1/student/api/v1/get_skillset_details/"+$rootScope.user_id+"/")
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
    $scope.student_edit_workhistroy_reset = function(){
        $scope.workhistroyform.company = "";
        $scope.workhistroyform.start_date = "";
        $scope.workhistroyform.leave_date = "";
        $scope.workhistroyform.job_title = "";
        $scope.workhistroyform.job_description = "";
        $scope.workhistroyform.editid = 0;
        $rootScope.dateerrMessage = false;
    }
    $http.get(apiUrl+"api/v1/student/get_experience_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.workhistroyupdateform = response.data;
            $scope.workhistroyupdateform.user = $rootScope.stud_id;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });

    $scope.workhistroyeedit = function(){
        $http.get(apiUrl+"api/v1/student/get_experience_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.workhistroyupdateform = response.data;
                $scope.workhistroyupdateform.user = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.workhistroyupdateformsubmit = function(idd,com,sd,ld,jt,jd){
        var workhistroy_data = {
            student : $rootScope.stud_id,
            company : com,
            start_date : sd,
            leave_date : ld,
            job_title : jt,
            job_description : jd
        }
            $http.patch(apiUrl+"api/v1/student/api/v1/experiencedetails/"+idd+"/",workhistroy_data)
            .then(function (response) {
                $scope.workhistroymessage = 'Successfully updated';
                $scope.workhistroyeedit();
                $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            });
    };

    $scope.workhistroyformsubmit = function(){
        var workhistroy_data = {
            student : $rootScope.stud_id,
            company : $scope.workhistroyform.company,
            start_date : $scope.workhistroyform.start_date,
            leave_date : $scope.workhistroyform.leave_date,
            job_title : $scope.workhistroyform.job_title,
            job_description : $scope.workhistroyform.job_description
        }
            $http.post(apiUrl+"api/v1/student/api/v1/experiencedetails/",workhistroy_data)
            .then(function (response) {
                $scope.workhistroymessage = 'Successfully Added';
                $scope.workhistroyeedit();
                $scope.workhistroyform.company = "";
                $scope.workhistroyform.start_date = "";
                $scope.workhistroyform.leave_date = "";
                $scope.workhistroyform.job_title = "";
                $scope.workhistroyform.job_description = "";
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
        $http.delete(apiUrl+"api/v1/student/api/v1/experiencedetails/"+workhistroyid+"/")
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
    $scope.student_edit_project_reset = function(){
        $scope.projecteditform.student="";
        $scope.projecteditform.title = "";
        $scope.projecteditform.start_date = "";
        $scope.projecteditform.completation_date = "";
        $scope.projecteditform.project_description = "";
        $scope.projecteditform.editid = 0;
        $scope.projecteditform.images = '';
        $rootScope.dateerrMessage = false;
    }
    $http.get(apiUrl+"api/v1/student/get_project_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.projecteditform = response.data;
            $scope.projecteditform.user = $rootScope.stud_id;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });
    $scope.projectsedit = function(){
        $http.get(apiUrl+"api/v1/student/get_project_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.projecteditform = response.data;
                $scope.projecteditform.user = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.projectsupdatesubmit = function(projectsimage, idd,tit,sd,cd,pd){

        if(projectsimage && (typeof(projectsimage) === 'object')){
            var projectdata = { student : $rootScope.stud_id,title : tit,start_date :sd, completation_date : cd, project_description : pd, image:projectsimage}
        }
        else{
            var projectdata = { student : $rootScope.stud_id,title : tit,start_date :sd, completation_date : cd, project_description : pd}
        }
        Upload.upload({
            url: apiUrl+"api/v1/student/api/v1/projectdetails/"+idd+"/",
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
            var projectdata = { student : $rootScope.stud_id,title : $scope.projecteditform.title,start_date : $scope.projecteditform.start_date,completation_date : $scope.projecteditform.completation_date,project_description : $scope.projecteditform.project_description,image:projectsimage}
        }
        else{
            var projectdata = { student : $rootScope.stud_id,title : $scope.projecteditform.title,start_date : $scope.projecteditform.start_date,completation_date : $scope.projecteditform.completation_date,project_description : $scope.projecteditform.project_description}
        }
        Upload.upload({
            url: apiUrl+"api/v1/student/api/v1/projectdetails/",
            data: projectdata,
            method:'POST',
        }).then(function(resp) {
            $scope.projectsedit();
            $scope.projectmessage = 'Successfully Added';
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            //$scope.projecteditform.splice(0, 0, response.data);
        }, function(resp) {
        }, function(evt) {
        });
    };

    $scope.removeprojects = function(projectsid){
        $http.delete(apiUrl+"api/v1/student/api/v1/projectdetails/"+projectsid+"/")
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

    $scope.removeeducation = function(id){
        $http.delete(apiUrl+"api/v1/student/api/v1/educationdetails/"+id+"/")
            .then(function successCallback(response){
                $scope.educationedit();
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.student_edit_school_reset = function(){
        $scope.educationform.student="";
        $scope.educationform.school_name = ""
        $scope.educationform.year_started = ""
        $scope.educationform.year_graduated = "";
        $scope.educationform.major  = "";
        $scope.educationform.gpa = "";
    }
    $http.get(apiUrl+"api/v1/student/api/v1/get_education_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.educationupdateform = response.data;
            $scope.educationupdateform.user = $rootScope.stud_id;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });
    $scope.educationedit = function(){
        $http.get(apiUrl+"api/v1/student/api/v1/get_education_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.educationupdateform = response.data;
                $scope.educationupdateform.user = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.educationupdatesubmit = function(idd,sn,mr,ys,yg,gp){
        var education_data = {
            student : $rootScope.stud_id,
            school_name : sn,
            year_started : ys,
            year_graduated : yg,
            major : mr,
            gpa : gp,
        }
          $http.patch(apiUrl+"api/v1/student/api/v1/educationdetails/"+idd+"/",JSON.stringify(education_data))
          .then(function (response) {
              $scope.educationedit();
              $scope.educationmessage = 'Successfully updated';
              $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
          });
    };

    $scope.educationsubmit = function(){
        var education_data = {
            student : $rootScope.stud_id,
            school_name : $scope.educationform.school_name,
            year_started : $scope.educationform.year_started,
            year_graduated : $scope.educationform.year_graduated,
            major : $scope.educationform.major,
            gpa : $scope.educationform.gpa,
        }
          $http.post(apiUrl+"api/v1/student/api/v1/educationdetails/",JSON.stringify(education_data))
          .then(function (response) {
              $scope.educationedit();
              $scope.educationmessage = 'Successfully updated';
              $scope.educationform.student="";
              $scope.educationform.school_name = ""
              $scope.educationform.year_started = ""
              $scope.educationform.year_graduated = "";
              $scope.educationform.major  = "";
              $scope.educationform.gpa = "";
              $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
          });
    };

    //student edit profile - leadership role
    $scope.leadershipform = {
        student:"",
        leadership_role : "",
        description : "",
        editid : 0,

    };
    $http.get(apiUrl+"api/v1/student/get_leadershiproles_details/"+$rootScope.user_id+"/")
        .then(function successCallback(response){
            $scope.leadershipupdateform = response.data;
            $scope.leadershipupdateform.student = $rootScope.stud_id;
        }, function errorCallback(response){
            console.log("Unable to perform get student profile details");
    });

    $scope.leadershipedit = function(){
        $http.get(apiUrl+"api/v1/student/get_leadershiproles_details/"+$rootScope.user_id+"/")
            .then(function successCallback(response){
                $scope.leadershipupdateform = response.data;
                $scope.leadershipupdateform.student = $rootScope.stud_id;
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };
    $scope.student_edit_leadership_reset = function(){
        $scope.leadershipform.student = "";
        $scope.leadershipform.leadership_role = "";
        $scope.leadershipform.description = "";
        $scope.leadershipform.editid = 0;
    }

    $scope.leadershipupdatesubmit = function(idd,lr,des){
        var leadership_data = {
            student : $rootScope.stud_id,
            leadership_role : lr,
            description : des
        }
          $http.patch(apiUrl+"api/v1/student/api/v1/leadershipdetails/"+idd+"/",JSON.stringify(leadership_data))
          .then(function (response) {
              $scope.leadershipedit();
              $scope.leadershipmessage = 'Successfully updated';
              $window.scrollTo(0, 0);
          });
    };
    $scope.leadershipsubmit = function(){
        var leadership_data = {
            student : $rootScope.stud_id,
            leadership_role : $scope.leadershipform.leadership_role,
            description : $scope.leadershipform.description
        }
        $http.post(apiUrl+"api/v1/student/api/v1/leadershipdetails/",JSON.stringify(leadership_data))
        .then(function (response) {
            $scope.leadershipedit();
            $scope.leadershipmessage = 'Successfully Added';
            $window.scrollTo(0, 0);
            $scope.leadershipform.leadership_role = "";
            $scope.leadershipform.description ="";

        });
    };

    $scope.removeleadership = function(leadershipid){
        $http.delete(apiUrl+"api/v1/student/api/v1/leadershipdetails/"+leadershipid+"/")
        .then(function (response) {
            $scope.leadershipmessage = 'Successfully Deleted';
            $scope.leadershipedit();
            $window.scrollTo(0, 0);
            $scope.leadershipform.leadership_role = "";
            $scope.leadershipform.description ="";

        });
    };
    $scope.resumegetform = {
        resume:null
    }
    $scope.getstudentresume = function(){
        $http.get(apiUrl+"api/v1/student/api/v1/studentprofile/"+$rootScope.stud_id+"/")
            .then(function successCallback(response){
                $scope.resumegetform = response.data;
                $('#studentresumeid').empty();
                var url = 'https://docs.google.com/gview?url=';
                url += $scope.resumegetform.resume;
                url += '&amp;embedded=true';
                var iframe = '<iframe src="'+url+'" width="600" height="400" style="border: none;" id="document-preview"></iframe>';
                $('#studentresumeid').html(iframe);
            }, function errorCallback(response){
                console.log("Unable to perform get student profile details");
        });
    };

    $scope.resumesubmit = function(uploadresume){
        Upload.upload({
            url: apiUrl+"api/v1/student/api/v1/studentprofile/"+$rootScope.stud_id+"/",
            data: {user:$rootScope.user_id,resume: uploadresume},
            method:'PUT',
        }).then(function(response){
            $scope.getstudentresume();
        });
    };


});





FirstSynch.controller("studentbasicprofileupload" , function ($location,$timeout,$window,$rootScope,Upload, $scope, $http, apiUrl) {
    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {
        $scope.files = [];
        $scope.$apply(function () {
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }

        });
    };
    //$scope.student_edit_profile_reset = fu
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
    $scope.getStudentBasicProfileDetials = function(){
      if($location.search()['addvideo']){
        $('.accordion-toggle').removeClass('active');
        $(".student_edit_profile_sidebar_addvideo").parents('.student_edit_profile_side_parent').find('.student_edit_profile_side_child_collapsable').toggle();
        $('.student_edit_profile_sidebar_addvideo').addClass('active');
        $('.student_edit_profile_main_content_child').hide();
        $timeout( function(){
          $(document).find('#proudest-achievement').removeClass('hide').show();
          $http.get(apiUrl+"api/v1/student/api/v1/student_uploadedvideo_list/"+$rootScope.user_id+"/")
              .then(function successCallback(response){
                  $scope.video_list = response.data;
              }, function errorCallback(response){
                  console.log("Unable to perform get student videos details");
          });
        }, 1000 );
      }
      else {
        $http.get(apiUrl+"api/v1/student/get_student_details/"+$rootScope.user_id+"/")
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
                $scope.basicprofileform.resume = response.data[0].resume;
            }, function errorCallback(response){
                console.log("Unable to perform get student basic profile details");
        });
      }

    };

    $scope.student_edit_profile_reset = function(){
        $scope.getStudentBasicProfileDetials();
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
                url: apiUrl+"api/v1/student/api/v1/studentprofile/"+$scope.basicprofileform.id+"/",
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
        $http.patch(apiUrl+"api/v1/student/api/v1/studentprofile/"+$scope.basicprofileform.id+"/",data)
        .then(function (response) {
            $window.scrollTo(0, angular.element(document.getElementsByClassName('success_top_act')).offsetTop);
            $scope.basicprofilemessage = 'Successfully updated';

        });
    };
    $scope.$watch('$viewContentLoaded', function(){
        $timeout( function(){
            $window.loading_screen.finish();
       }, 3000 );
    });
});
//////////////////////////////////////////Directive ///////////////////////////
FirstSynch.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}])
