import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { FourColumnLayout } from '@honda-canada/design-system-react';
import { layoutContainerPropTypes } from '../../utils/propTypes';

const shouldRenderPlaceholder = (name, placeholders) =>
  placeholders && placeholders[name] && placeholders[name].length > 0;

const FourColumnLayoutContainer = ({ params, rendering }) => {
  const { placeholders } = rendering;
  const horizontalMargin = params?.horizontalMargin || 0;

  return (
    <FourColumnLayout
      bottomMargin={params?.bottomMargin}
      topMargin={params?.topMargin}
      makeFullWidth={params?.makeFullWidth}
      verticalAlignment={params?.verticalAlignment}
      columnGap={horizontalMargin / 2 || 0}
      columnOne={
        shouldRenderPlaceholder('column-one', placeholders) ? (
          <Placeholder name="column-one" rendering={rendering} />
        ) : null
      }
      columnTwo={
        shouldRenderPlaceholder('column-two', placeholders) ? (
          <Placeholder name="column-two" rendering={rendering} />
        ) : null
      }
      columnThree={
        shouldRenderPlaceholder('column-three', placeholders) ? (
          <Placeholder name="column-three" rendering={rendering} />
        ) : null
      }
      columnFour={
        shouldRenderPlaceholder('column-four', placeholders) ? (
          <Placeholder name="column-four" rendering={rendering} />
        ) : null
      }
    />
  );
};

FourColumnLayoutContainer.propTypes = layoutContainerPropTypes;

export default FourColumnLayoutContainer;
