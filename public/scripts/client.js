/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Wait for DOM to be fully loaded before we start our function calls
  submitTweet();
  loadTweets();
  
  // Automatically focuses the toggleable tweet composer
  $(".show-new-tweet").click(function() {
    $(".new-tweet").toggle("slow", function() {
      $(".tweet-input").focus();
    });
  });
});

const renderTweets = function(tweets) {
  const $container = $(document).find(".tweets-container");
  for (tweet of tweets) {
    $container.prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function(tweet) {
  let $tweet = $(`
    <article class="tweet">
      <header>
        <img class="avatar"" src="${escape(tweet.user.avatars)}">
        <div class="growable">${escape(tweet.user.name)}</div>
        <div class="username">${escape(tweet.user.handle)}</div>
      </header>
      <p>${escape(tweet.content.text)}</p>
        <div class="separator"></div>
        <footer>
          <label class="date-posted">${getDatePosted(tweet.created_at)} days ago</label>
          <label class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </label>
        </footer>
    </article>
  `);
  return $tweet;
};

const submitTweet = function() {
  const $submitForm = $(".submit-tweet");
  const $input = $submitForm.find(".tweet-input");

  $submitForm.submit(function(e) {
    const inputValue = $input.val().trim();
    if (inputValue !== "" && $input.val().length <= 140) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: "/tweets",
        data: $(this).serialize(),
      })
        .then(function() {
          $(".input-warning").slideUp("slow");
          $(".length-warning").slideUp("slow");
          $submitForm.trigger('reset');
          loadTweets();
          $(".tweet-input").focus();
        });
    } else if ($input.val().length > 140) {
      e.preventDefault();
      $(".input-warning").hide();
      $(".length-warning").slideDown("slow").css({"display": "flex"});
    } else {
      e.preventDefault();
      $(".length-warning").hide();
      $(".input-warning").slideDown("slow").css({"display": "flex"});
    }
  });
};

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
      renderTweets(data);
    });
};

// Escape function to prevent XSS attacks on tweet form
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function getDatePosted(datetime) {
  const d = new Date();
  const datePosted = new Date(datetime);
  const timeDifference = d.getTime() - datePosted.getTime();
  return Math.round(timeDifference / (1000 * 3600 * 24));
}

