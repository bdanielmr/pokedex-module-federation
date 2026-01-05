import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "shell_pokedex/store";
import { 
  Wrap, 
  Header, 
  TitleGroup, 
  Title, 
  Subtitle, 
  Btn, 
  EmptyState, 
  List, 
  Row, 
  Avatar, 
  Placeholder, 
  Name, 
  Meta, 
  Img, 
  Visits, 
  Actions, 
  DangerBtn
} from "./styles/historyStyle";

function getInitials(name) {
  return (name || "?").slice(0, 2).toUpperCase();
}

export default function PokemonHistoryPage() {
  const nav = useNavigate();
  const history = useAppStore((s) => s.history);
  const clear = useAppStore((s) => s.clearHistory);

  return (
    <Wrap>
      <Header>
        <TitleGroup>
          <Title>Vistos recientemente</Title>
          <Subtitle>
            {history.length > 0
              ? `Tienes ${history.length} Pokémon en tu historial`
              : "Aún no has visto ningún Pokémon"}
          </Subtitle>
        </TitleGroup>

        <Btn onClick={() => nav("/")}>← Regresar</Btn>
      </Header>

      {history.length === 0 ? (
        <EmptyState>
          <b>Sin historial</b>
          <div style={{ marginTop: 6, opacity: 0.8 }}>
            Abre un Pokémon para que aparezca aquí.
          </div>
        </EmptyState>
      ) : (
        <>
          <List>
            {history.map((p) => (
              <Row
                key={p.name}
                role="button"
                tabIndex={0}
                onClick={() => nav(`/pokemon/${p.name}`)}
                onKeyDown={(e) => e.key === "Enter" && nav(`/pokemon/${p.name}`)}
              >
                <Avatar>
                  {p.image ? (
                    <Img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <Placeholder aria-hidden="true">{getInitials(p.name)}</Placeholder>
                  )}
                  <Placeholder aria-hidden="true">{getInitials(p.name)}</Placeholder>
                </Avatar>

                <Name>
                  {p.name}
                  <Meta>Haz click para ver detalle</Meta>
                </Name>

                <Visits>Visitas: {p.visits}</Visits>
              </Row>
            ))}
          </List>

          <Actions>
            <DangerBtn onClick={clear} disabled={history.length === 0}>
              Limpiar historial
            </DangerBtn>
          </Actions>
        </>
      )}
    </Wrap>
  );
}
