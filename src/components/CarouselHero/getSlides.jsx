import React from 'react';
import { compiler } from 'markdown-to-jsx';
import {
  Box,
  Button,
  Copy,
  Fade,
  Hero as DesignSystemHero,
  HeroGradient,
  Optional,
} from '@honda-canada/design-system-react';
import isValidUrlOrRelativeUrl from '@honda-canada/js-utilities/lib/isValidUrlOrRelativeUrl';
import Link from '../RoutableSitecoreLink';
import { getHorizontalAlignment, getVerticalAlignment } from '../Hero';
import HeroBadge from '../HeroBadge';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { getVideoProps, mapGTMCategory } from '../../utils/sitecoreFields';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import DesktopVideoButton from '../Hero/DesktopVideoButton';
import { getGtmTagValue } from '../../utils/gtmEvents';

const getSlides = ({ items, shouldAnimate, containerGtmTags }) =>
  items?.map((item, index) => {
    const {
      seoH1,
      title,
      subtitle,
      desktopImage,
      mobileImage,
      ctaUrl,
      ctaType,
      ariaLabel,
      badgeImage,
      thumbnailImage,
      videoUrl,
      gtmCategory,
      gtmTitle,
      gtmInteractionType,
      gtmModelName,
      gtmTrimName,
      gtmBodyStyle,
      contentPosition,
    } = wrapJSSFields(item.fields);
    const video = getVideoProps(
      videoUrl?.value?.href,
      videoUrl?.value?.title,
      'close video modal',
      videoUrl?.value?.text,
    );

    const itemGtmTags = {
      category: mapGTMCategory(gtmCategory),
      type: `${containerGtmTags?.type}_${index}`,
    };

    const TitleComponent = getTitleComponent(title?.value);
    const horizontalAlignment = getHorizontalAlignment(contentPosition?.value);
    const verticalAlignment = getVerticalAlignment(contentPosition?.value);

    /**
     * If animation is enabled, the first slide's elements should
     * fade in, and they should have an initial opacity of 0.
     * Initial opacity should always be 0 in the server-side render.
     */
    const shouldSlideAnimate = shouldAnimate && index === 0;
    const initialOpacity = typeof window === 'undefined' && index === 0 ? 0 : 1;
    const hasCta = ctaUrl?.getProp('url') || ctaUrl?.getProp('href');
    const buttons = () => (
      <Optional when={hasCta || video}>
        <Fade
          zIndex={1}
          shouldAnimate={shouldSlideAnimate}
          delay="2s"
          initialOpacity={initialOpacity}
          display="inherit"
        >
          {hasCta && (
            <Button
              as={Link}
              field={ctaUrl?.field}
              styling={`${ctaType?.value?.toLowerCase() || 'secondary'}Dark`}
              mt={[2, 4]}
              mr={[0, video ? 3 : 0]}
              gtmTags={{
                'aria-label': getGtmTagValue(ctaUrl?.value?.title),
                'data-gtm-model': getGtmTagValue(gtmModelName?.value),
                'data-gtm-trim': getGtmTagValue(gtmTrimName?.value),
                'data-gtm-body-style': getGtmTagValue(gtmBodyStyle?.value),
                'data-gtm-interaction-type': getGtmTagValue(gtmInteractionType?.value),
                'data-gtm-title': getGtmTagValue(gtmTitle?.value),
                'data-gtm-component-type': getGtmTagValue(containerGtmTags?.type),
              }}
            />
          )}
          <DesktopVideoButton
            video={video}
            gtmTags={{
              'data-gtm-interaction-type': getGtmTagValue(gtmInteractionType?.value),
              'data-gtm-title': getGtmTagValue(gtmTitle?.value),
              'data-gtm-component-type': getGtmTagValue(containerGtmTags?.type),
            }}
          />
        </Fade>
      </Optional>
    );

    const desktopImageSource = isValidUrlOrRelativeUrl(desktopImage?.getProp('src'))
      ? desktopImage?.getProp('src')
      : '';
    const mobileImageSource = isValidUrlOrRelativeUrl(mobileImage?.getProp('src')) ? mobileImage?.getProp('src') : '';
    const thumbnailImageSource = isValidUrlOrRelativeUrl(thumbnailImage?.getProp('src'))
      ? thumbnailImage?.getProp('src')
      : '';

    return (
      <DesignSystemHero
        key={item.id}
        id={item.id}
        heading={compiler(stripMarkdownHeading(title?.value))}
        mobileImageSource={mobileImageSource}
        desktopImageSource={desktopImageSource}
        thumbnailImageSource={thumbnailImageSource}
        horizontalAlignment={horizontalAlignment}
        verticalAlignment={verticalAlignment}
        globalAriaLabels={ariaLabel?.value}
        imageAltText={thumbnailImage?.getProp('alt') || ariaLabel?.value}
        video={video}
        gtmTags={itemGtmTags}
        buttons={buttons}
        gradient={
          <Fade shouldAnimate={shouldSlideAnimate} initialOpacity={initialOpacity} delay="1s">
            <HeroGradient verticalAlignment={verticalAlignment} />
          </Fade>
        }
      >
        <Fade zIndex={1} shouldAnimate={shouldSlideAnimate} initialOpacity={initialOpacity} delay="1.5s" width="100%">
          <HeroBadge image={badgeImage} horizontalAlignment={horizontalAlignment} />
          <Box width="100%">
            <TitleComponent as={seoH1?.value === 'Title' ? 'h1' : 'p'} color="white" mt={['8px', '16px']} width="100%">
              {compiler(stripMarkdownHeading(title?.value))}
            </TitleComponent>
          </Box>
          <Copy
            as={seoH1?.value === 'Subtitle' && 'h1'}
            color="white"
            mt="2"
            mr={horizontalAlignment === 'right' ? 0 : 'auto'}
            ml={horizontalAlignment === 'left' ? 0 : 'auto'}
            maxWidth={['none', '400px']}
            lineHeight={['22px', '26px']}
          >
            {compiler(stripMarkdownHeading(subtitle?.value))}
          </Copy>
        </Fade>
      </DesignSystemHero>
    );
  });

export default getSlides;
