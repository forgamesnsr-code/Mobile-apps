window.addEventListener("DOMContentLoaded", function () {
  var appName = navigator.appName;
  var userAgent = navigator.userAgent;

  // 1. Проверка на Internet Explorer (в IE appName === "Microsoft Internet Explorer")
  if (appName.indexOf("Microsoft") !== -1) {
    window.location.href = "Ex1.html";
    return; // Прерываем выполнение, чтобы не сработали другие условия
  }

  // 2. Проверка на Microsoft Edge
  // Современный Edge (на Chromium) в appName пишет "Netscape", но в userAgent есть "Edg/"
  // Старый Edge (EdgeHTML) имел "Edge/" в userAgent
  if (userAgent.indexOf("Edg") !== -1 || userAgent.indexOf("Edge") !== -1) {
    window.location.href = "Ex1.html"; // Перенаправляем Edge на Ex1.html (как и IE)
    return;
  }

  // 3. Проверка на Brave
  // Brave скрывает себя, но в userAgent содержит "Brave"
  if (userAgent.indexOf("Brave") !== -1) {
    window.location.href = "Ex1.html"; // Перенаправляем Brave на Ex1.html
    return;
  }

  // 4. Все остальные браузеры (Chrome, Firefox, Safari, Opera и т.д.)
  window.location.href = "Ex3.html";
});