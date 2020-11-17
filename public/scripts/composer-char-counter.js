const $tweetInput = $('#tweet-text');

$(document).ready(function() {
  console.log("Char Counter JS Ready");

  $($tweetInput).on('keyup', function() {
    const $counter = $(this).parent().find(".counter");
    const value = $(this).val();
    const MAX_CHARACTER_COUNT = 140;
  
    if (value.length <= MAX_CHARACTER_COUNT) {
      $counter.val(MAX_CHARACTER_COUNT - value.length).css("color", "inherit");
    } else {
      $counter.val(MAX_CHARACTER_COUNT - value.length).css("color", "red");
    }
  })
})

