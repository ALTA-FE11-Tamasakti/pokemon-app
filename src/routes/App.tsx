import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../pages/Index";
import PokemonDetail from "../pages/DetailPokemon";
import PokemonCtatch from "../pages/PokemonCtatch";

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
    path: "/pokemonCatch/:name",
    element: <PokemonCtatch />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
