import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export const startGame = async (productName, productImage, basePrice) => {
    const response = await api.post("/api/game/start", {
        productName,
        productImage,
        basePrice
    })
    return response.data
}

export const gameOffer = async (gameId, offer, playerName) => {

    const response = await api.post("/api/game/offer", {
        gameId, offer, playerName
    })

    return response.data

}

export const leaderboard = async () => {

    const response = await api.get("/api/game/leaderboard")

    return response.data
}

export const getGame = async (gameId) => {
  const response = await api.get(`/api/game/${gameId}`);
  return response.data;
};
