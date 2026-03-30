import { useEffect } from "react";
import { useNavigate } from "react-router";
import useGameHook from "../hooks/useGameHook";
import Leaderboard from "../components/Leaderboard";
import "../style/home.scss";

const products = [
  {
    id: 1,
    name: "Vintage Camera",
    price: 15000,
    description: "Classic film camera",
    image: "/png/vintage-camera.webp",
  },
  {
    id: 2,
    name: "Gaming Laptop",
    price: 60000,
    description: "High-performance gaming machine",
    image: "/png/laptop.webp",
  },
  {
    id: 3,
    name: "Antique Watch",
    price: 25000,
    description: "Luxury timepiece",
    image: "/png/antique-watch.webp",
  },
  {
    id: 4,
    name: "Premium Headphones",
    price: 12000,
    description: "Noise-cancelling audio",
    image: "/png/premium-headphone.webp",
  },
  {
    id: 5,
    name: "Smartwatch Pro",
    price: 18000,
    description: "Latest fitness tracker",
    image: "/png/smartwatch-pro.webp",
  },
  {
    id: 6,
    name: "Digital Camera",
    price: 35000,
    description: "Professional DSLR",
    image: "/png/digital-camera.webp",
  },
  {
    id: 7,
    name: "Wireless Speaker",
    price: 8000,
    description: "Portable audio system",
    image: "/png/wireless-peaker.webp",
  },
  {
    id: 8,
    name: "Tablet Device",
    price: 40000,
    description: "10-inch display tablet",
    image: "/png/tablet-divice.webp",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { handleStartGame, handleLeaderboard } = useGameHook();

  useEffect(() => {
    handleLeaderboard();
  }, []);

  const startNegotiation = async (product) => {
    const confirmStart = window.confirm(`Do you want to start game for ${product.name}?`);
    if (!confirmStart) return; 

    const gameData = await handleStartGame(product.name, product.image, product.price);
    navigate(`/game/${gameData.gameId}`);
  };

  return (
    <>
      <div className="home-header">
        <h1>Negotiation Marketplace</h1>
        <p>Browse products and start negotiating to get the best deals</p>
      </div>

      <div className="home-container">
        <div className="main-content">
          <div className="product-grid">
            {products.map((p) => (
              <div key={p.id} className="card" onClick={() => startNegotiation(p)}>
                <img src={p.image} alt={p.name} />
                <div>
                  <h3>{p.name}</h3>
                  <p className="description">{p.description}</p>
                  <div className="price-section">
                    <p>₹{p.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="leaderboard-sidebar">
          <Leaderboard />
        </aside>
      </div>
    </>
  );
};

export default HomePage;
