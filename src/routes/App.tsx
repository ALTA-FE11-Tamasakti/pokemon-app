import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../pages/Index";
import PokemonDetail from "../pages/DetailPokemon";

import FavoritePokemons from "../pages/CaughtPokemon";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Index />,
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetail />,
  },
  {
    path: "/CaughPokemons",
    element: <FavoritePokemons />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
