import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@honda-canada/design-system-react';
import { isEditorActive } from '@sitecore-jss/sitecore-jss-react';
import ProductCardsGrid from './index';
import themeStyles from './ProductCardsGrid.styles';

const Container = themeStyles.apply(Box, 'Container');

const GridSection = ({
  models = [],
  header,
  gridTemplateColumnsCount,
  gtmTags,
  fetchFinancial,
  priceLabels,
  ...rest
}) => {
  if (!isEditorActive() && !models.length) return null;

  return (
    <Container {...rest}>
      {header}
      <ProductCardsGrid
        models={models}
        gridTemplateColumnsCount={gridTemplateColumnsCount}
        gtmTags={gtmTags}
        fetchFinancial={fetchFinancial}
        priceLabels={priceLabels}
      />
    </Container>
  );
};

GridSection.propTypes = {
  models: PropTypes.arrayOf(PropTypes.shape({})),
  header: PropTypes.element,
  gridTemplateColumnsCount: PropTypes.number,
  margins: PropTypes.shape({}),
  fetchFinancial: PropTypes.bool,
  gtmTags: PropTypes.shape({
    title: PropTypes.string,
    compareTitle: PropTypes.string,
    seriesName: PropTypes.string,
    componentName: PropTypes.string,
    crankshaftName: PropTypes.string,
    interactionType: PropTypes.string,
    compareInteractionType: PropTypes.string,
  }),
};

export default GridSection;
