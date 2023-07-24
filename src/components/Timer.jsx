import React, { useState, useEffect } from 'react';

const Timer = ({ isStart, wins }) => {
	console.log(isStart);
	console.log(wins);
	const [seconds, setSeconds] = useState(0);
	const [timeSpent, setTimeSpent] = useState(0);
	const [bestTime, setBestTime] = useState(0);

	useEffect(() => {
		let timer;

		if (isStart) {	
			timer = setTimeout(() => {
				setSeconds(prevSeconds => prevSeconds + 1);
			}, 1000);
		}

		return () => clearTimeout(timer);

	}, [isStart, seconds]);

	useEffect(() => {
		if (wins > 0) {
			setTimeSpent(seconds);

			if (seconds != 0 && seconds < timeSpent) { 
				setBestTime(seconds);
			}
		  	setSeconds(0);
		}
	  }, [wins]);

	return (
		<div>
			<h2>Timer: {seconds} seconds</h2>
			<h2>Time Elapsed: {timeSpent} seconds</h2>
			<h2>Best Time: {bestTime} seconds</h2>
		</div>
	);
};

export default Timer;
