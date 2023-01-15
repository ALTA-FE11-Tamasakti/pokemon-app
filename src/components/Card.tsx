import React, { useState, useEffect } from "react";
import { FC } from "react";
import { useNavigate } from "react-router";

interface CardProps {
  id?: number;
  name?: string;
  height?: number;
  weight?: number;
  onClickCatch?: () => void;
}

const Card: FC<CardProps> = ({ id, name, height, weight, onClickCatch }) => {
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  function onClickDetail() {
    navigate(`/pokemon/${name}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      const respons = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await respons.json();
      setImageUrl(data.sprites.front_default);
    };
    fetchData();
  }, [id]);
  return (
    <div
      className="card lg:card-compact  bg-white shadow-xl"
      style={{ width: "90%", margin: "0 auto" }}
    >
      <figure onClick={() => onClickDetail()}>
        <img
          src={imageUrl}
          alt={`Pokemon${name}`}
          className="max-auto img-card"
          style={{ width: "100%" }}
        />
      </figure>
      <div className="card-body items-center justify-between">
        <h2
          className="card-title text-center"
          onClick={() => onClickDetail()}
          style={{ color: "black" }}
        >
          {name}
        </h2>
        <h2 className="card-title text-center" style={{ color: "black" }}>
          {height}
        </h2>
        <h2 className="card-title text-center" style={{ color: "black" }}>
          {weight}
        </h2>
      </div>
    </div>
  );
};

export default Card;
