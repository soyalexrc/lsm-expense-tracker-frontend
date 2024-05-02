import { Link } from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";

export default function IndexPage() {
    const {getToken, sessionId, userId } = useAuth()

    getToken().then((data) => {console.log(data)})
    console.log(sessionId)
    console.log(userId)

    return (
        <div>
            <h1>This is the index page</h1>
            <div>
                <ul>
                    <li><Link to="/sign-up">Sign Up</Link></li>
                    <li><Link to="/sign-in">Sign In</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </div>
        </div>
    )
}
