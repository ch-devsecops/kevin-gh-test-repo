import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, H6, Image, Markdown, useMediaQueries } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import styled from 'styled-components';
import Gallery from './Gallery';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import CTA from '../CTA';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { getGtmTagValue } from '../../utils/gtmEvents';

const ContentCTAContainer = styled(Box)({
  '@media only screen and (max-device-width:767px) and (orientation: landscape)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

const CTAContainer = styled(Box)({
  '@media only screen and (max-device-width:767px) and (orientation: landscape)': {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const ContentCTA = styled(CTA)({
  '@media only screen and (max-device-width:767px) and (orientation: landscape)': {
    marginBottom: 0,
    marginRight: '16px',
  },
});

const CTALabel = styled(Markdown)({
  '@media only screen and (max-device-width:767px) and (orientation: landscape)': {
    marginBottom: '8px',
  },
});

const GalleryJSS = ({ fields, params, rendering }) => {
  const {
    combinedCategoryName,
    gtmCombinedCategoryName,
    landscapeInfoText,
    anchorId,
    gtmCategory,
    gtmTitle,
    gtmModelName,
    gtmBodyStyle,
    ctaLink1,
    ctaLink2,
    items: galleryItems,
  } = wrapJSSFields(fields);

  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const isShort = params?.styleType === 'Short';
  const { isMobile } = useMediaQueries();
  const isDarkDesktop = !isMobile && isDark;
  const { t } = useTranslation();

  const strings = {
    galleryModalAria: t('Shared.Gallery.galleryModalAria'),
    exitModalAria: t('Shared.Gallery.exitModalAria'),
    fullscreenModeAria: t('Shared.Gallery.fullscreenModeAria'),
    nextImageAria: t('Shared.Gallery.nextImageAria'),
    prevImageAria: t('Shared.Gallery.prevImageAria'),
    nextThumbnailPageAria: t('Shared.Gallery.nextThumbnailPageAria'),
    prevThumbnailPageAria: t('Shared.Gallery.prevThumbnailPageAria'),
    hideAria: t('Shared.Gallery.hideAria'),
    hideLabel: t('Shared.Gallery.hideLabel'),
    mobileLandscapeInfoLabel: landscapeInfoText.value,
    learnMoreLabel: ctaLink1.value.text,
    learnMoreAria: ctaLink1.value.title,
    viewAllImagesLabel: ctaLink2.value.text,
    viewAllImagesAria: ctaLink2.value.title,
  };

  const gtmTags = {
    category: gtmCategory.value,
    type: rendering?.componentName,
    title: gtmTitle.value,
    modelName: gtmModelName?.value,
    bodyType: gtmBodyStyle?.value,
  };

  const gallery = galleryItems?.map(category => {
    const { fields: categoryFields } = category;

    const images = categoryFields?.items?.map(categoryItem => {
      const {
        title,
        bodyText,
        image,
        ctaLink1: itemCtaLink1,
        ctaLink2: itemCtaLink2,
        ctaSectionLabel,
        gtmTitle: itemGtmTitle,
        gtmCategory: itemGtmCategory,
      } = categoryItem.fields;

      const ctas = itemCtaLink1?.value?.text && (
        <ContentCTAContainer
          display="flex"
          alignItems="center"
          justifyContent={['center', 'flex-start']}
          flexDirection={['column', 'row']}
        >
          <CTALabel
            mr={['zero', 'l']}
            mb={['m', 'zero']}
            fontFamily="bold"
            fontSize="16px"
            lineHeight="md"
            color={isDarkDesktop ? 'white' : 'typographyDefault'}
          >
            {ctaSectionLabel.value}
          </CTALabel>
          <CTAContainer
            display="flex"
            alignItems="center"
            justifyContent={['center', 'flex-start']}
            flexDirection={['column', 'row']}
          >
            <ContentCTA
              mr={['zero', 'default']}
              mb={['m', 'zero']}
              data-gtm-title={getGtmTagValue(itemGtmTitle?.value)}
              linkField={itemCtaLink1}
              styling={isDarkDesktop ? 'secondaryDark' : 'secondary'}
            />
            {itemCtaLink2?.value?.href && (
              <CTA
                linkField={itemCtaLink2}
                styling={isDarkDesktop ? 'secondaryDark' : 'secondary'}
                data-gtm-title={getGtmTagValue(itemGtmTitle?.value)}
              />
            )}
          </CTAContainer>
        </ContentCTAContainer>
      );

      const ImageComponent = <Image data-gtm-category={itemGtmCategory?.value || 'others'} {...image?.value} />;
      const Title = getTitleComponent(title.value, H6);
      const TitleComponent = (
        <Title color={isDarkDesktop ? 'white' : 'typographyDefault'}>
          {compiler(stripMarkdownHeading(title.value))}
        </Title>
      );
      const BodyText = <Markdown color={isDarkDesktop ? 'white' : 'typographyDefault'}>{bodyText.value}</Markdown>;

      return {
        image: ImageComponent,
        content: {
          title: TitleComponent,
          bodyText: BodyText,
          ctas,
        },
      };
    });

    return {
      title: categoryFields.categoryName.value,
      gtmTitle: categoryFields.gtmCategoryName?.value,
      images: images || [],
    };
  });

  // add All category
  if (galleryItems?.length > 1) {
    gallery.unshift({
      title: combinedCategoryName.value,
      gtmTitle: gtmCombinedCategoryName?.value,
      images: gallery.reduce((acc, curr) => {
        // eslint-disable-next-line no-param-reassign
        acc = acc.concat(curr.images);
        return acc;
      }, []),
    });
  }

  return gallery?.length ? (
    <Gallery
      gallery={gallery}
      gtmTags={gtmTags}
      strings={strings}
      id={anchorId?.value}
      isDark={isDark}
      isShort={isShort}
    />
  ) : null;
};

export default GalleryJSS;
