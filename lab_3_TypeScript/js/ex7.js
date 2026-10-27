function splitSubjects() {
  var allSubjects = [
    "Математика", "Физика", "Информатика", "Химия",
    "История", "Литература", "Русский язык", "Философия", "Английский язык", "МХК"
  ];

  var exact = allSubjects.slice(0, 4);
  var humanities = allSubjects.slice(4, 10);

  document.write("<h3>Точные науки:</h3><p>" + exact.join(", ") + "</p>");
  document.write("<h3>Гуманитарные науки:</h3><p>" + humanities.join(", ") + "</p>");
}

splitSubjects();
