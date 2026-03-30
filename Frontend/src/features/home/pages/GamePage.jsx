import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useGameHook from "../hooks/useGameHook";
import ChatBox from "../components/ChatBox";
import OfferInput from "../components/OfferInput";
import "../style/game.scss";

const GamePage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { handleOffer, fetchGame, messages, price, roundsLeft, handleLeaderboard, gameData } = useGameHook();
    const [showGameOver, setShowGameOver] = useState(false);
    const [gameOverData, setGameOverData] = useState(null);
    const [dealAccepted, setDealAccepted] = useState(false);

    useEffect(() => {
        handleLeaderboard();
        fetchGame(gameId);
    }, [gameId]);

    // Check if game is over (deal accepted or rounds reached 5)
    useEffect(() => {
        if (dealAccepted) {
            setGameOverData({
                type: "dealAccepted",
                title: "Deal Accepted! 🎉",
                icon: "✅",
                message: "Congratulations! The deal has been accepted.",
            });
            setShowGameOver(true);
        } else if (roundsLeft === 0) {
            setGameOverData({
                type: "roundsEnded",
                title: "No Deal - Game Over! 😔",
                icon: "❌",
                message: "All 5 rounds have been completed without accepting a deal.",
                subtitle: `Final offered price: ₹${price ? price.toLocaleString() : "0"}`
            });
            setShowGameOver(true);
        }
    }, [dealAccepted, roundsLeft]);

    const handleDealAccept = () => {
        setDealAccepted(true);
    };

    const handleBackHome = () => {
        navigate("/");
    };

    const handlePlayAgain = () => {
        navigate("/");
    };

    const maxRounds = 5;
    const roundsCompleted = maxRounds - (roundsLeft || 0);
    const progressPercentage = (roundsCompleted / maxRounds) * 100;

    return (
        <div className="game-page">
            {/* Game Header */}
            <div className="game-header">
                <div className="header-content">
                    <div className="product-info">
                        <h1>{gameData?.productName || "Negotiation"}</h1>
                        <p>Negotiate to get the best deal</p>
                    </div>

                    <div className="game-stats">
                        <div className="stat">
                            <label>Current Price</label>
                            <value>₹{price ? price.toLocaleString() : "0"}</value>
                        </div>
                        <div className="stat">
                            <label>Rounds Left</label>
                            <value>{roundsLeft !== undefined ? roundsLeft : 5}</value>
                        </div>
                    </div>

                    <button className="back-button" onClick={handleBackHome}>
                        ← Back Home
                    </button>
                </div>
            </div>

            {/* Game Main Content */}
            <div className="game-main">
                <div className="game-content">
                    {/* Chat Box */}
                    <div className="chat-box-wrapper">
                        <ChatBox messages={messages} />
                    </div>

                    {/* Offer Input */}
                    <div className="offer-input-wrapper">
                        <OfferInput onDealAccept={handleDealAccept} />
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="game-info-sidebar">
                    <div className="info-section">
                        <h4>Initial Price</h4>
                        <p>₹{gameData?.initialPrice ? gameData.initialPrice.toLocaleString() : (gameData?.basePrice ? gameData.basePrice.toLocaleString() : "0")}</p>
                        <em>Original asking price</em>
                    </div>

                    <div className="info-section">
                        <h4>Negotiation Progress</h4>
                        <p>
                            {roundsLeft !== undefined ? 5 - roundsLeft : 0} / 5 Rounds
                        </p>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${roundsLeft !== undefined ? ((5 - roundsLeft) / 5) * 100 : 0}%` }}
                            />
                        </div>
                    </div>

                    <div className="info-section">
                        <h4>Current Offer</h4>
                        <p className="current-price">₹{price ? price.toLocaleString() : "0"}</p>
                        <em>
                            {gameData?.initialPrice && price && price < gameData.initialPrice
                                ? `₹${(gameData.initialPrice - price).toLocaleString()} discount`
                                : "Price negotiated"}
                        </em>
                    </div>
                </aside>
            </div>

            {/* Game Over Modal */}
            {showGameOver && gameOverData && (
                <div className="modal-overlay" onClick={() => setShowGameOver(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-icon">{gameOverData.icon}</div>
                            <h2>{gameOverData.title}</h2>
                            <p>{gameOverData.message}</p>
                            {gameOverData.subtitle && <p style={{ marginTop: "8px", fontSize: "0.9rem", fontStyle: "italic", color: "#667eea" }}>{gameOverData.subtitle}</p>}
                        </div>

                        <div className="modal-body">
                            <div className="result-info">
                                <p>
                                    <strong>Product:</strong> {gameData?.productName || "N/A"}
                                </p>
                                <p>
                                    <strong>Initial Price:</strong> ₹{gameData?.initialPrice ? gameData.initialPrice.toLocaleString() : (gameData?.basePrice ? gameData.basePrice.toLocaleString() : "0")}
                                </p>
                                <p>
                                    <strong>Final Price:</strong> ₹{price ? price.toLocaleString() : "0"}
                                </p>
                                <p>
                                    <strong>Total Discount:</strong> ₹{
                                        gameData?.initialPrice && price 
                                            ? (gameData.initialPrice - price).toLocaleString() 
                                            : "0"
                                    }
                                </p>
                                {gameOverData?.type === "roundsEnded" && (
                                    <p style={{ marginTop: "12px", color: "#e74c3c" }}>
                                        <strong>Status:</strong> Deal not accepted - No sale completed
                                    </p>
                                )}
                            </div>
                            <div className="final-price">
                                {gameOverData?.type === "dealAccepted" ? (
                                    <>You saved: {gameData?.initialPrice && price && gameData.initialPrice > 0
                                        ? (((gameData.initialPrice - price) / gameData.initialPrice) * 100).toFixed(1)
                                        : "0"}%</>
                                ) : (
                                    <>Negotiation ended after 5 rounds</>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="primary" onClick={handlePlayAgain}>
                                Play Again
                            </button>
                            <button className="secondary" onClick={handleBackHome}>
                                Back Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamePage;
