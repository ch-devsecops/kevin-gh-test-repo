import React from 'react';
import PropTypes from 'prop-types';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { Box, Copy, H6, Icon, FloaterTooltipMarkdown } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

const TrimPriceWithTooltip = ({
  price,
  priceLabel,
  tooltipLabel,
  isDark,
  language,
  labelContentStyles,
  priceLabelStyles,
  priceStyles,
  tooltipStyles,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <Box {...rest}>
      <Box {...labelContentStyles}>
        <Copy color={isDark ? 'white' : 'typographyDefault'} {...priceLabelStyles} data-testid="price-label">
          {priceLabel}
        </Copy>
        <FloaterTooltipMarkdown
          as="span"
          content={tooltipLabel}
          styling={isDark ? 'dark' : 'light'}
          ariaLabel={priceLabel}
          closeAriaLabel={t('Shared.Common.pressToClosePopupAria')}
          className="pricing-tooltip"
          data-testid="cy-pricing-tooltip"
          ml={tooltipStyles.toolTipMarginLeft}
        >
          {({ active }) => <Icon name="information" filled={active} inverted={isDark} />}
        </FloaterTooltipMarkdown>
      </Box>
      <H6 color={isDark ? 'white' : undefined} {...priceStyles} data-testid="cy-trim-price">
        {formatPrice(price, language)}
      </H6>
    </Box>
  );
};

TrimPriceWithTooltip.propTypes = {
  price: PropTypes.number,
  priceLabel: PropTypes.string,
  tooltipLabel: PropTypes.string,
  isDark: PropTypes.bool,
  language: PropTypes.string,
  rest: PropTypes.shape({}),
  labelContentStyles: PropTypes.shape({}),
  priceLabelStyles: PropTypes.shape({}),
  priceStyles: PropTypes.shape({}),
  tooltipStyles: PropTypes.shape({}),
};

TrimPriceWithTooltip.defaultProps = {
  labelContentStyles: {
    display: 'flex',
  },
  priceLabelStyles: {
    size: 'small',
  },
  priceStyles: {},
  tooltipStyles: {},
};

export default TrimPriceWithTooltip;
