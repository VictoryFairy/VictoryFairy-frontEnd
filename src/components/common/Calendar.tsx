import moment from "moment";
import Calendar from "react-calendar";
import styled from "styled-components";
import { useState } from "react";
import { typography } from "@/style/typography";
import { MyGame } from "../../types/Game";
import Icon from "./Icon";
import Text from "./Text";

interface CalendarProps {
  data?: MyGame[];
  onClick?: (
    date: Date,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onMonthChange?: (date: Date) => void; // Month 변경 핸들러 추가
}

const CalendarContainer = ({ data, onClick, onMonthChange }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleClickDay = (
    date: Date,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // 이벤트 타일인지 확인
    const match = data?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );

    if (match) {
      // 만약 이벤트 타일이면 클릭 이벤트 무시
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    // 이벤트 타일이 아닌 경우에만 날짜 선택 및 클릭 이벤트 처리
    setSelectedDate(date);
    if (onClick) {
      onClick(date, event);
    }
  };

  const handleMonthChange = (date: Date) => {
    if (onMonthChange) {
      onMonthChange(date); // onMonthChange 핸들러 호출
    }
  };

  function titleContent({ date }: any) {
    const match = data?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );

    if (match) {
      if (match.status === "Win") {
        return <Icon icon='IcWin' />;
      }
      if (match.status === "Lose") {
        return <Icon icon='IcLose' />;
      }
      if (match.status === "Tie") {
        return <Icon icon='IcTie' />;
      }
      if (match.status === "No game") {
        return <Icon icon='IcNoGame' />;
      }
    }
    return null; // 일치하는 데이터가 없을 경우 아무것도 표시하지 않음
  }

  // 특정 날짜에 대한 클래스 반환
  const tileClassName = ({ date }: any) => {
    const match = data?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );

    const isFutureDate = moment(date).isAfter(moment(), "day");
    const isSelected = selectedDate && moment(date).isSame(selectedDate, "day");

    if (match) {
      if (match.status === "Win") {
        return "event-tile win";
      }
      if (match.status === "Lose") {
        return "event-tile lose";
      }
      if (match.status === "Tie") {
        return "event-tile draw";
      }
      if (match.status === "No game") {
        return "event-tile no-game";
      }
    }
    return `${isFutureDate ? "future" : ""} ${isSelected ? "selected" : ""}`;
  };

  return (
    <CalendarWrapper>
      <CalendarStyle
        locale='ko-KR'
        minDate={new Date(2024, 0, 1)} // 달력의 최소 날짜
        maxDate={new Date()} // 달력의 최대 날짜
        showNeighboringMonth={false} // 이월 날짜 보이기
        // eslint-disable-next-line react/jsx-no-bind
        tileContent={titleContent}
        tileClassName={tileClassName}
        formatDay={(_, date) => moment(date).format("D")}
        formatYear={(_, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(_, date) => moment(date).format("MMMM YYYY")} // 네비게이션에서 August 2024 이렇게 보이도록 설정
        formatShortWeekday={(_, date) => moment(date).format("ddd")} // 요일 2글자로 표시
        nextLabel={<Icon icon='IcArrowRight' />}
        prevLabel={<Icon icon='IcArrowLeft' />}
        next2Label={null}
        prev2Label={null}
        onClickDay={handleClickDay}
        onActiveStartDateChange={
          ({ activeStartDate }) => handleMonthChange(activeStartDate!) // onActiveStartDateChange 이벤트로 Month 변경 감지
        }
      />
      {data && (
        <div className='explain'>
          <div>
            <Icon icon='IcWin' />
            <Text variant='subtitle_01'>승리</Text>
          </div>
          <div>
            <Icon icon='IcLose' />
            <Text variant='subtitle_01'>패배</Text>
          </div>
          <div>
            <Icon icon='IcTie' />
            <Text variant='subtitle_01'>무승부</Text>
          </div>
          <div>
            <Icon icon='IcNoGame' />
            <Text variant='subtitle_01'>경기 없음</Text>
          </div>
        </div>
      )}
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--gray-100);
  border-radius: 8px;

  .win {
    fill: ${({ theme }) => theme.colors.primary};
  }
  .lose {
    fill: ${({ theme }) => theme.colors.secondary};
  }

  .explain {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4px;
      width: fit-content;
      gap: 8px;

      svg {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

const CalendarStyle = styled(Calendar)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 12px 16px;
  gap: 10px;
  background: var(--white);
  border-radius: 8px;
  width: 330px;
  .future {
    color: var(--gray-200);
  }

  .selected {
    background: var(--primary-color);
    color: var(--white);
    border-radius: 50%;
  }
  // 상단 네비게이션
  .react-calendar__navigation {
    align-items: center;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    ${typography.title_02}
    padding:8px;

    .react-calendar__navigation__label {
      flex-grow: 0 !important; /* 기본 flex-grow: 1 을 덮어쓰기 */
      pointer-events: none;
    }
  }

  // 요일 ex) Mon, Tue, Wed ..
  .react-calendar__month-view__weekdays__weekday {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray-400);
  }

  abbr {
    ${typography.subtitle_02}
    text-decoration: none;
  }

  .react-calendar__tile {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 43px;
    height: 43px;
    padding: 0;
  }
  .event-tile {
    position: relative;

    abbr {
      z-index: 1;
    }
    svg {
      position: absolute;
    }
  }
  .img {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    pointer-events: none;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default CalendarContainer;
