import { createContext, useState } from "react";


export const GameContext = createContext()

export const GameProvider = ({ children }) => {

    const [gameId, setGameId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [price, setPrice] = useState(0);
    const [roundsLeft, setRoundsLeft] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gameData, setGameData] = useState(null);

    return (
        <GameContext.Provider value={{
            gameId,
            setGameId,
            messages,
            setMessages,
            price,
            setPrice,
            roundsLeft,
            setRoundsLeft,
            leaderboard,
            setLeaderboard,
            loading,
            setLoading,
            gameData,
            setGameData
        }}>
            {children}
        </GameContext.Provider>
    );
};