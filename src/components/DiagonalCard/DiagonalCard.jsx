import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@honda-canada/design-system-react';
import themeStyles from './DiagonalCard.styles';

const Container = themeStyles.apply(Box, 'Container');
const ContentBox = themeStyles.apply(Box, 'ContentBox');
const ImageBox = themeStyles.apply(Box, 'ImageBox');
const ImageWrapper = themeStyles.apply(Box, 'ImageWrapper');
const TransitionImageWrapper = themeStyles.apply(Box, 'TransitionImageWrapper');
const FadeUp = themeStyles.apply(Box, 'FadeUp');

const DiagonalCardBase = ({
  title,
  bodyText,
  image,
  cta,
  transitionImage,
  isReversing,
  isActive = true,
  inView,
  gtmTags = {},
  isFullHeight,
  mb,
  isDark,
}) => {
  const isOpen = inView && isActive;

  return (
    <Container
      data-gtm-category={gtmTags.category}
      data-gtm-component-type={gtmTags.type}
      isFullHeight={isFullHeight}
      mb={mb}
      backgroundColor={isDark ? 'black' : 'transparent'}
    >
      <ContentBox>
        <FadeUp isOpen={isOpen} delay="0.3s" mb="xs">
          {title}
        </FadeUp>

        <FadeUp isOpen={isOpen} delay="0.4s" mb={['m', 'm']} id="diagonal-card-body">
          {bodyText}
        </FadeUp>

        <FadeUp isOpen={isOpen} delay="0.5s">
          {cta}
        </FadeUp>
      </ContentBox>

      <ImageBox>
        {transitionImage && (
          <TransitionImageWrapper isReversing={isReversing} isOpen={isOpen}>
            {transitionImage}
          </TransitionImageWrapper>
        )}
        <ImageWrapper isOpen={isOpen} isReversing={isReversing}>
          {image}
        </ImageWrapper>
      </ImageBox>
    </Container>
  );
};

DiagonalCardBase.propTypes = {
  title: PropTypes.node,
  bodyText: PropTypes.node,
  image: PropTypes.element,
  cta: PropTypes.element,
  /**
   * In a series of cards, the image for the next card. This image
   * is shown whem transitioning between this card and another one.
   */
  transitionImage: PropTypes.element,
  /**
   * In a series of cards, is this the active Card?
   */
  isActive: PropTypes.bool,
  /**
   * Should the card transition in reverse?
   */
  isReversing: PropTypes.bool,
  inView: PropTypes.bool,
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
    category: PropTypes.string,
  }),
  isFullHeight: PropTypes.bool,
  mb: PropTypes.string,
  isDark: PropTypes.bool,
};

export default DiagonalCardBase;
