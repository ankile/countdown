function constructDeathClock() {
  clock = document.createElement("h1"); clock.id = "clock";
  total = document.createElement("p"); total.id = "total";
  container.appendChild(clock);
  container.appendChild(total);
}

function deathClock(date, years) {

  constructDeathClock();

  // Get the current point in time in milliseconds from the epoch
  var now = new Date().getTime();

  // Get time in milliseconds from epoch to birthdate
  var birth = new Date(date).getTime();

  // Extract and convert the amount of years from the query string
  var yearsOfLife = parseInt(years);

  // Get the year of birth
  var birthYear = parseInt(date);

  // Calculate which year you die given the years of life is accurate
  var deathYear = yearsOfLife + birthYear;

  // Generate a new dateTimeString with the death year included
  var newDateTimeString = deathYear + '-' + date.substring(5, 11);

  // Get the amount of milliseconds from the epoch to the death date
  var death = new Date(newDateTimeString).getTime();

  // Format time for nice print
  function formatTime(ms) {

    // Initiate variables and set them to an empty string in case they're not
    // needed
    var b = m = k = s = '';

    // Check if number is a billion or bigger (in absolute value)
    if (Math.abs(ms) / 1000 > 999999999) {
      // Calculate how many billions there is
      b = Math.floor(ms / Math.pow(10, 12));

      // Add a period for readability
      b = b + '.';
    }

    // Check if number is a million or bigger
    if (Math.abs(ms) / 1000 > 999999) {

      // Calculate number of millions
      m = ms - b * Math.pow(10, 12);
      m = Math.floor(m / Math.pow(10, 9));

      // Check if leading zeroes will be necessary in this case
      if (Math.abs(ms) / 1000 > 999999999) {

        // Convert to string to be able to check length for leading zeroes
        m = m.toString();
        m = '0'.repeat(3-m.length) + m;
      }

      // Period for readability
      m = m + '.';
    }

    // Check if number is a thousand or bigger
    if (Math.abs(ms) / 1000 > 999) {

      // Calculate amount of thousands
      k = ms - b * Math.pow(10, 12) - m * Math.pow(10, 9);
      k = Math.floor(k / Math.pow(10, 6));

      // Check if there is a need for leading zeroes
      if (Math.abs(ms) / 1000 > 999999) {
        k = k.toString();
        k = '0'.repeat(3-k.length) + k;
      }

      // Period for readability
      k = k + '.';
    }

    // The remaining amount of seconds
    s = ms - b * Math.pow(10, 12) - m * Math.pow(10, 9) - k * Math.pow(10, 6);
    s = Math.floor(s / Math.pow(10, 3));

    // Check need for leading zeroes
    if (Math.abs(ms) / 1000 > 999) {
      s = s.toString();
      s = '0'.repeat(3-s.length) + s;
    }

    // return the result as a concatinated string of the strings generated
    return b + m + k + s;
  }

  // Function that updates all the fields of the site
  function update() {

    // Calculate time left in seconds
    seconds = death - now;

    // Increment the current time with a second
    now += 1000;

    // Set the fields on the webpage with the updated values
    clock.innerHTML = formatTime(seconds);
    total.innerHTML = formatTime(now - birth) + ' / ' + formatTime(death - birth);
  }

  // make sure the page is updated on load
  update();

  // Update every second
  setInterval(update, 1000);
}
