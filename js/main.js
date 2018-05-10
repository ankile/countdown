var title, clock, total;

// Get the elements that will display the results from the HTML
var container = document.getElementById('container');

// Get the query string
var s = window.location.search.substring(1).split('&');

// Initiate the object that will hold the keywords and populate it
var query = new Object();
for (var i in s) {
  query[s[i].split('=')[0]] = s[i].split('=')[1];
}

for (var key in query) {
  if (key == 'mode') {
    switch(query[key]) {
      case 'd':
        deathClock(query['date'], query['years']);
        break;
      case 'e':
        examCountdown(query['subject'], query['date']);
        break;
    }
  }
}
