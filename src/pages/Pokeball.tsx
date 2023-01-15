import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";

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
  const [pokeball, setPokeball] = useState<Pokemon[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const pokeballFromStorage = localStorage.getItem("pokeball");
    if (pokeballFromStorage) {
      const parsedPokemons = JSON.parse(pokeballFromStorage);
      setPokeball(parsedPokemons);
    }
  }, [setPokeball]);

  function releasePokemon(pokemon: Pokemon) {
    let dupeData: Pokemon[] = pokeball.slice();
    const filterPokemon = dupeData.filter((item) => item.id !== pokemon.id);
    setPokeball(filterPokemon);
    localStorage.removeItem("pokeball");
    localStorage.setItem("pokeball", JSON.stringify(filterPokemon));
    window.confirm(`yakin ${pokemon.name}nya bakal dilepas aja nih?`);
  }

  function onClickDetail() {
    navigate(`/pokemon/${name}`);
  }

  return (
    <Layout>
      <div>
        <div
          className=" grid  grid-cols-2 gap-4 card lg:card-compact  bg-white shadow-xl"
          style={{ width: "90%", margin: "0 auto" }}
        >
          {pokeball.map((pokemon) => (
            <div key={pokemon.id}>
              <figure>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  style={{ margin: "0 auto", width: "200px", maxWidth: "100%" }}
                />
              </figure>
              <div className="card-body items-center justify-between">
                <h2
                  className="card-title text-center"
                  onClick={() => onClickDetail()}
                  style={{ color: "black" }}
                >
                  {pokemon.name}
                </h2>
                <button onClick={() => releasePokemon(pokemon)}>Release</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
