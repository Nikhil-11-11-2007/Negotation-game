import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true
    },
    playerName:{
        type: String,
        required: true
    },
    price: Number,
    deal:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const leaderboardModel = mongoose.model("leaderboards", leaderboardSchema)

export default leaderboardModel