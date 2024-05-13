/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Copy, IconWrapper, Icon } from '@honda-canada/design-system-react';
import { JSSFieldPropType } from '../../utils/propTypes';
import themeStyles from './PromoBanner.styles';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { stripMarkdownHeading, styledCompiler } from '../../utils/markdown';

const Container = themeStyles.apply(Box, 'Container');
const MarkdownContainer = themeStyles.apply(Box, 'MarkdownContainer');
const Content = themeStyles.apply(Copy, 'Content');

const PromoBanner = ({ fields }) => {
  const [visible, setVisible] = useState(true);

  if (!fields) return null;

  const { promoMessage, hideBanner, anchorId } = wrapJSSFields(fields);

  return (
    <Container id={anchorId?.value} data-testid="cy-promo-banner">
      {!hideBanner?.value && visible && (
        <>
          <MarkdownContainer>
            <Content>{styledCompiler(stripMarkdownHeading(promoMessage?.value))}</Content>
          </MarkdownContainer>
          <IconWrapper size="iconWrapper.md" onClick={() => setVisible(prev => !prev)}>
            <Icon name="close" iconColor="white" />
          </IconWrapper>
        </>
      )}
    </Container>
  );
};

PromoBanner.propTypes = {
  fields: PropTypes.shape({
    anchorId: JSSFieldPropType,
    promoMessage: JSSFieldPropType,
    hideBanner: PropTypes.shape({
      value: PropTypes.bool,
    }),
  }),
};

export default PromoBanner;
