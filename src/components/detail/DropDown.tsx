import styled from "styled-components";
import { useState, useRef } from "react";
import Icon from "../common/Icon";
import Text from "../common/Text";

interface DropDownProps {
  onEdit: () => void; // 수정 핸들러
  onDelete: () => void; // 삭제 핸들러
}

const DropDown = ({ onEdit, onDelete }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleClickEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleClickDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <Menu ref={dropdownRef}>
      <div
        role='button'
        className='select'
        tabIndex={0}
        aria-label='Select dropdown'
        onClick={handleClickSelect}>
        <Icon icon='IcMenu' />
      </div>
      {isOpen && (
        <DropDownContainer>
          <ul>
            <li className='toggle-list' onClick={handleClickEdit}>
              <Icon icon='IcEdit' />
              <Text variant='subtitle_02'>수정하기</Text>
            </li>
            <hr />
            <li className='toggle-list' onClick={handleClickDelete}>
              <Icon icon='IcDelete' />
              <Text variant='subtitle_02'>삭제하기</Text>
            </li>
          </ul>
        </DropDownContainer>
      )}
    </Menu>
  );
};

const Menu = styled.div`
  width: 100%;
  position: relative;
`;

const DropDownContainer = styled.ul`
  width: 100%;
  background-color: var(--white);
  position: absolute;
  padding: 12px;
  border-radius: 8px;
  top: 20px;
  right: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  width: 120px;

  .toggle-list {
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: var(--gray-100);
    }
  }
  hr {
    border: 0.5px solid var(--gray-50);
  }
`;

export default DropDown;
