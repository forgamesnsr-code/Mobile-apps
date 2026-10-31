// Переменная для таймера, чтобы различать одиночный и двойной клики
var clickTimer = null;

// Функции из исходного примера (наведение мыши)
function addunderline() {
  var head = document.getElementById("head");
  if (!head) return;
  
  // Добавляем подчеркивание, сохраняя существующие эффекты
  if (head.style.textDecoration.indexOf("underline") === -1) {
    head.style.textDecoration = head.style.textDecoration.replace("none", "").trim() + " underline";
  }
}

function removeunderline() {
  var head = document.getElementById("head");
  if (!head) return;
  
  // Убираем только подчеркивание, оставляя остальные эффекты
  head.style.textDecoration = head.style.textDecoration.replace("underline", "").replace(/\s+/g, " ").trim();
  if (head.style.textDecoration === "") {
    head.style.textDecoration = "none";
  }
}

// Обработка ОДИНАРНОГО клика
function addoverline() {
  var head = document.getElementById("head");
  if (!head) return;
  
  // Если это первый клик — запускаем таймер
  if (clickTimer === null) {
    clickTimer = setTimeout(function() {
      // Добавляем полосу сверху (overline), если ее еще нет
      if (head.style.textDecoration.indexOf("overline") === -1) {
        head.style.textDecoration = head.style.textDecoration.replace("none", "").trim() + " overline";
      }
      clickTimer = null; // Сбрасываем таймер
    }, 250); // Ждем 250 мс (если второго клика не будет)
  }
}

// Обработка ДВОЙНОГО клика
function addlinethrough() {
  var head = document.getElementById("head");
  if (!head) return;
  
  // Отменяем действие одиночного клика
  clearTimeout(clickTimer);
  clickTimer = null;

  // Добавляем зачеркивание (line-through), если его еще нет
  if (head.style.textDecoration.indexOf("line-through") === -1) {
    head.style.textDecoration = head.style.textDecoration.replace("none", "").trim() + " line-through";
  }
}