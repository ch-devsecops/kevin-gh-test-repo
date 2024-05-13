import React from 'react';
import { Box, H3, Image, Markdown, SliderPagination, TransitionCards } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import { getGtmTagValue } from '../../utils/gtmEvents';

const SliderCard = ({ image, isActive }) => (
  <Box
    isActive={isActive}
    top="0px"
    position="absolute"
    opacity={isActive ? 1 : 0}
    transition="opacity .7s"
    height="100%"
    width="100%"
  >
    <Image src={image.src} alt={image.alt} />
  </Box>
);

const Slider = ({ fields = {}, params, rendering }) => {
  if (!fields || !rendering) return null;
  const { anchorId, gtmCategory, gtmTitle, title, bodyText } = fields;

  const items = fields.items?.map(item => wrapJSSFields(item.fields));
  const images = items.map(item => ({
    image: {
      src: item.image?.field?.value?.src,
      alt: item.image?.field?.value?.src,
    },
  }));

  const isShort = params?.sliderStyleType !== 'Tall';
  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
    title: gtmTitle?.value,
  };

  const TitleComponent = getTitleComponent(title?.value, H3);
  const TitleContent = (
    <TitleComponent textTransform="none !important">{compiler(stripMarkdownHeading(title?.value))}</TitleComponent>
  );

  const BodyTextContent = bodyText?.value && <Markdown>{stripMarkdownHeading(bodyText?.value)}</Markdown>;

  return (
    <Box
      id={anchorId?.value}
      data-gtm-category={getGtmTagValue(gtmTags?.category)}
      data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
      display="flex"
      flexDirection="column"
      pt="10px"
      width="100%"
      alignItems="center"
      justifyContent="center"
      height={['auto', '100%']}
    >
      <Box width="100%" alignItems="center" justifyContent="center" marginBottom={[0, 'm']} textAlign="center">
        <Box mb="m">{TitleContent}</Box>
        <Box mb="m" mx="m">
          {BodyTextContent}
        </Box>
      </Box>
      <Box overflow="hidden" width="100%" height={isShort ? ['180px', '320px', '710px'] : ['210px', '390px', '810px']}>
        <TransitionCards
          isShort={isShort}
          renderCardAs={SliderCard}
          renderPaginationAs={SliderPagination}
          cards={images}
          isSticky={false}
        />
      </Box>
    </Box>
  );
};

export default Slider;
