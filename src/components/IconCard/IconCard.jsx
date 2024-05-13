import React from 'react';
import PropTypes from 'prop-types';
import { Box, Markdown, MarkdownHeading, Optional } from '@honda-canada/design-system-react';
import themeStyles from './IconCard.styles';
import { getGtmTagValue } from '../../utils/gtmEvents';

const Container = themeStyles.apply(Box, 'Container');
const Wrapper = themeStyles.apply(Box, 'Wrapper');
const IconContainer = themeStyles.apply(Box, 'IconContainer');
const BodyTextContainer = themeStyles.apply(Box, 'BodyTextContainer');
const CTAGroup = themeStyles.apply(Box, 'CTAGroup');
const Divider = themeStyles.apply(Box, 'Divider');
const Title = themeStyles.apply(MarkdownHeading, 'Title');

const IconCard = ({ icon, title, bodyText, ctas, hasDivider, backgroundColor, gtmTags }) => {
  const hasCTA = !!ctas.length;
  const hasIcon = !!icon;

  return (
    <Wrapper
      hasIcon={hasIcon}
      data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
      data-gtm-category={getGtmTagValue(gtmTags?.category)}
    >
      <IconContainer>{icon}</IconContainer>

      <Container bg={backgroundColor} hasCTA={hasCTA} hasIcon={hasIcon}>
        <Box flexGrow="1">
          <Title mb={hasDivider ? 0 : ['xl', 'l']} headingOverride="h5">
            {title}
          </Title>

          <Optional when={hasDivider}>
            <Divider />
          </Optional>

          <Optional when={bodyText.length}>
            <BodyTextContainer hasCTA={hasCTA}>
              <Markdown style={{ textAlign: 'center' }} mb={0}>
                {bodyText}
              </Markdown>
            </BodyTextContainer>
          </Optional>
        </Box>

        <CTAGroup>{ctas}</CTAGroup>
      </Container>
    </Wrapper>
  );
};

IconCard.defaultProps = {
  bodyText: '',
  ctas: [],
  gtmTags: {},
  hasDivider: false,
  backgroundColor: 'white',
};

IconCard.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  /**
   * Markdown enabled text
   */
  bodyText: PropTypes.string,
  hasDivider: PropTypes.bool,
  backgroundColor: PropTypes.oneOf(['white', 'grey.5']),
  ctas: PropTypes.arrayOf(PropTypes.element),
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default IconCard;
