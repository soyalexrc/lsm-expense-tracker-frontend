import axios from "@/lib/helpers/axios-config.ts";
import {Category} from "@/common/interfaces/expense.ts";

export async function getCategories(token: string) {
    console.log('categories');
    return await axios.post<Category[]>('/category/GetAll', {token}).then(data => data.data);
}
