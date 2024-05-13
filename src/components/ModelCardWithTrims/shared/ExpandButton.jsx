import React from 'react';
import { Box, Copy, Icon, IconWrapper, Button } from '@honda-canada/design-system-react';
import themeStyles from '../ModelCardWithTrims.styles';

const Wrapper = themeStyles.apply(Box, 'ExpandButtonWrapper');
const StyledButton = themeStyles.apply(Button, 'StyledExpandButton');
const Label = themeStyles.apply(Copy, 'ExpandButtonLabel');

const ExpandButton = ({
  isExpanded,
  onClick,
  trimCount,
  trimsAvailableTernary,
  trimAvailableTernary,
  category,
  gtmComponentType,
  gtmModel,
  gtmBodyStyle,
  gtmTitle,
  gtmCategory,
}) => {
  const trimCountString = trimCount === 0 || trimCount > 1 ? trimsAvailableTernary : trimAvailableTernary;
  return (
    <Wrapper
      data-testid={`expand-button-${category}`}
      data-gtm-component-type={gtmComponentType}
      data-gtm-category={gtmCategory}
    >
      <StyledButton
        styling="tertiary"
        data-testid="expand-button"
        onClick={onClick}
        data-gtm-model={gtmModel}
        data-gtm-body-style={gtmBodyStyle}
        data-gtm-interaction-type="cta: category page"
        data-gtm-category={gtmCategory}
        data-gtm-title={gtmTitle}
      >
        <Label data-testid="model-count">{`${trimCount} ${trimCountString}`}</Label>
        <IconWrapper>
          <Icon name="animatedPlusMinus" toggle={isExpanded} color="red" />
        </IconWrapper>
      </StyledButton>
    </Wrapper>
  );
};

export default ExpandButton;
