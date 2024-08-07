import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { typography } from "./style/typography";
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
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
