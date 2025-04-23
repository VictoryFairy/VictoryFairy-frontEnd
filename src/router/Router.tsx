import { createBrowserRouter, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Suspense, lazy } from "react";
import Loading from "@/components/common/Loading";
import Info from "@/pages/Info";
import TeamSelect from "@/pages/TeamSelect";
import Layout from "../components/layout/Layout";
import Icon from "../components/common/Icon";
import { useSignupStore } from "../store/signupStep";
import { typography } from "../style/typography";
import logo from "../assets/images/Logo/logo.webp";

const Home = lazy(() => import("../pages/Home"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const PasswordReset = lazy(() => import("../pages/PasswordReset"));
const Main = lazy(() => import("../pages/main/Main"));
const MyPage = lazy(() => import("../pages/MyPage"));
const Ranking = lazy(() => import("../pages/Ranking"));
const TeamChange = lazy(() => import("../components/mypage/TeamChange"));
const ProfileChange = lazy(() => import("../components/mypage/ProfileChange"));
const SocialLogin = lazy(() => import("../components/mypage/SocialLogin"));
const WithDraw = lazy(() => import("../components/mypage/WithDraw"));
const WithDraw2 = lazy(() => import("../components/mypage/WithDraw2"));
const SearchCheerSong = lazy(() => import("../pages/SearchCheerSong"));
const CheersongDetail = lazy(() => import("../pages/CheersongDetail"));
const Detail = lazy(() => import("../pages/detail/Detail"));
const SelectMatch = lazy(() => import("../pages/register/SelectMatch"));
const RegisterForm = lazy(() => import("../pages/register/RegisterForm"));
const DetailRate = lazy(() => import("../pages/main/DetailRate"));
const NotFound = lazy(() => import("../pages/NotFound"));
const OAuthCallback = lazy(() => import("../components/common/OAuthCallback"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));

const MiddelWrapper = styled.div`
  ${typography.headline}
`;

const MyPageLeftWrapper = styled.div`
  ${typography.display}
`;

const LogoWrapper = styled.img`
  width: 164px;
  height: 48px;
`;

const BackButton = () => {
  const { step, decreaseStep } = useSignupStore();
  const navigate = useNavigate();

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

  return <Icon icon='IcArrowLeft' cursor='pointer' onClick={handleBack} />;
};

const Logo = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return <LogoWrapper alt='승리요정' src={logo} onClick={goHome} />;
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout footer={false} />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/team-selection",
    element: <Layout footer={false} left={<BackButton />} />,
    children: [
      {
        path: "/team-selection",
        element: (
          <Suspense fallback={<Loading />}>
            <TeamSelect />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <Layout footer={false} left={<BackButton />} />,
    children: [
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Layout left={<BackButton />} footer={false} />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/password-reset",
    element: <Layout left={<BackButton />} footer={false} />,
    children: [
      {
        path: "/password-reset",
        element: (
          <Suspense fallback={<Loading />}>
            <PasswordReset />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/home",
    element: <Layout left={<Logo />} />,
    children: [
      {
        path: "/home",
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<Loading />}>
            <SearchCheerSong />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/cheerSongDetail/:id",
    element: <Layout />,
    children: [
      {
        path: "/cheerSongDetail/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <CheersongDetail />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<Loading />}>
            <MyPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/detail",
    children: [
      {
        path: ":id",
        element: (
          <Suspense fallback={<Loading />}>
            <Detail />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/ranking",
    element: <Layout left={<MyPageLeftWrapper>랭킹</MyPageLeftWrapper>} />,
    children: [
      {
        path: "/ranking",
        element: (
          <Suspense fallback={<Loading />}>
            <Ranking />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/mypage/profile",
    element: <Layout left={<BackButton />} center='프로필 설정' />,
    children: [
      {
        path: "/mypage/profile",
        element: (
          <Suspense fallback={<Loading />}>
            <ProfileChange />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/mypage/team",
    element: <Layout left={<BackButton />} center='응원팀 변경' />,
    children: [
      {
        path: "/mypage/team",
        element: (
          <Suspense fallback={<Loading />}>
            <TeamChange />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/mypage/login",
    element: <Layout left={<BackButton />} center='간편 로그인 설정' />,
    children: [
      {
        path: "/mypage/login",
        element: (
          <Suspense fallback={<Loading />}>
            <SocialLogin />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/mypage/withDraw",
    element: (
      <Layout
        left={<BackButton />}
        center='회원 탈퇴
'
        footer={false}
      />
    ),
    children: [
      {
        path: "/mypage/withDraw",
        element: (
          <Suspense fallback={<Loading />}>
            <WithDraw />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/mypage/withDraw2",
    element: <Layout left={<BackButton />} center='회원 탈퇴' footer={false} />,
    children: [
      {
        path: "/mypage/withDraw2",
        element: (
          <Suspense fallback={<Loading />}>
            <WithDraw2 />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/select-match",
    element: <Layout left={<BackButton />} center='직관 기록' footer={false} />,
    children: [
      {
        path: "/select-match",
        element: (
          <Suspense fallback={<Loading />}>
            <SelectMatch />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Layout left={<BackButton />} center='직관 기록' footer={false} />,
    children: [
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loading />}>
            <RegisterForm />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/DetailRate",
    element: <Layout center='내 승률' left={<BackButton />} footer={false} />,
    children: [
      {
        path: "/DetailRate",
        element: (
          <Suspense fallback={<Loading />}>
            <DetailRate />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Layout footer={false} />,
    children: [
      {
        path: "*",
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/oauth/callback",
    element: <OAuthCallback />,
  },
  {
    path: "/mypage/changePassword",
    element: (
      <Layout left={<BackButton />} center='비밀번호 변경' footer={false} />
    ),
    children: [
      {
        path: "/mypage/changePassword",
        element: (
          <Suspense fallback={<Loading />}>
            <ChangePassword />
          </Suspense>
        ),
      },
    ],
  },
]);

export default Router;
