import React, { useEffect, useMemo, useState, useCallback } from "react";
import { usePokemonByType } from "../shared/queries";
import PokemonCard from "./PokemonCard";
import {
  TypeCard,
  TypeHeader,
  TypeTitle,
  CountBadge,
  PokemonGrid,
  MiniLoading,
  ViewMoreButton,
} from "../styles/homeStyles";

const shuffleArray = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export default function TypeSection({ typeName, onOpenPokemon }) {
  const [expanded, setExpanded] = useState(false);

  const [randomPokemons, setRandomPokemons] = useState([]);

  const { data, isLoading, isError } = usePokemonByType(typeName);

  const getPokemonId = useCallback(
    (name) => {
      const pokemon = data?.pokemon?.find((p) => p.pokemon?.name === name)?.pokemon;
      if (!pokemon?.url) return null;
      return pokemon.url.split("/").filter(Boolean).pop();
    },
    [data]
  );

  useEffect(() => {
    if (!data?.pokemon?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRandomPokemons([]);
      return;
    }

    const list = data.pokemon.map((p) => p.pokemon).filter(Boolean);
    setRandomPokemons(shuffleArray(list));

    setExpanded(false);
  }, [data, typeName]);

  const { displayPokemons, hasMore } = useMemo(() => {
    const total = randomPokemons.length;
    const limit = expanded ? 10 : 6;

    return {
      displayPokemons: randomPokemons.slice(0, limit),
      totalCount: total,
      hasMore: total > limit,
    };
  }, [randomPokemons, expanded]);

  if (isLoading) {
    return (
      <TypeCard typeName={typeName}>
        <TypeHeader typeName={typeName}>
          <TypeTitle typeName={typeName}>{typeName}</TypeTitle>
        </TypeHeader>
        <MiniLoading>Cargando...</MiniLoading>
      </TypeCard>
    );
  }

  if (isError || displayPokemons.length === 0) {
    return null;
  }

  return (
    <TypeCard typeName={typeName}>
      <TypeHeader typeName={typeName}>
        <TypeTitle typeName={typeName}>{typeName}</TypeTitle>
      </TypeHeader>

      <PokemonGrid>
        {displayPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            pokemonId={getPokemonId(pokemon.name)}
            typeName={typeName}
            onClick={() => onOpenPokemon(pokemon.name)}
          />
        ))}
      </PokemonGrid>

      {hasMore && (
        <ViewMoreButton
          typeName={typeName}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Ver menos" : `Ver más`}
        </ViewMoreButton>
      )}
    </TypeCard>
  );
}
