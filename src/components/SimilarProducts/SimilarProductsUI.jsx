import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Wrapper as DsrWrapper, H4 } from '@honda-canada/design-system-react';

import ConfigurationProvider from './service/ConfigurationProvider';
import themeStyles from './SimilarProducts.styles';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import Context from './service/Context';
import { getHydratedTrims } from './service/utils';
import ProductsSection from './ProductsSection';

const Container = themeStyles.apply(Box, 'Container');
const Wrapper = themeStyles.apply(DsrWrapper, 'Wrapper');
const Header = themeStyles.apply(H4, 'Header');

export const SimilarProductsUI = ({ relatedItems, componentName, gtmTags }) => {
  const { t } = useTranslation();
  const { setModels, financial, hasError, isFetching, hydratedTrimsProps } = useContext(Context);

  useEffect(() => {
    if (relatedItems?.length) {
      setModels(
        relatedItems.map(item => ({
          modelKey: item.model?.detKey?.value,
          modelYear: item.model?.year?.year?.value,
        })),
      );
    }
  }, [relatedItems?.[0]?.detKey?.value]);

  const hydratedTrims = getHydratedTrims(relatedItems, { financial, hasError, isFetching }, hydratedTrimsProps);

  if (hydratedTrims?.length === 0) return null;

  return (
    <Wrapper data-gtm-category={mapGTMCategory(gtmTags?.gtmCategory)} data-gtm-component-type={componentName}>
      <Header>{t('Pages.Models.Exploration.similarProductsLabel')}</Header>
      <Container>
        <ProductsSection relatedItems={hydratedTrims} />
      </Container>
    </Wrapper>
  );
};

SimilarProductsUI.propTypes = {
  gtmTags: PropTypes.shape({}),
  componentName: PropTypes.string,
  relatedItems: PropTypes.arrayOf(PropTypes.shape({})),
};

const SimilarProducts = ({ appNameConfig, ...restProps }) => (
  <ConfigurationProvider appNameConfig={appNameConfig}>
    <SimilarProductsUI {...restProps} />
  </ConfigurationProvider>
);

SimilarProducts.propTypes = {
  appNameConfig: PropTypes.shape({
    paymentOptions: PropTypes.shape({
      paymentMethod: PropTypes.string,
      paymentFrequency: PropTypes.string,
    }),
    vehicleType: PropTypes.string,
  }),
  gtmTags: PropTypes.shape({}),
  componentName: PropTypes.string,
  relatedItems: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SimilarProducts;
