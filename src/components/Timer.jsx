import React, { useState, useEffect } from 'react';

const Timer = ({ isStart, wins, seconds, setSeconds, isBestPlayer, setBestPlayer }) => {
	console.log(isStart);
	console.log(wins);
	const [timeSpent, setTimeSpent] = useState(0); //Elapsed time
	const [bestTime, setBestTime] = useState(0); //Fastest time

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

			if (bestTime === 0){
				setBestTime(seconds);
				setSeconds(0);	
			} else {
				if (seconds !== 0 && seconds < timeSpent) { 
					setBestTime(seconds);
					setBestPlayer(true);
				} else {
					setBestPlayer(false);
				}
					setSeconds(0);	
			}		
		} else {
			setBestTime(0);
			setTimeSpent(0);
		}
	  }, [wins]);

	return (
		<div className='timer'>
			<p>Timer: {seconds} secs</p>
			<p className={isBestPlayer ? "best-player" : ""}>Best Player: {bestTime} secs</p>
		</div>
	);
};

export default Timer;

