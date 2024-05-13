import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, Markdown, H3, Image, Fade, Scale } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { InView } from 'react-intersection-observer';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { stripMarkdownHeading, getTitleComponent } from '../../utils/markdown';
import CTA from '../CTA';
import styles from './styles';
import { LayoutContext } from '../LayoutContext';

const StyledImage = styled(Image)`
  // IE image height fix
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    height: ${({ inThreeColumn }) => (inThreeColumn ? '224px' : '344px')};
  }
`;

const LandingPageCard = ({ fields, rendering }) => {
  const { layoutName } = useContext(LayoutContext);
  const { image, bodyText, title, gtmCategory, gtmTitle, ctaType, ctaIcon, ctaLink, anchorId } = fields;

  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
  };

  const Title = getTitleComponent(title?.value, H3);

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <Fade ref={ref} shouldAnimate={inView} duration="t2" height="100%" initialOpacity={0}>
          <Scale shouldAnimate={inView} height="100%">
            <Box
              data-testid={gtmTags.type}
              data-gtm-component-type={gtmTags.type}
              data-gtm-category={gtmTags.category}
              backgroundColor="white"
              id={anchorId?.value}
              {...styles.container}
            >
              <Box position="relative" maxHeight={['initial', '344px']}>
                <StyledImage
                  disablePolyfill
                  src={image.value.src}
                  alt={image.value.alt}
                  inThreeColumn={layoutName === 'ThreeColumnLayout'}
                />
              </Box>
              <Box {...styles.contentContainer}>
                <Box {...styles.textContainer}>
                  <Box {...styles.title}>
                    <Title textTransform="none !important">{compiler(stripMarkdownHeading(title?.value))}</Title>
                  </Box>
                  {bodyText?.value && (
                    <Box {...styles.bodyText}>
                      <Markdown>{bodyText?.value}</Markdown>
                    </Box>
                  )}
                </Box>
                <CTA linkField={ctaLink} typeField={ctaType} iconField={ctaIcon} data-gtm-title={gtmTitle?.value} />
              </Box>
            </Box>
          </Scale>
        </Fade>
      )}
    </InView>
  );
};

export default LandingPageCard;
