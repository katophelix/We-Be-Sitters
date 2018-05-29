// When users click "save-name"
$("#sticky-submit").on("click", function(event) {
    // This line prevents the page from refreshing when a user hits "enter".
    event.preventDefault();

    // Clear the HTML from the greeting header
  //   $("#greeting").html("");

    // Grab the user input
    var stickyOne = $("#sticky1").val().trim();
    var stickyTwo = $("#sticky2").val().trim();
    var stickyThree = $("#sticky3").val().trim();
    var stickyFour = $("#sticky4").val().trim();
    var stickyFive = $("#sticky5").val().trim();
    var stickySix = $("#sticky6").val().trim();

    // Clear absolutely everything stored in localStorage using localStorage.clear()
    // localStorage.clear();

    // Store the username into localStorage using "localStorage.setItem"
    localStorage.setItem("storage1", stickyOne);
    localStorage.setItem("storage2", stickyTwo);
    localStorage.setItem("storage3", stickyThree);
    localStorage.setItem("storage4", stickyFour);
    localStorage.setItem("storage5", stickyFive);
    localStorage.setItem("storage6", stickySix);

    // And display that name for the user using "localStorage.getItem"
    // $("#greeting").text(localStorage.getItem("name"));

  });

  // // By default (upon load) show the name stored in localStorage using "localStorage.getItem"
  $("#sticky1").text(localStorage.getItem("storage1"));
  $("#sticky2").text(localStorage.getItem("storage2"));
  $("#sticky3").text(localStorage.getItem("storage3"));
  $("#sticky4").text(localStorage.getItem("storage4"));
  $("#sticky5").text(localStorage.getItem("storage5"));
  $("#sticky6").text(localStorage.getItem("storage6"));