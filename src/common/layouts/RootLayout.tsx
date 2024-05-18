import {Outlet} from 'react-router-dom'
import {ClerkProvider} from '@clerk/clerk-react'
import {cn} from "@/lib/utils.ts";
import {Toaster} from "@/components/ui/sonner.tsx";
import {Provider} from "react-redux";
import {store} from "@/lib/store";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}



export default function RootLayout() {
    // const navigate = useNavigate();

    return (
        <Provider store={store}>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
                <main className={cn('min-h-screen bg-background w-screen font-sans antialiased')}>
                    <Outlet/>
                    <Toaster/>
                </main>
            </ClerkProvider>
        </Provider>

    )
}
