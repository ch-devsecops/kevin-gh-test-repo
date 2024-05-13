import React, { useContext } from 'react';
import { Box, useMediaQueries } from '@honda-canada/design-system-react';
import ProductCard from './ProductCard';
import ProductTitle from './ProductTitle';
import ProductImage from './ProductImage';
import ViewProductCTA from './ViewProductCTA';
import ProductPriceAndFinance from './ProductPriceAndFinance';
import { useAppName } from '../../../utils/sitecoreContext';
import { ENGINE_SITE_NAME, MARINE_SITE_NAME, PSP_SITE_NAME, PRODUCT_COMPARE_ID_KEY } from '../../../utils/constants';
import NotImplemented from '../../NotImplemented';
import { pushGtmViewDetailsCompareEvent } from '../utils';
import themeStyles from '../styles/ProductCard.styles';
import LocalStorageContext from '../../LocalStorageContext/LocalStorageContext';
import { variant3 } from '../../ProductCard/utils';
import useConfiguration from './config';
import { getGtmTagValue } from '../../../utils/gtmEvents';

const PrimaryWrapper = themeStyles.apply(Box, 'PrimaryWrapper');
const SecondaryWrapper = themeStyles.apply(Box, 'SecondaryWrapper');
const ProductPriceContainer = themeStyles.apply(Box, 'ProductPriceContainer');

const ProductCardUI = ({ product, productIndex, gtmTags, isSticky, onRemoveOption, viewDetailsButton, ...rest }) => {
  const appName = useAppName();
  const { isSmallDesktop, isDesktop } = useMediaQueries();
  const { toCompareProducts } = useContext(LocalStorageContext);
  // the variant here is only used to control the styling when the drawer is sticky in psp
  const variant = (isSmallDesktop || isDesktop) && toCompareProducts.length < 4 && isSticky ? variant3 : undefined;
  const {
    productCardPosition,
    productCardAlignment,
    productCardPseudoElement,
    primaryWrapperMaxHeight,
    primaryWrapperPseudoElement,
  } = useConfiguration(variant);

  const handleViewDetailsOnClick = () => {
    pushGtmViewDetailsCompareEvent(appName, gtmTags['data-gtm-component-type']);
    return true;
  };

  // props for the <ProductPriceAndFinance /> component
  const props = {
    title: product?.title,
    productCardTitle: product?.productCardTitle,
    thumbnail: product?.thumbnail,
    modelKey: product?.modelKey,
    modelYear: product?.modelYear,
    trimId: product?.[PRODUCT_COMPARE_ID_KEY],
    transmissionId: product?.transmissionId,
    vehicleType: product?.vehicleType,
    hidePriceAndFinance: product?.hidePriceAndFinance,
  };

  let suppressDiscount = true;

  switch (appName) {
    case ENGINE_SITE_NAME:
    case MARINE_SITE_NAME: {
      return (
        <ProductCard
          onRemoveOption={onRemoveOption}
          productIndex={productIndex}
          showCloseBtn
          isSticky={isSticky}
          {...rest}
        >
          <ProductImage thumbnail={product?.thumbnail} productIndex={productIndex} isSticky={isSticky} />
          <ProductTitle title={product?.name} productIndex={productIndex} />
          <ViewProductCTA
            url={`${product?.modelPage?.url ?? ''}`}
            gtmTags={gtmTags}
            onClick={handleViewDetailsOnClick}
            viewDetailsButton={viewDetailsButton}
          />
        </ProductCard>
      );
    }

    case PSP_SITE_NAME: {
      const partialUrl = product?.modelPage?.subPages?.find(p => p.name?.toLowerCase() === 'trims')?.url;
      const paramValue = product?.detKey;
      const url = !partialUrl || !paramValue ? '' : `${partialUrl}?trim=${paramValue}`;
      const ctaGtmTags = {
        ...gtmTags,
        'data-gtm-category': getGtmTagValue(product?.vehicleType),
        'data-gtm-body-style': getGtmTagValue(product?.categoryData?.text?.toLowerCase()),
        'data-gtm-model': getGtmTagValue(product?.name),
      };
      const removeGtmTags = {
        ...ctaGtmTags,
        'data-gtm-title': 'removed comparison item',
        'data-gtm-interaction-type': 'cta: compare',
      };
      const priceAndFinanceWrapperGtmTags = {
        'data-gtm-component-type': gtmTags['data-gtm-component-type'],
        'data-gtm-category': getGtmTagValue(product?.vehicleType),
      };
      const priceAndFinanceGtmTags = {
        'data-gtm-interaction-type': 'cta: build',
        'data-gtm-model': getGtmTagValue(product?.name),
      };
      suppressDiscount = false;

      return (
        <ProductCard
          onRemoveOption={onRemoveOption}
          showCloseBtn={!isSticky}
          isSticky={isSticky}
          productIndex={productIndex}
          productCardPosition={productCardPosition}
          productCardAlignment={productCardAlignment}
          productCardPseudoElement={productCardPseudoElement(productIndex)}
          removeGtmTags={removeGtmTags}
        >
          <PrimaryWrapper
            productIndex={productIndex}
            primaryWrapperMaxHeight={primaryWrapperMaxHeight}
            primaryWrapperPseudoElement={primaryWrapperPseudoElement}
          >
            <SecondaryWrapper>
              <ProductPriceContainer isSticky={isSticky}>
                <ProductPriceAndFinance
                  productIndex={productIndex}
                  isSticky={isSticky}
                  suppressDiscount={suppressDiscount}
                  wrapperGtmTags={priceAndFinanceWrapperGtmTags}
                  ctaGtmTags={priceAndFinanceGtmTags}
                  {...props}
                />
                <ViewProductCTA
                  url={url}
                  gtmTags={ctaGtmTags}
                  onClick={handleViewDetailsOnClick}
                  viewDetailsButton={viewDetailsButton}
                  isSticky={isSticky}
                />
              </ProductPriceContainer>
            </SecondaryWrapper>
          </PrimaryWrapper>
        </ProductCard>
      );
    }
    default:
      return <NotImplemented name="Product Compare: Product Card" />;
  }
};

export default ProductCardUI;
