var x = parseInt(prompt("Введите значение x", ""), 10);
var y = parseInt(prompt("Введите значение y", ""), 10);

if (x === y) {
  alert("Введенные числа равны!");
} else if (x < y) {
  alert("Максимальное число - y");
} else {
  alert("Максимальное число - x");
}

var password = "secret";
var userPassword = prompt("Введите пароль:", "");

if (userPassword === password) {
  document.write("<p>Пароль верен. Доступ разрешён.</p>");
} else {
  document.write("<p>Пароль введён неправильно. Доступ запрещён.</p>");
}