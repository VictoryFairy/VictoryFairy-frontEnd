interface StadiumsResponse {
    id: number;
    name: string;
    fullName: string;
    latitude: number;
    longitude: number;
}
export declare const getStadiums: () => Promise<StadiumsResponse[]>;
export declare const getParkingInfosByStadiumId: (id: number) => Promise<any>;
interface TeamResponse {
    id: number;
    name: string;
}
export declare const getTeams: () => Promise<TeamResponse[]>;
export {};
