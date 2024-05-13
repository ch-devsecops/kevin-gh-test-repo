export interface Color {
  extColor: string;
  intColor: string;
}

export interface Inventory {
  modelCode: string;
  availableStatus: 'inStock' | 'onItsWay' | 'preOrder';
  colors: Color[];
}
