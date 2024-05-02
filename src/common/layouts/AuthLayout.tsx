import {useAuth} from "@clerk/clerk-react";
import {Outlet, useNavigate} from "react-router-dom";
import * as React from "react";

export default function AuthLayout() {
    const { isSignedIn } = useAuth()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isSignedIn) {
            navigate("/")
        }
    }, [])

    return (
        <Outlet />
    )
}
