import React from 'react';
import { Column } from '@honda-canada/design-system-react';
import ProductCard from '../../components/ProductCard';
import productCardMockData from './componentProps';

export default {
  title: 'Product Card',
  component: ProductCard,
};

const Template = args => (
  <Column display="flex" justifyContent={['center', 'flex-start']}>
    <ProductCard fields={{ ...args }} />
  </Column>
);

export const Default = Template.bind({});
Default.args = productCardMockData;
