import React from 'react';
import styled from 'styled-components';
import { compiler } from 'markdown-to-jsx';
import { Box, Copy, Row, Column, ContactCard, H4 } from '@honda-canada/design-system-react';
import { Text, Image } from '@sitecore-jss/sitecore-jss-react';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { stripMarkdownHeading } from '../../utils/markdown';

const Icon = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const ContactUs = ({ fields, params, rendering }) => {
  if (!fields || !params) return null;

  const { title, bodyText, items = [], gtmCategory } = fields;
  const { hasBottomMargin, contentAlignment } = params;

  const magicMaxWidth = '294px'; // magic number for non-standard Column max-width on desktop
  const magicPadding = '20%'; // magic number for Box padding when left- or right-aligned on desktop
  const shouldAlignRight = contentAlignment === 'Right' && items?.length <= 2;
  const shouldAlignLeft = contentAlignment === 'Left' && items?.length <= 2;
  const smallDesktopColumnWidths = [1, 1, 1 / 2, 1 / 3, 1 / 4, 1 / 3];
  const smallDesktopColumnWidth = smallDesktopColumnWidths[items?.length];
  const desktopColumnWidth = 1 / items.length;

  let desktopPadding = {
    left: 'columnGap.0',
    right: 'columnGap.0',
  };

  if (shouldAlignRight) {
    desktopPadding = {
      left: magicPadding,
      right: 'columnGap.0',
    };
  }

  if (shouldAlignLeft) {
    desktopPadding = {
      left: 'columnGap.0',
      right: magicPadding,
    };
  }

  return (
    <Box
      backgroundColor="grey.5"
      py="xl"
      mb={hasBottomMargin ? ['xs', 'default'] : 'zero'}
      pl={['xl', desktopPadding?.left]}
      pr={['xl', desktopPadding?.right]}
      height="100%"
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={rendering?.componentName}
    >
      {title && (
        <H4 textAlign="center" mb={['default', 'l']}>
          {compiler(stripMarkdownHeading(title?.value))}
        </H4>
      )}
      {bodyText && (
        <Copy textAlign="center" size="regular" mb={['l', 'xl']}>
          <Text field={bodyText} />
        </Copy>
      )}

      <Row justifyContent="center" as="ul">
        {items.map((item, i) => {
          const itemFields = item?.fields || {};
          const isLast = i === items.length - 1;
          const gtmTags = {
            type: `${rendering?.componentName}_${i}`,
            title: itemFields?.gtmTitle?.value,
            category: mapGTMCategory(itemFields?.gtmCategory),
          };

          return (
            <Column
              key={i.toString()}
              width={[1, smallDesktopColumnWidth, desktopColumnWidth]}
              maxWidth={['none', magicMaxWidth]}
              mb={[isLast ? 'zero' : 'l', 'l', 'zero']}
              as="li"
            >
              <ContactCard
                icon={<Icon field={itemFields?.icon} aria-hidden />}
                title={itemFields?.title?.value}
                text={itemFields?.bodyText?.value}
                gtmTags={gtmTags}
              />
            </Column>
          );
        })}
      </Row>
    </Box>
  );
};

export default ContactUs;
