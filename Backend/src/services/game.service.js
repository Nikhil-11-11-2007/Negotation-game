import { v4 as uuidv4 } from "uuid"
import gameModel from "../models/game.model.js"
import { airesponse } from "../utils/aiLogic.js"
import leaderboardModel from "../models/leaderboard.model.js"

export const startGameService = async (productName, productImage, basePrice) => {
    const gameId = uuidv4();

    const game = await gameModel.create({
        gameId,
        productName,
        productImage,
        minPrice: Math.floor(basePrice * 0.6),
        currentPrice: basePrice,
        rounds: 0,
        maxRounds: 5
    });

    return {
        gameId,
        productName: game.productName,
        productImage: game.productImage,
        price: game.currentPrice
    };
};

export const makeOfferService = async (gameId, offer, playerName) => {
    const game = await gameModel.findOne({ gameId });
    if (!game) return { error: "Game not found" };

    if (game.deal || game.rounds >= game.maxRounds) {
        return { error: "Game already finished" };
    }

    if (offer === game.currentPrice) {
        return { error: "Same offer again not allowed" };
    }

    const { deal, message, newPrice } = airesponse(game, offer);
    const finalPrice = newPrice ?? game.currentPrice;

    if (deal) {
        game.currentPrice = finalPrice;
        game.deal = true;
        await game.save();

        await leaderboardModel.create({
            gameId: game.gameId,
            playerName: playerName?.trim() || "guest",
            price: offer,
            deal: true
        });

        return { response: message, currentPrice: finalPrice, deal: true };
    }

    game.rounds += 1;
    game.currentPrice = finalPrice;
    await game.save();

    if (game.rounds >= game.maxRounds) {
        return {
            response: "Game over! Max rounds reached.",
            currentPrice: finalPrice,
            deal: false,
            roundsLeft: 0
        };
    }

    return {
        response: message,
        currentPrice: finalPrice,
        deal: false,
        roundsLeft: game.maxRounds - game.rounds
    };
};

export const getLeaderBoardService = async () => {
    return await leaderboardModel
        .find({}, { playerName: 1, gameId: 1, price: 1, deal: 1, createdAt: 1 })
        .sort({ price: 1 })
        .limit(5);
}

export const getGameService = async (gameId) => {
  console.log("Looking for gameId:", gameId);
  const game = await gameModel.findOne({ gameId });
  console.log("Found game:", game);
  return game;
};
