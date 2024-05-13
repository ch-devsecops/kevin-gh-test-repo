import React from 'react';
import { Button, Copy, Hero as DesignSystemHero, Optional, useMediaQueries } from '@honda-canada/design-system-react';
import { Link as SitecoreLink } from '@sitecore-jss/sitecore-jss-react';
import isValidUrlOrRelativeUrl from '@honda-canada/js-utilities/lib/isValidUrlOrRelativeUrl';
import HeroBadge from '../HeroBadge';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { getVideoProps, mapGTMCategory } from '../../utils/sitecoreFields';
import { getTitleComponent, stripMarkdownHeading, styledCompiler } from '../../utils/markdown';
import DesktopVideoButton from './DesktopVideoButton';
import { getGtmTagValue } from '../../utils/gtmEvents';
import { useAppName } from '../../utils/sitecoreContext';
import { PSP_SITE_NAME } from '../../utils/constants';

export const getHorizontalAlignment = (contentPosition = '') => {
  if (contentPosition?.includes('Left')) return 'left';
  if (contentPosition?.includes('Right')) return 'right';
  if (contentPosition?.includes('Center')) return 'center';

  return 'left';
};

export const getVerticalAlignment = (contentPosition = '') => {
  if (contentPosition?.includes('Top')) return 'top';
  if (contentPosition?.includes('Bottom')) return 'bottom';

  return 'bottom';
};

const Hero = ({ fields, params, rendering }) => {
  const appName = useAppName();
  const { isMobile } = useMediaQueries();
  if (!fields) return null;

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
    gtmTitle,
    gtmCategory,
    gtmInteractionType,
    gtmModelName,
    gtmTrimName,
    gtmBodyStyle,
    videoUrl,
  } = wrapJSSFields(fields);

  const video = getVideoProps(
    videoUrl?.value?.href,
    videoUrl?.value?.title,
    'close video modal',
    videoUrl?.value?.text,
  );

  const horizontalAlignment = getHorizontalAlignment(params?.contentPosition);
  const verticalAlignment = getVerticalAlignment(params?.contentPosition);
  const isShort = params?.heroStyleType === 'Short';
  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
    title: gtmTitle?.value,
    interactionType: gtmInteractionType?.value || 'cta: click',
    modelName: gtmModelName?.value,
    trimName: gtmTrimName?.value,
    bodyStyle: gtmBodyStyle?.value,
  };

  let ctaGtmTags = {
    'data-gtm-model': getGtmTagValue(gtmModelName?.value),
    'data-gtm-trim': getGtmTagValue(gtmTrimName?.value),
    'data-gtm-body-style': getGtmTagValue(gtmBodyStyle?.value),
    'data-gtm-interaction-type': getGtmTagValue(gtmInteractionType?.value),
    'data-gtm-title': getGtmTagValue(gtmTitle?.value),
    'data-gtm-component-type': getGtmTagValue(rendering?.componentName),
  };

  switch (appName) {
    case PSP_SITE_NAME:
      ctaGtmTags = {
        'data-gtm-component-type': rendering?.componentName,
        'data-gtm-interaction-type': getGtmTagValue(gtmInteractionType?.value),
        'data-gtm-title': gtmTitle?.value,
      };
      break;
    default:
      break;
  }

  const TitleComponent = getTitleComponent(title?.value);

  const buttons = () => (
    <>
      {ctaUrl?.getProp('url') && (
        <Button
          as={SitecoreLink}
          aria-label={ctaType?.value?.title}
          field={ctaUrl?.field}
          styling={`${ctaType.value?.toLowerCase() || 'secondary'}Dark`}
          mt={[2, 4]}
          mr={[0, video ? 3 : 0]}
          {...ctaGtmTags}
        />
      )}
      <DesktopVideoButton video={video} gtmTags={ctaGtmTags} />
    </>
  );

  const imageAltText = (isMobile ? mobileImage?.getProp('alt') : desktopImage?.getProp('alt')) || ariaLabel?.value;
  const desktopImageSource = isValidUrlOrRelativeUrl(desktopImage?.getProp('src')) ? desktopImage?.getProp('src') : '';
  const mobileImageSource = isValidUrlOrRelativeUrl(mobileImage?.getProp('src')) ? mobileImage?.getProp('src') : '';

  return (
    <DesignSystemHero
      mobileImageSource={mobileImageSource}
      desktopImageSource={desktopImageSource}
      horizontalAlignment={horizontalAlignment}
      verticalAlignment={verticalAlignment}
      imageAltText={imageAltText}
      globalAriaLabels={ariaLabel?.value}
      isShort={isShort}
      video={video}
      gtmTags={gtmTags}
      buttons={buttons}
    >
      <HeroBadge image={badgeImage} horizontalAlignment={horizontalAlignment} />
      <Optional when={title?.field?.value}>
        <TitleComponent as={seoH1?.value === 'Title' ? 'h1' : 'p'} color="white" mt={['8px', '16px']} width="100%">
          {styledCompiler(stripMarkdownHeading(title?.value))}
        </TitleComponent>
      </Optional>

      <Copy
        as={seoH1?.value === 'Subtitle' ? 'h1' : 'p'}
        color="white"
        mt="2"
        mr={horizontalAlignment === 'right' ? 0 : 'auto'}
        ml={horizontalAlignment === 'left' ? 0 : 'auto'}
        maxWidth={['none', '400px']}
        lineHeight={['22px', '26px']}
      >
        {styledCompiler(stripMarkdownHeading(subtitle?.value))}
      </Copy>
    </DesignSystemHero>
  );
};

export default Hero;
