window.addEventListener("DOMContentLoaded", function () {
  var head = document.getElementById("head");
  if (!head) return;

  head.addEventListener("mouseover", function () {
    head.style.color = "red";
  });

  head.addEventListener("mouseout", function () {
    head.style.color = "black";
  });
});