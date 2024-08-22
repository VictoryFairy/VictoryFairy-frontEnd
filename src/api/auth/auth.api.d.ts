import { MypageUserInfo } from "../../types/UserInfo";
interface EmailCodeRequest {
    email: string;
}
export declare const requestEmailVerificationCode: (data: EmailCodeRequest) => Promise<number>;
interface VerifyEmailCodeRequest {
    email: string;
    code: string;
}
export declare const verifyEmailCode: (data: VerifyEmailCodeRequest) => Promise<number | undefined>;
export declare const uploadProfileImage: (formData: FormData) => Promise<string>;
interface NicknameCheckRequest {
    nickname: string;
}
export declare const checkNicknameAvailability: (data: NicknameCheckRequest) => Promise<boolean>;
interface SignUpRequest {
    email: string;
    nickname: string;
    image: string;
    teamId: number;
    password: string;
}
export declare const signUp: (data: SignUpRequest) => Promise<number | undefined>;
interface LoginRequest {
    email: string;
    password: string;
}
export declare const login: (data: LoginRequest) => Promise<any>;
interface ChangePasswordRequest {
    email: string;
    password: string;
}
export declare const changePassword: (data: ChangePasswordRequest) => Promise<void>;
export declare const checkRefreshToken: () => Promise<void>;
export declare const getMemberInfo: () => Promise<MypageUserInfo>;
export {};
