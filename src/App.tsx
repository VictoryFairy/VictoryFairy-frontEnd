import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
import { useSignupStore } from "./store/signupStep";
import CheersongDetail from "./pages/CheersongDetail";
import Detail from "./pages/Detail";
import SelectMatch from "./pages/register/SelectMatch";
import RegisterForm from "./pages/register/RegisterForm";
import DetailRate from "./pages/main/DetailRate";

const queryClient = new QueryClient();

const MiddelWrapper = styled.div`
  ${typography.headline}
`;

const MyPageLeftWrapper = styled.div`
  ${typography.display}
`;

const BackButton = () => {
  const navigate = useNavigate();
  const { step, decreaseStep } = useSignupStore();

  const handleBack = () => {
    if (
      window.location.pathname === "/signup" ||
      window.location.pathname === "/password-reset"
    ) {
      if (step > 1) {
        decreaseStep();
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <ArrowLeft
      fill='var(--primary-color)'
      onClick={handleBack}
      cursor='pointer'
    />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout footer={false} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Layout footer={false} left={<BackButton />} />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/login",
    element: <Layout left={<BackButton />} footer={false} />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/password-reset",
    element: <Layout left={<BackButton />} footer={false} />,
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
    path: "/cheerSongDetail/:id",
    element: <Layout />,
    children: [
      {
        path: "/cheerSongDetail/:id",
        element: <CheersongDetail />,
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
    path: "/detail",
    element: <Layout />,
    children: [
      {
        path: ":id",
        element: <Detail />,
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
      },
    ],
  },
  {
    path: "/mypage/profile",
    element: (
      <Layout
        left={<BackButton />}
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
        left={<BackButton />}
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
  {
    path: "/select-match",
    element: <Layout />,
    children: [
      {
        path: "/select-match",
        element: <SelectMatch />,
      },
    ],
  },
  {
    path: "/register",
    element: <Layout />,
    children: [
      {
        path: "/register",
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: "/DetailRate",
    element: (
      <Layout
        center={<MiddelWrapper>내 승률</MiddelWrapper>}
        left={<BackButton />}
      />
    ),
    children: [
      {
        path: "/DetailRate",
        element: <DetailRate />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default App;
