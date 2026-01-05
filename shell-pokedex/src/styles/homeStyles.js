import styled from "styled-components";

export const TYPE_COLORS = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
};

export const PageContainer = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: ${(p) => p.theme.fg};
`;

export const SearchButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  color: ${(p) => p.theme.fg};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    background: ${(p) => p.theme.card};
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${(p) => p.theme.fg}99;
  font-size: 16px;
`;

export const ErrorState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #ef4444;
  font-size: 16px;
  border-radius: 12px;
  background: ${(p) => p.theme.card};
`;

export const TypeCard = styled.div`
  background: ${(p) => p.theme.card};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-height: 200px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: ${(p) => TYPE_COLORS[p.typeName] || "#667eea"}44;
  }
`;

export const TypeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${(p) => TYPE_COLORS[p.typeName] || "#667eea"}33;
`;

export const TypeTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
  color: ${(p) => p.theme.fg};
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 6px;
    height: 20px;
    border-radius: 3px;
    background: ${(p) => TYPE_COLORS[p.typeName] || "#667eea"};
  }
`;

export const CountBadge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  background: ${(p) => TYPE_COLORS[p.typeName] || "#667eea"};
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

export const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  }
`;

export const PokemonCardContainer = styled.div`
  aspect-ratio: 1;
  border-radius: 12px;
  background: ${(p) => p.theme.bg};
  border: 2px solid ${(p) => TYPE_COLORS[p.typeName] || "#667eea"}22;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    border-color: ${(p) => TYPE_COLORS[p.typeName] || "#667eea"};
    box-shadow: 0 4px 12px ${(p) => TYPE_COLORS[p.typeName] || "#667eea"}44;
    z-index: 1;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const PokemonImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
`;

export const PokemonName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 4px;
  background: linear-gradient(to top, ${(p) => TYPE_COLORS[p.typeName] || "#667eea"}ee, transparent);
  color: white;
  font-size: 10px;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MiniLoading = styled.div`
  padding: 30px;
  text-align: center;
  color: ${(p) => p.theme.fg}77;
  font-size: 13px;
`;

export const ViewMoreButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  border: 2px solid ${(p) => TYPE_COLORS[p.typeName] || "#667eea"}44;
  border-radius: 8px;
  background: transparent;
  color: ${(p) => p.theme.fg};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(p) => TYPE_COLORS[p.typeName] || "#667eea"}22;
    border-color: ${(p) => TYPE_COLORS[p.typeName] || "#667eea"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PlaceholderCard = styled.div`
  background: ${(p) => p.theme.card};
  border-radius: 16px;
  padding: 20px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.fg}66;
  font-size: 14px;
`;
