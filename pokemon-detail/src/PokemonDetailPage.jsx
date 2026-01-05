import React, { useEffect, useMemo, useState, startTransition } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Page,
  Card,
  Header,
  TitleGroup,
  Name,
  Sub,
  BackBtn,
  Grid,
  Art,
  Img,
  Placeholder,
  Section,
  SectionTitle,
  Chips,
  Chip,
  Stats,
  StatRow,
  StatLabel,
  Bar,
  Fill,
  StatValue,
  InfoRow,
  Pill,
  StateCard,
} from "./styles/detailStyle";
import { useAppStore } from "shell_pokedex/store";

import { getBestImage, initials, clampPct } from "./shared/tools";

export default function PokemonDetailPage() {
  const { name } = useParams();
  const nav = useNavigate();
  const trackVisit = useAppStore((s) => s.trackVisit);

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let alive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImgError(false);
    startTransition(() => setStatus("loading"));

    fetch(`https://pokeapi.co/api/v2/pokemon/${String(name).toLowerCase()}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("not_found");
        return r.json();
      })
      .then((json) => {
        if (!alive) return;

        setData(json);
        setStatus("ok");

        const image = getBestImage(json);
        trackVisit({ name: json.name, image });
      })
      .catch(() => alive && setStatus("error"));

    return () => {
      alive = false;
    };
  }, [name, trackVisit]);

  const image = useMemo(() => getBestImage(data), [data]);

  if (status === "loading") {
    return (
      <Page>
        <StateCard>
          <b>Cargando detalle…</b>
          <div style={{ opacity: 0.75, fontSize: 13 }}>
            Obteniendo información desde PokeAPI
          </div>
        </StateCard>
      </Page>
    );
  }

  if (status === "error") {
    return (
      <Page>
        <StateCard>
          <b>No encontrado</b>
          <div style={{ opacity: 0.75, fontSize: 13 }}>
            No existe un Pokémon con ese nombre.
          </div>
          <div>
            <BackBtn onClick={() => nav(-1)}>← Regresar</BackBtn>
          </div>
        </StateCard>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <Header>
          <TitleGroup>
            <Name>{data.name}</Name>
            <Sub>Detalle del Pokémon</Sub>
          </TitleGroup>

          <BackBtn onClick={() => nav(-1)}>← Regresar</BackBtn>
        </Header>

        <Grid>
          <Art>
            {image && !imgError ? (
              <Img
                src={image}
                alt={data.name}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
              />
            ) : (
              <Placeholder aria-hidden="true">{initials(data.name)}</Placeholder>
            )}

            <InfoRow>
              <Pill># {data.id}</Pill>
              <Pill>Altura: {data.height}</Pill>
              <Pill>Peso: {data.weight}</Pill>
            </InfoRow>
          </Art>

          <Section>
            <SectionTitle>Tipos</SectionTitle>
            <Chips>
              {data.types.map((t) => (
                <Chip key={t.type.name}>{t.type.name}</Chip>
              ))}
            </Chips>

            <SectionTitle>Stats</SectionTitle>
            <Stats>
              {data.stats.map((s) => (
                <StatRow key={s.stat.name}>
                  <StatLabel>{s.stat.name}</StatLabel>
                  <Bar>
                    <Fill $pct={clampPct(s.base_stat)} />
                  </Bar>
                  <StatValue>{s.base_stat}</StatValue>
                </StatRow>
              ))}
            </Stats>
          </Section>
        </Grid>
      </Card>
    </Page>
  );
}
