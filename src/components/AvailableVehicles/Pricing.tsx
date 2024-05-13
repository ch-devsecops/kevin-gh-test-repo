import React from 'react';
import { Box, Copy, Icon, FloaterTooltipMarkdown } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import themeStyles from './AvailableVehicles.styles';
import { useDarkFromRoute } from '../../utils/sitecoreContext';

const PricingContainer = themeStyles.apply(Box, 'PricingContainer');
const ToolTipContainer = themeStyles.apply(Box, 'ToolTipContainer');
const TooltipLabel = themeStyles.apply(Copy, 'TooltipLabel');
const StyledTooltip = themeStyles.apply(FloaterTooltipMarkdown, 'StyledTooltip');
const Price = themeStyles.apply(Copy, 'Price');

type Props = {
  tooltipLabel?: string;
  price?: string;
  trimName?: string;
};

const Pricing = ({ tooltipLabel, price, trimName }: Props) => {
  const isDark = useDarkFromRoute();
  const { t } = useTranslation();

  if (tooltipLabel === undefined || price === undefined) {
    return null;
  }

  const preventDefaultLinkClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <PricingContainer>
      <ToolTipContainer>
        <TooltipLabel size="small">{t('Shared.Common.sellingPriceLabel')}</TooltipLabel>
        <StyledTooltip
          styling={isDark ? 'dark' : 'light'}
          content={tooltipLabel}
          contentWidth={tooltipLabel?.length > 320 ? 340 : 220}
          data-testid={`cy-${trimName}-price-tooltip`}
          onClick={preventDefaultLinkClick}
          suspendBubbling
        >
          {({ active }: any) => <Icon name="information" filled={active} />}
        </StyledTooltip>
      </ToolTipContainer>
      <Price size="extraSmall" data-testid={`cy-${trimName}-price`}>
        {price}
      </Price>
    </PricingContainer>
  );
};

export default Pricing;
