import { UserInfo } from "@/types/User";
interface TeamSelectProps {
    setstep: (step: number) => void;
    userInfo: UserInfo;
    handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
}
declare const TeamSelect: ({ handleSetUserInfo, userInfo, setstep, }: TeamSelectProps) => import("react/jsx-runtime").JSX.Element;
export default TeamSelect;
