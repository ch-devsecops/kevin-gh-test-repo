import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { SplideSlide } from '@splidejs/react-splide';
import { Image, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

import CarouselSlider from '../CarouselSlider';
import TrimCard from '../TrimCard/TrimCard';
import themeStyles from './SimilarProducts.styles';
import Context from './service/Context';
import ContextTrimPackages from '../TrimPackages/service/Context';
import CTAButton from './shared/CTAButton';
import PriceComponent from '../PriceComponent';
import CompareToggleButton from '../ProductCard/CompareToggleButton';
import { EqualHeight } from '../../utils/components/EqualHeight';
import { ModelExplorationContext } from '../ModelExplorationContext';

const StyledSplide = themeStyles.apply(SplideSlide, 'Cell');

const ProductsSection = ({ relatedItems = [] }) => {
  const { t } = useTranslation();
  const { paymentOptions, vehicleType, isMobile, isFetching, hasError, hydratedTrimsProps, isSmallDesktop } =
    useContext(Context);
  const { navItems } = useContext(ModelExplorationContext) || {};
  const { showAddToCompareButton } = useContext(ContextTrimPackages);
  const [largestTitleHeight, setLargestTitleHeight] = useState(0);
  const modelItemLength = relatedItems?.length;
  const isDesktop = isSmallDesktop ? 3 : 4;
  const ITEMS_PER_PAGE = isMobile ? 1 : isDesktop;
  const trimPath = navItems?.find(item => item.name === 'trims');

  if (modelItemLength === 0) return null;

  const carouselOptions = {
    padding: {
      top: 0,
      left: '8px',
      right: '8px',
    },
    perPage: ITEMS_PER_PAGE,
    perMove: ITEMS_PER_PAGE,
  };

  return (
    <EqualHeight>
      <CarouselSlider
        length={Math.ceil(relatedItems.length / ITEMS_PER_PAGE)}
        splideOptions={carouselOptions}
        hasPagination={relatedItems.length > ITEMS_PER_PAGE}
        paginationControlWithShadow={relatedItems.length > ITEMS_PER_PAGE}
        centerAlign={relatedItems.length < ITEMS_PER_PAGE}
      >
        {() =>
          relatedItems.map(trim => {
            // TODO: Find cleaner implementation to get the modelPathName to form the url
            const pathItems = trimPath?.url?.split('/');
            const modelPathName = pathItems?.[pathItems.length - 1] ?? '';
            const categoryPath = trim?.model?.year?.modelYearPage?.fields?.url ?? '';
            const detailsPath = `${categoryPath}/${modelPathName}?trim=${trim?.trimKey}`;
            const updatedTrimObj = { detailsPath, ...trim };

            return (
              <StyledSplide key={trim.key}>
                <TrimCard
                  ctas={
                    <>
                      <CTAButton trim={updatedTrimObj} />
                      <Optional when={showAddToCompareButton}>
                        <CompareToggleButton detId={trim?.defaultTransmission?.detIdentifier?.value} />
                      </Optional>
                    </>
                  }
                  cursor="pointer"
                  hoverImage={trim.secondaryImage?.src ? <Image {...trim.secondaryImage} /> : null}
                  image={<Image {...trim?.primaryThumbnail?.item?.value} />}
                  language="en"
                  largestTitleHeight={largestTitleHeight}
                  paymentOptions={paymentOptions}
                  priceComponent={
                    <PriceComponent
                      prices={{
                        allInPrice: {
                          value: trim.pricing?.sellingPrice,
                          label: hydratedTrimsProps.sellingPriceLabel,
                        },
                        msrpPrice: {
                          value: trim.pricing?.msrp,
                          label: hydratedTrimsProps.msrpStartingFromLabel,
                        },
                        discount: trim?.pricing?.discount,
                      }}
                      isFetching={isFetching}
                      hasError={hasError}
                      horizontalAlignment="center"
                      height={['auto', 'auto', undefined]}
                      allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
                      errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
                    />
                  }
                  setLargestTitleHeight={setLargestTitleHeight}
                  shouldHidePaymentDetails={false}
                  trim={updatedTrimObj}
                  vehicleType={vehicleType}
                />
              </StyledSplide>
            );
          })
        }
      </CarouselSlider>
    </EqualHeight>
  );
};

ProductsSection.propTypes = {
  relatedItems: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ProductsSection;
