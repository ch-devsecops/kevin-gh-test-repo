import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Box, Markdown, MarkdownHeading, Media, Image } from '@honda-canada/design-system-react';
import themeStyles from './ModalCard.styles';

const Container = themeStyles.apply(Wrapper, 'Container');
const Content = themeStyles.apply(Box, 'Content');
const Title = themeStyles.apply(MarkdownHeading, 'Title');
const BodyText = themeStyles.apply(Markdown, 'BodyText');
const StyledMedia = themeStyles.apply(Media, 'Media');
const MediaContainer = themeStyles.apply(Box, 'MediaContainer');

// TODO: Evaluate moving this component to DSR
const OptionalImage = ({ image, ...rest }) => (
  <StyledMedia {...rest}>
    <MediaContainer>
      <Image {...image} />
    </MediaContainer>
  </StyledMedia>
);

OptionalImage.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }),
};

const ModalCard = ({ title, bodyText, image }) => (
  <Container>
    <OptionalImage greaterThanOrEqual="desktop" image={image} />
    <Content>
      <Title headingOverride="h3">{title}</Title>
      <OptionalImage lessThan="desktop" image={image} />
      <BodyText>{bodyText}</BodyText>
    </Content>
  </Container>
);

ModalCard.propTypes = {
  title: PropTypes.string,
  bodyText: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }),
};

export default ModalCard;
