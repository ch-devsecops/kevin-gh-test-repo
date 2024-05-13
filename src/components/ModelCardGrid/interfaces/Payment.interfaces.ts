export interface PaymentPayload {
  modelKey: string;
  modelYear: string;
  trimKey: string;
  transmissionKey: string;
  exteriorColorKey: string;
  interiorColorKey?: string;
}

export interface Payment {
  term: number;
  apr: number;
  preferredPaymentAmount: number;
}
