import React, { useContext } from 'react';
import { compiler } from 'markdown-to-jsx';
import { H3, Markdown } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import CTA from '../CTA';
import { mapFieldToDesignSystemImage, mapGTMCategory } from '../../utils/sitecoreFields';
import { stripMarkdownHeading, getTitleComponent } from '../../utils/markdown';
import { ModelExplorationContext } from '../ModelExplorationContext';
import DiagonalCardBase from './DiagonalCard';

const DiagonalCardWrapper = ({ fields, rendering, params }) => {
  const { title, bodyText, ctaType, ctaLink, ctaIcon, mediaImage, gtmCategory, gtmTitle } = fields;

  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;

  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
  };

  const cta = ctaType?.value ? (
    <CTA linkField={ctaLink} typeField={ctaType} iconField={ctaIcon} data-gtm-title={gtmTitle?.title} />
  ) : null;

  const image = mapFieldToDesignSystemImage(mediaImage);
  const Title = getTitleComponent(title.value, H3);
  const TitleComponent = (
    <Title color={isDark ? 'white' : 'typographyDefault'}>{compiler(stripMarkdownHeading(title.value))}</Title>
  );
  const BodyText = <Markdown color={isDark ? 'white' : 'typographyDefault'}>{bodyText.value}</Markdown>;

  return (
    <InView>
      {({ inView, ref }) => (
        <div ref={ref}>
          <DiagonalCardBase
            isDark={isDark}
            title={TitleComponent}
            bodyText={BodyText}
            inView={inView}
            image={image}
            cta={cta}
            gtmTags={gtmTags}
            mb={`${params?.bottomMargin || 0}px`}
          />
        </div>
      )}
    </InView>
  );
};

export default DiagonalCardWrapper;
