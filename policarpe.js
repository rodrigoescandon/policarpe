jQuery(document).ready(function ($) {
  var $image = $("#draggable-image");
  var $link = $("#policarpe-link");
  var dragging = false;
  var touchStartTime;
  var touchStartPos;
  var defaultSrc = $image.attr('src');
  var hoverSrc = $image.data('hover');

  var messages = [
    "Hola, soy Policarpe. ¡Pícame!",
  ];
  var randomMessage = messages[Math.floor(Math.random() * messages.length)];

  var tooltipInstance = tippy("#draggable-image", {
    content: randomMessage,
    arrow: tippy.roundArrow + tippy.roundArrow,
    theme: "policarpe",
    placement: "top",
    followCursor: false,
    trigger: "manual",
    animation: "scale",
    duration: 100,
    offset: [0, 10], // Adjust this value to fine-tune the distance from the image
    popperOptions: {
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            tether: false,
          },
        },
      ],
    },
  });

  var tippyTooltip = tooltipInstance[0];

  function setRandomPosition() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var imageWidth = $image.width();
    var imageHeight = $image.height();

    var maxX = windowWidth - imageWidth;
    var maxY = windowHeight - imageHeight;

    var randomX = Math.random() * maxX;
    var randomY = Math.random() * maxY;

    $image.css({
      position: "fixed",
      left: randomX + "px",
      top: randomY + "px",
      cursor: "move",
    });
  }

  function adjustPositionOnResize() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var imageWidth = $image.width();
    var imageHeight = $image.height();

    var currentLeft = parseFloat($image.css("left"));
    var currentTop = parseFloat($image.css("top"));

    if (currentLeft + imageWidth > windowWidth) {
      $image.css("left", windowWidth - imageWidth + "px");
    }
    if (currentTop + imageHeight > windowHeight) {
      $image.css("top", windowHeight - imageHeight + "px");
    }
  }

  function updateTooltipPosition() {
    if (tippyTooltip.state.isVisible) {
      tippyTooltip.setProps({
        getReferenceClientRect: () => $image[0].getBoundingClientRect()
      });
    }
  }

  setRandomPosition();

  $image.draggable({
    containment: "window",
    start: function (event, ui) {
      dragging = true;
      tippyTooltip.show();
    },
    drag: function (event, ui) {
      updateTooltipPosition();
    },
    stop: function (event, ui) {
      dragging = false;
      updateTooltipPosition();
    },
  });

  $image.on("mouseenter", function () {
    $image.attr('src', hoverSrc);
    tippyTooltip.show();
  });

  $image.on("mouseleave", function () {
    $image.attr('src', defaultSrc);
    if (!dragging) {
      tippyTooltip.hide();
    }
    dragging = false;
  });

  // Touch event handlers
  $image.on("touchstart", function (e) {
    touchStartTime = new Date().getTime();
    touchStartPos = { x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY };
  });

  $image.on("touchend", function (e) {
    var touchEndTime = new Date().getTime();
    var touchEndPos = { x: e.originalEvent.changedTouches[0].pageX, y: e.originalEvent.changedTouches[0].pageY };
    
    var touchDuration = touchEndTime - touchStartTime;
    var touchDistance = Math.sqrt(Math.pow(touchEndPos.x - touchStartPos.x, 2) + Math.pow(touchEndPos.y - touchStartPos.y, 2));

    if (touchDuration < 500 && touchDistance < 10) {
      // This was a tap, not a drag
      e.preventDefault(); // Prevent default link behavior
      window.open($link.attr('href'), '_blank'); // Open link in new tab
    }
  });

  // Handle click for non-touch devices
  $link.on("click", function(e) {
    if (!dragging) {
      e.preventDefault(); // Prevent default link behavior
      window.open($(this).attr('href'), '_blank'); // Open link in new tab
    }
  });

  $(window).resize(function () {
    adjustPositionOnResize();
    updateTooltipPosition();
  });
});