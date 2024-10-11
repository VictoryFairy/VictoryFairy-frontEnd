import "sanitize.css";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`




:root{
    --primary-color: #2F3036;
    --black: #000000;
    --white: #FFFFFF;
    --gray-900: #2F3036;
    --gray-800: #43444D;
    --gray-700: #545763;
    --gray-600: #666A79;
    --gray-500: #74788A;
    --gray-400: #898C9B;
    --gray-300: #9EA0AC;
    --gray-200: #BABCC3;
    --gray-100: #D6D6D9;
    --gray-50: #EFEFEF;
    --primary-10: #F5F5F5;
    --primary-5: #F8F8FA;
    --red-900: #CA240C;
    --red-800: #E33417;
    --red-700: #F13B1B;
    --red-600: #FF4321;
    --red-500: #FF4925;
    --red-400: #FF6744;
    --red-300: #FF8566;
    --red-200: #FFA892;
    --red-100: #FFCBBC;
    --red-50: #FDE9E7;
    --green-900: #006C00;
    --green-800: #008E00;
    --green-700: #00A300;
    --green-600: #00B700;
    --green-500: #16C706;
    --green-400: #53D041;
    --green-300: #7AD967;
    --green-200: #A4E495;
    --green-100: #C9EFBF;
    --green-50: #E9F9E5;

     /* 팀 컬러 변수 */
     --lg-twins-red: #C2232F;
    --lg-twins-black: #000000;

    --doosan-bears-navy: #131230;
    --doosan-bears-red: #CA000F;

    --ssg-landers-red: #C70032;
    --ssg-landers-gray: #8C8C8C;

    --kt-wiz-black: #000000;
    --kt-wiz-red: #FF1425;

    --hanwha-eagles-orange: #FF6600;
    --hanwha-eagles-black: #231F20;

    --nc-dinos-blue: #315288;
    --nc-dinos-gold: #CEAC67;

    --lotte-giants-red: #900020;
    --lotte-giants-navy: #041E42;

    --kia-tigers-red: #FF1A24;
    --kia-tigers-black: #202224;

    --kiwoom-heroes-magenta: #820024;
    --kiwoom-heroes-pink: #FF4281;
    
    --samsung-lions-blue: #0066B3;
    --samsung-lions-gray: #8A8B8D;
}

body{
    padding: 0;
    margin:0;
    min-height: 100vh;
    font-family: 'Spoqa Han Sans Neo', sans-serif;
}
button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    color: inherit;
}


h1,h2,h3,h4,h5,h6,p{
    margin: 0;
    padding: 0;
    
}

ul{
    list-style: none;
    padding: 0;
}
*{
}
`;
