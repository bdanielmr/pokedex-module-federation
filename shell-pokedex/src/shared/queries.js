import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getTypes, getTypeDetail, getPokemonList, getPokemonByName } from "./pokeApi";

export function useTypes() {
  return useQuery({
    queryKey: ["types"],
    queryFn: getTypes,
    staleTime: 1000 * 60 * 30,
  });
}

export function usePokemonByType(typeName) {
  return useQuery({
    queryKey: ["type", typeName],
    queryFn: () => getTypeDetail(typeName),
    staleTime: 1000 * 60 * 30,
    enabled: !!typeName,
  });
}

export function usePokemonListInfinite(isOpen) {
  return useInfiniteQuery({
    queryKey: ["pokemonListInfinite"],
    queryFn: ({ pageParam }) => getPokemonList({ limit: 30, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return undefined;
      const u = new URL(lastPage.next);
      return Number(u.searchParams.get("offset") || 0);
    },
    enabled: !!isOpen,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePokemonExactByName(nameNormalized, enabled) {
  return useQuery({
    queryKey: ["pokemonByName", nameNormalized],
    queryFn: () => getPokemonByName(nameNormalized),
    enabled: !!enabled && !!nameNormalized,
    retry: false,
  });
}
