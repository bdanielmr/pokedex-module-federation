import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypes } from "../shared/queries";
import SearchModal from "../components/SearchModal";
import LazyTypeSection from "../components/LazyTypeSection";
import {
  PageContainer,
  Header,
  Title,
  SearchButton,
  TypesGrid,
  LoadingState,
  ErrorState,
} from "../styles/homeStyles";

export default function HomePage() {
  const nav = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const { data: typesData, isLoading: loadingTypes, isError: typesError } = useTypes();

  const typeNames = useMemo(() => {
    const all = typesData?.results?.map((t) => t.name) ?? [];
    return all.filter(Boolean);
  }, [typesData]);

  return (
    <PageContainer>
      <Header>
        <Title>Explora por Tipo</Title>
        <SearchButton onClick={() => setSearchOpen(true)}>
          Buscar Pokémon
        </SearchButton>
      </Header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {loadingTypes && <LoadingState>Cargando tipos de Pokémon...</LoadingState>}
      {typesError && <ErrorState>Error al cargar los tipos de Pokémon</ErrorState>}

      <TypesGrid>
        {typeNames.map((typeName) => (
          <LazyTypeSection
            key={typeName}
            typeName={typeName}
            onOpenPokemon={(name) => nav(`/pokemon/${name}`)}
          />
        ))}
      </TypesGrid>
    </PageContainer>
  );
}
