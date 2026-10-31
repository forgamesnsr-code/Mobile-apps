window.addEventListener("load", function () {
  var el = document.getElementById("anim");
  if (!el) return;

  // 1. Ставим текст в правый верхний угол
  el.style.top = "10px";
  el.style.left = (window.innerWidth - el.offsetWidth - 10) + "px"; 

  // 2. Вычисляем точные координаты середины экрана
  // (вычитаем половину ширины и высоты текста, чтобы в центре оказался сам текст, а не его левый верхний угол)
  var middleY = (window.innerHeight / 2) - (el.offsetHeight / 2);
  var middleX = (window.innerWidth / 2) - (el.offsetWidth / 2);

  function moveTxt() {
    var top  = parseInt(el.style.top, 10)  || 10;
    var left = parseInt(el.style.left, 10) || 0;

    var isMoving = false;

    // Двигаем вниз, пока не достигли середины по Y
    if (top < middleY) {
      el.style.top = (top + 2) + "px";
      isMoving = true;
    }

    // Двигаем влево, пока не достигли середины по X
    if (left > middleX) {
      el.style.left = (left - 2) + "px";
      isMoving = true;
    }

    // Если текст еще движется, продолжаем анимацию
    if (isMoving) {
      setTimeout(moveTxt, 10);
    }
  }

  moveTxt();
});