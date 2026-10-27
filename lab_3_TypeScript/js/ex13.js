window.addEventListener("DOMContentLoaded", function () {
  var pic = document.getElementById("pic");
  if (!pic) return;

  pic.addEventListener("mouseover", function () {
    pic.width = pic.width * 1.5;
    pic.height = pic.height * 1.5;
  });

  pic.addEventListener("mouseout", function () {
    pic.width = pic.width / 1.5;
    pic.height = pic.height / 1.5;
  });
});