var paragraph = document.querySelector('.javascript-date');

var currentTime = moment.tz('Europe/Amsterdam');
var startTime = moment.tz('Europe/Amsterdam').hours(9).minutes(0).seconds(0);
var endTime = moment.tz('Europe/Amsterdam').hours(17).minutes(30).seconds(0);
var dayNumber = currentTime.day();
var isWeekend = dayNumber >= 6;

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

var nextWorkDay = startTime.clone().add(daysUntilNextWorkday, 'days');

if (currentTime >= startTime &&
	currentTime <= endTime &&
	isWeekend === false) {

	var sentence = 'Yes, I will be working for another ';
} else {
	var sentence = 'No, I am going to work again in ';
}

if (currentTime < startTime) {
	var diff = moment.duration(startTime.diff(currentTime));
}

if (currentTime > endTime || isWeekend === true) {
	var diff = moment.duration(nextWorkDay.diff(currentTime));
}

paragraph.textContent = sentence + diff.days() + ' days, ' + diff.hours() + ' hours, ' + diff.minutes() + ' minutes and ' + diff.seconds() + ' seconds.';