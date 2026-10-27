function line(width) {
  document.write("<hr align='center' width='" + width + "'>");
}

for (var i = 1; i <= 10; i++) {
  line(i * 10);
}