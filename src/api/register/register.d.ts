import { MyGame } from "@/types/Game";
export declare const postUploadImg: (formData: FormData) => Promise<any>;
export declare const postRegisterGame: (data: any) => Promise<any>;
export declare const getRegisteredGameByMonthly: (year: number, month: number) => Promise<MyGame[]>;
export declare const getRegisteredGameById: (id: number) => Promise<MyGame>;
