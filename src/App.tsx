import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { typography } from "./style/typography";
import PasswordReset from "./pages/PasswordReset";
import { ThemeContextProvider } from "./context/ThemeContext";
import Main from "./pages/main/Main";
import MyPage from "./pages/MyPage";
import Info from "./pages/Info";
import Ranking from "./pages/Ranking";
import TeamChange from "./components/mypage/TeamChange";
import ProfileChange from "./components/mypage/ProfileChange";
import ArrowLeft from "./assets/Icons/arrow-left.svg?react";
import SearchCheerSong from "./pages/SearchCheerSong";

// import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

const LeftWrapper = styled.div`
  ${typography.subtitle_02}
`;

const MiddelWrapper = styled.div`
  ${typography.headline}
`;

const RightWrapper = styled.div`
  ${typography.subtitle_02}
`;

const MyPageLeftWrapper = styled.div`
  ${typography.display}
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout
        left={<LeftWrapper>left</LeftWrapper>}
        center={<MiddelWrapper>Title</MiddelWrapper>}
        right={<RightWrapper>Right</RightWrapper>}
      />
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Layout />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/login",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/password-reset",
    element: <Layout />,
    children: [
      {
        path: "/password-reset",
        element: <PasswordReset />,
      },
    ],
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Main />,
      },
    ],
  },
  {
    path: "/info",
    element: <Layout left={<MyPageLeftWrapper>정보</MyPageLeftWrapper>} />,
    children: [
      {
        path: "/info",
        element: <Info />,
      },
    ],
  },
  {
    path: "/search-cheerSong",
    children: [
      {
        path: "/search-cheerSong",
        element: <SearchCheerSong />,
      },
    ],
  },
  {
    path: "/mypage",
    element: (
      <Layout left={<MyPageLeftWrapper>마이페이지</MyPageLeftWrapper>} />
    ),
    children: [
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/ranking",
    element: <Layout left={<MyPageLeftWrapper>랭킹</MyPageLeftWrapper>} />,
    children: [
      {
        path: "/ranking",
        element: <Ranking />,
    path: "/mypage/profile",
    element: (
      <Layout
        left={
          <ArrowLeft
            fill='var(--primary-color)'
            onClick={() => (window.location.href = "/mypage")}
            cursor='pointer'
          />
        }
        center={<MiddelWrapper>프로필 설정</MiddelWrapper>}
      />
    ),
    children: [
      {
        path: "/mypage/profile",
        element: <ProfileChange />,
      },
    ],
  },
  {
    path: "/mypage/team",
    element: (
      <Layout
        left={
          <ArrowLeft
            fill='var(--primary-color)'
            onClick={() => (window.location.href = "/mypage")}
            cursor='pointer'
          />
        }
        center={<MiddelWrapper>응원팀 변경</MiddelWrapper>}
      />
    ),
    children: [
      {
        path: "/mypage/team",
        element: <TeamChange />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default App;
