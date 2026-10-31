/* common.js — общие утилиты для всех страниц практикума
   Подключается через: <script src="../js/common.js"></script>
 */

   
(function () {
  "use strict";

  /* ---------- Логирование ---------- */
  function log(msg) {
    if (window.console && console.log) {
      console.log("[JS-Practicum] " + msg);
    }
  }

  /* ---------- Безопасный parseInt с fallback ---------- */
  function toInt(value, fallback) {
    var n = parseInt(value, 10);
    return isNaN(n) ? (fallback || 0) : n;
  }

  /* ---------- Проверка: пустая строка? ---------- */
  function isEmpty(str) {
    return !str || str.trim() === "";
  }

  /* ---------- Проверка e-mail (простая) ---------- */
  function isEmail(str) {
    return typeof str === "string" && str.indexOf("@") > 0 && str.indexOf(".") > str.indexOf("@");
  }

  /* ---------- Экранирование HTML ---------- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ---------- Плавная анимация свойства ---------- */
  function animate(el, prop, from, to, step, interval, callback) {
    var current = from;
    var timer = setInterval(function () {
      current += step;
      if ((step > 0 && current >= to) || (step < 0 && current <= to)) {
        current = to;
        clearInterval(timer);
        if (typeof callback === "function") callback();
      }
      el.style[prop] = current + "px";
    }, interval || 30);
  }

  /* ---------- Экспорт в глобальную область ---------- */
  window.JS = {
    log: log,
    toInt: toInt,
    isEmpty: isEmpty,
    isEmail: isEmail,
    escapeHtml: escapeHtml,
    animate: animate
  };

  log("common.js загружен");
})();