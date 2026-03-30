import { useContext } from "react";
import { GameContext } from "../game.context";
import { gameOffer, startGame, leaderboard as fetchLeaderboard, getGame } from "../services/game.service";

const useGameHook = () => {
    const {
        gameId, setGameId,
        messages, setMessages,
        price, setPrice,
        roundsLeft, setRoundsLeft,
        loading, setLoading,
        leaderboard, setLeaderboard,
        gameData, setGameData
    } = useContext(GameContext);

    const handleStartGame = async (productName, productImage, basePrice) => {
        setLoading(true);
        const res = await startGame(productName, productImage, basePrice);
        setGameId(res.data.gameId);
        setPrice(res.data.price || basePrice);
        const maxRounds = res.data.maxRounds || 5;
        setRoundsLeft(maxRounds);
        setGameData({
            productName: productName,
            productImage: productImage,
            basePrice: basePrice,
            initialPrice: res.data.price || basePrice,
            maxRounds: maxRounds
        });
        setMessages([{ sender: "AI", text: `Price is ₹${res.data.price || basePrice}` }]);
        setLoading(false);
        return res.data;
    };


    const handleOffer = async (offer, playerName) => {
        setLoading(true);
        const res = await gameOffer(gameId, offer, playerName);
        setMessages(prev => [
            ...prev,
            { sender: "You", text: `Offer: ₹${offer}` },
            { sender: "AI", text: res.message }
        ]);

        setPrice(res.currentPrice);
        setRoundsLeft(res.roundsLeft);
        setLoading(false);

        if (res.deal) {
            setMessages(prev => [
                ...prev,
                { sender: "System", text: "Deal Accepted! Game finished!" }
            ]);
            return { dealAccepted: true, ...res };
        }

        return res;
    };

    const handleLeaderboard = async () => {
        setLoading(true);
        const res = await fetchLeaderboard();
        setLeaderboard(res.data);
        setLoading(false);
    };

    const fetchGame = async (gameId) => {
        setLoading(true);
        try {
            const res = await getGame(gameId);
            const maxRounds = res.data.maxRounds || 5;
            const initialPrice = res.data.initialPrice || res.data.basePrice || res.data.currentPrice;
            const basePrice = res.data.basePrice || res.data.initialPrice || res.data.currentPrice;
            
            setGameId(res.data.gameId);
            setPrice(res.data.currentPrice || 0);
            setRoundsLeft(Math.max(0, maxRounds - (res.data.rounds || 0)));
            setGameData({
                productName: res.data.productName || "Product",
                productImage: res.data.productImage || "",
                basePrice: basePrice,
                initialPrice: initialPrice,
                maxRounds: maxRounds,
                rounds: res.data.rounds || 0
            });
            setMessages([{ sender: "System", text: `Game restored for ${res.data.productName}` }]);
        } catch (error) {
            console.error("Error fetching game:", error);
        }
        setLoading(false);
    };

    return {
        handleStartGame,
        handleOffer,
        handleLeaderboard,
        fetchGame,
        loading,
        gameId,
        messages,
        price,
        roundsLeft,
        leaderboard,
        gameData
    };
};

export default useGameHook;