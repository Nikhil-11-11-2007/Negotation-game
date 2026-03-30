import { useState } from "react";
import useGameHook from "../hooks/useGameHook";

const OfferInput = ({ onDealAccept }) => {
  const [offer, setOffer] = useState("");
  const [name, setName] = useState("");
  const { handleOffer } = useGameHook();

  const handleClick = async () => {
    if (!offer || Number(offer) <= 0) return;
    const result = await handleOffer(Number(offer), name);
    
    // Check if deal was accepted
    if (result?.dealAccepted) {
      onDealAccept?.();
    }
    
    setOffer("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="offer-input">
      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <input
        type="number"
        placeholder="Enter Offer Amount"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleClick} disabled={!offer || Number(offer) <= 0}>
        Send Offer
      </button>
    </div>
  );
};

export default OfferInput;
