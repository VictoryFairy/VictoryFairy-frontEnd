import { useState } from "react";
import styled from "styled-components";
import ArrowLeftIcon from "../../assets/Icons/arrow-left.svg?react";
import ArrowRightIcon from "../../assets/Icons/arrow-right.svg?react";
import GameListItem from "./GameListItem";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface GameListItemProps {
  data?: any;
}

const ListTab = ({ data }: GameListItemProps) => {
  const [date, setDate] = useState(new Date());

  return (
    <ListContainer>
      <nav>
        <ArrowLeftIcon
          onClick={() => {
            const newDate = new Date(date);
            newDate.setMonth(date.getMonth() - 1);
            setDate(newDate);
          }}
          fill='#2F3036'
        />
        <span>
          {MONTHS[date.getMonth()]} {date.getFullYear()}
        </span>
        <ArrowRightIcon
          onClick={() => {
            const newDate = new Date(date);
            newDate.setMonth(date.getMonth() + 1);
            setDate(newDate);
          }}
          fill='#2F3036'
        />
      </nav>
      <GameList>
        {data.map((item: any) => (
          <GameListItem key={item.id} data={item} />
        ))}
      </GameList>
    </ListContainer>
  );
};
const ListContainer = styled.div`
  margin-top: 20px;
  nav {
    display: flex;
    justify-content: space-between;
  }
`;

const GameList = styled.ul`
  width: 100%;
`;

export default ListTab;
