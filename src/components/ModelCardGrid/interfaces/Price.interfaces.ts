interface Common {
  id: number;
  key: string;
}

export interface ExteriorColor extends Common {
  msrpMarkup: number;
  msrp: number;
  sellingPrice: number;
  msrpWithDiscount: number;
  sellingPriceWithDiscount: number;
}

export interface Transmission extends Common {
  msrp: number;
  levyTotal: number;
  priceDiscountAmount: number;
  exteriorColors: ExteriorColor[];
}

export interface Trim extends Common {
  freightPdiCost: number;
  transmissions: Transmission[];
}

export interface ModelPrice {
  modelId: number;
  modelKey: string;
  trims: Trim[];
}

export interface Price {
  isSellingPriceProvince: boolean;
  provinceKey: string;
  models: ModelPrice[];
}
