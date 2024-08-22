import { UserInfo } from "@/types/User";
interface EmailValidProps {
    setstep: (step: number) => void;
    handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
}
declare const EmailValid: ({ setstep, handleSetUserInfo }: EmailValidProps) => import("react/jsx-runtime").JSX.Element;
export default EmailValid;
