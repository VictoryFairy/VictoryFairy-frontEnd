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
import MyPage from "./pages/MyPage";
import Info from "./pages/Info";

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
    path: "/info",
    element: <Layout />,
    children: [
      {
        path: "/info",
        element: <Info />,
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
