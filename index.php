<?php

// Variables to do my comparisons
$currentTime = new DateTime();
$startTime = new DateTime('9:00');
$endTime = new DateTime('17:30');
$dayNumber = $currentTime->format('N');
$isWeekend = $dayNumber >= 6;

// Determining the amount of days until the nextworkday
// by the day number of the week
switch ($dayNumber) {
	case 5:
		$daysUntilNextWorkDay = 3;
		break;
	case 6:
		$daysUntilNextWorkDay = 2;
		break;
	
	default:
		$daysUntilNextWorkDay = 1;
		break;
}

// Creating the next workday datetime
$intervalString = '+' . $daysUntilNextWorkDay . ' day';
$nextWorkDay = clone $startTime;
$nextWorkDay = $nextWorkDay->modify($intervalString);

// Check if we are at work
if ($currentTime >= $startTime && 
	$currentTime <= $endTime && 
	$isWeekend === false) {
	$interval = $currentTime->diff($endTime);
	
	$sentence = 'Yes, I will be working for another ';
} else {
	$sentence = 'No, I am going to work again in ';
}

// Check if we are before working hours
if ($currentTime < $startTime) {
	$interval = $startTime->diff($currentTime);
}

// Check if we are after working hours
if ($currentTime > $endTime || $isWeekend === true) {
	$interval = $nextWorkDay->diff($currentTime);
}

require_once('views/header.php');

// Printing the sentence and the time we've calculated
echo $sentence;
echo '<span class="timer">';
echo $interval->format("%d days<br>%h hours<br>%i minutes<br>%s seconds");
echo '</span>';

require_once('views/footer.php');