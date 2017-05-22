$(document).ready(function() {

    $(document).on('hide.bs.modal','#VideoPopup1', function () {
        jwplayer('jwplayer').stop();
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
        $('.student_edit_profile_side_child_collapsable').hide();
        $(this).parents('.student_edit_profile_side_parent').find('.student_edit_profile_side_child_collapsable').toggle();
        // if($(this).parents('.student_edit_profile_side_parent').find('.student_edit_profile_side_child_collapsable').is(':visible')){
        //     $(this).parents('.student_edit_profile_side_parent').find('.student_edit_profile_side_child_collapsable').toggle();
        // }
    });
    $(document).on('click','.student_edit_profile_inner_title',function(){
        var current_div = $(this).attr('data-id');
        alert(current_div);
        $('.student_edit_profile_main_content_child').hide();
        $('#'+current_div).removeClass('hide').show();
    });
});
