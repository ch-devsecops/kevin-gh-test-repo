import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import isValidUrlOrRelativeUrl from '@honda-canada/js-utilities/lib/isValidUrlOrRelativeUrl';
import { compiler } from 'markdown-to-jsx';
import { Media, H2, Markdown, useOptionalVideo, Icon, Box, useMediaQueries } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import { css } from '@styled-system/css';
import { getVideoProps, mapGTMCategory } from '../../utils/sitecoreFields';
import { CTALinkPropType, JSSFieldPropType } from '../../utils/propTypes';
import CTA from '../CTA';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import ContentRow from './ContentRow';
import Container from './Container';
import { wrapJSSFields } from '../../utils/wrapJSSFields';

const VideoButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
`;

const BackgroundContainer = styled('span')(({ imageSource, isShort }) =>
  css({
    display: 'flex',
    alignItems: 'center',
    background: [
      `url('${imageSource}') center top / cover no-repeat`,
      `url('${imageSource}') center center / cover no-repeat`,
    ],
    height: isShort ? ['345px', '810px'] : ['180px', '810px'],
    width: '100%',
  }),
);

const ShowcaseCardWrapper = ({ fields = {}, params, rendering }) => {
  const {
    anchorId,
    videoUrl,
    mediaImage,
    title,
    bodyText,
    ctaLink,
    ctaIcon,
    gtmCategory,
    gtmTitle,
    gtmInteractionType = { value: 'cta: click' },
  } = wrapJSSFields(fields);
  const { t } = useTranslation();

  const video =
    videoUrl &&
    getVideoProps(videoUrl?.value, t('Shared.Common.playVideoAria'), t('Shared.Common.closeVideoModalAria'));
  const { optionalVideo } = useOptionalVideo(video);
  const isShort = params?.styleType === 'Short';
  const { isDesktop, isSmallDesktop } = useMediaQueries();

  const mediaImageSource = isValidUrlOrRelativeUrl(mediaImage.getProp('src')) ? mediaImage.getProp('src') : '';
  const ctaProps = {
    linkField: ctaLink,
    iconField: ctaIcon,
    ...(gtmTitle?.value && { 'data-gtm-title': gtmTitle?.value }),
    ...(gtmInteractionType?.value && { 'data-gtm-interaction-type': gtmInteractionType?.value }),
  };

  const cta = ctaLink?.value?.href && ctaLink?.value?.text && (
    <>
      <Media at="mobile">
        <CTA typeField={{ value: 'Secondary' }} {...ctaProps} />
      </Media>
      <Media greaterThan="mobile">
        <CTA typeField={{ value: 'SecondaryDark' }} {...ctaProps} />
      </Media>
    </>
  );

  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
    title: gtmTitle?.value,
  };

  const TitleComponent = getTitleComponent(title?.value, H2);
  const Title = (
    <TitleComponent
      color={isShort ? 'white' : ['typographyDefault', 'white']}
      width="100%"
      style={{ textTransform: 'none' }}
    >
      {compiler(stripMarkdownHeading(title?.value))}
    </TitleComponent>
  );

  const Body = bodyText?.value ? (
    <Markdown color={isShort ? 'white' : ['typographyDefault', 'white']} width="100%">
      {bodyText?.value}
    </Markdown>
  ) : null;
  return (
    <>
      <Container
        id={anchorId?.value}
        hasVideo={!!optionalVideo?.src}
        data-gtm-category={gtmTags.category}
        data-gtm-component-type={gtmTags.type}
        maxHeight={isShort && ['345px', '500px']}
        isShort={isShort}
        mt={params?.topMargin ? `${params.topMargin}px` : '0'}
        mb={params?.bottomMargin ? `${params.bottomMargin}px` : '0'}
      >
        <BackgroundContainer
          isShort={isShort}
          imageSource={mediaImageSource}
          aria-label={mediaImage.getProp('alt')}
          alt={mediaImage.getProp('alt')}
          role="img"
        >
          {optionalVideo?.src && (
            <Box mt={[0, '-225px']}>
              <VideoButton onClick={optionalVideo.onPlay} aria-label={optionalVideo.ariaLabel}>
                <Icon name="play" iconSize="large" />
              </VideoButton>
            </Box>
          )}
        </BackgroundContainer>

        {(isShort || isDesktop || isSmallDesktop) && (
          <Box
            width="100%"
            minHeight="229px"
            justifyContent="flex-end"
            alignContent="flex-end"
            background="linear-gradient(180deg, rgba(0, 0, 0, 0) 4.12%, #000000 53.53%)"
          >
            <ContentRow title={Title} bodyText={Body} cta={cta} />
          </Box>
        )}
      </Container>
      {isShort ? null : (
        <Media at="mobile">
          <ContentRow title={Title} bodyText={Body} cta={cta} />
        </Media>
      )}
    </>
  );
};

ShowcaseCardWrapper.propTypes = {
  fields: PropTypes.shape({
    anchorId: JSSFieldPropType,
    videoUrl: JSSFieldPropType,
    mediaImage: PropTypes.shape({
      value: PropTypes.shape({
        alt: PropTypes.string,
        height: PropTypes.string,
        src: PropTypes.string,
        width: PropTypes.string,
      }),
    }),
    title: JSSFieldPropType,
    bodyText: JSSFieldPropType,
    ctaLink: CTALinkPropType,
    ctaType: JSSFieldPropType,
    ctaIcon: JSSFieldPropType,
    gtmCategory: JSSFieldPropType,
    gtmTitle: JSSFieldPropType,
  }),
};

export default ShowcaseCardWrapper;
