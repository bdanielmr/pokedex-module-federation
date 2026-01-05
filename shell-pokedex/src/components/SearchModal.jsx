import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { usePokemonListInfinite, usePokemonExactByName } from "../shared/queries";
import { normalizePokemonName } from "../shared/searchNormalize";
import { Button } from "../styles/commonStyles";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: ${(p) => (p.$open ? "block" : "none")};
  z-index: 9999;
`;

const Modal = styled.div`
  position: absolute;
  inset: 0;
  background: ${(p) => p.theme.bg};
  color: ${(p) => p.theme.fg};
  padding: 16px;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 12px;
`;

const List = styled.div`
  overflow: auto;
  border-radius: 12px;
  background: ${(p) => p.theme.card};
  padding: 12px;
`;

const Item = styled.div`
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  text-transform: capitalize;
  &:hover { background: rgba(0,0,0,0.06); }
`;

export default function SearchModal({ open, onClose }) {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const qNorm = useMemo(() => normalizePokemonName(q), [q]);

  const infinite = usePokemonListInfinite(open);

  const exact = usePokemonExactByName(qNorm, open && qNorm.length > 0);

  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!open || !el) return;

    const onScroll = () => {
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 120;
      if (nearBottom && infinite.hasNextPage && !infinite.isFetchingNextPage) {
        infinite.fetchNextPage();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [open, infinite.hasNextPage, infinite.isFetchingNextPage, infinite.fetchNextPage]);

  const openPokemon = (name) => {
    onClose?.();
    nav(`/pokemon/${name}`);
  };

  const pagesFlat = useMemo(() => {
    const pages = infinite.data?.pages ?? [];
    return pages.flatMap((p) => p.results ?? []);
  }, [infinite.data]);

  const showingExact = open && qNorm.length > 0;

  return (
    <Overlay $open={open} onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Buscar Pokémon</h2>
          <Button onClick={onClose}>Cerrar</Button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            style={{ flex: 1, padding: 10, borderRadius: 10 }}
            placeholder="Nombre exacto (ej: pikachu)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button onClick={() => setQ("")}>Limpiar</Button>
        </div>

        <List ref={listRef}>
          {!showingExact && (
            <>
              {infinite.isLoading ? <div>Cargando...</div> : null}
              {infinite.isError ? <div>Error cargando lista</div> : null}

              {pagesFlat.map((p) => (
                <Item key={p.name} onClick={() => openPokemon(p.name)}>
                  {p.name}
                </Item>
              ))}

              {infinite.isFetchingNextPage ? <div style={{ padding: 10 }}>Cargando más...</div> : null}
              {!infinite.hasNextPage && !infinite.isLoading ? <div style={{ padding: 10 }}>Fin</div> : null}
            </>
          )}

          {showingExact && (
            <>
              {exact.isLoading ? <div>Buscando...</div> : null}

              {exact.isError ? (
                <div>No encontrado</div>
              ) : null}

              {exact.data ? (
                <Item onClick={() => openPokemon(exact.data.name)}>
                  {exact.data.name}
                </Item>
              ) : null}
            </>
          )}
        </List>
      </Modal>
    </Overlay>
  );
}
