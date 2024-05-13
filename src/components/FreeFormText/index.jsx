import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box, MarkdownHeading, Markdown, H6 } from '@honda-canada/design-system-react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { parseBool } from '../../utils/common';

const StyledMarkdown = styled(Markdown)(
  css({
    // Overrides some opinionated CSS from the Acura current-state header
    sup: {
      lineHeight: 'inherit',
    },
  }),
);

// eslint-disable-next-line react/display-name
export default function ({ fields, params, rendering }) {
  if (!fields || !fields.contentBody || !fields.contentBody.value) {
    return null;
  }

  return (
    <Box
      id={fields.anchorId?.value}
      textAlign={params?.contentAlignment?.toLowerCase()}
      width={parseBool(params?.isReducedWidth) ? [1, 3 / 4] : 'initial'}
      mb={rendering?.params?.bottomMargin ? `${rendering?.params?.bottomMargin}px` : ['xl', 'xxl']}
      mt={rendering?.params?.topMargin ? `${rendering?.params?.topMargin}px` : 'zero'}
      data-gtm-component-type={rendering?.componentName}
      data-gtm-category={mapGTMCategory(fields.gtmCategory)}
    >
      {fields.contentTitle?.value && (
        <Box mb={['default', 'l']}>
          <MarkdownHeading headingOverride="h3">{fields.contentTitle?.value}</MarkdownHeading>
        </Box>
      )}
      <Box>
        {fields.subtitle?.value && (
          <H6 as={fields.seoH1?.value === 'Subtitle' && 'h1'}>
            <Text field={fields.subtitle} />
          </H6>
        )}
        <StyledMarkdown
          options={
            fields.seoH1?.value === 'Description' && {
              overrides: {
                p: {
                  component: ({ children, type, ...props }) => {
                    const Elem = type;
                    return <Elem {...props}>{children}</Elem>;
                  },
                  props: {
                    className: 'override',
                    type: 'h1',
                  },
                },
              },
            }
          }
        >
          {fields.contentBody.value}
        </StyledMarkdown>
      </Box>
    </Box>
  );
}
