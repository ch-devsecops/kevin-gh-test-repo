import React from 'react';
import { Box, Image, H5, H6, Copy, Optional } from '@honda-canada/design-system-react';
import { getGtmTagValue } from '../../utils/gtmEvents';
import CTA from '../CTA';
import themeStyles from './ModelCardWithTrims.styles';

const Container = themeStyles.apply(Box, 'ModelCardWrapper');
const GradientContainer = themeStyles.apply(Box, 'ModelCardGradientContainer');
const Content = themeStyles.apply(Box, 'ModelCardContent');
const H5ToggleButton = themeStyles.apply(H5, 'ModelCardTaglineComponent');
const H6ToggleButton = themeStyles.apply(H6, 'ModelCardTaglineComponent');
const Description = themeStyles.apply(Copy, 'ModelCardDescription');

const headingMap = {
  h5: H5ToggleButton,
  h6: H6ToggleButton,
};

const ModelCard = ({
  tagline,
  description,
  badgeImageSrc,
  badgeImageAlt,
  backgroundImageSrc,
  exploreCta,
  showModelCardImage,
  modelCardTaglineComponent,
  modelCardDescriptionLineHeight,
  modelCardDescriptionFontSize,
  componentName,
  gtmCategory,
}) => {
  const TaglineComponent = headingMap[modelCardTaglineComponent];
  return (
    <Container backgroundImage={backgroundImageSrc}>
      <GradientContainer>
        <Content>
          <Optional when={showModelCardImage}>
            <Image src={badgeImageSrc} alt={badgeImageAlt} width={['110px', '160.27px']} mb="xs" />
          </Optional>
          <TaglineComponent color="white" data-testid="title">
            {tagline}
          </TaglineComponent>
          <Optional when={description}>
            <Description
              lineHeight={modelCardDescriptionLineHeight}
              fontSize={modelCardDescriptionFontSize}
              data-testid="description"
            >
              {description}
            </Description>
          </Optional>
          <Optional when={exploreCta?.ctaLink?.value?.href && exploreCta?.ctaLink?.value?.text}>
            <CTA
              data-testid="cy-model-card-cta"
              linkField={exploreCta.ctaLink}
              typeField={{ value: 'TertiaryWhite' }}
              iconColor="white"
              icon="arrowRight"
              parentGtmTags={{
                'data-gtm-component-type': getGtmTagValue(componentName),
                'data-gtm-category': getGtmTagValue(gtmCategory),
              }}
              gtmTags={{
                'data-gtm-interaction-type': exploreCta.gtmTags?.gtmInteractionType?.value,
                'data-gtm-model': exploreCta.gtmTags?.gtmModelName,
                'data-gtm-body-style': exploreCta.gtmTags?.gtmBodyStyle,
                'data-gtm-title': 'vehicle tile',
              }}
              ariaLabel={`${exploreCta.ctaLink.value.text} ${exploreCta.gtmTags?.gtmModelName}`}
            />
          </Optional>
        </Content>
      </GradientContainer>
    </Container>
  );
};

export default ModelCard;
