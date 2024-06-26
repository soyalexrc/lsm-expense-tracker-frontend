import * as React from 'react'
import {useAuth, UserButton} from "@clerk/clerk-react"
import {Outlet, useNavigate, Link, useLocation} from "react-router-dom"
import {HandCoins, Home, Menu, Settings} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";



type LinkType = {
    title: string,
    route: string,
    icon: JSX.Element
}

const links: LinkType[] = [
    {
        title: 'Dashboard',
        route: '/',
        icon: <Home className="h-4 w-4"/>
    },
    {
        title: 'Expenses',
        route: '/expenses',
        icon: <HandCoins className="h-4 w-4"/>
    },
    {
        title: 'Settings',
        route: '/settings',
        icon: <Settings className="h-4 w-4"/>
    },
]

export default function DashboardLayout() {
    const { isSignedIn, isLoaded } = useAuth()
    const navigate = useNavigate()
    const {pathname} = useLocation();


    React.useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate("/auth/sign-in")
        }
    }, [isLoaded])

    if (!isLoaded) return "Loading..."

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link to="/" className="flex items-center gap-2 font-semibold">
                            <span className="">LSM Expense Tracker</span>
                        </Link>
                        {/*<Button variant="outline" size="icon" className="ml-auto h-8 w-8">*/}
                        {/*    <Bell className="h-4 w-4"/>*/}
                        {/*    <span className="sr-only">Toggle notifications</span>*/}
                        {/*</Button>*/}
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {
                                links.map((link) => (
                                    <Link
                                        key={link.route}
                                        to={link.route}
                                        className={`${pathname === link.route && 'bg-muted'} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                                    >
                                        {link.icon}
                                        {link.title}
                                    </Link>
                                ))
                            }
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card x-chunk="dashboard-02-chunk-0">
                            <CardHeader className="p-2 pt-0 md:p-6">
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access to our support
                                    team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5"/>
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    to="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                {
                                    links.map((link) => (
                                        <Link
                                            key={link.route}
                                            to={link.route}
                                            className={`${pathname === link.route && 'bg-muted'} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                                        >
                                            {link.icon}
                                            {link.title}
                                        </Link>
                                    ))
                                }
                            </nav>
                            <div className="mt-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upgrade to Pro</CardTitle>
                                        <CardDescription>
                                            Unlock all features and get unlimited access to our
                                            support team.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" className="w-full">
                                            Upgrade
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1" />
                    <UserButton/>
                </header>
                <main className="p-4 lg:p-6 overflow-y-auto h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
