var paragraph = document.querySelector('.date');

function displayTime() {
	// Variables to do my comparisons
	var currentTime = moment.tz('Europe/Amsterdam');
	var startTime = moment.tz('Europe/Amsterdam').hours(9).minutes(0).seconds(0);
	var endTime = moment.tz('Europe/Amsterdam').hours(17).minutes(30).seconds(0);
	var dayNumber = currentTime.isoWeekday();
	var isWeekend = dayNumber >= 6;

	// Determining the amount of days until the nextworkday
	// by the day number of the week
	switch(dayNumber) {
		case 5:
			var daysUntilNextWorkday = 3;
			break;
		case 6:
			var daysUntilNextWorkday = 2;
			break;

		default:
			var daysUntilNextWorkday = 1;
			break;
	}

	// Creating the next workday datetime
	var nextWorkDay = startTime.clone().add(daysUntilNextWorkday, 'days');

	// Check if we are at work
	if (currentTime >= startTime &&
		currentTime <= endTime &&
		isWeekend === false) {
		var diff = currentTime.diff(endTime);

		var sentence = 'Yes, I will be working for another ';
	} else {
		var sentence = 'No, I am going to work again in ';
	}

	// Check if we are before working hours
	if (currentTime < startTime) {
		var diff = moment.duration(startTime.diff(currentTime));
	}

	// Check if we are after working hours
	if (currentTime > endTime || isWeekend === true) {
		var diff = moment.duration(nextWorkDay.diff(currentTime));
	}

	// Only show singular when something is exactly 1
	dayString = diff.days() === 1 ? ' day<br>' : ' days<br>';
	hourString = diff.hours() === 1 ? ' hour<br>' : ' hours<br>';
	minuteString = diff.minutes() === 1 ? ' minute<br>' : ' minutes<br>';
	secondString = diff.seconds() === 1 ? ' second' : ' seconds';

	// Printing the sentence and the time we've calculated
	paragraph.innerHTML = sentence + '<span class="timer">' + diff.days() + dayString + diff.hours() + hourString + diff.minutes() + minuteString + diff.seconds() + secondString + '</span>';
}

displayTime();

moment.duration(1, "seconds").timer({
	loop: true
}, displayTime);