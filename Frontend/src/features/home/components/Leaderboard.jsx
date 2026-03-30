import useGameHook from "../hooks/useGameHook";

const Leaderboard = () => {
  const { leaderboard } = useGameHook();

  return (
    <div className="leaderboard-container">
      <h3>🏆 Top Players</h3>
      {leaderboard && leaderboard.length > 0 ? (
        <div className="leaderboard-list">
          {leaderboard.map((l, i) => (
            <p key={i}>
              <span className="rank-badge">#{i + 1}</span>
              <span className="player-info">
                <strong>{l.playerName}</strong>
              </span>
              <strong className="player-price">₹{l.price?.toLocaleString()}</strong>
            </p>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#7f8c8d", padding: "20px" }}>
          No negotiations yet
        </p>
      )}
    </div>
  );
};

export default Leaderboard;