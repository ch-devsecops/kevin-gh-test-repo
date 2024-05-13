import React from 'react';
import { Box, Markdown, MarkdownHeading, Optional, Icon, useThemeContext } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import { css } from '@styled-system/css';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { ACURA_THEME_NAME } from '../../utils/constants';

const Item = styled(Box)(
  css({
    '&:last-child': {
      mb: '0',
    },
  }),
);

const PlanCard2Wrapper = ({ fields, rendering }) => {
  const { anchorId, bodyText, title, items = [], gtmCategory } = fields;
  const { name: themeName } = useThemeContext();

  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
  };

  return (
    <Box
      id={anchorId?.value}
      data-gtm-component-type={gtmTags.type}
      data-gtm-category={gtmTags.category}
      width="100%"
      height="100%"
      px={['m', 'l']}
      py={['l', 'xl']}
      backgroundColor="white"
    >
      <Box textAlign="center" fontFamily="bold" mb={['default', '40px']}>
        <MarkdownHeading
          headingOverride="h4"
          textAlign="center"
          mb={['xs', 'm']}
          fontFamily="bold"
          textTransform="none"
        >
          {title?.value}
        </MarkdownHeading>
        <Optional when={bodyText}>
          <Markdown>{bodyText?.value}</Markdown>
        </Optional>
      </Box>
      <Box as="ul" px={['0', 'xxl']}>
        {items.map((item, i) => (
          <Item
            as="li"
            key={i.toString()}
            mb={['default', '40px']}
            display="flex"
            justifyContent="flex-start"
            position="relative"
          >
            <Box position={['relative', 'absolute']} top={['2px', '2px']} left={['0px', '-32px']} mr={['xs', 'm']}>
              <Icon name="success" width="18.67px" height="18.67px" />
            </Box>
            <div>
              <MarkdownHeading
                headingOverride="h6"
                color={themeName === ACURA_THEME_NAME ? 'darkBlue' : 'black'}
                mb="xs"
              >
                {item?.fields?.title.value}
              </MarkdownHeading>
              <Optional when={item?.fields?.bodyText.value}>
                <Markdown>{item?.fields?.bodyText.value}</Markdown>
              </Optional>
            </div>
          </Item>
        ))}
      </Box>
    </Box>
  );
};

export default PlanCard2Wrapper;
