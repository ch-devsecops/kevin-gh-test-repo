import React, { useContext } from 'react';
import { QuickLink as QuickLinkReact } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { mapFieldToDesignSystemImage, mapGTMCategory } from '../../utils/sitecoreFields';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { stripMarkdownHeading } from '../../utils/markdown';
import { ModelExplorationContext } from '../ModelExplorationContext';

const QuickLink = ({ fields, rendering }) => {
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;

  if (!fields) return null;

  const { bodyText, url, gtmCategory, gtmTitle, gtmInteractionType, gtmModelName, gtmTrimName, gtmBodyStyle } =
    wrapJSSFields(fields);
  const { title, icon } = wrapJSSFields(fields.quicklink?.fields);

  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
    title: gtmTitle?.value,
    interactionType: gtmInteractionType?.value || 'cta: click',
    modelName: gtmModelName?.value,
    trimName: gtmTrimName?.value,
    bodyStyle: gtmBodyStyle?.value,
  };

  const image = mapFieldToDesignSystemImage(icon);

  return (
    <QuickLinkReact
      title={compiler(stripMarkdownHeading(title?.value))}
      bodyText={bodyText?.value}
      href={url?.value?.href}
      variantName={isDark ? 'dark' : 'primary'}
      icon={image}
      gtmTags={gtmTags}
      ariaLabel={url?.value?.title}
    />
  );
};

export default QuickLink;
