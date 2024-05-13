import React from 'react';
import {
  Box,
  Column,
  Copy,
  heroStyles,
  Optional,
  Row,
  useOptionalVideo,
  Wrapper,
} from '@honda-canada/design-system-react';
import isValidUrlOrRelativeUrl from '@honda-canada/js-utilities/lib/isValidUrlOrRelativeUrl';
import { compiler } from 'markdown-to-jsx';
import { getHorizontalAlignment, getVerticalAlignment } from '../Hero';
import IAPPHero from './IAPPHero';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import { getVideoProps, mapGTMCategory } from '../../utils/sitecoreFields';

import AppHeroButtons from './AppHeroButtons';
import DesktopVideoButton from './DesktopVideoButton';
import HeroBadge from '../HeroBadge';
import MobileVideoButton from './MobileVideoButton';
import themeStyles from './AppHero.styles';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { getGtmTagValue } from '../../utils/gtmEvents';

const Container = heroStyles.apply(Box, 'Container');
const BackgroundContainer = themeStyles.apply('span', 'BackgroundContainer');
const HeroGradient = heroStyles.apply(Box, 'Gradient');

const ContentWrapper = themeStyles.apply(Row, 'ContentWrapper');
const Content = themeStyles.apply(Column, 'Content');
const SubTitle = themeStyles.apply(Copy, 'SubTitle');
const ButtonsWrapper = themeStyles.apply(Box, 'ButtonsWrapper');

const AppHero = ({ fields, params, rendering }) => {
  if (!fields || !params) return null;

  const {
    seoH1,
    title,
    subtitle,
    desktopImage,
    mobileImage,
    ctaImage1,
    ctaImage2,
    ctaImageLink1,
    ctaImageLink2,
    ctaUrl,
    ctaType,
    badgeImage,
    videoUrl,
    gtmTitle,
    gtmCategory,
    gtmInteractionType,
  } = wrapJSSFields(fields);

  const video = getVideoProps(
    videoUrl?.value?.href,
    videoUrl?.value?.title,
    'close video modal',
    videoUrl?.value?.text,
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { optionalVideo } = useOptionalVideo(video);
  const horizontalAlignment = getHorizontalAlignment(params?.contentPosition);
  const verticalAlignment = getVerticalAlignment(params?.contentPosition);
  const isShort = params?.heroStyleType === 'Short';
  const desktopImageSource = isValidUrlOrRelativeUrl(desktopImage?.getProp('src')) ? desktopImage?.getProp('src') : '';
  const mobileImageSource = isValidUrlOrRelativeUrl(mobileImage?.getProp('src')) ? mobileImage?.getProp('src') : '';
  const imageAltText = desktopImage?.getProp('alt');
  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
  };
  const TitleComponent = getTitleComponent(title?.value);
  const buttonsArray = [];

  if (ctaImage1?.getProp('src')) {
    buttonsArray.push({
      JSSLinkField: ctaImageLink1.field,
      JSSImageField: ctaImage1.field,
    });
  }

  if (ctaImage2?.getProp('src')) {
    buttonsArray.push({
      JSSLinkField: ctaImageLink2.field,
      JSSImageField: ctaImage2.field,
    });
  }

  if (ctaUrl?.getProp('url')) {
    buttonsArray.push({
      JSSLinkField: ctaUrl.field,
      styling: ctaType.value?.toLowerCase() || 'secondary',
      text: ctaUrl.value?.text,
      ariaLabel: ctaUrl.value?.title,
    });
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const Buttons = () => (
    <AppHeroButtons
      buttons={buttonsArray}
      gtmTitle={gtmTitle?.value}
      gtmInteractionType={gtmInteractionType?.value}
      gtmComponentType={rendering?.componentName}
    />
  );

  return (
    <Container
      isShort={isShort}
      data-gtm-category={getGtmTagValue(gtmTags?.category)}
      data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
      verticalAlignment={verticalAlignment}
    >
      <BackgroundContainer
        isShort={isShort}
        desktopImageSource={desktopImageSource}
        mobileImageSource={mobileImageSource}
        aria-label={imageAltText}
        alt={imageAltText}
        role="img"
      />
      <HeroGradient verticalAlignment={verticalAlignment} />
      <Wrapper height="100%" position="relative">
        {optionalVideo?.src && (
          <DesktopVideoButton
            video={video}
            horizontalAlignment={horizontalAlignment}
            verticalAlignment={verticalAlignment}
          />
        )}
        {optionalVideo?.src && <MobileVideoButton video={video} />}
        <ContentWrapper horizontalAlignment={horizontalAlignment} verticalAlignment={verticalAlignment}>
          <Content
            width={[1, 1, 7 / 12]}
            horizontalAlignment={horizontalAlignment}
            verticalAlignment={verticalAlignment}
          >
            <HeroBadge image={badgeImage} horizontalAlignment={horizontalAlignment} />
            <TitleComponent
              as={seoH1?.value === 'Title' ? 'h1' : 'p'}
              color="white"
              mt={['8px', '8px', '16px']}
              width="100%"
            >
              {compiler(stripMarkdownHeading(title?.value))}
            </TitleComponent>
            <Optional when={subtitle?.value}>
              <SubTitle as={seoH1?.value === 'Subtitle' && 'h1'}>
                {compiler(stripMarkdownHeading(subtitle?.value))}
              </SubTitle>
            </Optional>
            <ButtonsWrapper horizontalAlignment={horizontalAlignment}>
              <Buttons />
            </ButtonsWrapper>
          </Content>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

AppHero.propTypes = IAPPHero;
export default AppHero;
