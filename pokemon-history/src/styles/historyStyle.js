import styled from "styled-components";

export const Wrap = styled.div`
  padding: 16px;
  max-width: 900px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const TitleGroup = styled.div`
  display: grid;
  gap: 4px;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${(p) => p.theme.fg};
`;

export const Subtitle = styled.p`
  margin: 0;
  opacity: 0.75;
  font-size: 14px;
`;

export const List = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 12px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  background: ${(p) => p.theme.card};
  border: 1px solid ${(p) => p.theme.fg}14;
  align-items: center;

  cursor: pointer;
  transition: transform 140ms ease, border-color 140ms ease, background 140ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${(p) => p.theme.fg}24;
  }

  &:active {
    transform: translateY(0px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 160, 255, 0.35);
  }
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${(p) => p.theme.bg};
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid ${(p) => p.theme.fg}14;
`;

export const Img = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  display: block;
`;

export const Placeholder = styled.div`
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  font-weight: 800;
  opacity: 0.75;
`;

export const Name = styled.div`
  text-transform: capitalize;
  font-weight: 700;
  color: ${(p) => p.theme.fg};
  display: grid;
  gap: 4px;
`;

export const Meta = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

export const Visits = styled.span`
  justify-self: end;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 10px;
  border-radius: 999px;
  background: ${(p) => p.theme.bg};
  border: 1px solid ${(p) => p.theme.fg}14;
  opacity: 0.95;
  white-space: nowrap;
`;

export const EmptyState = styled.div`
  margin-top: 12px;
  padding: 18px;
  border-radius: 14px;
  background: ${(p) => p.theme.card};
  border: 1px dashed ${(p) => p.theme.fg}22;
  opacity: 0.9;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const Btn = styled.button`
  border: 1px solid ${(p) => p.theme.fg}18;
  background: ${(p) => p.theme.card};
  color: ${(p) => p.theme.fg};
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 120ms ease, border-color 120ms ease;

  &:hover {
    border-color: ${(p) => p.theme.fg}28;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 160, 255, 0.35);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }
`;

export const DangerBtn = styled(Btn)`
  border-color: rgba(255, 80, 80, 0.35);

  &:hover {
    border-color: rgba(255, 80, 80, 0.6);
  }
`;
