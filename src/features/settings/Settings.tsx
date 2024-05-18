import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle, Pencil, Trash2} from "lucide-react";
import {useAuth} from "@clerk/clerk-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useGetUserSettingsByUserIdQuery} from "@/lib/store/services/userSettings.ts";

export default function SettingsPage() {
    const { userId } = useAuth();

    const {error, data, isLoading} = useGetUserSettingsByUserIdQuery({
        userId: userId!
    })

    if (isLoading) return 'Loading...'

    if (error) return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                An error has ocurred while loading the user settings, please try again.
            </AlertDescription>
        </Alert>
    )

    return  (
        <div>
            <h5 className='text-2xl mb-4 font-bold'>Payment methods</h5>
            <div className='grid grid-cols-4 gap-4'>
                {
                    data?.paymentMethods.map(paymentMethod => (
                        <Card key={paymentMethod._id}>
                            <CardHeader>
                                <CardTitle>{paymentMethod.title}</CardTitle>
                                {/*<CardDescription>Deploy your new project in one-click.</CardDescription>*/}
                            </CardHeader>
                            <CardContent>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-3">
                                <Button variant="outline" size='sm'>
                                    <Pencil className='h-4 w-4'/>
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}
