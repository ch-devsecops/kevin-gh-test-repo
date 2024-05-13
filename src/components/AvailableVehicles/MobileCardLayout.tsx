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

const MobileCardLayout = ({ vehicle, dealerName, bodyStyle, inventoryAvailabilityStatus }: PropTypes) => {
  // ToDo Temporary mockData props and link since we do not have actual data and working on mockData
  const trimItems = vehicle?.transmissions?.[0]?.items || [];
  const { price, trim, tooltipText, image, exteriorColorKey } = trimItems[0] || {};
  const trimName = trim?.value;
  const hasPrice = price?.value;
  const modelName = vehicle?.name;

  return (
    <CardLink
      to={`?modelYear=${modelYear}&trimKey=${trim?.value}&exteriorColorKey=${exteriorColorKey?.value}`}
      onClick={() => gtmSuggestedModelClick(dealerName, modelName, trimName, bodyStyle, inventoryAvailabilityStatus)}
    >
      <CardContainer>
        <ContentWrapper>
          <Title size="small">{`2023 ${modelName} ${trimName} ${trimName}`}</Title>
          {hasPrice && <Pricing tooltipLabel={tooltipText?.value} price={price?.value} />}
        </ContentWrapper>
        <CardImage src={image?.url} />
      </CardContainer>
    </CardLink>
  );
};
export default MobileCardLayout;
