import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Accordion } from '@honda-canada/design-system-react';

import NestedAccordionTitle from '../../utils/components/NestedAccordionTitle';

import themeStyles from './ProductFeatures.styles';
import FeaturesList from './FeaturesList';

const Container = themeStyles.apply(Box, 'Container');
const FeatureWrapper = themeStyles.apply(Box, 'FeatureWrapper');

const ProductFeaturesContainer = ({ features, gtmTags }) => {
  const [isAccordion, setIsAccordion] = useState(false);

  if (!isAccordion && features?.[0]?.accordionTitle) {
    setIsAccordion(true);
  }

  const content = features?.map((feature, i) => {
    if (feature.accordionTitle) {
      return {
        ...feature,
        title: <NestedAccordionTitle>{feature.title}</NestedAccordionTitle>,
        content: (
          <FeatureWrapper isAccordion={isAccordion}>
            {feature.content.map((item, j) => (
              <FeaturesList key={`${item.title}_${j}`} feature={item} />
            ))}
          </FeatureWrapper>
        ),
      };
    }
    return <FeaturesList key={`${feature.title}_${i}`} feature={feature} />;
  });

  return (
    <Container data-gtm-component-type={gtmTags?.type} tabIndex={0} data-testid="product-features-content">
      {isAccordion ? (
        <Accordion
          items={content}
          iconPosition="left"
          iconName="animatedArrowRightDown"
          iconColorOverride="primary"
          panelBackgroundColor="grey.3"
          borderColor="transparent"
          isCompact
          contentContainerStyles={{ padding: 0, marginBottom: ['xs', 's'] }}
        />
      ) : (
        content
      )}
    </Container>
  );
};

ProductFeaturesContainer.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      list: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          tooltip: PropTypes.string,
        }),
      ),
    }),
  ),
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
  }),
};

export default ProductFeaturesContainer;
