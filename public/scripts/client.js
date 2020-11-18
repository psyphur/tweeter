/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  submitTweet();
  loadTweets();
})

const renderTweets = function(tweets) {
  const $container = $(document).find(".tweets-container");
  for (tweet of tweets) {
    $container.append(createTweetElement(tweet));
  }
}

const createTweetElement = function(tweet) {
  let $tweet = $(`
    <article class="tweet">
      <header>
        <img class="avatar"" src="${tweet.user.avatars}">
        <div class="growable">${tweet.user.name}</div>
        <div class="username">${tweet.user.handle}</div>
      </header>
      <p>${tweet.content.text}</p>
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
  // to fix: day(s) condition for if more than 1 day
  return $tweet;
}

const submitTweet = function() {
  const $submitForm = $(".submit-tweet");
  $submitForm.submit(function(e) {
    e.preventDefault();
    alert("submit called")
    console.log($(this).serialize());
    $.ajax({ 
      method: 'POST',
      url: "/tweets",
      data: $(this).serialize(),
    })
    .then(function(data) {
      console.log("success", data);
    })
  })
}

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function(data) {
    renderTweets(data);
  })
}

function getDatePosted(datetime) {
  const d = new Date();
  const datePosted = new Date(datetime);
  const timeDifference = d.getTime() - datePosted.getTime();
  return Math.round(timeDifference / (1000 * 3600 * 24));
}


