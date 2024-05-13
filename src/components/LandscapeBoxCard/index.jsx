import React, { useContext } from 'react';
import { Image } from '@honda-canada/design-system-react';
import LandscapeBoxCardReact from './LandscapeBoxCard';
import { getVideoProps, mapGTMCategory, mapJssFieldsToCtaComponents } from '../../utils/sitecoreFields';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { useAppName } from '../../utils/sitecoreContext';
import { PSP_SITE_NAME } from '../../utils/constants';

const LandscapeBoxCard = ({ fields, params, rendering }) => {
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const appName = useAppName();
  const { isDark } = modelExplorationContext;

  if (!fields) {
    return null;
  }
  const { anchorId, bodyText, ctaType1, desktopImage, gtmCategory, gtmTitle, mobileImage, title, videoUrl, nameBadge } =
    fields;

  let componentType;

  switch (appName) {
    case PSP_SITE_NAME:
      fields.gtmInteractionType1 = { value: 'cta: explore' };
      fields.gtmInteractionType2 = { value: 'cta: explore' };
      fields.gtmInteractionType3 = { value: 'cta: explore' };
      componentType = rendering?.componentName;
      break;
    default:
      break;
  }

  // componentType was not applied to the CTA in auto but is required for PSP as stated in ticket issu SCC-5158
  const ctas = mapJssFieldsToCtaComponents(fields, gtmTitle?.value, componentType);
  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    title: gtmTitle?.value,
    type: rendering?.componentName,
  };

  return (
    <LandscapeBoxCardReact
      imageTitle={nameBadge?.value?.src ? <Image {...nameBadge.value} /> : null}
      title={title?.value}
      bodyText={bodyText?.value}
      backgroundColor={params?.bgColour === 'Grey' ? 'grey.5' : 'white'}
      contentCardColor={params?.contentBgColour === 'Grey' ? 'grey.5' : 'white'}
      contentAlignment={params?.contentAlignment?.toLowerCase()}
      desktopImage={desktopImage?.value?.src && <Image {...desktopImage.value} />}
      mobileImage={mobileImage?.value?.src && <Image {...mobileImage.value} />}
      video={getVideoProps(videoUrl?.value)}
      ctas={ctas}
      isTertiaryCTAGroup={ctaType1?.value === 'Tertiary'}
      anchorId={anchorId?.value}
      gtmTags={gtmTags}
      isDark={isDark}
    />
  );
};

export default LandscapeBoxCard;
