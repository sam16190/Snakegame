
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [diamondPosition, setDiamondPosition] = useState({ x: 0, y: 0 });
  const [snakes, setSnakes] = useState([{ x: 5, y: 5 }]); // Initial snake

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(moveSnakes, 1000); // Snake movement interval
      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const handlePlayerMove = (e) => {
        // Update player position based on mouse hover
        const rect = e.target.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / 10);
        const y = Math.floor((e.clientY - rect.top) / 10);
        setPlayerPosition({ x, y });
      };
      window.addEventListener('mousemove', handlePlayerMove);
      return () => window.removeEventListener('mousemove', handlePlayerMove);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const handleDiamondClick = (e) => {
        if (e.target.classList.contains('diamond')) {
          // Player collects diamond
          setScore(score + 10);
          generateNewDiamondPosition();
          const newSnake = generateNewSnake();
          setSnakes(prevSnakes => [...prevSnakes, newSnake]);
          console.log(snakes);
        }
      };
      window.addEventListener('click', handleDiamondClick);
      return () => window.removeEventListener('click', handleDiamondClick);
    }
  }, [score, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    generateNewDiamondPosition();
  };

  const stopGame = () => {
    setGameStarted(false);
  };

  const moveSnakes = () => {
    const newSnakes = snakes.map(snake => {
      // Calculate new position
      let newX = snake.x + Math.floor(Math.random() * 3) - 1;
      let newY = snake.y + Math.floor(Math.random() * 3) - 1;
  
      // Boundary checks to keep the snake within the game pit
      newX = Math.max(0, Math.min(newX, 19)); // Ensure x is between 0 and 19
      newY = Math.max(0, Math.min(newY, 9)); // Ensure y is between 0 and 9
  
      return { x: newX, y: newY };
    });
  
    // console.log("New Snake Positions:", newSnakes); // Log new snake positions
    setSnakes(newSnakes);
  };
  
  

  

  const generateNewSnake = () => {
    return { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 10) };
  };

  const generateNewDiamondPosition = () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 10);
    setDiamondPosition({ x, y });
  };

  // const generateNewSnakes = () => {
  //   const numNewSnakes = Math.floor(Math.random() ) + 1; // Generate 1 to 3 new snakes
  //   // console.log("Number of New Snakes:", numNewSnakes);
  //   const newSnakes = [];
  //   for (let i = 0; i < numNewSnakes; i++) {
  //     newSnakes.push(generateNewSnake());
  //   }
   
  //   return newSnakes;
  // };

  return (
    <div className="App">
      <div className="game-pit">
        {/* Render snakes */}
        {snakes.map((snake, index) => (
          <div key={index} className="snake" style={{ left: `${snake.x * 10}px`, top: `${snake.y * 10}px` }} />
        ))}
        
        {/* Render player */}
        <div className="player" style={{ left: `${playerPosition.x * 10}px`, top: `${playerPosition.y * 10}px` }} />
        
        {/* Render diamond */}
        <div className="diamond" style={{ left: `${diamondPosition.x * 10}px`, top: `${diamondPosition.y * 10}px` }} />

        {/* Render score */}
        <div className="score">Score: {score}</div>
      </div>

      {/* Render Start/Stop buttons */}
      {!gameStarted ? (
        <button onClick={startGame}>Start</button>
      ) : (
        <button onClick={stopGame}>Stop</button>
      )}
    </div>
  );
}

export default App;
