import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes, { oneOfType } from 'prop-types';
import { H4, Image, Link, Markdown } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { colourTokenForParam, getVideoProps, mapGTMCategory } from '../../utils/sitecoreFields';
import { JSSFieldPropType } from '../../utils/propTypes';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import CTA from '../CTA';
import DesignSystemAppCard from './AppCard';
import { getGtmTagValue } from '../../utils/gtmEvents';

const AppCard = ({ fields = {}, rendering, params }) => {
  const {
    anchorId,
    gtmCategory,
    gtmTitle,
    videoUrl,
    mediaImage,
    title,
    bodyText,
    ctaLink,
    ctaImage1,
    ctaImageLink1,
    ctaImage2,
    ctaImageLink2,
  } = fields;
  const { t } = useTranslation();

  if (!fields || !rendering) return null;

  const backgroundColor = colourTokenForParam[params?.bgColour?.toLowerCase()];
  const textColor =
    !backgroundColor || ['red', 'black', 'darkBlue'].includes(backgroundColor) ? 'white' : 'typographyDefault';
  const ctaType = {
    value: !backgroundColor || ['red', 'black', 'darkBlue'].includes(backgroundColor) ? 'SecondaryDark' : 'Secondary',
  };

  const video =
    videoUrl?.value &&
    getVideoProps(videoUrl?.value, t('Shared.Common.playVideoAria'), t('Shared.Common.closeVideoModalAria'));

  const image = mediaImage?.value?.src && <Image src={mediaImage.value.src} alt={mediaImage.value.alt} />;

  const cta = ctaLink?.value?.href && ctaLink?.value?.text && (
    <CTA linkField={ctaLink} typeField={ctaType} data-gtm-title={getGtmTagValue(gtmTitle?.value)} />
  );

  const appCtas = [];

  if (ctaImage1?.value?.src && ctaImageLink1?.value?.href) {
    appCtas.push(
      <Link
        key="1"
        aria-label={ctaImageLink1.value.text}
        data-gtm-title={getGtmTagValue(gtmTitle?.value)}
        {...ctaImageLink1.value}
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
        data-gtm-title={getGtmTagValue(gtmTitle?.value)}
        {...ctaImageLink2.value}
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
  const TitleContent = (
    <TitleComponent color={textColor} textTransform="none !important">
      {compiler(stripMarkdownHeading(title?.value))}
    </TitleComponent>
  );

  const BodyTextContent = bodyText?.value && (
    <Markdown color={textColor}>{stripMarkdownHeading(bodyText?.value)}</Markdown>
  );

  return (
    <DesignSystemAppCard
      anchorId={anchorId?.value}
      title={TitleContent}
      bodyText={BodyTextContent}
      cta={cta}
      image={image}
      video={video}
      gtmTags={gtmTags}
      appCtas={appCtas}
      backgroundColor={backgroundColor}
    />
  );
};

AppCard.propTypes = {
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
  }),
};

export default AppCard;
