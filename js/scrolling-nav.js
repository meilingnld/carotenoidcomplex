//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
  } else {
    $(".navbar-fixed-top").removeClass("top-nav-collapse");
  }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  // bug fix: For xs screen width, if the browser is in Membership Page and clicks on one MENU url for StartupOpportunity page or vise versa, the browser shows an JS error (cannot read property 'top') in the smooth_scroll function and does not work properly.  It is because when the browser tries to jump to other page, new $($anchor) in the smooth_scroll function is missing in the original url.
  // solution: Remove the other page's class="page-scroll" in the DOM.  For example, if the browser is in Membership Page, then we remove StartupOpportunity's class="page-scroll".
  //When the browser jumps to the other page scroll, the smooth_scroll function does not run and the browser goes to the designated page as expected.
  var smooth_scroll = function(event) {
    var $anchor_parts = $(this).attr('href').split('#'),
    $anchor = 'a[name='+$anchor_parts[$anchor_parts.length-1]+']';

    // .offset() returns an Object.  If $anchor does not exist in this page, $($anchor).offset()) return undefined
    if ($($anchor).offset()) { //check whether $anchor exist in this page
      event.preventDefault();
      $('html, body').stop().animate({ // stop().
        scrollTop:  ($($anchor).offset().top - $(".navbar").height())
      }, 1500, 'easeInOutExpo');
    }
  };
  //Bind to any visible a tags
  $('a.page-scroll').bind('click', smooth_scroll); //required for pages that has no access to CMS
  //And bind to any that might be added by a call to the Content API
  $(document).on('neolife.content-ready', function(event) {
    $('a.page-scroll').bind('click', smooth_scroll);
    //Look for any scrollign that the user migth have been waiting for
    if(window.location.hash) {
      var $anchor = 'a[name='+window.location.hash.substring(1)+']';
      if ($($anchor).offset()) { //check whether $anchor exist in this page
        $('html, body').stop().animate({
          scrollTop:  ($($anchor).offset().top - $(".navbar").height())
        }, 1500, 'easeInOutExpo');
      }
    }
  });
});
