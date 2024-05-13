import React from 'react';
import PropTypes from 'prop-types';
import { Box, UnorderedList, H6 } from '@honda-canada/design-system-react';

import themeStyles from './ProductFeatures.styles';
import ProductFeaturesItem from './ProductFeaturesItem';

const FeatureItem = themeStyles.apply(Box, 'FeatureItem');
const List = themeStyles.apply(UnorderedList, 'List');

const FeaturesList = ({ feature: { title, list } }) => (
  <FeatureItem key={title}>
    <H6>{title}</H6>
    <List>
      {list?.map(item => (
        <ProductFeaturesItem key={item.text} feature={item} />
      ))}
    </List>
  </FeatureItem>
);

FeaturesList.propTypes = {
  feature: PropTypes.shape({
    title: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
      }),
    ),
  }),
};

export default FeaturesList;
