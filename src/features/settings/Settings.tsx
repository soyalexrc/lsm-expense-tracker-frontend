import {useQuery} from "react-query";
import {getUserSettingsByUserId} from "@/api/user-settings.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";

export default function SettingsPage() {
    const token = sessionStorage.getItem('token');

    const {error, data, isLoading} = useQuery({
        queryKey: ['userSettings'],
        queryFn: () => getUserSettingsByUserId(token!)
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
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
