import * as icons from "@/assets/Icons/_index";
interface IconProps extends React.SVGProps<SVGSVGElement> {
    icon: keyof typeof icons;
    fill?: string;
}
declare const Icon: ({ icon, fill, ...props }: IconProps) => import("react/jsx-runtime").JSX.Element;
export default Icon;
