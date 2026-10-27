window.addEventListener("DOMContentLoaded", function () {
  var pdfLink = document.getElementById("pdfLink");
  if (pdfLink) {
    pdfLink.addEventListener("click", function (e) {
      if (!confirm("Для загрузки документа требуется программа Acrobat. Продолжить загрузку?")) {
        e.preventDefault();
      }
    });
  }

  var bgLink = document.getElementById("bgLink");
  if (bgLink) {
    bgLink.addEventListener("mouseover", function () {
      document.body.style.background = "red";
    });
    bgLink.addEventListener("mouseout", function () {
      document.body.style.background = "#fafafa";
    });
  }
});