// Simple function to scroll to top of page
$(document).ready(function() {
  $(this).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $(".scroll-top").fadeIn();
    } else {
      $(".scroll-top").fadeOut();
    }
  });
  $(".scroll-top").click(function() {
    $(document).scrollTop(0);
  });
});