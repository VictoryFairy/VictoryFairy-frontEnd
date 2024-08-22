interface Theme {
    colors: {
        primary: string;
        secondary: string;
    };
}
export declare const getTheme: (team: string) => Theme;
export {};
