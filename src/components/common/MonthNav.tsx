import styled from "styled-components";
import { useState } from "react";
import ArrowLeftIcon from "../../assets/Icons/arrow-left.svg?react";
import ArrowRightIcon from "../../assets/Icons/arrow-right.svg?react";

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

const MonthNav = () => {
  const [date, setDate] = useState(new Date());
  return (
    <MonthNavContainer>
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
    </MonthNavContainer>
  );
};
const MonthNavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  height: 56px;
`;

export default MonthNav;
