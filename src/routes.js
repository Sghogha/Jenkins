import React from "react";
import { Navigate } from "react-router-dom";

// LAYOUT
import AuthLayout from "src/layouts/AuthLayout";
import MainLayout from "src/layouts/MainLayout";
import AdminLayout from "src/layouts/AdminLayout";

// APPLICATION

// AUTHENTICATION
import WelcomeView from "src/views/pages/auth/welcome";
import LoginView from "src/views/pages/auth/login";
import IndividualRegisterView from "src/views/pages/auth/individualRegister";
import GroupRegisterView from "src/views/pages/auth/groupRegister";
import VerifyOTPView from "./views/pages/auth/verifyOTP";
import ForgotPasswordView from "src/views/pages/auth/forgotPassword";
import ResetPassword from "src/views/pages/auth/resetPassword";
import TermsView from "src/views/pages/auth/terms";

// USER
import Home from "./views/pages/application/home";

// ADMIN
import AdminHome from "./views/pages/Admin/home";

// PUBLIC ROUTES
export const publicRoute = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <WelcomeView /> },
      { path: "/welcome", element: <WelcomeView /> },
      { path: "/sign-in", element: <LoginView /> },
      { path: "/signup/user", element: <IndividualRegisterView /> },
      { path: "/signup/org", element: <GroupRegisterView /> },
      { path: "/verify-otp/:email", element: <VerifyOTPView /> },
      { path: "/forgot-password", element: <ForgotPasswordView /> },
      { path: "/reset-password/:email", element: <ResetPassword /> },
      { path: "/terms-conditions", element: <TermsView /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];

// USER ROUTES
export const userRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <Home /> },
      { path: "*", element: <Navigate to="/home" /> },
    ],
  },
];

// ADMIN ROUTES
export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Navigate to="/admin" /> },
      { path: "/admin", element: <AdminHome /> },
      { path: "*", element: <Navigate to="/admin/dashboard" /> },
    ],
  },
];
