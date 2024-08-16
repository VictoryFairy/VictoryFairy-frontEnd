import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Team } from "@/types/Game";
import Icon from "../common/Icon";
import Text from "../common/Text";

interface CheerTeamSelectProps {
  setCheeringTeamId: (id: number) => void;
  awayTeam: Team;
  homeTeam: Team;
}

const CheerTeamSelect = ({
  setCheeringTeamId,
  awayTeam,
  homeTeam,
}: CheerTeamSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cheeringTeam, setCheeringTeam] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickSelect = () => {
    setIsOpen(!isOpen);
  };

  // 드롭다운 바깥쪽을 클릭하면 드롭다운을 닫음
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectItem = (team: Team) => {
    setCheeringTeamId(team.id);
    setCheeringTeam(team.name);
    setIsOpen(false);
  };

  return (
    <CheerTeamSelectContainer ref={dropdownRef}>
      <Text color='#545763' className='label' variant='caption'>
        응원팀
      </Text>
      <div
        role='button'
        onClick={handleClickSelect}
        className='select'
        tabIndex={0}>
        {cheeringTeam === null ? (
          <Text variant='subtitle_02'>응원팀을 선택해주세요</Text>
        ) : (
          <Text variant='subtitle_02'>{cheeringTeam}</Text>
        )}
        <Icon icon='IcArrowDown' />
      </div>
      {isOpen && (
        <DropDownContainer>
          <li onClick={() => handleSelectItem(homeTeam)} className='team-item'>
            <Text variant='subtitle_02'>{homeTeam.name}</Text>
          </li>
          <hr />
          <li onClick={() => handleSelectItem(awayTeam)} className='team-item'>
            <Text variant='subtitle_02'>{awayTeam.name}</Text>
          </li>
        </DropDownContainer>
      )}
    </CheerTeamSelectContainer>
  );
};

const CheerTeamSelectContainer = styled.div`
  border-bottom: 1px solid var(--gray-200);
  width: 100%;
  position: relative;
  .select {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px 8px 8px 0;
    cursor: pointer;
  }
`;

const DropDownContainer = styled.ul`
  width: 100%;
  background-color: var(--white);
  position: absolute;
  z-index: 1;
  padding: 12px;
  border-radius: 8px;
  top: 60px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

  li {
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

export default CheerTeamSelect;
