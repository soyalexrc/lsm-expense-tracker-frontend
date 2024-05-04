import axios from "@/lib/helpers/axios-config.ts";
import {UserSettings} from "@/common/interfaces/user-settings.ts";

export async function getUserSettingsByUserId(userId: string) {
    return await axios.post<UserSettings>('/user-settings/GetByUserId', {userId}).then(data => data.data);
}
