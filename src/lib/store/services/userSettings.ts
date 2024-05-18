import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {UserSettings} from "@/common/interfaces/user-settings.ts";
const BASE_URL = 'http://localhost:3001/api/v1/'

export const userSettingsApi = createApi({
    reducerPath: 'userSettingsApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        getUserSettingsByUserId: builder.query<UserSettings, { userId: string }>({
            query: (body: { userId: string }) => ({
                method: "POST",
                url: 'user-settings/GetByUserId',
                body: body
            })
        })
    })
})

export const {
    useGetUserSettingsByUserIdQuery
} = userSettingsApi
