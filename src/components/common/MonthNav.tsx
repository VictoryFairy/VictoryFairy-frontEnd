import styled from "styled-components";
import Icon from "./Icon";
import Text from "./Text";

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
  const currentDate = new Date();

  const isPreviousDisabled = () => {
    const previousMonth = new Date(selectMonth);
    previousMonth.setMonth(selectMonth.getMonth() - 1);
    return previousMonth.getFullYear() < currentDate.getFullYear();
  };

  const isNextDisabled = () => {
    const nextMonth = new Date(selectMonth);
    nextMonth.setMonth(selectMonth.getMonth() + 1);
    return nextMonth > currentDate;
  };

  const handlePreviousMonth = () => {
    if (isPreviousDisabled()) return;

    const newDate = new Date(selectMonth);
    newDate.setMonth(selectMonth.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    if (isNextDisabled()) return;

    const newDate = new Date(selectMonth);
    newDate.setMonth(selectMonth.getMonth() + 1);
    onMonthChange(newDate);
  };

  return (
    <MonthNavContainer>
      <Icon
        icon='IcArrowLeft'
        onClick={handlePreviousMonth}
        fill={isPreviousDisabled() ? "#CCCCCC" : "#2F3036"} // Disabled color
        cursor={isPreviousDisabled() ? "not-allowed" : "pointer"}
      />
      <Text variant='title_02'>
        {MONTHS[selectMonth.getMonth()]} {selectMonth.getFullYear()}
      </Text>
      <Icon
        icon='IcArrowRight'
        onClick={handleNextMonth}
        fill={isNextDisabled() ? "#CCCCCC" : "#2F3036"} // Disabled color
        cursor={isNextDisabled() ? "not-allowed" : "pointer"}
      />
    </MonthNavContainer>
  );
};

const MonthNavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
`;

export default MonthNav;
