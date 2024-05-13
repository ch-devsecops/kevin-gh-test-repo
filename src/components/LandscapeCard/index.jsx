import React, { useContext } from 'react';
import { Image, H1 } from '@honda-canada/design-system-react';
import LandscapeCardReact from './LandscapeCard';
import { LayoutContext } from '../LayoutContext';
import { ModelExplorationContext } from '../ModelExplorationContext';
import { getVideoProps, mapGTMCategory, mapJssFieldsToCtaComponents } from '../../utils/sitecoreFields';
import { getGtmTagValue } from '../../utils/gtmEvents';
import { stripMarkdownHeading, styledCompiler } from '../../utils/markdown';

const LandscapeCard = ({ fields, params, rendering }) => {
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const { layoutName } = useContext(LayoutContext);
  if (!fields) return null;
  const { anchorId, title, bodyText, mediaImage, gtmTitle, gtmCategory, videoUrl, seoH1 } = fields;
  const inSideNav = layoutName === 'SideNavLayout';
  const imageStyle = inSideNav ? { objectFit: 'contain' } : {};
  const ctas = mapJssFieldsToCtaComponents(fields, gtmTitle?.value, rendering?.componentName);
  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    title: getGtmTagValue(gtmTitle?.value),
    type: getGtmTagValue(rendering?.componentName),
  };

  const generateH1Component = (fieldValue, key) =>
    key === seoH1?.value ? <H1 as="h1">{styledCompiler(stripMarkdownHeading(fieldValue))}</H1> : fieldValue;

  return (
    <LandscapeCardReact
      layoutContainer={layoutName}
      title={generateH1Component(title?.value, 'Title')}
      bodyText={generateH1Component(bodyText?.value, 'Description')}
      ctas={ctas}
      anchorId={anchorId?.value}
      gtmTags={gtmTags}
      image={<Image {...mediaImage?.value} style={imageStyle} />}
      video={getVideoProps(videoUrl?.value)}
      backgroundColor={params?.contentBgColour === 'Grey' ? 'grey.5' : 'white'}
      contentAlignment={params?.contentAlignment?.toLowerCase()}
      pt={params?.topMargin ? `${params.topMargin}px` : ['xl', 'xxl']}
      pb={params?.bottomMargin ? `${params.bottomMargin}px` : ['xl', 'xxl']}
      isDark={isDark}
    />
  );
};

export default LandscapeCard;
