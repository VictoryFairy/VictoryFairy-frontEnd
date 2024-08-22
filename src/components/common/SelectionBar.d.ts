export interface SelectionBarProps {
    labels: string[];
    activeSelect?: number;
    onSelectClick?: (index: number) => void;
    direction?: "row" | "column";
}
declare const SelectionBar: ({ labels, activeSelect, onSelectClick, direction, }: SelectionBarProps) => import("react/jsx-runtime").JSX.Element;
export default SelectionBar;
