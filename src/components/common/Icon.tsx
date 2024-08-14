import { icons, IconType } from "../../types/Icons";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconType;
  fill?: string;
}

const Icon = ({ icon, fill = "#2F3036", ...props }: IconProps) => {
  const SVGIcon = icons[icon];
  return <SVGIcon fill={fill} {...props} />;
};

export default Icon;
