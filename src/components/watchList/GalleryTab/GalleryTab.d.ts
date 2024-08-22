import { MyGame } from "@/types/Game";
interface GalleryTabProps {
    data?: MyGame[];
    onClick: (match: MyGame) => void;
}
declare const GalleryTab: ({ data, onClick }: GalleryTabProps) => import("react/jsx-runtime").JSX.Element;
export default GalleryTab;
