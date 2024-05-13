import React from 'react';
import PropTypes from 'prop-types';
import { Box, FloaterTooltipMarkdown, Icon, Optional } from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import themeStyles, { PriceCopy, PriceDiscountCopy, TooltipLabel } from './PriceComponent.styles';
import { useDarkFromRoute, useLanguage } from '../../utils/sitecoreContext';

const PriceContainer = themeStyles.apply(Box, 'PriceContainer');
const PriceToolTipContainer = themeStyles.apply(Box, 'PriceToolTipContainer');
const StyledTooltip = themeStyles.apply(FloaterTooltipMarkdown, 'StyledTooltip');

const Price = ({
  horizontalAlignment,
  priceStyles,
  price,
  priceLabel,
  suppressDiscount,
  discountValue,
  discountPrice,
  toolTipLabel,
}) => {
  const isDark = useDarkFromRoute();
  const language = useLanguage();
  const hasDiscount = !!discountValue && !suppressDiscount;
  let renderPrice = hasDiscount ? discountPrice : price;
  if (!!discountValue && !suppressDiscount) {
    renderPrice = discountPrice;
  }

  return (
    <PriceContainer horizontalAlignment={horizontalAlignment} {...priceStyles?.container}>
      <PriceToolTipContainer>
        <TooltipLabel
          size={priceStyles?.title?.size}
          styles={priceStyles?.title?.styles}
          defaultColor={priceStyles?.title?.color}
          isDark={isDark}
          data-testid="price-label"
        >
          {priceLabel}
        </TooltipLabel>
        <StyledTooltip
          styling={isDark ? 'dark' : 'light'}
          content={toolTipLabel}
          contentWidth={toolTipLabel.length > 320 ? 340 : 220}
          data-testid="cy-pricing-tooltip"
        >
          {({ active }) => <Icon name="information" filled={active} />}
        </StyledTooltip>
      </PriceToolTipContainer>
      <PriceCopy
        fontWeight="bold"
        isDark={isDark}
        hasDiscount={hasDiscount}
        size={priceStyles?.copy?.size}
        styles={priceStyles?.copy?.styles}
        data-testid="cy-pricing-price"
      >
        {formatPrice(renderPrice, language)}
        <Optional when={hasDiscount}>
          <PriceDiscountCopy
            as="span"
            size={priceStyles?.discount?.size}
            styles={priceStyles?.discount?.styles}
            data-testid="cy-pricing-discount-price"
          >
            {formatPrice(price, language)}
          </PriceDiscountCopy>
        </Optional>
      </PriceCopy>
    </PriceContainer>
  );
};

Price.propTypes = {
  priceLabel: PropTypes.string,
  price: PropTypes.number,
  toolTipLabel: PropTypes.string,
  priceStyles: PropTypes.shape({
    container: PropTypes.shape({}),
    copy: PropTypes.shape({}),
  }),
  horizontalAlignment: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
};

export default Price;
