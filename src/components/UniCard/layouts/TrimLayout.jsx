/**
 * Example of a layout for a card.
 */
import React from 'react';
import { Box } from '@honda-canada/design-system-react';

import CardImage from '../shared/CardImage';
import CardCTA from '../shared/CardCTA';
import CardPaymentDetails from '../shared/CardPaymentDetails';
import CardPricing from '../shared/CardPricing';
import CardTitle from '../shared/CardTitle';

const TrimLayout = () => (
  <Box>
    <CardTitle />
    <CardPricing />
    <CardImage />
    <CardPaymentDetails />
    <CardCTA />
  </Box>
);

export default TrimLayout;
