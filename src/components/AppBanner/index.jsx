import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import {
  AppBanner as AppNoMediaBanner,
  AppMediaBanner,
  H4,
  Image,
  Link,
  Markdown,
  Fade,
} from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { getVideoProps, colourTokenForParam, mapGTMCategory } from '../../utils/sitecoreFields';
import { JSSFieldPropType } from '../../utils/propTypes';
import CTA from '../CTA';
import { stripMarkdownHeading, getTitleComponent, styledCompiler } from '../../utils/markdown';

const AppBanner = ({ fields = {}, rendering, params }) => {
  const {
    anchorId,
    gtmCategory,
    gtmTitle,
    gtmModelName,
    gtmTrimName,
    gtmBodyStyle,
    gtmInteractionType,
    videoUrl,
    mediaImage,
    title,
    bodyText,
    isMedia,
    ctaLink,
    ctaImage1,
    ctaImageLink1,
    ctaImageGtmTitle1,
    ctaImage2,
    ctaImageLink2,
    ctaImageGtmTitle2,
  } = fields;
  const { t } = useTranslation();

  if (!fields || !rendering) return null;

  const contentAlignment = params?.contentAlignment?.toLowerCase() === 'right' ? 'right' : 'left';
  const backgroundColor = colourTokenForParam[params?.bgColour?.toLowerCase()];
  const textColor = ['red', 'black', 'darkBlue'].includes(backgroundColor) ? 'white' : 'typographyDefault';
  const ctaType = { value: ['red', 'black', 'darkBlue'].includes(backgroundColor) ? 'SecondaryDark' : 'Secondary' };

  const video =
    videoUrl?.value &&
    getVideoProps(videoUrl?.value, t('Shared.Common.playVideoAria'), t('Shared.Common.closeVideoModalAria'));

  const ctaGtmTags = {
    'data-gtm-title': gtmTitle?.value,
    'data-gtm-model': gtmModelName?.value,
    'data-gtm-trim': gtmTrimName?.value,
    'data-gtm-body-style': gtmBodyStyle?.value,
    'data-gtm-interaction-type': gtmInteractionType?.value || 'cta: click',
  };

  const image = mediaImage?.value?.src && <Image src={mediaImage.value.src} alt={mediaImage.value.alt} />;

  const cta = ctaLink?.value?.href && ctaLink?.value?.text && (
    <CTA linkField={ctaLink} typeField={ctaType} gtmTags={ctaGtmTags} mr={[0, 'default']} />
  );

  const appCtas = [];

  if (ctaImage1?.value?.src && ctaImageLink1?.value?.href) {
    appCtas.push(
      <Link
        key="1"
        aria-label={ctaImageLink1.value.text}
        {...ctaGtmTags}
        data-gtm-title={ctaImageGtmTitle1?.value}
        {...ctaImageLink1.value}
        mr={[0, 'default']}
      >
        <Image disablePolyfill {...ctaImage1.value} />
      </Link>,
    );
  }

  if (ctaImage2?.value?.src && ctaImageLink2?.value?.href) {
    appCtas.push(
      <Link
        key="2"
        aria-label={ctaImageLink2.value.text}
        {...ctaGtmTags}
        data-gtm-title={ctaImageGtmTitle2?.value}
        {...ctaImageLink2.value}
        mr={!appCtas ? [0, 'default'] : ''}
      >
        <Image disablePolyfill {...ctaImage2.value} />
      </Link>,
    );
  }

  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
    title: gtmTitle?.value,
  };

  const TitleComponent = getTitleComponent(title?.value, H4);
  const titleComponent = (
    <TitleComponent color={textColor}>{styledCompiler(stripMarkdownHeading(title?.value))}</TitleComponent>
  );

  const bodyTextComponent = <Markdown color={textColor}>{bodyText?.value}</Markdown>;

  const content = isMedia?.value ? (
    <AppMediaBanner
      anchorId={anchorId?.value}
      title={titleComponent}
      bodyText={bodyTextComponent}
      cta={cta}
      image={image}
      video={video}
      gtmTags={gtmTags}
      appCtas={appCtas}
      contentAlignment={contentAlignment}
      backgroundColor={backgroundColor}
      textColor={textColor}
    />
  ) : (
    <AppNoMediaBanner
      anchorId={anchorId?.value}
      title={titleComponent}
      gtmTags={gtmTags}
      appCtas={appCtas}
      backgroundColor={backgroundColor}
      textColor={textColor}
    />
  );

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <Fade shouldAnimate={inView} ref={ref} initialOpacity={0}>
          {content}
        </Fade>
      )}
    </InView>
  );
};

AppBanner.propTypes = {
  fields: PropTypes.shape({
    anchorId: JSSFieldPropType,
    videoUrl: JSSFieldPropType,
    mediaImage: PropTypes.shape({
      value: oneOfType([
        PropTypes.string,
        PropTypes.shape({
          alt: PropTypes.string,
          height: PropTypes.string,
          src: PropTypes.string,
          width: PropTypes.string,
        }),
      ]),
    }),
    title: JSSFieldPropType,
    bodyText: JSSFieldPropType,
    ctaLink: PropTypes.shape({
      value: oneOfType([
        PropTypes.string,
        PropTypes.shape({
          anchor: PropTypes.string,
          href: PropTypes.string,
          linktype: PropTypes.string,
          target: PropTypes.string,
          text: PropTypes.string,
          url: PropTypes.string,
        }),
      ]),
    }),
    ctaImage1: PropTypes.shape({
      value: PropTypes.shape({
        alt: PropTypes.string,
        height: PropTypes.string,
        src: PropTypes.string,
        width: PropTypes.string,
      }),
    }),
    ctaImageLink1: PropTypes.shape({
      value: oneOfType([
        PropTypes.string,
        PropTypes.shape({
          anchor: PropTypes.string,
          href: PropTypes.string,
          linktype: PropTypes.string,
          target: PropTypes.string,
          text: PropTypes.string,
          url: PropTypes.string,
        }),
      ]),
    }),
    ctaImage2: PropTypes.shape({
      value: PropTypes.shape({
        alt: PropTypes.string,
        height: PropTypes.string,
        src: PropTypes.string,
        width: PropTypes.string,
      }),
    }),
    ctaImageLink2: PropTypes.shape({
      value: oneOfType([
        PropTypes.string,
        PropTypes.shape({
          anchor: PropTypes.string,
          href: PropTypes.string,
          linktype: PropTypes.string,
          target: PropTypes.string,
          text: PropTypes.string,
          url: PropTypes.string,
        }),
      ]),
    }),
    isMedia: PropTypes.shape({
      value: oneOfType([PropTypes.string, PropTypes.bool]),
    }),
  }),
};

export default AppBanner;
