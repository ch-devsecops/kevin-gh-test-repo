export interface Payment {
  term: number;
  apr: number;
  preferredPaymentAmount: number;
  informationalApr: number | null;
  paymentFrequency: string;
  paymentMethod: string;
}

export interface Summary {
  paymentFrequency: string;
  paymentMethod: string;
  summaries: object[];
}

export interface Price {
  allInPrice: {
    value: number;
    label: string;
  };
  msrpPrice: {
    value: number;
    label: string;
  };
}
