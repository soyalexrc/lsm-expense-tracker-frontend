import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RootLayout from "./common/layouts/RootLayout.tsx";
import SignInPage from "./features/auth/SignIn.tsx";
import SignUpPage from "./features/auth/SignUp.tsx";
import DashboardLayout from "./common/layouts/DashboardLayout.tsx";
import DashboardPage from "./features/dashboard/Dashboard.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import AuthLayout from "@/common/layouts/AuthLayout.tsx";
import ExpensesPage from "@/features/dashboard/expenses/Expenses.tsx";
import SettingsPage from "@/features/settings/Settings.tsx";

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                element: <DashboardLayout />,
                path: "/",
                children: [
                    { path: "/", element: <DashboardPage /> },
                    { path: "/settings", element: <SettingsPage /> },
                    { path: "/expenses", element: <ExpensesPage /> },
                ]
            },
            {
                element: <AuthLayout />,
                path: '/auth',
                children: [
                    { path: "", element: <Navigate to='sign-in'/>    },
                    { path: "sign-in/*", element: <SignInPage /> },
                    { path: "sign-up/*", element: <SignUpPage /> },
                ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
