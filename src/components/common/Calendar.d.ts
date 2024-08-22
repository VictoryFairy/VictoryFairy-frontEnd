import { MyGame } from "../../types/Game";
interface CalendarProps {
    data?: MyGame[];
    onClick?: (date: Date, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onMonthChange?: (date: Date) => void;
}
declare const CalendarContainer: ({ data, onClick, onMonthChange }: CalendarProps) => import("react/jsx-runtime").JSX.Element;
export default CalendarContainer;
