import React, { useMemo, useState } from "react";
import {
  PokemonCardContainer,
  PokemonImage,
  PokemonName,
} from "../styles/homeStyles";

const PLACEHOLDER =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

export default function PokemonCard({ name, pokemonId, typeName, onClick }) {
  const [imgError, setImgError] = useState(false);

  const imageUrl = useMemo(() => {
    if (!pokemonId) return PLACEHOLDER;

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }, [pokemonId]);

  return (
    <PokemonCardContainer typeName={typeName} onClick={onClick}>
      <PokemonImage
        key={`${pokemonId}-${imgError}`}
        src={imgError ? PLACEHOLDER : imageUrl}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
      />
      <PokemonName typeName={typeName}>{name}</PokemonName>
    </PokemonCardContainer>
  );
}
