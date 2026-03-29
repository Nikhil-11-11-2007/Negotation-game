import express from "express"
import gameRouter from "./routes/game.routes.js";

const app = express()


app.use(express.json())

app.use("/api/game", gameRouter)

export default app;