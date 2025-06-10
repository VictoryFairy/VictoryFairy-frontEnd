import CalendarComponent from "@/components/common/Calendar";
import Icon from "@/components/common/Icon";
import moment from "moment";
import { MyGame } from "@/types/Game";

interface CalendarProps {
  registeredGames: MyGame[] | undefined;
  onMonthChange: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const SelectMatchCalendar = ({
  registeredGames,
  onMonthChange,
  selectedDate,
  setSelectedDate,
}: CalendarProps) => {
  const getRegisteredGame = (date: Date) => {
    return registeredGames?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );
  };

  /**
   * 날짜 클릭 시 선택된 날짜 변경
   * @param date 선택된 날짜
   */
  const handleClickDay = (date: Date) => {
    setSelectedDate(date);
  };

  /**
   * 월 변경 시 선택된 월 변경
   * @param date 선택된 월
   */
  const handleMonthChange = (date: Date) => {
    onMonthChange(date);
  };

  const tileContent = ({ date }: any) => {
    const match = getRegisteredGame(date);

    if (match && match.status === "Win") {
      return <Icon icon='IcWin' className='win-icon' />;
    }
    if (match && match.status === "Lose") {
      return <Icon icon='IcLose' className='lose-icon' />;
    }
    if (match && match.status === "Tie") {
      return <Icon icon='IcTie' />;
    }
    if (match && match.status === "No game") {
      return <Icon icon='IcNoGame' />;
    }
  };

  const tileClassName = ({ date }: any) => {
    const match = registeredGames?.find(
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
    return `${isFutureDate ? "future-date" : ""} ${isSelected ? "selected" : ""}`;
  };
  return (
    <CalendarComponent
      onClickDay={handleClickDay}
      tileContent={tileContent}
      tileClassName={tileClassName}
      onActiveStartDateChange={({ activeStartDate }) =>
        handleMonthChange(activeStartDate!)
      }
      className='calendar'
      showExplainBar={false}
    />
  );
};

export default SelectMatchCalendar;
