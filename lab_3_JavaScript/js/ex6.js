window.addEventListener("DOMContentLoaded", function () {
  var table = document.querySelector("table");
  if (!table) return;

  for (var i = 0; i <= 5; i++) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "1<sup>" + i + "</sup>";
    cell2.innerHTML = Math.pow(1, i);
  }
});