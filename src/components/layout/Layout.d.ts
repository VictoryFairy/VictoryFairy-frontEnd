import { HeaderProps } from "../common/Header";
interface LayoutProps extends HeaderProps {
    footer?: boolean;
}
declare const Layout: ({ left, center, right, footer }: LayoutProps) => import("react/jsx-runtime").JSX.Element;
export default Layout;
