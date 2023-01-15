import React from "react";
import { useState, useEffect } from "react";

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

export default function Pokeball() {
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const pokeballFromStorage = localStorage.getItem("pokeball");
    if (pokeballFromStorage) {
      const parsedPokemons = JSON.parse(pokeballFromStorage);
      setCaughtPokemons(parsedPokemons);
    }
  }, ["pokeball"]);

  useEffect(() => {
    const storagePokemon = localStorage.getItem("pokeball");
    if (storagePokemon) {
      setCaughtPokemons(JSON.parse(storagePokemon));
    }
  }, []);

  function releasePokemon(pokemon: Pokemon) {
    let dupeData: Pokemon[] = caughtPokemons.slice();
    const filterPokemon = dupeData.filter((item) => item.id !== pokemon.id);
    setCaughtPokemons(filterPokemon);
    localStorage.removeItem("pokeball");
    localStorage.setItem("pokeball", JSON.stringify(filterPokemon));
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
          <button onClick={() => releasePokemon(pokemon)}>Release</button>
        </div>
      ))}
    </div>
  );
}
