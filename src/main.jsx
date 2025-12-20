import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/client/home.jsx";
import Login from "./pages/client/auth/login.jsx";
import Register from "./pages/client/auth/register.jsx";
import { AppContextProvider } from "./components/context/app.context.jsx";
// import "antd/dist/reset.css"; // nếu dùng Ant Design
import AboutPage from "./pages/client/about.jsx";
import ProtectedRoute from "./components/auth/auth.jsx";
import QuestionPage from "./pages/client/question.jsx";
import ResultPage from "./pages/client/result.jsx";
import ManagePage from "./pages/admin/manage.jsx";
import ForgotPasswordPage from "./pages/client/forgotPassword.jsx";
import ResetPasswordPage from "./pages/client/resetPassword.jsx";
import InfoPage from "./pages/client/infomation.jsx";
// import AIChatPage from "./pages/client/AIChatPage/AIChatPage.jsx"
import AIChatPage from "./pages/client/ai.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        index: true, element: <HomePage /> 
      },
      { 
        path: "/login", element: <Login /> 
      },
      { 
        path: "/register", element: <Register /> 
      },
      { 
        path: "/info", element: <InfoPage /> 
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/question",
        element: <QuestionPage />,
      },
      {
        path: "/result/:id",
        element: <ResultPage />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/ai",
        element: <AIChatPage />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <ManagePage />
          </ProtectedRoute>
        ),
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
);
