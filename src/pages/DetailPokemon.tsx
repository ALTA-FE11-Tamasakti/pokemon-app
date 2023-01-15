import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FC } from "react";

import Layout from "../components/Layout";
import Footer from "../components/Footer";

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

interface Props {
  name: string;
}

const PokemonDetail: FC<Props> = ({}) => {
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .catch((err) => console.log(err));
  }, [name]);

  useEffect(() => {
    localStorage.setItem("caughtPokemons", JSON.stringify(caughtPokemons));
  }, [caughtPokemons]);

  if (!pokemon) return <div>Loading...</div>;

  function handleCatch(event: React.MouseEvent, pokemon: Pokemon) {
    event.preventDefault();
    setCaughtPokemons((prevCaughtPokemons) => [...prevCaughtPokemons, pokemon]);
    localStorage.setItem(
      "caughtPokemons",
      JSON.stringify([...caughtPokemons, pokemon])
    );
  }
  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 gap-4">
          <div
            className="card lg:card-compact  bg-white shadow-xl"
            style={{ width: "90%", margin: "0 auto" }}
          >
            <h1
              style={{
                color: "white",
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "2rem",
                backgroundColor: "green",
                width: "100%",
                margin: "0",
                padding: "1rem",
                borderRadius: "20px",
              }}
            >
              {pokemon.name}
            </h1>
            <figure>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="max-auto img-card"
                style={{ width: "100%" }}
              />
            </figure>

            <button className="btn btn-outline btn-success">
              Height: {pokemon.height}
            </button>
            <button
              className="btn btn-outline btn-success"
              style={{ marginTop: "1rem" }}
            >
              Weight: {pokemon.weight}
            </button>
            <div className="card-body items-center justify-between">
              <h2 className="text-green-400 ">
                {pokemon &&
                  pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <p style={{ fontFamily: "Poppins", textAlign: "left" }}>
                        {stat.stat.name}
                      </p>
                      <progress
                        className="progress progress-success w-56"
                        value={stat.base_stat}
                        max="100"
                      ></progress>
                      <p style={{ fontFamily: "Poppins", textAlign: "left" }}>
                        {stat.base_stat}
                      </p>
                    </div>
                  ))}
                <button
                  className="btn btn-outline btn-error"
                  onClick={(event) => handleCatch(event, pokemon)}
                >
                  Catch
                </button>
              </h2>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default PokemonDetail;
