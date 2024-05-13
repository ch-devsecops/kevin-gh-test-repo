import React, { useContext } from 'react';
import { Box, H5 } from '@honda-canada/design-system-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { compiler } from 'markdown-to-jsx';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { handleComponentSpacing } from './utils';
import { LayoutContext } from '../LayoutContext';
import PackageCard from './PackageCard';

const PackageCardJSS = ({ fields, rendering }) => {
  const { layoutName } = useContext(LayoutContext);

  if (!fields) return null;

  const { featuredText, title, highlightText, subtitle1, subtitle2, amount, anchorId, gtmCategory } =
    wrapJSSFields(fields);

  const contentPlaceholder = rendering?.placeholders || {};
  const contentName = Object.keys(contentPlaceholder)[0];

  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
  };

  const TitleComponent = getTitleComponent(title?.value, H5);
  const TitleContent = <TitleComponent>{compiler(stripMarkdownHeading(title?.value))}</TitleComponent>;

  return (
    <PackageCard
      featuredText={featuredText?.value}
      title={TitleContent}
      highlightText={highlightText?.value}
      subtitle1={subtitle1?.value}
      subtitle2={subtitle2?.value}
      amount={amount?.value}
      anchorId={anchorId?.value}
      gtmTags={gtmTags}
      layoutContainer={layoutName}
    >
      <Placeholder
        name={contentName}
        rendering={rendering}
        render={(components, placeholderData) => {
          // handles UnOrderedList and FreeFormText spacing
          const componentsWithSpacing = handleComponentSpacing(components);

          // handles content container horizontal padding
          const allowedChildLayout = [
            'ThreeColumnLayout',
            'TwoColumnLayout',
            'LayoutContainers', // checks for layout containers locally
          ];
          const hasChildLayoutContainer = placeholderData.some(component =>
            allowedChildLayout.includes(component?.componentName),
          );

          // handles content table component bottom padding
          const hasChildTableComponent = placeholderData.some(component => component?.componentName === 'Table');

          const containerStyle = {};

          if (hasChildLayoutContainer) {
            containerStyle.px = ['0px', 'default', '106px'];
          }
          if (hasChildTableComponent) {
            containerStyle.mb = 'zero';
          }

          return (
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mb={['l', 'xxl']}
              {...containerStyle}
            >
              {componentsWithSpacing}
            </Box>
          );
        }}
      />
    </PackageCard>
  );
};

export default PackageCardJSS;
