export const airesponse = (game, offer) => {
    let deal = false;
    let message = "";
    let newPrice = game.currentPrice; // ✅ safe

    if (offer >= game.currentPrice) {
        deal = true;
        message = "Deal accepted";
    } else if (offer < game.minPrice) {
        message = "Too low";
    } else {
        const discount = Math.floor(Math.random() * 10);
        newPrice = Math.max(offer, game.currentPrice - discount);

        if (newPrice === offer) {
            deal = true;
            message = "Deal accepted";
        } else {
            message = `Hmm... I can go $${newPrice}`;
        }
    }

    return { deal, message, newPrice };
};