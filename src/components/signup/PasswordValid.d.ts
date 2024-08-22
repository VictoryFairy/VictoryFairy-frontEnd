import { UserInfo } from "@/types/User";
interface PasswordValidProps {
    setstep: (step: number) => void;
    handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
}
declare const PasswordValid: ({ setstep, handleSetUserInfo }: PasswordValidProps) => import("react/jsx-runtime").JSX.Element;
export default PasswordValid;
