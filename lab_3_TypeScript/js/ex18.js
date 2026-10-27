window.addEventListener("load", function () {
  function moveTxt() {
    var el = document.getElementById("anil");
    if (!el) return;
    
    var top = parseInt(el.style.top, 10) || 10;

    if (top < 500) {
      el.style.top = (top + 2) + "px";
      setTimeout(moveTxt, 50);
    }
  }
  moveTxt();
});