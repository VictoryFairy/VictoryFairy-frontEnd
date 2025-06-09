import styled from "styled-components";
import DoubleHeaderItem from "./DoubleHeaderItem";

const DoubleHeader = () => {
  return (
    <DoubleHeaderContainer>
      <DoubleHeaderItem gameType={1} time='12:00' />
    </DoubleHeaderContainer>
  );
};
const DoubleHeaderContainer = styled.div`
  padding: 0px 20px;
`;

export default DoubleHeader;
