
import { SignUp } from "@clerk/clerk-react"

export default function SignUpPage() {
    return (
        <div className={'flex items-center justify-center w-screen h-screen'}>
            <SignUp path="/auth/sign-up"/>
        </div>
    )
}
