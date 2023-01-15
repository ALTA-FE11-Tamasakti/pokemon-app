import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";

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
  const [pokeball, setPokeball] = useState<Pokemon[]>([]);

  useEffect(() => {
    const caughtPokemonsFromStorage = localStorage.getItem("caughtPokemons");
    if (caughtPokemonsFromStorage) {
      const parsedPokemons = JSON.parse(caughtPokemonsFromStorage);
      setCaughtPokemons(parsedPokemons);
    }
  }, []);

  function saveToPokeBall(pokemon: Pokemon) {
    const pokeballFromStorage = JSON.parse(
      localStorage.getItem("pokeball") || "[]"
    );
    const existingPokemon = pokeballFromStorage.find(
      (p: any) => p.id === pokemon.id
    );
    if (existingPokemon) {
      alert("Pokemon sudah ada dalam pokeball");
      return;
    }
    const newPokeball = [...pokeballFromStorage, pokemon];
    setPokeball((prevPoke) => [...prevPoke, pokemon]);
    alert("Pokemon berhasil ditambakan ke PokeBall");
    localStorage.setItem("pokeball", JSON.stringify(newPokeball));
  }

  function releasePokemon(pokemon: Pokemon) {
    let dupeData: Pokemon[] = caughtPokemons.slice();
    const filterPokemon = dupeData.filter((item) => item.id !== pokemon.id);
    setCaughtPokemons(filterPokemon);
    localStorage.removeItem("caughtPokemons");
    localStorage.setItem("caughtPokemons", JSON.stringify(filterPokemon));
    window.confirm(`yakin ${pokemon.name}nya bakal dilepas aja nih?`);
  }

  return (
    <div className="bg-caughtpoke">
      <Link to="/">Back to Hunting Grounds</Link>
      {caughtPokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ margin: "0 auto", width: "200px", maxWidth: "100%" }}
          />
          <p>{pokemon.name}</p>
          <div>
            <button
              style={{ margin: "1rem" }}
              onClick={() => saveToPokeBall(pokemon)}
            >
              Save to PokeBall
            </button>
            <button onClick={() => releasePokemon(pokemon)}>Release</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritePokemons;
