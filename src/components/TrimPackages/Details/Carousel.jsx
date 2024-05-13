import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Carousel as DesignSystemCarousel,
  Image,
  Box,
  Copy,
  HangTag,
  Optional,
  useCarouselControl,
} from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import styled from 'styled-components';

import { getGtmTagValue, gtmCarouselNavigation } from '../../../utils/gtmEvents';
import Context from '../service/Context';

import themeStyles from './Details.styles';
import { useLanguage } from '../../../utils/sitecoreContext';

const HangTagWrapper = themeStyles.apply(Box, 'HangTagWrapper');
const CarouselWrapper = themeStyles.apply(Copy, 'CarouselWrapper');
const MissingLabel = themeStyles.apply(Box, 'MissingLabel');

const Carousel = ({ images, missingAssetPlaceholderImage, isDark, trim, category, assetType }) => {
  const { t } = useTranslation();
  const language = useLanguage();
  const { vehicleType } = useContext(Context);

  // to save the pagination state when toggling between exterior and interior colors
  const [savedExteriorPage, setSavedExteriorPage] = useState(0);
  const [savedInteriorPage, setSavedInteriorPage] = useState(0);

  const MissingImage = styled(Image)`
    opacity: 0.3;
  `;

  const analytics = {
    arrowLeft: {
      'data-gtm-interaction-type': 'gallery - view previous',
      'data-gtm-model': getGtmTagValue(trim?.gtmModelName),
      'data-gtm-body-style': getGtmTagValue(trim?.gtmBodyStyle || vehicleType),
    },
    arrowRight: {
      'data-gtm-interaction-type': 'gallery - view next',
      'data-gtm-model': getGtmTagValue(trim?.gtmModelName),
      'data-gtm-body-style': getGtmTagValue(trim?.gtmBodyStyle || vehicleType),
    },
  };

  const hasImages = images && images.length > 0;
  const discountValue = trim?.pricing?.discount?.priceDiscountAmount;
  const hasDiscount = !!discountValue;

  const items = hasImages
    ? images.map(image => (
        <Image key={image?.alt?.value} disableObjectFit coverContainer src={image?.url} alt={image?.alt?.value} />
      ))
    : [
        <>
          <MissingImage
            disableObjectFit
            coverContainer
            src={missingAssetPlaceholderImage?.url}
            alt={missingAssetPlaceholderImage?.alt?.value}
          />
          <MissingLabel size="pricing" isDark={isDark}>
            {t('Pages.Models.Exploration.imageComingSoonLabel')}
          </MissingLabel>
        </>,
      ];

  const behaviour = useCarouselControl(items.length);
  const { currentSlide, setCurrentSlide } = behaviour;

  const onClick = linkText => {
    gtmCarouselNavigation(trim?.modelName, category, linkText);
  };

  useEffect(() => {
    // we save the pagination state of both asset types and reapply them on toggle
    if (assetType === 'interior') {
      setSavedExteriorPage(currentSlide);
      setCurrentSlide(savedInteriorPage);
    }
    if (assetType === 'exterior') {
      setSavedInteriorPage(currentSlide);
      setCurrentSlide(savedExteriorPage);
    }
  }, [assetType]);

  return (
    <CarouselWrapper hasImages={hasImages} hasDiscount={hasDiscount} data-testid="cy-image-carousel">
      <Optional when={hasDiscount}>
        <HangTagWrapper>
          <HangTag
            label={t('Shared.Common.saveLabel')}
            amount={formatPrice(discountValue, language)}
            language={language}
          />
        </HangTagWrapper>
      </Optional>
      <DesignSystemCarousel
        gridBase={7}
        behavior={behaviour}
        items={items}
        crossFade={false}
        styling={isDark && 'dark'}
        analytics={analytics}
        onClick={onClick}
      />
    </CarouselWrapper>
  );
};

export default Carousel;
