import express from "express"
import { getGameController, leaderboardController, offerController, startGameController } from "../controllers/game.controller.js"

const gameRouter = express.Router()


gameRouter.post("/start", startGameController)

gameRouter.post("/offer", offerController)

gameRouter.get("/leaderboard", leaderboardController)

gameRouter.get("/:gameId", getGameController);


export default gameRouter