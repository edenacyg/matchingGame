import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Cards";
import shuffle from "./utitilies/shuffle";
import Header from "./components/Header";
import useAppBadge from "./hooks/useAppBadge";
import Timer from "./components/Timer";

function App() {
	const [cards, setCards] = useState(shuffle); //Shuffle Cards
	const [pickOne, setPickOne] = useState(null); //First Selection
	const [pickTwo, setPickTwo] = useState(null); //Second Selection
	const [disabled, setDisabled] = useState(false); //Selection Delay
	const [wins, setWins] = useState(0); //Number of Wins
	const [setBadge, clearBadge] = useAppBadge(); //Handles App Badge
	const [isStart, setStart] = useState(false); //Start
	const [seconds, setSeconds] = useState(0); //Timer
	
	//Handle Card Selections
	const handleClick = (card) => {
		setStart(true);

		if (!disabled) {
			pickOne ? setPickTwo(card): setPickOne(card);
		}
	};

	const handleTurn = () => {
		setPickOne(null);
		setPickTwo(null);
		setDisabled(false);
	};

	const handleNewGame = () => {
		setWins(0);
		clearBadge();
		handleTurn();
		setCards(shuffle);
		setSeconds(0);
		setStart(false);
	};

	useEffect(() => {
		let pickTimer;

		// Match Click Handler Logic
		if (pickOne && pickTwo) {
			if (pickOne.image === pickTwo.image) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.image === pickOne.image) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				handleTurn();
			} else {
				setDisabled(true);
				pickTimer = setTimeout(() => {
					handleTurn();
				}, 500);
			}
		}

		return () => {
			clearTimeout(pickTimer);
		};
	}, [cards, pickOne, pickTwo, setBadge, wins]);

	useEffect(() => {
		const checkWin = cards.filter((card) => !card.matched);
		if (cards.length && checkWin.length < 1) {
			console.log("Goodjob Hehe");
			setWins(wins + 1);
			setBadge();
			handleTurn();
			setCards(shuffle);
			setStart(false);
		}
	}, [cards, setBadge, wins]);

	return (
		<>
			<Timer isStart={isStart} wins={wins} seconds={seconds} setSeconds={setSeconds} />
			<Header handleNewGame={handleNewGame} wins={wins} />

			<div className="grid">
				{cards.map((card) => {
					const { image, matched } = card;

					return (
						<Card
							key={image.id}
							card={card}
							image={image}
							selected={card === pickOne || card === pickTwo || matched}
							onClick={() => handleClick(card)}
						/>
					);
				})}
			</div>
		</>
	);
}

export default App;
