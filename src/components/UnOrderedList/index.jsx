import React from 'react';
import { compiler } from 'markdown-to-jsx';
import { UnorderedList, UnorderedListItem, Box, Markdown, H4 } from '@honda-canada/design-system-react';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { colourTokenForParam, mapGTMCategory } from '../../utils/sitecoreFields';
import { stripMarkdownHeading, getTitleComponent } from '../../utils/markdown';

const UnOrderedList = ({ fields, params = {}, rendering = {} }) => {
  if (!fields) return null;

  const { title, anchorId, gtmTitle, gtmCategory } = wrapJSSFields(fields);
  const items = fields.items?.map(item => wrapJSSFields(item.fields));

  const columnsOnDesktopInteger = params?.columnsOnDesktop === 'Two' ? 2 : 1;
  const marginTop = params?.hasNegativeMargin && params?.negativeMargin ? `-${params?.negativeMargin}px` : 'zero';
  const titleAlignment = params?.contentAlignment === 'Center' ? params?.contentAlignment : 'Left';
  const bulletStyle = params?.bulletStyle === 'Bullet-Points' ? 'bullet' : 'checkmark';

  // magic numbers for the maximum width of things
  const componentWidth = '824px';
  const listWidth = '612px';

  const pb = rendering.params?.pb || ['xl', 'xxl'];
  const px = rendering.params?.px || ['default', 'zero'];
  const TitleComponent = getTitleComponent(title?.value, H4);

  return (
    <Box
      data-gtm-title={gtmTitle?.value}
      data-gtm-category={mapGTMCategory(gtmCategory)}
      anchorId={anchorId?.value}
      width={['100%', 'auto']}
      mt={marginTop}
      pb={pb}
      px={px}
      bg={colourTokenForParam[params?.bgColour?.toLowerCase()]}
      alignItems="center"
    >
      <Box maxWidth={['initial', componentWidth]} mx="auto">
        {title?.value && (
          <Box mb={['xs', 'm']}>
            <TitleComponent textAlign={titleAlignment}>{compiler(stripMarkdownHeading(title?.value))}</TitleComponent>
          </Box>
        )}
        <Box maxWidth={listWidth} mx="auto">
          <UnorderedList bulletStyle={bulletStyle} columns={[1, columnsOnDesktopInteger]}>
            {items.map((item, i) => (
              <UnorderedListItem key={i.toString()}>
                <Markdown>{item?.text?.value}</Markdown>
              </UnorderedListItem>
            ))}
          </UnorderedList>
        </Box>
      </Box>
    </Box>
  );
};

export default UnOrderedList;
