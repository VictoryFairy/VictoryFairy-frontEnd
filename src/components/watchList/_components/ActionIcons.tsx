import styled from "styled-components";
import Icon from "../../common/Icon";

interface ActionIconsProps {
  onClickSearch: () => void;
  onClickFilter: () => void;
}

const ActionIcons = ({ onClickSearch, onClickFilter }: ActionIconsProps) => {
  return (
    <ActionIconsContainer>
      <Icon icon='IcFilter' cursor='pointer' onClick={onClickFilter} />
      <Icon icon='IcSearch' cursor='pointer' onClick={onClickSearch} />
    </ActionIconsContainer>
  );
};
const ActionIconsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default ActionIcons;
