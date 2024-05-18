
export interface Expense  {
    _id: string
    amount: string;
    title: string
    date: Date | string;
    description: string;
    category: Category;
    userId: string;
    paymentMethod: string
}

export interface CreateExpense {
    amount: number;
    title: string
    date: string | Date;
    description?: string;
    category: string;
    userId: string | null | undefined;
    paymentMethod: string;
}

export interface UpdateExpense extends CreateExpense {
    id: string;
}

export interface Category {
    _id: string;
    title: string;
    description: string;
}

export interface GetTotalsResult {
    totalAmount: number
    totalAmountByCategory: TotalAmountByCategory[],
    totalAmountByDay: TotalAmountByDay[],
    totalAmountByPaymentMethod: TotalAmountByPaymentMethod[]
}

export interface TotalAmountByCategory {
    value: number;
    name: string;
    color: string;
}

export interface TotalAmountByDay {
    totalAmount: number;
    date: string
}
export interface TotalAmountByPaymentMethod {
    totalAmount: number;
    title: string
}

export interface GetByUserIdWithFilters {
    title?: string,
    userId: string,
    dateFrom?: string,
    dateTo?: string,
    categoryId?: string,
    paymentMethod?: string,
}
