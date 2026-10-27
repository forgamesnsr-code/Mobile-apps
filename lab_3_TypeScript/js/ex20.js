window.addEventListener("load", function () {
  var img = document.getElementById("boat");
  if (!img) return;

  function moveImage() {
    // Получаем текущую позицию по горизонтали (если нет — берем 0)
    var left = parseInt(img.style.left, 10) || 0;

    // Двигаем картинку вправо, пока она не уйдет за правый край экрана
    if (left < window.innerWidth) {
      img.style.left = (left + 3) + "px"; // Скорость движения (3 пикселя за шаг)
      setTimeout(moveImage, 20);          // Задержка (20 мс)
    }
  }

  // Запускаем движение
  moveImage();
});