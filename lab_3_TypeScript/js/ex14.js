window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("regForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    var f = form;

    if (f.name.value === "") {
      alert("Вы должны заполнить поле «Ваше имя»");
      f.name.focus();
      e.preventDefault();
      return;
    }

    if (f.password.value === "" || f.password.value.length <= 4) {
      alert("Пароль должен быть заполнен и содержать более 4-х символов");
      f.password.focus();
      e.preventDefault();
      return;
    }

    if (f.password.value !== f.confirmPassword.value) {
      alert("Пароли не совпадают");
      f.confirmPassword.focus();
      e.preventDefault();
      return;
    }

    if (f.email.value === "" || f.email.value.indexOf("@") === -1) {
      alert("Введите корректный электронный адрес, содержащий символ @");
      f.email.focus();
      e.preventDefault();
      return;
    }

    if (f.message.value === "" || f.message.value.length <= 10) {
      alert("Сообщение должно содержать больше 10 символов");
      f.message.focus();
      e.preventDefault();
      return;
    }

    alert("Все поля заполнены верно!");
  });
});