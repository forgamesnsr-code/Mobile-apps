var userName = window.prompt("Введите сюда своё имя", "Введите имя");
document.write("<p>Ваше имя: <b>" + userName + "</b></p>");

if (window.confirm("Начать заново?")) {
  window.alert("Не надоело?");
} else {
  window.alert("Ну и правильно!");
}