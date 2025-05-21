// Base Game Skeleton (React + Vite)

import { useState, useEffect, useRef } from 'react';

export default function GameApp() {
  const [gameState, setGameState] = useState('start'); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // countdown timer if needed
  const intervalRef = useRef(null);

  useEffect(() => {
    if (gameState === 'playing') {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setGameState('gameover');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setTimer(60);
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('start');
  };

  const handleClick = () => {
    if (gameState === 'playing') {
      setScore(score + 1);
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Clicker Game</h1>

      {gameState === 'start' && (
        <button onClick={startGame} className="px-4 py-2 bg-blue-500 text-white rounded">
          Start Game
        </button>
      )}

      {gameState === 'playing' && (
        <div>
          <p className="text-lg mb-2">Time: {timer}s</p>
          <p className="text-lg mb-4">Score: {score}</p>
          <div className="border p-4 mb-4">Click the button below as many times as you can!</div>
          <button
            onClick={handleClick}
            className="px-6 py-3 bg-green-600 text-white text-xl font-bold rounded shadow-lg hover:bg-green-700"
          >
            Click Me
          </button>
        </div>
      )}

      {gameState === 'gameover' && (
        <div>
          <p className="text-xl font-semibold mb-2">Game Over!</p>
          <p className="mb-4">Final Score: {score}</p>
          <button onClick={resetGame} className="px-4 py-2 bg-gray-700 text-white rounded">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
