import express from "express"
import { leaderboardController, offerController, startGameController } from "../controllers/game.controller.js"

const gameRouter = express.Router()


gameRouter.post("/start", startGameController)

gameRouter.post("/offer", offerController)

gameRouter.get("/leaderboard", leaderboardController)

export default gameRouter