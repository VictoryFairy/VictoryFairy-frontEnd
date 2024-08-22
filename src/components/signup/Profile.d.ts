import { UserInfo } from "@/types/User";
interface ProfileProps {
    setstep: (step: number) => void;
    handleSetUserInfo: (userInfo: Partial<UserInfo>) => void;
}
declare const Profile: ({ setstep, handleSetUserInfo }: ProfileProps) => import("react/jsx-runtime").JSX.Element;
export default Profile;
