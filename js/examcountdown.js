function constructExamCountDown(subjectName) {
  title = document.createElement("h3"); title.id = "title";
  clock = document.createElement("h1"); clock.id = "clock";
  total = document.createElement("p"); total.id = "total";
  title.innerHTML = subjectName;
  title.style.textAlign = "center";
  total.style.textAlign = "center";
  total.style.marginRight = "0";
  total.innerHTML = "Dager igjen til eksamen";
  container.appendChild(title);
  container.appendChild(clock);
  container.appendChild(total);
}

function examCountdown(subjectName, date) {

  constructExamCountDown(subjectName);

  var now = new Date().getTime();
  var examDate = new Date(date).getTime();
  var timeLeft = examDate - now;
  var blink = false;
  var daysLeft;

  function update() {
    daysLeft = "" + Math.ceil(timeLeft / 86400000);
    if (blink) {
      daysLeft += ":";
    }
    clock.innerHTML = daysLeft;
    timeLeft -= 1000;
    if (timeLeft < 0) {
      clearInterval(interval);
    }
    blink = !blink;
  }

  update();
  var interval = setInterval(update, 1000);
}
