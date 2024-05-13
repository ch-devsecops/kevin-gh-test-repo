import React, { useContext } from 'react';
import { Box, Button, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import Link from './Link';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import CompareToggleButton from './CompareToggleButton';
import BodyText from './BodyText';
import Title from './Title';
import Thumbnail from './Thumbnail';
import themeStyles from './ProductCard.styles';
import LocalStorageContext from '../LocalStorageContext/LocalStorageContext';
import componentProps from '../MarineProductDetailsCard/componentProps';
import { useConfiguration, VIEW_DETAILS } from './utils';
import PriceComponent from '../PriceComponent';
import SaveLabel from '../PriceComponent/SaveLabel';
import { EqualHeightElement } from '../../utils/components/EqualHeight';

const Wrapper = themeStyles.apply(Box, 'Wrapper');
const SecondaryButton = themeStyles.apply(Button, 'SecondaryButton');
const CashSavingsContainer = themeStyles.apply(Box, 'CashSavings');

const ProductCard = ({ fields, gtmTags, variant, prices, isFetching, hasError, ...styledProps }) => {
  const { t } = useTranslation();

  const { setRecentlyViewedProducts } = useContext(LocalStorageContext);

  const {
    imageOrder,
    showPricing,
    bodyMarginTop,
    bodySize,
    wrapperMaxWidth,
    ctaButtonDisplay,
    priceComponentStyles,
    compareLabelFontSize,
    compareLabelLineHeight,
  } = useConfiguration(variant);

  const { detIdentifier, tagline, thumbnail, modelPage, id, primaryImage } = wrapJSSFields(fields);
  const modelPageUrl = modelPage?.field?.fields?.url;

  const image = primaryImage
    ? {
        src: primaryImage.field?.item?.value?.src,
        alt: primaryImage.field?.item?.value?.alt,
      }
    : {
        src: thumbnail?.value?.images?.[0]?.url,
        alt: thumbnail?.value?.images?.[0]?.alt?.value,
      };
  const productId = id?.field;
  const detId = detIdentifier?.value;

  let hasDiscount;
  let discountValue;

  const saveStyles = {
    copy: {
      styles: {
        fontSize: ['14px', '14px', '14px'],
      },
    },
  };

  if (prices) {
    discountValue = prices?.discount?.priceDiscountAmount;
    hasDiscount = !!discountValue;
  }

  const handleLinkOnClick = () => setRecentlyViewedProducts(detId);
  return (
    <Wrapper maxWidth={wrapperMaxWidth} {...styledProps} data-testid="product-card">
      <EqualHeightElement placeholder={!hasDiscount}>
        <Optional when={hasDiscount}>
          <CashSavingsContainer>
            <SaveLabel value={discountValue} saveStyles={saveStyles} />
          </CashSavingsContainer>
        </Optional>
      </EqualHeightElement>
      <EqualHeightElement>
        <Link href={modelPageUrl} onClick={handleLinkOnClick} gtmTags={gtmTags?.link}>
          <Title mt="0" title={fields?.name} />
        </Link>
      </EqualHeightElement>

      <EqualHeightElement placeholder={!showPricing} inherit>
        <Optional when={showPricing}>
          <PriceComponent
            prices={prices}
            priceComponentStyles={priceComponentStyles}
            isFetching={isFetching}
            hasError={hasError}
          />
        </Optional>
      </EqualHeightElement>
      <Link href={modelPageUrl} onClick={handleLinkOnClick} gtmTags={gtmTags?.link}>
        <Thumbnail order={imageOrder} image={image} />
      </Link>
      <BodyText text={tagline?.value} mt={bodyMarginTop} size={bodySize} />
      <SecondaryButton
        tabIndex={0}
        as="a"
        display={ctaButtonDisplay}
        href={modelPageUrl}
        styling="secondary"
        onClick={() => handleLinkOnClick(VIEW_DETAILS)}
        {...gtmTags?.cta}
      >
        {t('Shared.Common.viewDetailsButton')}
      </SecondaryButton>
      <CompareToggleButton
        compareLabelFontSize={compareLabelFontSize}
        compareLabelLineHeight={compareLabelLineHeight}
        tabIndex={0}
        id={productId}
        ariaLabel={t('Shared.Common.compareCheckboxAria', { modelName: fields?.name })}
        gtmTags={gtmTags?.compare}
        detId={detId}
      />
    </Wrapper>
  );
};

ProductCard.propTypes = componentProps;

export default ProductCard;
