
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();

  (function( $, undefined ) {

    $.widget("ui.dragslider", $.ui.slider, {

      options: $.extend({},$.ui.slider.prototype.options,{rangeDrag:false}),

      _create: function() {
        $.ui.slider.prototype._create.apply(this,arguments);
        this._rangeCapture = false;
      },

      _mouseCapture: function( event ) {
        var o = this.options;

        if ( o.disabled ) return false;

        if(event.target == this.range.get(0) && o.rangeDrag == true && o.range == true) {
          this._rangeCapture = true;
          this._rangeStart = null;
        }
        else {
          this._rangeCapture = false;
        }

        $.ui.slider.prototype._mouseCapture.apply(this,arguments);

        if(this._rangeCapture == true) {
          this.handles.removeClass("ui-state-active").blur();
        }

        return true;
      },

      _mouseStop: function( event ) {
        this._rangeStart = null;
        return $.ui.slider.prototype._mouseStop.apply(this,arguments);
      },

      _slide: function( event, index, newVal ) {
        if(!this._rangeCapture) {
          return $.ui.slider.prototype._slide.apply(this,arguments);
        }

        if(this._rangeStart == null) {
          this._rangeStart = newVal;
        }

        var oldValLeft = this.options.values[0],
        oldValRight = this.options.values[1],
        slideDist = newVal - this._rangeStart,
        newValueLeft = oldValLeft + slideDist,
        newValueRight = oldValRight + slideDist,
        allowed;

        if ( this.options.values && this.options.values.length ) {
          if(newValueRight > this._valueMax() && slideDist > 0) {
            slideDist -= (newValueRight-this._valueMax());
            newValueLeft = oldValLeft + slideDist;
            newValueRight = oldValRight + slideDist;
          }

          if(newValueLeft < this._valueMin()) {
            slideDist += (this._valueMin()-newValueLeft);
            newValueLeft = oldValLeft + slideDist;
            newValueRight = oldValRight + slideDist;
          }

          if ( slideDist != 0 ) {
            newValues = this.values();
            newValues[ 0 ] = newValueLeft;
            newValues[ 1 ] = newValueRight;

            // A slide can be canceled by returning false from the slide callback
            allowed = this._trigger( "slide", event, {
              handle: this.handles[ index ],
              value: slideDist,
              values: newValues
            } );

            if ( allowed !== false ) {
              this.values( 0, newValueLeft, true );
              this.values( 1, newValueRight, true );
            }
            this._rangeStart = newVal;
          }
        }



      },

    });

  })(jQuery);


  $(window).load(function (){

	  var winwidth=$(window).width();
if (winwidth <= 767 ) {

	$('.dashboard-filter .media').click(function(){
		$('.mobile-filter-cols').addClass('mobile-filter-cols-visible');
		});


	$('.media-mobile-left-arrow').click(function(){
		$('.mobile-filter-cols').removeClass('mobile-filter-cols-visible');

		});

}

    $('#reset_forms label, #reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
    $('.company_reset_forms label, .company_reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
  });

$(document).on('click','#dashboard-filter .modal-header', function () {
    $('#dashboard-filter').addClass('active');
  });

  $(document).on('click','#dashboard-filter.active .modal-header', function () {
    $('#dashboard-filter').removeClass('active');
  });
  $(document).on('click','#dashboard-filterc .modal-header', function () {
      $('#dashboard-filterc').addClass('active');
    });

    $(document).on('click','#dashboard-filterc.active .modal-header', function () {
      $('#dashboard-filterc').removeClass('active');
    });

  $(document).on('hide.bs.modal','#registration, #logIn, #ForgotPassword', function () {
    $('.common_js_remove_clas').empty();
    $('#reset_forms label, #reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
  });
  $(document).on('hide.bs.modal','#logIn', function () {
    $('form#reset_forms').trigger("reset");
    $('#reset_forms label, #reset_forms input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
  });

  $(document).on('hide.bs.modal','#VideoPopup1', function () {
    jwplayer('jwplayer').stop();
  });

  $(document).on('hide.bs.modal','#OfflineVideoPopup1', function () {
    if ($("#OfflineVideoPopup1").data('bs.modal') && $("#OfflineVideoPopup1").data('bs.modal').isShown){
      jwplayer('jwplayerofflinesignup').stop();
      jQuery("#companyverify").modal('show');
      setTimeout(function(){ jQuery("body").addClass('modal-open'); }, 1000);
    }
  });

  $(document).on('hide.bs.modal','#page-video-edit', function () {
    $("#inoutbar").removeAttr("style");
    $('#inoutbar').empty();
    $('#chapterss ul').empty();
    $('.after_video_process').hide();
    $('.before_video_process').show();
    $("#chapter_maker_thumb").show();
    $("#question").show();
    $('.second_video_data').hide();
    $('.none').show();
    $('#btn-upload').hide();
  });

  $(document).on('hide.bs.modal','#error_msg_model', function () {
    $("#student_video video").src = '';
    $("#student_video video").children('source').prop('src', '');
    $("#student_video video").remove().length = 0;
  });

  $(document).on('hide.bs.modal','#video_end', function () {
    $("#student_video video").src = '';
    $("#student_video video").children('source').prop('src', '');
    $("#student_video video").remove().length = 0;
  });

  $(window).scroll(function() {

    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      $(".sidebar-navi-default").addClass("sidebar-navi-fixed");
      $(".custom-navbar-default").addClass("navbar-fixed-top");
      $("body").addClass("fixed-scroll");
    } else {
      $(".sidebar-navi-default").removeClass("sidebar-navi-fixed");
      $(".custom-navbar-default").removeClass("navbar-fixed-top");
      $("body").removeClass("fixed-scroll");
    }
  });

  $('.grid').masonry({
    itemSelector: '.grid-item',
    //columnWidth: 373,
  });

  $(document).on('click','.student_edit_profile_side_child_title',function(){
    //$('.student_edit_profile_side_child_collapsable').hide();
		$('.accordion-toggle').removeClass('active');

    $(this).parents('.student_edit_profile_side_parent').find('.student_edit_profile_side_child_collapsable').toggle();
$(this).addClass('active');
    // if($(this).parents('.student_edit_profile_side_parent').find('.student_edit_profile_side_child_collapsable').is(':visible')){
    //     $(this).parents('.student_edit_profile_side_parent').find('.student_edit_profile_side_child_collapsable').toggle();
    // }
  });
  $(document).on('click','.company_edit_profile_side_child_title',function(){
    //$('.company_edit_profile_side_child_collapsable').hide();
	$('.accordion-toggle').removeClass('active');
    $(this).parents('.company_edit_profile_side_parent').find('.company_edit_profile_side_child_collapsable').toggle();
	$(this).addClass('active');
  });

  $(document).on('click','.student_edit_profile_inner_title',function(){
    var current_div = $(this).attr('data-id');
    $('.student_edit_profile_main_content_child').hide();
    $('#'+current_div).removeClass('hide').show();
  });

  $(document).on('click','.company_edit_profile_inner_title',function(){
    var current_div = $(this).attr('data-id');
    $('.company_edit_profile_main_content_child').hide();
    $('#'+current_div).removeClass('hide').show();
  });

  //Company My Career Fair Tab click an show
  $(document).on('click','#company_my_carrer_fair_act li',function(){
    var current_div = $(this).attr('data-id');
    $('.hide_act').hide();
    $('#'+current_div).show();
  });

  //Student My Career Fair Tab click an show
  $(document).on('click','#student_my_carrer_fair_act li',function(){
    var current_div = $(this).attr('data-id');
    $('.hide_act').hide();
    $('#'+current_div).show();
  });

  $(document).on('click','.edit_option',function(){
    $(this).parent().parent('.row').find('input,textarea').removeAttr('readonly').css({"border-style":"none none solid"}).focus();
  });

  $(document).on('click','.skill_click_function',function(){
    var skill_type = $(this).attr('title');
    $(this).parents('ul').find('li').removeClass('active');
    $(this).parent().addClass('active');
    $('.skill_show_main_function .skill_show_function').hide();
    $('.skill_show_main_function .skill_show_function').removeClass('ng-hide');
    $('.skill_show_main_function .skill_show_function.'+skill_type).show();
  });

  $(document).on('click','#userlogin',function(){
    var redirect = window.location.pathname;
    $('#redirecturl').val(redirect);
    if($(this).attr('videoid') != ''){
      $('#videoid').val(parseInt($(this).attr('videoid')));
    }
  });

  $(document).keydown(function(event) {
    if (event.keyCode == 27) {
      $('#logIn,#signUp,#companyverify,#dashboard-filter,#dashboard-filterc,#registration').modal('hide');
      $('#dashboard-filter').removeClass('active');
      $('#dashboard-filterc').removeClass('active');
      $('#VideoPopup1').modal('hide');
      $('#OfflineVideoPopup1').modal('hide');
      $('#companyregistration').modal('hide');
      //$('.modal-backdrop').remove();
    }
  });
  // $(document).on('shown.bs.modal','#registration,#logIn,#companyverify,#signUp', function () {
  //     var form_h8 =  $(window).height();
  //     var form_vith =  $(this).find('form .modal-content').width();
  //     $(this).find('form').css({'position':'absolute','top':'50%','left':'50%','margin-top':(-form_h8/2)+'px','margin-left':-form_vith/2+'px'});
  // });
  $(document).on('shown.bs.modal','#logIn', function () {
      var form_h8 =  $(this).find('form .modal-content').height();
      var form_vith =  $(this).find('form .modal-content').width();
      $(this).find('form').css({'position':'absolute','top':'50%','left':'50%','margin-top':(-form_h8/2)-30+'px','margin-left':-form_vith/2+'px'});
  });
  $(document).on('shown.bs.modal','#companyverify', function () {
      var form_h8 =  $(this).find('form .modal-content').height();
      var form_vith =  $(this).find('form .modal-content').width();
      $(this).find('form').css({'position':'absolute','top':'50%','left':'50%','margin-top':(-form_h8/2)-30+'px','margin-left':-form_vith/2+'px'});
  });
  $(document).on('shown.bs.modal','#registration', function () {
      var form_h8 =  $(this).find('form .modal-content').height();
      var form_vith =  $(this).find('form .modal-content').width();
      $(this).find('form').css({'position':'absolute','top':'50%','left':'50%','margin-top':(-form_h8/2)-10+'px','margin-left':-form_vith/2+'px'});
  });
  $(document).on('shown.bs.modal','#signUp', function () {
      var form_h8 =  $(window).height();
      var form_vith =  $(this).find('form .modal-content').width();
      $(this).find('form').css({'position':'absolute','top':'50%','left':'50%','margin-top':(-form_h8/2)+'px','margin-left':-form_vith/2+'px'});
  });
  $(document).on('shown.bs.modal','#companyregistration', function () {
      var form_h8 =  $(window).height();
      var form_vith =  $(this).find('form .modal-content').width();
      $(this).find('form').css({'position':'absolute','top':'50%','left':'50%','margin-top':(-form_h8/2)+'px','margin-left':-form_vith/2+'px'});
  });
  $(document).on('shown.bs.modal','#ForgotPassword', function () {
      var form_h8 =  $(this).find('form .modal-content').height();
      var form_vith =  $(this).find('form .modal-content').width();
      $(this).find('form').css({'position':'absolute','top':'50%','left':'50%','margin-top':(-form_h8/2)-10+'px','margin-left':-form_vith/2+'px'});
  });
  $(document).on('shown.bs.modal','#resetpassword', function () {
      var form_h8 =  $(this).find('form .modal-content').height();
      var form_vith =  $(this).find('form .modal-content').width();
      $(this).find('form').css({'position':'absolute','top':'50%','left':'50%','margin-top':(-form_h8/2)-10+'px','margin-left':-form_vith/2+'px'});
  });
  // $(document).on('shown.bs.modal','#initalVideopopup', function () {
  //     var form_h8 =  $(this).find('.video-model-container').height();
  //     var form_vith =  $(this).find('.video-model-container').width();
  //     $(this).find('.modal-dialog').css({'position':'absolute','top':'50%','left':'50%','margin-top':(-form_h8/2)-10+'px','margin-left':-form_vith/2+'px'});
  // });
  //Compay Account Settings Function
  //Edit Username
  $(document).on('click','.acc_show_act',function(){
    $('.edit_username_parent_act > .show_act').hide();
    $('.edit_username_parent_act > .hide_act').show();
    $('#student_setting_email').focus();
    $('#student_edit_username, #student_setting_password').val('');
    //hide edit password field
    $('.edit_password_parent_act > .show_act').show();
    $('.edit_password_parent_act > .hide_act').hide();
  });

  $(document).on('click','.cancel_act',function(){
    $('.edit_username_parent_act > .show_act').show();
    $('.edit_username_parent_act > .hide_act').hide();
    $('#student_edit_username, #student_setting_password').val('');
    $('.remove_class_act label, .remove_class_act input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
  });

  //Edit Passsword
  $(document).on('click','.pass_edit_show_act',function(){
    $('.edit_password_parent_act > .show_act').hide();
    $('.edit_password_parent_act > .hide_act').show();
    $('#student_setting_password').focus();
    $('#student_edit_username, #student_setting_password').val('');
    //hide edit username field
    $('.edit_username_parent_act > .show_act').show();
    $('.edit_username_parent_act > .hide_act').hide();
  });

  $(document).on('click','.password_cancel_act',function(){
    $('.edit_password_parent_act > .show_act').show();
    $('.edit_password_parent_act > .hide_act').hide();
    $('#student_edit_username, #student_setting_password').val('');
    $('.remove_class_act label, .remove_class_act input').removeClass('has-success has-error ng-invalid ng-not-empty ng-dirty ng-invalid-email ng-valid-required ng-touched');
  });

  $(document).on('click','.student_edit_hobbies_toggle',function(){
      $(this).siblings('.student_edit_hobbies_toggle_collapsable').toggle();
      if($(this).find('span').hasClass('glyphicon-minus')){
          $(this).find('span').addClass('glyphicon-plus');
          $(this).find('span').removeClass('glyphicon-minus');
          $(this).find('.hobbies_hide').removeClass('hide');

      }
      else if($(this).find('span').hasClass('glyphicon-plus')){
          $(this).find('span').addClass('glyphicon-minus');
          $(this).find('span').removeClass('glyphicon-plus');
          $(this).find('.hobbies_hide').addClass('hide');
      }
  });

 $(document).on('click','.custom-navbar-nav li a',function(){
		 $('.custom-navbar-default .navbar-collapse').removeClass('in');
	 });
    // $("body").on('click',function(){
    //     if($('#dashboard-filter').hasClass('active')){
    //         $("#dashboard-filter").removeClass("active");
    //     }
    //     if($('#dashboard-filterc').hasClass('active')){
    //         $("#dashboard-filterc").removeClass("active");
    //     }
    // });

  // Prevent events from getting pass .popup
    // $('').on('click',function(e){
    //   e.stopPropagation();
    // });
    // $('#dashboard-filterc .modal-content').on('click',function(e){
    //   e.stopPropagation();
    // });



  //Compay Account Settings Function End
});
