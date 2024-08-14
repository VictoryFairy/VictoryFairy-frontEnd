import moment from "moment";
import Calendar from "react-calendar";
import styled from "styled-components";
import { useState } from "react";
import { typography } from "../../style/typography";
import WinIcon from "../../assets/Icons/win.svg?react";
import LoseIcon from "../../assets/Icons/lose.svg?react";
import TieIcon from "../../assets/Icons/tie.svg?react";
import NoGameIcon from "../../assets/Icons/no-game.svg?react";
import { MyGame } from "../../types/Game";
import Icon from "./Icon";

interface CalendarProps {
  data?: MyGame[];
  onClick?: (
    date: Date,
    evnet: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

const CalendarContainer = ({ data, onClick }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleClickDay = (
    date: Date,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setSelectedDate(date);
    if (onClick) {
      onClick(date, event);
    }
  };

  function titleContent({ date }: any) {
    const match = data?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );

    if (match) {
      if (match.status === "WIN") {
        return <WinIcon />;
      }
      if (match.status === "Lose") {
        return <LoseIcon />;
      }
      if (match.status === "Tie") {
        return <TieIcon />;
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
      if (match.status === "WIN") {
        return "event-tile win";
      }
      if (match.status === "Lose") {
        return "event-tile lose";
      }
      if (match.status === "Tie") {
        return "event-tile draw";
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
      />
      {data && (
        <div className='explain'>
          <div>
            <Icon icon='IcWin' />
            승리
          </div>
          <div>
            <Icon icon='IcLose' />
            패배
          </div>
          <div>
            <Icon icon='IcTie' />
            무승부
          </div>
          <div>
            <NoGameIcon />
            경기 없음
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

  ${typography.subtitle_01}

  .win {
    circle {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
  .lose {
    path {
      fill: ${({ theme }) => theme.colors.secondary};
    }
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
    ${typography.subtitle_02}
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
    abbr {
      display: none;
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
