import styled from "styled-components";
import Icon from "./Icon";

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
interface MonthNavProps {
  onMonthChange: (date: Date) => void;
  selectMonth: Date;
}

const MonthNav = ({ onMonthChange, selectMonth }: MonthNavProps) => {
  return (
    <MonthNavContainer>
      <Icon
        icon='IcArrowLeft'
        onClick={() => {
          const newDate = new Date(selectMonth);
          newDate.setMonth(selectMonth.getMonth() - 1);
          onMonthChange(newDate);
        }}
        fill='#2F3036'
      />
      <span>
        {MONTHS[selectMonth.getMonth()]} {selectMonth.getFullYear()}
      </span>
      <Icon
        icon='IcArrowRight'
        onClick={() => {
          const newDate = new Date(selectMonth);
          newDate.setMonth(selectMonth.getMonth() + 1);
          // 이번 달 보다 큰 달로 넘어가면 이번 달로 설정
          if (newDate > new Date()) {
            newDate.setMonth(new Date().getMonth());
          }
          onMonthChange(newDate);
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
