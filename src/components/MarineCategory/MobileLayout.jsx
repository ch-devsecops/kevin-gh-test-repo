import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SplideSlide } from '@splidejs/react-splide';
import { Box, Media } from '@honda-canada/design-system-react';

import CarouselSlider from '../CarouselSlider';
import ProductCard from '../ProductCard';

import { MODEL_YEAR_API_DEFAULT_VALUE } from '../../utils/constants';
import { makeModelConfiguration, usePricesConfiguration } from '../../utils/financeUtils';

import { themeStyles } from './MarineCategory.styles';
import safelyStringifyJSON from '../../utils/safelyStringifyJSON';
import useProductFinancial from '../../utils/hooks/useProductFinancial';
import { EqualHeight } from '../../utils/components/EqualHeight';

const CarouselContainer = themeStyles.apply(Box, 'CarouselContainer');
const StyledSplide = themeStyles.apply(SplideSlide, 'Cell');

const carouselOptions = {
  padding: {
    top: 0,
    left: '8px',
    right: '8px',
  },
  perPage: 1,
  perMove: 1,
};

const MobileProductCards = ({ models, gtmTags, priceLabels }) => {
  const getPrices = usePricesConfiguration(priceLabels);
  const {
    financial: { modelConfiguration },
    isFetching,
    hasError,
    setModels,
  } = useProductFinancial({ formatter: makeModelConfiguration });

  useEffect(() => {
    if (models.length) {
      setModels(
        [...models]
          .map(model => ({
            modelKey: model?.detModelKey?.value,
            modelYear: MODEL_YEAR_API_DEFAULT_VALUE,
          }))
          .filter(key => key?.modelKey),
      );
    }
  }, [safelyStringifyJSON(models)]);

  return (
    <Media lessThan="desktop">
      <CarouselContainer>
        <EqualHeight>
          <CarouselSlider
            length={models?.length}
            splideOptions={carouselOptions}
            hasPagination
            paginationControlWithShadow={false}
          >
            {() =>
              models.map(model => {
                const defaultConfigurationId =
                  model?.defaultConfiguration?.fields?.detIdentifier?.value || model?.detKey?.value;
                return (
                  <StyledSplide key={model?.detIdentifier?.value}>
                    <ProductCard
                      prices={getPrices(modelConfiguration, defaultConfigurationId)}
                      isFetching={isFetching}
                      hasError={hasError}
                      fields={model}
                      gtmTags={gtmTags}
                    />
                  </StyledSplide>
                );
              })
            }
          </CarouselSlider>
        </EqualHeight>
      </CarouselContainer>
    </Media>
  );
};

MobileProductCards.propTypes = {
  detModelKey: PropTypes.shape({
    value: PropTypes.string,
  }),
};
export default MobileProductCards;
