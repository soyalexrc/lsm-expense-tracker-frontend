import {Outlet} from 'react-router-dom'
import {ClerkProvider} from '@clerk/clerk-react'
import {cn} from "@/lib/utils.ts";
import {Toaster} from "@/components/ui/sonner.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient()


export default function RootLayout() {
    // const navigate = useNavigate();

    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <QueryClientProvider client={queryClient}>
                <main className={cn('min-h-screen bg-background w-screen font-sans antialiased')}>
                    <Outlet/>
                    <Toaster/>
                </main>
            </QueryClientProvider>
        </ClerkProvider>
    )
}
