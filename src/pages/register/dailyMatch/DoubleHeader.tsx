import styled from "styled-components";
import { Game } from "@/types/Game";
import DoubleHeaderItem from "./DoubleHeaderItem";

const DoubleHeader = ({ group }: { group: Game[] }) => {
  return (
    <DoubleHeaderContainer>
      {group.map((match) => (
        <DoubleHeaderItem key={match.id} match={match} />
      ))}
    </DoubleHeaderContainer>
  );
};
const DoubleHeaderContainer = styled.div`
  padding: 0px 20px;
`;

export default DoubleHeader;
