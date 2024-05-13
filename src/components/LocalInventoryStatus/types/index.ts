import type { Inventory } from './inventory.interfaces';

export type LocalInventoryStatusProps = {
  rendering: {
    componentName: string;
  };
  params: {
    injectedApi: () => void;
  };
};

export type DealerInventory = {
  dealerCode: number;
  inventory: Inventory[];
};
