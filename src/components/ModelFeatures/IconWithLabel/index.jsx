import React from 'react';
import PropTypes from 'prop-types';
import { Box, Icon, Image, Label, Optional } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import { JSSFieldPropType } from '../../../utils/propTypes';
import themeStyles from './IconWithLabel.styles';

const Container = themeStyles.apply(Box, 'Container');
const IconLabel = themeStyles.apply(Label, 'IconLabel');
const IconContainer = styled('label')(themeStyles.get('IconContainer'));

const IconWithLabel = ({ featureName, isDarkMode, iconPosition, iconImage, ...props }) => (
  <Container iconPosition={iconPosition} mt="m" tabIndex={0} {...props}>
    <IconLabel color={isDarkMode ? 'white' : undefined}>{featureName}</IconLabel>
    <IconContainer>
      <Optional when={iconImage?.src}>
        <Image {...iconImage} width="20px" height="20px" />
      </Optional>
      <Optional when={!iconImage?.src}>
        <Icon name="success" iconSize="large" width="20px" height="20px" iconColor={isDarkMode ? 'white' : 'black'} />
      </Optional>
    </IconContainer>
  </Container>
);

IconWithLabel.propTypes = {
  featureName: PropTypes.string,
  isDarkMode: PropTypes.bool,
  iconPosition: PropTypes.string,
  iconImage: JSSFieldPropType,
};

export default IconWithLabel;
