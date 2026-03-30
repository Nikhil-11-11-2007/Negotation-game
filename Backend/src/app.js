import express from "express"
import gameRouter from "./routes/game.routes.js";
import cors from "cors"

const app = express()
app.use(express.static('./public'))


app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use("/api/game", gameRouter)

export default app;