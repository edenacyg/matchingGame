import { useEffect } from "react";

const Header = ({ handleNewGame, wins }) => {
<<<<<<< HEAD
	// Update page title with win count
	useEffect(() => (document.title = `${wins} wins`), [wins]);

	return (
		<>
			<header className="header">
				<h3>Memory Game</h3>
				<h4>{wins} wins</h4>
				<button onClick={handleNewGame}>New Game</button>
			</header>
			<div className="time">
		
			</div>
		</>

	);
=======
  // Update page title with win count
  useEffect(() => (document.title = `${wins} wins`), [wins]);

  return (
    <header className="header">
      <h3>Memory Game</h3>
      <h4>{wins} wins</h4>
      <button onClick={handleNewGame}>New Game</button>
    </header>
  );
>>>>>>> 70ddf018d597b48a1e0d0aa3555c8bdc7cfc6ca0
};

export default Header;
