import React from 'react';
import PropTypes from 'prop-types';
import { Box, Wrapper } from '@honda-canada/design-system-react';
import SimilarProductsSection from './SimilarProductsSection';
import RecentlyViewedProductsSection from './RecentlyViewedProductsSection';
import themeStyles from './SimilarRecentlyViewed.styles';
import { SimilarRecentlyViewedProvider } from './SimilarRecentlyViewedContext';
import getContentMargins from '../../utils/getContentMargins';

const Container = themeStyles.apply(Box, 'Container');

const SimilarRecentlyViewedUI = ({
  params = {},
  gtmTags,
  relatedModels,
  similarModels,
  models,
  getModels,
  fetchFinancial,
}) => {
  const flexDesktopAlignment = relatedModels.length ? 'flex-start' : 'flex-end';
  const margins = getContentMargins(params);

  return (
    <Wrapper>
      <Container margins={margins} flexDesktopAlignment={flexDesktopAlignment}>
        <SimilarRecentlyViewedProvider>
          <SimilarProductsSection models={similarModels} gtmTags={gtmTags} fetchFinancial={fetchFinancial} />
          <RecentlyViewedProductsSection
            models={models}
            getModels={getModels}
            gtmTags={gtmTags}
            fetchFinancial={fetchFinancial}
          />
        </SimilarRecentlyViewedProvider>
      </Container>
    </Wrapper>
  );
};

SimilarRecentlyViewedUI.propTypes = {
  params: PropTypes.shape({}),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
  relatedModels: PropTypes.arrayOf(PropTypes.shape({})),
  similarModels: PropTypes.arrayOf(PropTypes.shape({})),
  models: PropTypes.arrayOf(PropTypes.shape({})),
  fetchFinancial: PropTypes.bool,
};

export default SimilarRecentlyViewedUI;
