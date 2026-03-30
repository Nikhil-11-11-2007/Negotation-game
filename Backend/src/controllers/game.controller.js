import { getGameService, getLeaderBoardService, makeOfferService, startGameService } from "../services/game.service.js"


export const startGameController = async (req, res) => {
    try {
        const { productName, productImage, basePrice } = req.body;

        if (!productName || !productImage || !basePrice) {
            return res.status(400).json({ error: "Product details required" });
        }

        const data = await startGameService(productName, productImage, basePrice);

        res.status(201).json({
            message: "Game started successfully",
            data
        });
    } catch (err) {
        res.status(500).json({
            err: "Failed to start game",
            details: err.message
        });
    }
};

export const offerController = async (req, res) => {
    try {
        let { gameId, offer, playerName } = req.body;

        if (!gameId) {
            return res.status(400).json({
                error: "gameId is required"
            });
        }

        offer = Number(offer);

        if (!offer || isNaN(offer) || offer <= 0) {
            return res.status(400).json({
                error: "Valid offer required"
            });
        }

        const data = await makeOfferService(gameId, offer, playerName);

        if (data.error) {
            return res.status(400).json({ error: data.error });
        }

        res.status(200).json({
            message: data.response,
            currentPrice: data.currentPrice,
            deal: data.deal,
            roundsLeft: data.roundsLeft
        });

    } catch (err) {
        res.status(500).json({
            err: "Failed to process offer",
            details: err.message
        });
    }
};

export const leaderboardController = async (req, res) => {
    try {

        const data = await getLeaderBoardService()

        if (!data || data.length === 0) {
            return res.status(404).json({
                error: "No leaderboard data found"
            });
        }

        res.status(200).json({
            message: "Leaderboard found successfully",
            data
        })

    } catch (err) {
        res.status(500).json({
            err: "Failed to fetch leaderboard",
            details: err.message
        });
    }

}

export const getGameController = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await getGameService(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json({
      message: "Game fetched successfully",
      data: game
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch game", details: err.message });
  }
};