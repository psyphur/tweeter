// counter function to count user's input char count
$(document).ready(function() {
  const $tweetInput = $(document).find(".tweet-input");

  $($tweetInput).on('input', function() {
    const $counter = $(this).parent().find(".counter");
    const value = $(this).val();
    const MAX_CHARACTER_COUNT = 140;
  
    if (value.length <= MAX_CHARACTER_COUNT) {
      $counter.val(MAX_CHARACTER_COUNT - value.length).css("color", "inherit");
    } else {
      $counter.val(MAX_CHARACTER_COUNT - value.length).css("color", "red");
    }
  });
});

