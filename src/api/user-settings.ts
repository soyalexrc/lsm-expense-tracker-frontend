import axios from "@/lib/helpers/axios-config.ts";
import {UserSettings} from "@/common/interfaces/user-settings.ts";

export async function getUserSettingsByUserId(token: string) {
    return await axios.post<UserSettings>('/user-settings/GetByUserId', {token}).then(data => data.data);
}
