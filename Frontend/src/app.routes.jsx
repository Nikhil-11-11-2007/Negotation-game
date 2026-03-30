import { createBrowserRouter } from "react-router";
import HomePage from "./features/home/pages/HomePage";
import GamePage from "./features/home/pages/GamePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/game/:gameId",
        element: <GamePage />
    }
])