import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    gameId: String,
    productName: String,
    productImage: String,
    minPrice: Number,
    currentPrice: Number,
    rounds: Number,
    maxRounds: Number,
    deal: {
        type: Boolean,
        default: false
    }
})

const gameModel = mongoose.model("games", gameSchema)

export default gameModel