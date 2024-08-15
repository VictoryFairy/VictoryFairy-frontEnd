import * as icons from "../../assets/Icons/_index";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: keyof typeof icons;
  fill?: string;
}

const Icon = ({ icon, fill = "#2F3036", ...props }: IconProps) => {
  const SVGIcon = icons[icon];
  return <SVGIcon fill={fill} {...props} />;
};

export default Icon;
