import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@honda-canada/design-system-react';
import themeStyles from './ProductCardsGrid.styles';
import ProductCard from '../ProductCard';

import { MODEL_YEAR_API_DEFAULT_VALUE } from '../../utils/constants';
import { makeModelConfiguration, usePricesConfiguration } from '../../utils/financeUtils';
import safelyStringifyJSON from '../../utils/safelyStringifyJSON';
import useProductFinancial from '../../utils/hooks/useProductFinancial';
import { EqualHeight } from '../../utils/components/EqualHeight';

const Grid = themeStyles.apply(Box, 'Grid');
const Cell = themeStyles.apply(Box, 'Cell');

const ProductCardsGrid = ({ models = [], gridTemplateColumnsCount, gtmTags, priceLabels, fetchFinancial }) => {
  const getPrices = usePricesConfiguration(priceLabels);
  const {
    financial: { modelConfiguration },
    isFetching,
    hasError,
    setModels,
  } = useProductFinancial({ formatter: makeModelConfiguration });

  useEffect(() => {
    if (fetchFinancial && models.length) {
      setModels(
        models
          ?.map(model => ({
            modelKey: model?.detModelKey?.value,
            modelYear: MODEL_YEAR_API_DEFAULT_VALUE,
          }))
          .filter(key => key?.modelKey),
      );
    }
  }, [safelyStringifyJSON(models)]);

  const products = models.map(model => ({ ...model, key: model?.key || model?.detKey?.value }));

  const shouldRenderBorderBottom = index => {
    const cardsPerRow = 2;
    const lastIndex = models.length - cardsPerRow + (models.length % cardsPerRow);
    return index < lastIndex;
  };

  return (
    <EqualHeight>
      <Grid gridTemplateColumnsCount={gridTemplateColumnsCount}>
        {products.map((model, index) => {
          const defaultConfigurationId =
            model?.defaultConfiguration?.fields?.detIdentifier?.value || model?.detKey?.value;
          const prices = getPrices(modelConfiguration, defaultConfigurationId, model?.detKey?.value);
          return (
            <Cell key={model?.key} shouldRenderBorderBottom={shouldRenderBorderBottom(index)}>
              <ProductCard
                prices={prices}
                fields={model}
                gtmTags={gtmTags}
                isFetching={isFetching}
                hasError={hasError}
              />
            </Cell>
          );
        })}
      </Grid>
    </EqualHeight>
  );
};

ProductCardsGrid.propTypes = {
  models: PropTypes.arrayOf(PropTypes.shape({})),
  gtmTags: PropTypes.shape({
    title: PropTypes.string,
    compareTitle: PropTypes.string,
    seriesName: PropTypes.string,
    componentName: PropTypes.string,
    crankshaftName: PropTypes.string,
    interactionType: PropTypes.string,
    compareInteractionType: PropTypes.string,
  }),
  gridTemplateColumnsCount: PropTypes.number,
};

export default ProductCardsGrid;
