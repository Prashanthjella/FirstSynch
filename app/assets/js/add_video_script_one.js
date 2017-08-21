  $(document).on("change", ".file_multi_video", function() {
    urlll = URL.createObjectURL(this.files[0]);
    $('#result').html('');
    $('#video_popup_loader').load('StudentRole/student_edit_profile/add_video_popup.html',function(){
        var $source = $('#student_video');
        $source[0].src = urlll;
        $source.parent()[0].load();
        var myVideoPlayer = document.getElementById('myvideo');
        myVideoPlayer.addEventListener('loadedmetadata', function () {
            var video_duration = myVideoPlayer.duration;
            if (video_duration <= 60 ){
              $('#page-video-edit').modal({show:true});
              $('#video_duration').val(video_duration);
            }else{
              $('#error_msg_model').modal('show');
            }
        });
    });//ON CHANGE FUNCTION
  });
