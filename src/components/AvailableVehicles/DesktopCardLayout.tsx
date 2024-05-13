import React from 'react';
import { Box, Copy, Image } from '@honda-canada/design-system-react';
import { Link } from 'react-router-dom';
import themeStyles from './AvailableVehicles.styles';
import Pricing from './Pricing';
import { gtmSuggestedModelClick } from '../../utils/gtmEvents';
import { type PropTypes } from './types';

const CardContainer = themeStyles.apply(Box, 'CardContainer');
const ContentWrapper = themeStyles.apply(Box, 'ContentWrapper');
const Title = themeStyles.apply(Copy, 'Title');
const CardImage = themeStyles.apply(Image, 'CardImage');
const CardLink = themeStyles.apply(Link, 'CardLink');

const DesktopCardLayout = ({ vehicle, dealerName, bodyStyle, inventoryAvailabilityStatus }: PropTypes) => {
  const trimItems = vehicle?.transmissions?.[0]?.items || [];
  const modelName = vehicle?.name;

  if (!trimItems.length) {
    return null;
  }

  const { price, trim, tooltipText, image, exteriorColorKey } = trimItems?.[0] || {};
  const hasPrice = price?.value;
  const trimName = trim?.value;

  return (
    <CardLink
      to={`?modelYear=${modelYear}&trimKey=${trim?.value}&exteriorColorKey=${exteriorColorKey?.value}`}
      onClick={() => gtmSuggestedModelClick(dealerName, modelName, trimName, bodyStyle, inventoryAvailabilityStatus)}
      data-testid={`cy-recommended-vehicle-link-${trim?.value}`}
    >
      <CardContainer data-testid={`cy-recommended-vehicle-card-${trimName}`}>
        <Title data-testid="cy-recommended-vehicle-title" size="small">
          {`2023 ${modelName} ${trimName} ${trimName}`}
        </Title>
        <ContentWrapper>
          {hasPrice && <Pricing tooltipLabel={tooltipText?.value} price={price?.value} trimName={trimName} />}
          <CardImage hasPrice={hasPrice} src={image?.url} />
        </ContentWrapper>
      </CardContainer>
    </CardLink>
  );
};

export default DesktopCardLayout;
