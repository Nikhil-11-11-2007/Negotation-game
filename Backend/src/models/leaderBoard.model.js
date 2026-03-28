import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const leaderboardModel = mongoose.model("leaderboards", leaderboardSchema)

export default leaderboardModel