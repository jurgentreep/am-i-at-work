var paragraph = document.querySelector('.javascript-date');

time = moment.tz('Europe/Amsterdam');

paragraph.textContent = time.format();