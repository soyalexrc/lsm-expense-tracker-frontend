export interface UserSettings {
    _id: string;
    paymentMethods: PaymentMethod[]
}

export interface PaymentMethod {
    title: string,
    _id: string;
}
