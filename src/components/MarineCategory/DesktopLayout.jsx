import React from 'react';
import PropTypes from 'prop-types';
import { Box, Media } from '@honda-canada/design-system-react';
import { themeStyles } from './MarineCategory.styles';
import GridSection from '../ProductCardsGrid/GridSection';

const GridSectionContainer = themeStyles.apply(Box, 'GridSectionContainer');

const DesktopLayout = ({ models, gtmTags, priceLabels }) => (
  <Media greaterThan="smallDesktop">
    <GridSectionContainer>
      <GridSection models={models} gtmTags={gtmTags} priceLabels={priceLabels} fetchFinancial />
    </GridSectionContainer>
  </Media>
);

DesktopLayout.propTypes = {
  models: PropTypes.arrayOf(PropTypes.shape({})),
};
export default DesktopLayout;
