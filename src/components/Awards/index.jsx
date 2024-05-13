/* eslint-disable no-nested-ternary */
import React from 'react';
import { compiler } from 'markdown-to-jsx';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box, H4, Image, Markdown, Row, useMediaQueries, Wrapper } from '@honda-canada/design-system-react';

import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import { getGtmTagValue } from '../../utils/gtmEvents';

const AwardsWrapper = styled(Row)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const StyledMarkdown = styled(Markdown)(
  css({
    textAlign: 'center',
    letterSpacing: '0.5px',
    fontSize: ['10px', '14px'],
    lineHeight: ['14px', '24px'],
  }),
);

const getAward = (award, index, isMobile) => {
  if (!award || !award.image || !award.image?.value?.src) return null;
  const image = award.image?.value?.src && (
    <Image
      src={award.image?.value.src}
      alt={award.image?.value.alt}
      mx="auto"
      width={isMobile ? '100%' : award.image?.value?.width ? `${award.image?.value?.width}px` : 'auto'}
      height={isMobile ? '100%' : award.image?.value?.height ? `${award.image?.value?.height}px` : 'auto'}
    />
  );

  return (
    <Box
      key={index}
      height="100%"
      pb="l"
      px={['s', 'm', 'xxl']}
      pr={index % 2 === 0 && 'zero'}
      pl={index % 2 !== 0 && 'zero'}
      width={isMobile ? '50%' : 'auto'}
    >
      <Box pb="m" px={['s', 'zero']} alignItems="center" position="relative">
        {image}
      </Box>
      {award.description && <StyledMarkdown>{award.description?.value}</StyledMarkdown>}
    </Box>
  );
};

const Awards = ({ fields, rendering }) => {
  const { isMobile } = useMediaQueries();
  if (!fields || !fields.items) return null;

  const { contentTitle, items, gtmTitle, gtmCategory, anchorId } = wrapJSSFields(fields);

  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
    title: gtmTitle?.value,
  };

  const TitleComponent = getTitleComponent(contentTitle?.value, H4);

  return (
    <Box
      data-gtm-category={getGtmTagValue(gtmTags?.category)}
      data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
      data-gtm-title={getGtmTagValue(gtmTags?.title)}
      pb="xl"
      id={anchorId?.value}
    >
      <Wrapper maxWidth="1248px">
        {contentTitle?.value && (
          <TitleComponent color="black" mt={['s', 'm']} width="100%" textAlign="center" pb="xxl">
            {compiler(stripMarkdownHeading(contentTitle?.value))}
          </TitleComponent>
        )}
        <AwardsWrapper flexWrap={['wrap', 'nowrap']}>
          {items.map((item, index) => getAward(item.fields, index, isMobile))}
        </AwardsWrapper>
      </Wrapper>
    </Box>
  );
};

export default Awards;
