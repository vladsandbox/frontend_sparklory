export interface PaymentState {
    loading: boolean;
    error: string | null;
    paymentData: any | null;
}

export type PaymentContactInfo = {
    name: string;
    email: string;
    phone: string;
    address: string;
};