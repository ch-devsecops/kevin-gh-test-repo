import type { ReactNode } from 'react';

export type CardGridSectionProps<Item> = {
  componentName: string;
  title?: string;
  itemWidth?: number;
  items: Item[];
  render: (item: Item) => ReactNode;
};
