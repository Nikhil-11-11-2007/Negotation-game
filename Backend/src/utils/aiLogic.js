export const airesponse = async (game, offer) => {
    let deal = false;
    let message = "";

    if (offer >= game.currentPrice) {
        deal = true,
        message = "Deal accepted"
    } else if (offer < game.minPrice){
        message: "Too low"
    } else {
        game.currentPrice -= Math.floor(Math.random() * 10);
        message = `Hmm... I can go $${game.currentPrice}`
    }

    return{deal,message,newPrice: game.currentPrice}
}