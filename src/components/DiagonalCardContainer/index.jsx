import React, { useContext } from 'react';
import { compiler } from 'markdown-to-jsx';
import { TransitionCards, ScrollPagination, Markdown, H3, Box } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import CTA from '../CTA';
import { mapFieldToDesignSystemImage, mapGTMCategory } from '../../utils/sitecoreFields';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { stripMarkdownHeading, getTitleComponent } from '../../utils/markdown';
import { ModelExplorationContext } from '../ModelExplorationContext';
import DiagonalCardBase from '../DiagonalCard/DiagonalCard';

const DiagonalCardContainer = ({ fields, rendering }) => {
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  if (!fields || !fields.items) {
    return null;
  }

  const { anchorId, items, gtmCategory } = wrapJSSFields(fields);

  const containerGtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
  };

  if (!items || items.length === 0) return null;

  // eslint-disable-next-line no-shadow
  const cards = items.map(({ fields }, index) => {
    const image = mapFieldToDesignSystemImage(fields.mediaImage, false);

    const cardGtmTags = {
      category: mapGTMCategory(fields.gtmCategory),
      type: `${containerGtmTags.type}_${index}`,
    };
    const Title = getTitleComponent(fields.title.value, H3);
    const TitleComponent = (
      <Title color={isDark ? 'white' : undefined}>{compiler(stripMarkdownHeading(fields.title.value))}</Title>
    );
    const BodyText = <Markdown color={isDark ? 'white' : undefined}>{fields.bodyText.value}</Markdown>;

    return {
      title: TitleComponent,
      bodyText: BodyText,
      cta: fields.ctaType?.value ? (
        <CTA
          linkField={fields.ctaLink}
          typeField={fields.ctaType}
          iconField={fields.ctaIcon.field}
          data-gtm-title={fields.gtmTitle?.value}
          ariaLabel={fields.ctaLink?.value?.title}
        />
      ) : null,
      image,
      gtmTags: cardGtmTags,
    };
  });

  return (
    <TransitionCards
      anchorId={anchorId?.value}
      cards={cards}
      renderCardAs={props => (
        <Box height="120vh">
          <InView>
            {({ inView, ref }) => (
              <div ref={ref}>
                <DiagonalCardBase {...props} isDark={isDark} isFullHeight inView={inView} />
              </div>
            )}
          </InView>
        </Box>
      )}
      renderPaginationAs={props => (
        <>
          <ScrollPagination {...props} pageHeight={120} />
          <Box height="30vh" />
        </>
      )}
      gtmTags={containerGtmTags}
    />
  );
};

export default DiagonalCardContainer;
