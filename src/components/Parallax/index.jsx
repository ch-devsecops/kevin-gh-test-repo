import React, { useRef, useState } from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Media, Box } from '@honda-canada/design-system-react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { mapGTMCategory, getIsDarkMode } from '../../utils/sitecoreFields';
import Horizontal from './Horizontal';
import Vertical from './Vertical';

const getScaleStartAt = direction => (direction === 'Scale-Down' ? 2 : 1);
const getScaleEndAt = level => parseInt(level, 10) / 100 || 1;

const Parallax = ({ fields, rendering, params, sitecoreContext }) => {
  const isDarkMode = getIsDarkMode(sitecoreContext.route);
  const [scrollDirection, setScrollDirection] = useState('down');
  const ref = useRef();
  useScrollPosition(
    ({ currPos, prevPos }) => {
      if (currPos.y < prevPos.y) {
        setScrollDirection('up');
      }
      if (currPos.y >= prevPos.y) {
        setScrollDirection('down');
      }
    },
    [],
    ref,
    true,
    500,
  );

  if (!fields) return null;

  const { items } = fields;
  if (!items) return null;

  const allFeatures = items
    ? items.map((section, i) =>
        section.fields?.items.map(feature => ({
          ...feature,
          section: i,
          scaleStartAt: getScaleStartAt(feature.fields.scaleDirection?.value),
          scaleEndAt: getScaleEndAt(feature.fields.scaleLevel?.value),
          transformOrigin: feature.fields.parallaxQuadrant?.value?.toLowerCase(),
        })),
      )
    : [];
  const features = [].concat(...allFeatures);
  const { anchorId, gtmCategory, watermark } = fields;

  return features.length > 0 ? (
    <Box
      id={anchorId?.value}
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={rendering?.componentName}
      backgroundColor={isDarkMode ? 'black' : 'default'}
    >
      <Media at="mobile">
        <Vertical
          sections={fields?.items}
          features={features}
          watermark={watermark}
          featureCategory={fields.featureCategory?.value}
          scrollDirection={scrollDirection}
          isDarkMode={isDarkMode}
        />
      </Media>
      <Media greaterThanOrEqual="smallDesktop">
        {params?.contentAlignment === 'Center' ? (
          <Vertical
            sections={fields?.items}
            features={features}
            featureCategory={fields.featureCategory?.value}
            scrollDirection={scrollDirection}
            isDesktop
            isDarkMode={isDarkMode}
          />
        ) : (
          <Horizontal
            sections={fields?.items}
            features={features}
            watermark={watermark}
            featureCategory={fields.featureCategory?.value}
            scrollDirection={scrollDirection}
            alignment={params?.contentAlignment?.toLowerCase()}
          />
        )}
      </Media>
    </Box>
  ) : null;
};

export default withSitecoreContext()(Parallax);
