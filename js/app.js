/*!
 * Mindful App.js
 * http://mindful.im
 *
 * This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/deed.en_US
 */

(function($) {

  var $whitenoiseOpt = $('#whitenoise-opt'),
      $whitenoise = $('#whitenoise'),
      $tone = $('#tone');

  // Attach event handler for duration selection.
  $('.durations').on('click', 'a', function() {
    var duration = +$(this).data('duration');

    // Dim the lights...
    $('body').hide();

    if ($whitenoiseOpt.is(':checked')) {
      // fade in white noise...
      $whitenoise[0].volume = 0;
      $whitenoise[0].play();
      $whitenoise.animate({volume: 1}, 2000);
    }

    // and fill the screen.
    requestFullscreen();

    // Set timer to duration.
    setTimeout(function() {
      // Return screen to normal.
      exitFullscreen();
    }, (duration * 60000));
  });

  // Attach event handler for fullscreen changes.
  $(document).on('fullscreenchange mozfullscreenchange webkitfullscreenchange', function() {
    var isFullscreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;

    if ( ! isFullscreen) {

      if ($whitenoiseOpt.is(':checked')) {
        // Stop white noise.
        $whitenoise[0].pause();
      }

      // Play finish tone.
      $tone[0].play();

      // Turn on the lights.
      $('body').show();
    }
  });

  var requestFullscreen = function() {
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  };

  var exitFullscreen = function() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  };

}(jQuery));