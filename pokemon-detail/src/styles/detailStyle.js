import styled from "styled-components";

export const Page = styled.div`
  padding: 16px;
  max-width: 980px;
  margin: 0 auto;
`;

export const Card = styled.div`
  padding: 18px;
  border-radius: 16px;
  background: ${(p) => p.theme.card};
  border: 1px solid ${(p) => p.theme.fg}14;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const BackBtn = styled.button`
  border: 1px solid ${(p) => p.theme.fg}18;
  background: ${(p) => p.theme.bg};
  color: ${(p) => p.theme.fg};
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 120ms ease, border-color 120ms ease;

  &:hover {
    border-color: ${(p) => p.theme.fg}28;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 160, 255, 0.35);
  }
`;

export const TitleGroup = styled.div`
  display: grid;
  gap: 2px;
`;

export const Name = styled.h2`
  margin: 0;
  text-transform: capitalize;
  letter-spacing: 0.2px;
`;

export const Sub = styled.div`
  font-size: 13px;
  opacity: 0.75;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Art = styled.div`
  border-radius: 16px;
  background: ${(p) => p.theme.bg};
  border: 1px solid ${(p) => p.theme.fg}14;
  display: grid;
  place-items: center;
  padding: 14px;
  min-height: 240px;
`;

export const Img = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.25));
`;

export const Placeholder = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 28px;
  opacity: 0.7;
  background: ${(p) => p.theme.card};
  border: 1px solid ${(p) => p.theme.fg}14;
`;

export const Section = styled.div`
  display: grid;
  gap: 10px;
`;

export const SectionTitle = styled.h3`
  margin: 6px 0 0;
`;

export const Chips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Chip = styled.span`
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: ${(p) => p.theme.bg};
  border: 1px solid ${(p) => p.theme.fg}14;
  text-transform: capitalize;
`;

export const Stats = styled.div`
  display: grid;
  gap: 10px;
`;

export const StatRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 40px;
  gap: 10px;
  align-items: center;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const StatLabel = styled.div`
  font-size: 13px;
  opacity: 0.85;
  text-transform: capitalize;
`;

export const Bar = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${(p) => p.theme.bg};
  border: 1px solid ${(p) => p.theme.fg}14;
  overflow: hidden;
  position: relative;
`;

export const Fill = styled.div`
  height: 100%;
  display: block;
  width: ${(p) => `${p.$pct ?? 0}%`};
  border-radius: 999px;

  /* usa primary si existe, sino un fallback visible */
  background: ${(p) => p.theme.primary || "#6aa6ff"};

  transition: width 220ms ease;
`;

export const StatValue = styled.div`
  font-weight: 900;
  text-align: right;
  opacity: 0.9;

  @media (max-width: 520px) {
    text-align: left;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 6px;
`;

export const Pill = styled.span`
  padding: 8px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 800;
  background: ${(p) => p.theme.bg};
  border: 1px solid ${(p) => p.theme.fg}14;
  opacity: 0.95;
`;

export const StateCard = styled(Card)`
  display: grid;
  gap: 8px;
  opacity: 0.95;
`;
