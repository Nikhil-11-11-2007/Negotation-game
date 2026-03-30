export const airesponse = (game, offer) => {
    let deal = false;
    let message = "";
    let newPrice = game.currentPrice;

    if (offer >= game.currentPrice) {
        deal = true;
        message = "Deal accepted!";
    } else if (offer < game.minPrice) {
        const discount = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
        newPrice = Math.max(offer, game.currentPrice - discount);

        message = `Your offer is too low... but I can consider ₹${newPrice}`;
    } else {
        const discount = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
        newPrice = Math.max(offer, game.currentPrice - discount);

        if (newPrice === offer) {
            deal = true;
            message = "Alright, deal accepted!";
        } else {
            const responses = [
                `Hmm... I can go down to ₹${newPrice}`,
                `Not quite, but let's settle at ₹${newPrice}`,
                `I can't accept that, but how about ₹${newPrice}?`
            ];
            message = responses[Math.floor(Math.random() * responses.length)];
        }
    }

    return { deal, message, newPrice };
};
