import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text";
import { typography } from "@/style/typography";
import { MyGame } from "@/types/Game";
import moment from "moment";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface CalendarProps {
  registeredGames: MyGame[];
  onMonthChange: (date: Date) => void;
  selectMonth: Date;
}

const CalendarTab = ({
  registeredGames,
  onMonthChange,
  selectMonth,
}: CalendarProps) => {
  const navigate = useNavigate();

  const formatDay = (_: any, date: Date) => {
    return moment(date).format("D");
  };
  const formatShortWeekday = (_: any, date: Date) => {
    return moment(date).format("ddd");
  };
  const formatMonth = (_: any, date: Date) => {
    return moment(date).format("MMMM YYYY");
  };

  const handleClickRegisteredGame = (date: Date) => {
    const match = registeredGames?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );

    if (match) {
      navigate(`/detail/${match.id}`);
    }
  };

  const tileContent = ({ date }: any) => {
    const match = registeredGames?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );
    if (match && match.status === "Win") {
      return (
        <Icon
          onClick={() => handleClickRegisteredGame(date)}
          icon='IcWin'
          className='win-icon'
          cursor='pointer'
        />
      );
    }
    if (match && match.status === "Lose") {
      return (
        <Icon
          onClick={() => handleClickRegisteredGame(date)}
          icon='IcLose'
          className='lose-icon'
          cursor='pointer'
        />
      );
    }
    if (match && match.status === "Tie") {
      return (
        <Icon
          onClick={() => handleClickRegisteredGame(date)}
          icon='IcTie'
          cursor='pointer'
        />
      );
    }
    if (match && match.status === "No game") {
      return (
        <Icon
          onClick={() => handleClickRegisteredGame(date)}
          icon='IcNoGame'
          cursor='pointer'
        />
      );
    }
  };

  const tileClassName = ({ date }: any) => {
    const match = registeredGames?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );
    const isFutureDate = moment(date).isAfter(moment(), "day");

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
    return isFutureDate ? "future-date" : "";
  };

  const handleMonthChange = (date: Date) => {
    onMonthChange(date); // onMonthChange 핸들러 호출
  };

  return (
    <CalendarTabContainer>
      <CalendarStyle
        locale='ko-KR'
        formatDay={formatDay}
        formatShortWeekday={formatShortWeekday}
        formatMonthYear={formatMonth}
        maxDate={new Date()}
        minDate={new Date(2024, 0, 1)}
        minDetail='year'
        next2Label={null}
        prev2Label={null}
        nextLabel={<Icon icon='IcArrowRight' />}
        prevLabel={<Icon icon='IcArrowLeft' />}
        showNeighboringMonth={false}
        tileContent={tileContent}
        tileClassName={tileClassName}
        value={selectMonth}
        tileDisabled={({ activeStartDate, date, view }) => date.getDay() === 0}
        onActiveStartDateChange={
          ({ activeStartDate }) => handleMonthChange(activeStartDate!) // onActiveStartDateChange 이벤트로 Month 변경 감지
        }
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

const CalendarStyle = styled(Calendar)`
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
    width: 47px;
    height: 40px;
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

export default CalendarTab;
