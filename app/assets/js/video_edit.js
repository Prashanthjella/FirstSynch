//Video Edit Start
$(document).on('shown.bs.modal','#page-editvideo-edit', function () {

  var videoFile = $('#hidden_source').val();
  $("#edit_video_load video source").attr('src', videoFile);
  $("#edit_video_load video")[0].load();

  var myVideoPlayer = document.getElementById('video_edit_myvideo');
  myVideoPlayer.addEventListener('loadedmetadata', function () {
    var video_duration = myVideoPlayer.duration;
  });

  var playButton = document.getElementById("play-pause");
  var muteButton = document.getElementById("mute");
  var fullScreenButton = document.getElementById("full-screen");
  var currentMode = document.getElementById("current-mode");

  var v =  document.querySelector("#video_edit_myvideo");
  var b =  document.querySelector("#video_edit_bar");
  var t =  document.querySelector("#thumb");
  var canvas_bar =  document.querySelector("#video_edit_canvas_bar");


  var timeLabel = document.getElementById("current-time");
  //var setinSet = document.querySelector("#setin-set");
  //var setoutSet = document.querySelector("#setout-set");
  var inpoint = document.querySelector("#video_edit_inpoint");
  var outpoint = document.querySelector("#video_edit_outpoint");
  var previewbtn = document.querySelector("#previewbtn");

  var previewMode = false;

  v.addEventListener('click',play,false);
  v.addEventListener('timeupdate',update,false);
  v.addEventListener('seeked',seeked,false);
  //b.addEventListener('mouseover',show,false);
  //b.addEventListener('mouseout',hide,false);
  //b.addEventListener('mousemove',render,false);
  b.addEventListener('click',seek,false);

  var barwidth = 605 //b.offsetWidth;
  var barheight = 50 //b.offsetHeight;

  var ctx = canvas_bar.getContext('2d');

  //	setinSet.addEventListener('click',setin,false);
  //	setoutSet.addEventListener('click',setout,false);
  //	previewbtn.addEventListener('click',onPreview,false);



  /*-------------------------Step 3. Capture images and put them in time line. Start ----------------------------*/
  var video_length = 0;
  var thumbnailing = 0;

  var intId = 0;
  var temp = 0;

  v.addEventListener('loadeddata', function() {
    //Get Video Length and Dimensions.
    video_length = v.duration;

    max_time = video_length;

    //Get Width of video thumb items.
    thumb_width =  parseInt(barheight * v.videoWidth / v.videoHeight);
    thumb_height = barheight;

    canvas_bar.width = barwidth;
    canvas_bar.height = barheight;

    thumbnailing = 1;

    makeTimeBackground(thumb_width);
    //show "Loading" when adding snaps

  }, false);

  function makeTimeBackground(thumb_width){
    moveSeek(thumb_width);
  }

  function moveSeek(thumb_width) {
    if(thumbnailing == 1) {

      if( (temp * parseInt(thumb_width) ) < parseInt(barwidth) + parseInt(thumb_width) ) {
        v.currentTime = parseInt(video_length) * temp * parseInt(thumb_width) / parseInt(barwidth);
        setTimeout(function(){ makeTimeBackground(thumb_width); },300);
      } else {
        thumbnailing = 0;
        v.currentTime = 0;
      }
    }
  }

  function seeked(){
    ctx.drawImage(v,temp*thumb_width,0,thumb_width,thumb_height);
    temp++;
  }

  /*-------------------------Step 3. Capture images and put them in time line. End ----------------------------*/

  /*-------------------------Step 4. Sliding Event Start -------------------------- ----------------------------*/

  // var current_video_position = 0;
  // var min_time = 0;
  // var max_time = 0;
  // var min_val = 0;
  // var max_val = 0;
  //
  // var cursormoving = 0;
  // $(function(){
  //   // Slider
  //   $('#video_edit_inoutbar').dragslider({
  //     animate: false,
  //     range: true,
  //     rangeDrag: true,
  //     start: function ( event, ui ){
  //       $("#video_edit_thumb1").removeClass("hidden");
  //       $("#video_edit_thumb2").removeClass("hidden");
  //     },
  //     slide: function ( event, ui ){
  //       trackwidth = $("#video_edit_inoutbar").width();
  //
  //       min_val = ui.values[0];
  //       if(min_val < last_val){
  //         min_val = last_val;
  //         $('#video_edit_inoutbar').dragslider('values',0,last_val);
  //       }
  //       max_val = ui.values[1];
  //       p1 = trackwidth * min_val / 100;
  //       p2 = trackwidth * max_val / 100;
  //
  //       $("#video_edit_inoutbar").css({"background": "linear-gradient(to right, rgba(225,225,225,0.8)"+(p1-1)+"px,rgba(225,225,225,0) "+p1+"px, rgba(225,225,225,0)"+p2+"px, rgba(225,225,225,0.8) "+(p2+1)+"px, rgba(255,255,255,0.8) 100%)"});
  //
  //       min_time = video_length * min_val / 100;
  //       max_time = video_length * max_val / 100;
  //
  //       $("#video_edit_thumb1").html(getTimeFormat(min_time));
  //       left = parseInt(p1) + 15;
  //       $("#video_edit_thumb1").css("left",left+"px");
  //       $("#video_edit_thumb2").html(getTimeFormat(max_time));
  //       left = parseInt(p2) + 15;
  //       $("#video_edit_thumb2").css("left",left+"px");
  //
  //       if(current_video_position < min_time){
  //         current_video_position = min_time;
  //         v.currentTime = min_time;
  //       }
  //     },
  //     change:function( event, ui ) {
  //
  //       $("#video_edit_thumb1").addClass("hidden");
  //       $("#video_edit_thumb2").addClass("hidden");
  //
  //       trackwidth = $("#video_edit_inoutbar").width();
  //
  //       p1 = trackwidth * ui.values[0] / 100;
  //       p2 = trackwidth * ui.values[1] / 100;
  //
  //       $("#video_edit_inoutbar").css({"background": "linear-gradient(to right, rgba(225,225,225,0.8)"+(p1-1)+"px,rgba(225,225,225,0) "+p1+"px, rgba(225,225,225,0)"+p2+"px, rgba(225,225,225,0.8) "+(p2+1)+"px, rgba(255,255,255,0.8) 100%)"});
  //
  //       min_val = ui.values[0];
  //       if(min_val < last_val){
  //         min_val = last_val;
  //         $('#video_edit_inoutbar').dragslider('values',0,last_val);
  //       }
  //       max_val = ui.values[1];
  //       min_time = video_length * min_val / 100;
  //       max_time = video_length * max_val / 100;
  //
  //       if(current_video_position < min_time){
  //         current_video_position = min_time;
  //         v.currentTime = min_time;
  //       }
  //
  //     },
  //     stop: function( event, ui ) {
  //
  //       $("#video_edit_thumb1").addClass("hidden");
  //       $("#video_edit_thumb2").addClass("hidden");
  //
  //       trackwidth = $("#video_edit_inoutbar").width();
  //
  //       p1 = trackwidth * ui.values[0] / 100;
  //       p2 = trackwidth * ui.values[1] / 100;
  //
  //       $("#video_edit_inoutbar").css({"background": "linear-gradient(to right, rgba(225,225,225,0.8)"+(p1-1)+"px,rgba(225,225,225,0) "+p1+"px, rgba(225,225,225,0)"+p2+"px, rgba(225,225,225,0.8) "+(p2+1)+"px, rgba(255,255,255,0.8) 100%)"});
  //
  //       min_val = ui.values[0];
  //       if(min_val < last_val){
  //         min_val = last_val;
  //         $('#video_edit_inoutbar').dragslider('values',0,last_val);
  //       }
  //       max_val = ui.values[1];
  //       min_time = video_length * min_val / 100;
  //       max_time = video_length * max_val / 100;
  //
  //       if(current_video_position < min_time){
  //         current_video_position = min_time;
  //         v.currentTime = min_time;
  //       }
  //
  //     },
  //     values: [0, 100]
  //   });
  //
  //   $('.videocursor').pep({
  //     axis: 'x',
  //     debug: false,
  //     useCSSTranslation: false,
  //     shouldEase: false,
  //     constrainTo: 'parent',
  //     start: function(){
  //       v.pause();
  //       $("#video_edit_thumb1").removeClass("hidden");
  //       cursormoving = 1;
  //     },
  //     drag: function(){
  //
  //
  //       pos = parseFloat($(".videocursor").css("left"));
  //       movetime = pos * video_length / parentwidth;
  //
  //       $("#video_edit_thumb1").html(getTimeFormat(movetime));
  //       left = parseInt(pos) + 15;
  //       $("#video_edit_thumb1").css("left",left+"px");
  //
  //       v.currentTime = movetime;
  //     },
  //     stop: function(){
  //       $("#video_edit_thumb2").addClass("hidden");
  //       pos = parseFloat($(".videocursor").css("left"));
  //       v.currentTime = pos * video_length / parentwidth;
  //       cursormoving = 0;
  //     }
  //   });
  // });
  //
  //
  // /*-------------------------Step 4. Sliding Event End -------------------------- ----------------------------*/
  //
  // /*-------------------------Step 5. Cursor Event Start -------------------------- ----------------------------*/
  // var parentwidth = $("#video_edit_parent").width();
  // function play() {
  //   if(v.paused) { v.play(); } else { v.pause(); }
  // }
  //
  // function update() {
  //   if(thumbnailing == 0) {
  //
  //     if(v.currentTime >= max_time){
  //       v.currentTime = min_time;
  //     }
  //
  //     if(v.currentTime < min_time){
  //       v.currentTime = min_time;
  //     }
  //
  //     if(cursormoving == 0){
  //       p = v.currentTime/v.duration;
  //       pos = parentwidth * p;
  //       $(".videocursor").css("left",pos);
  //     }
  //   }
  // }
  //
  // function seek(e) {
  //   alert(e);
  //   v.currentTime = (e.pageX-b.offsetLeft)*v.duration/barwidth;
  // }
  function getTimeFormat(nowtime)
  {
    var sec_num = parseInt(nowtime, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    var str = "";

    if(hours > 0) {
      if (hours   < 10) {str = str + "0"+hours;}
      //str = str + ":";
    }

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    str = minutes + ":" +seconds;
    return str;
  }
});//modal shown
