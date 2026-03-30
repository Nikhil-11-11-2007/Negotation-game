import { RouterProvider } from "react-router";
import { GameProvider } from "./features/home/game.context";
import { router } from "./app.routes";

const App = () => {

  return (
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  )
};

export default App;