import React from 'react';
import PropTypes from 'prop-types';
import { FloaterTooltip, Markdown, Icon, Optional } from '@honda-canada/design-system-react';

import themeStyles, { tooltipContainer } from './ProductFeatures.styles';

const FloaterTooltipStyled = themeStyles.apply(FloaterTooltip, 'FloaterTooltipStyled');

const ProductFeaturesItem = ({ feature }) => (
  <li key={feature.text}>
    {feature.text}
    <Optional when={feature.tooltip}>
      <FloaterTooltipStyled
        content={
          <Markdown
            size="xSmall"
            color="white"
            options={{
              overrides: {
                div: {
                  component: tooltipContainer,
                },
              },
            }}
          >
            {feature.tooltip}
          </Markdown>
        }
        position="right-start"
      >
        {({ active }) => <Icon display="inline-block" filled={active} name="information" />}
      </FloaterTooltipStyled>
    </Optional>
  </li>
);

ProductFeaturesItem.propTypes = {
  feature: PropTypes.shape({
    text: PropTypes.string,
    tooltip: PropTypes.string,
  }),
};

export default ProductFeaturesItem;
