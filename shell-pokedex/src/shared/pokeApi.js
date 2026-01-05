const API = "https://pokeapi.co/api/v2";

export async function serviceFetcher(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP_${r.status}`);
  return r.json();
}

export const getTypes = () => serviceFetcher(`${API}/type`);

export const getTypeDetail = (type) => serviceFetcher(`${API}/type/${type}`);

export const getPokemonList = ({ limit = 30, offset = 0 }) =>
  serviceFetcher(`${API}/pokemon?limit=${limit}&offset=${offset}`);

export const getPokemonByName = (name) =>
  serviceFetcher(`${API}/pokemon/${name}`);
