import styled from "styled-components";
import { Calendar as CalendarStyle, CalendarProps } from "react-calendar";
import { typography } from "@/style/typography";
import moment from "moment";
import Icon from "./Icon";
import Text from "./Text";

const Calendar = ({ ...props }: CalendarProps) => {
  const formatDay = (_: any, date: Date) => {
    return moment(date).format("D");
  };
  const formatShortWeekday = (_: any, date: Date) => {
    return moment(date).format("ddd");
  };
  const formatMonth = (_: any, date: Date) => {
    return moment(date).format("MMMM YYYY");
  };
  return (
    <CalendarTabContainer>
      <CalendarWrraper
        locale='ko-KR'
        formatDay={formatDay}
        formatShortWeekday={formatShortWeekday}
        formatMonthYear={formatMonth}
        maxDate={new Date()}
        minDate={new Date(2024, 0, 1)}
        minDetail='year'
        next2Label={null}
        prev2Label={null}
        nextAriaLabel='다음 달로 이동'
        prevAriaLabel='이전 달로 이동'
        nextLabel={<Icon icon='IcArrowRight' />}
        prevLabel={<Icon icon='IcArrowLeft' />}
        navigationAriaLabel='달력 이동'
        showNeighboringMonth={false}
        {...props}
      />
      <ExplainBar>
        <div>
          <Icon icon='IcWin' className='win-icon' />
          <Text variant='subtitle_01'>승리</Text>
        </div>
        <div>
          <Icon icon='IcLose' className='lose-icon' />
          <Text variant='subtitle_01'>패배</Text>
        </div>
        <div>
          <Icon icon='IcTie' />
          <Text variant='subtitle_01'>무승부</Text>
        </div>
        <div>
          <Icon icon='IcNoGame' />
          <Text variant='subtitle_01'>경기 취소</Text>
        </div>
      </ExplainBar>
    </CalendarTabContainer>
  );
};
const CalendarTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--gray-50);
  gap: 10px;
  .win-icon {
    fill: ${({ theme }) => theme.colors.primary};
  }
  .lose-icon {
    fill: ${({ theme }) => theme.colors.secondary};
  }
`;

const CalendarWrraper = styled(CalendarStyle)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--white);
  border-radius: 8px;
  width: 330px;
  margin: 0 auto;

  .react-calendar__navigation {
    align-items: center;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px;

    span {
      cursor: pointer;
      ${typography.title_02};
    }

    // 마지막 달 이동 버튼 색변경
    :where([aria-disabled="true" i], [disabled]) {
      svg {
        fill: var(--gray-200);
      }
    }
  }

  // mon, tue, wed, thu, fri, sat, sun
  .react-calendar__month-view__weekdays {
    text-align: center;
    abbr {
      ${typography.subtitle_02};
      color: var(--gray-200);
      text-decoration: none;
    }
  }

  // 각 날짜 타일
  .react-calendar__tile {
    width: 43px;
    height: 43px;
  }

  // 특정 날짜 타일 (승, 패, 무승부, 경기 없음)
  .event-tile {
    position: relative;

    abbr {
      display: none;
    }
  }

  // 아직 오지 않은 날짜
  .future-date {
    color: var(--gray-200);
  }
`;

const ExplainBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  width: 328px;
  margin: 0 auto;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px;
    width: fit-content;
    gap: 8px;
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;
export default Calendar;
