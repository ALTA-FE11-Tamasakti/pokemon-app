import React, { useState, useEffect } from "react";
import { FC } from "react";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    }
  ];
}

const FavoritePokemons: FC = () => {
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const caughtPokemonsFromStorage = localStorage.getItem("caughtPokemons");
    if (caughtPokemonsFromStorage) {
      const parsedPokemons = JSON.parse(caughtPokemonsFromStorage);
      setCaughtPokemons(parsedPokemons);
    }
  }, []);

  function releasePokemon(pokemon: Pokemon) {
    let dupeData: Pokemon[] = caughtPokemons.slice();
    const filterPokemon = dupeData.filter((item) => item.id !== pokemon.id);
    setCaughtPokemons(filterPokemon);
    localStorage.removeItem("caughtPokemons");
    localStorage.setItem("caughtPokemons", JSON.stringify(filterPokemon));
    window.confirm(`yakin ${pokemon.name}nya bakal dilepas aja nih?`);
  }

  return (
    <div>
      {caughtPokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ margin: "0 auto", width: "200px", maxWidth: "100%" }}
          />
          <p>{pokemon.name}</p>
          <div>
            <button style={{ margin: "1rem" }}>Save to The Ball</button>
            <button onClick={() => releasePokemon(pokemon)}>Release</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritePokemons;
