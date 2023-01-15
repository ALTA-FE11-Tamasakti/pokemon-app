import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../pages/Index";
import PokemonDetail from "../pages/DetailPokemon";

import FavoritePokemons from "../pages/CaughtPokemon";
import Pokeball from "../pages/Pokeball";

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
    path: "/CaughtPokemons",
    element: <FavoritePokemons />,
  },
  {
    path: "/pokeball",
    element: <Pokeball />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
