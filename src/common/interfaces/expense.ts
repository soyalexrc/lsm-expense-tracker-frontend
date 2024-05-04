
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
    description: string;
    category: string;
    userId: string | null | undefined;
    paymentMethod: string;
}

export interface Category {
    _id: string;
    title: string;
    description: string;
}

export interface GetTotalsResult {
    totalAmount: number
    totalAmountByCategory: TotalAmountByCategory[],
    totalAmountByDay: TotalAmountByDay[]
}

export interface TotalAmountByCategory {
    totalAmount: number;
    category: string
}

export interface TotalAmountByDay {
    totalAmount: number;
    date: string
}
