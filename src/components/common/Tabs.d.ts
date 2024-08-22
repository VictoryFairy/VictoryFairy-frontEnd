export interface TabProps {
    labels: string[];
    activeTab?: number;
    onTabClick?: (index: number) => void;
    direction?: "row" | "column";
}
declare const Tabs: ({ labels, activeTab, onTabClick, direction, }: TabProps) => import("react/jsx-runtime").JSX.Element;
export default Tabs;
