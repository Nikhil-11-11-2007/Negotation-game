import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    gameId: String,
    minPrice: Number,
    currentPrice: Number,
    rounds: Number,
    maxRounds: Number
})

const gameModel = mongoose.model("games",gameSchema)

export default gameModel