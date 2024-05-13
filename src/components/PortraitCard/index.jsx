import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Fade } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import {
  getVideoProps,
  colourTokenForParam,
  mapGTMCategory,
  foregroundColourTokenForParam,
  mapFieldToDesignSystemImage,
  mapJssFieldsToCtaComponents,
} from '../../utils/sitecoreFields';
import { ModelExplorationContext } from '../ModelExplorationContext';
import PortraitCard from './PortraitCard';
import { JSSFieldPropType } from '../../utils/propTypes';
import { useAppName } from '../../utils/sitecoreContext';
import { PSP_SITE_NAME } from '../../utils/constants';

const PortraitCardWrapper = ({ fields = {}, params = {}, rendering }) => {
  const { t } = useTranslation();
  const appName = useAppName();

  const { mediaIcon, mediaImage, videoUrl, bodyText, title, gtmCategory, gtmTitle, toolTip } = fields;

  const { contentBgColour, contentAlignment, hasPadding } = params;

  // TODO: confirm aria-label approach
  const video =
    videoUrl &&
    getVideoProps(videoUrl?.value, t('Shared.Common.playVideoAria'), t('Shared.Common.closeVideoModalAria'));
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const image = mapFieldToDesignSystemImage(mediaImage);
  const cmsIcon = mapFieldToDesignSystemImage(mediaIcon);

  switch (appName) {
    case PSP_SITE_NAME:
      fields.gtmInteractionType1 = { value: 'cta: explore' };
      fields.gtmInteractionType2 = { value: 'cta: explore' };
      fields.gtmInteractionType3 = { value: 'cta: explore' };
      break;
    default:
      break;
  }

  const ctas = mapJssFieldsToCtaComponents(fields, gtmTitle?.value, rendering?.componentName);
  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
    title: title?.value,
  };

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <Fade ref={ref} shouldAnimate={inView} height="100%" initialOpacity={0}>
          <PortraitCard
            title={title?.value}
            bodyText={bodyText?.value}
            backgroundColor={colourTokenForParam[contentBgColour?.toLowerCase()]}
            contentAlignment={contentAlignment?.toLowerCase()}
            isTertiaryCTAGroup={fields?.ctaType1?.value?.toLowerCase() === 'tertiary'}
            textColor={isDark ? 'white' : foregroundColourTokenForParam[contentBgColour?.toLowerCase()]}
            image={image}
            ctas={ctas}
            video={video}
            iconImage={cmsIcon}
            textContainerMargins={hasPadding && hasPadding === 1}
            gtmTags={gtmTags}
            toolTip={toolTip?.value}
          />
        </Fade>
      )}
    </InView>
  );
};

PortraitCardWrapper.defaultProps = {
  fields: {},
  params: {},
};

PortraitCardWrapper.propTypes = {
  fields: PropTypes.shape({
    gtmCategory: PropTypes.shape({
      fields: PropTypes.shape({
        value: JSSFieldPropType,
      }),
    }),
    gtmTitle: JSSFieldPropType,
    mediaIcon: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
      }),
    }),
    mediaImage: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
      }),
    }),
    videoUrl: JSSFieldPropType,
    bodyText: JSSFieldPropType,
    title: JSSFieldPropType,
    toolTip: JSSFieldPropType,
    ctaType1: JSSFieldPropType,
  }),
  params: PropTypes.shape({
    contentBgColour: PropTypes.string,
    contentAlignment: PropTypes.string,
    hasPadding: PropTypes.string,
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

export default PortraitCardWrapper;
