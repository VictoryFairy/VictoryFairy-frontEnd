import CalendarComponent from "@/components/common/Calendar";
import moment from "moment";

interface CalendarProps {
  onMonthChange: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

/**
 * 경기 선택을 위한 달력 컴포넌트
 * 선택된 날짜만 동그라미로 표시
 */
const SelectMatchCalendar = ({
  onMonthChange,
  selectedDate,
  setSelectedDate,
}: CalendarProps) => {
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

  /**
   * 각 날짜 타일에 표시할 내용
   * 현재는 아무것도 표시하지 않음 (등록된 경기 아이콘 제거)
   */
  const tileContent = () => {
    return null;
  };

  /**
   * 각 날짜 타일의 CSS 클래스명 결정
   * 선택된 날짜만 'selected' 클래스 적용하여 동그라미 표시
   */
  const tileClassName = ({ date }: any) => {
    const isFutureDate = moment(date).isAfter(moment(), "day");
    const isSelected = selectedDate && moment(date).isSame(selectedDate, "day");

    return `${isFutureDate ? "future-date" : ""} ${isSelected ? "selected" : ""}`.trim();
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
