import Icon from "@/components/common/Icon";
import { MyGame } from "@/types/Game";
import moment from "moment";
import Calendar from "@/components/common/Calendar";
import { useNavigate } from "react-router-dom";

interface CalendarProps {
  registeredGames: MyGame[];
  onMonthChange: (date: Date) => void;
}

const CalendarTab = ({ registeredGames, onMonthChange }: CalendarProps) => {
  const navigate = useNavigate();

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
    <Calendar
      tileContent={tileContent}
      tileClassName={tileClassName}
      onActiveStartDateChange={({ activeStartDate }) =>
        handleMonthChange(activeStartDate!)
      }
    />
  );
};

export default CalendarTab;
