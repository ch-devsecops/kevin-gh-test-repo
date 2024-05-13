import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Markdown } from '@honda-canada/design-system-react';
import themeStyles from '../ModelCardWithTrims.styles';

const Container = themeStyles.apply(Alert, 'AlertContainer');
const Text = themeStyles.apply(Markdown, 'AlertMarkdown');

const NoFilterResult = ({ content }) => (
  <Container
    variant="info"
    iconName="warning"
    iconColor="black"
    iconSize="large"
    iconStyle={{ filled: true }}
    data-testid="no-filter-result"
  >
    <Text fontFamily="bold" fontSize={['18px', '18px', '24px']}>
      {content}
    </Text>
  </Container>
);

NoFilterResult.propTypes = {
  content: PropTypes.string,
};

export default NoFilterResult;
