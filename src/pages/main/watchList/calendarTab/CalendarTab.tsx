import Icon from "@/components/common/Icon";
import { MyGame } from "@/types/Game";
import moment from "moment";
import Calendar from "@/components/common/Calendar";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface CalendarProps {
  registeredGames: MyGame[];
  onMonthChange: (date: Date) => void;
  selectedMonth: Date;
}

const CalendarTab = ({
  registeredGames,
  onMonthChange,
  selectedMonth,
}: CalendarProps) => {
  const navigate = useNavigate();

  const handleClickRegisteredGame = (date: Date) => {
    const match = registeredGames?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );

    if (match) {
      navigate(`/detail/${match.id}`);
    }
  };

  const handleClickDoubleHeader = (sameDateMatches: MyGame[]) => {
    navigate(`/double-header-list`, {
      state: {
        doubleHeaderMatches: sameDateMatches,
      },
    });
  };

  const tileContent = ({ date }: any) => {
    const match = registeredGames?.find(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );

    // 응원팀에 따라 더블헤더 아이콘
    const doubleHeaderIcon = (sameDateMatches: MyGame[]) => {
      const { teamId } = useAuthStore.getState();
      switch (teamId) {
        case 1:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcLTDoubleHeader'
              cursor='pointer'
            />
          );
        case 2:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcDSDoubleHeader'
              cursor='pointer'
            />
          );
        case 3:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcKIADoubleHeader'
              cursor='pointer'
            />
          );
        case 4:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcSSDoubleHeader'
              cursor='pointer'
            />
          );
        case 5:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcSSGDoubleHeader'
              cursor='pointer'
            />
          );
        case 6:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcNCDoubleHeader'
              cursor='pointer'
            />
          );
        case 7:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcLGDoubleHeader'
              cursor='pointer'
            />
          );
        case 8:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcKWDoubleHeader'
              cursor='pointer'
            />
          );
        case 9:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcKTDoubleHeader'
              cursor='pointer'
            />
          );
        case 10:
          return (
            <Icon
              onClick={() => handleClickDoubleHeader(sameDateMatches)}
              icon='IcHHDoubleHeader'
              cursor='pointer'
            />
          );
        default:
          return null;
      }
    };
    // 같은 날짜의 경기가 2개 일 경우
    const sameDateMatches = registeredGames?.filter(
      (item: any) => moment(date).format("YYYY-MM-DD") === item.game.date,
    );

    if (sameDateMatches.length > 1) {
      return doubleHeaderIcon(sameDateMatches);
    }

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

  return (
    <Calendar
      tileContent={tileContent}
      tileClassName={tileClassName}
      onActiveStartDateChange={({ activeStartDate }) =>
        onMonthChange(activeStartDate!)
      }
      value={selectedMonth}
    />
  );
};

export default CalendarTab;
