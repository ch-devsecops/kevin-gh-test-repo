import React, { useState, useEffect } from 'react';
import { Box, Row, Column } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import usePrevious from '../../utils/hooks/usePrevious';
import Watermark from './Watermark';
import Feature from './HorizontalFeature';
import SectionImages from './SectionImages';

const threshold = 0.5;

const Horizontal = ({ sections, features, watermark, featureCategory, scrollDirection, alignment }) => {
  const positionTop = ['90px', '165px'];
  const [watermarkFadeDirection, setWatermarkFadeDirection] = useState(null);
  const [state, setState] = useState({
    activeFeature: 0,
    activeSection: 0,
  });
  const previousActiveSection = usePrevious(state.activeSection);

  const handleWatermarkFade = (i, direction) => {
    if (i === 1 && direction === 'down') {
      setWatermarkFadeDirection('out');
    } else if (i === 0 && direction === 'up') {
      setWatermarkFadeDirection('in');
    }
  };

  useEffect(() => {
    handleWatermarkFade(state.activeFeature, scrollDirection);
  }, [state.activeFeature, scrollDirection]);

  return (
    <Box mx="auto" maxWidth="1248px" mb="huge">
      <Watermark image={watermark?.value} fadeDirection={watermarkFadeDirection} positionTop={positionTop} />
      <Row>
        <Column width={[1 / 2]} height={`${features.length * 160}vh`} order={alignment === 'right' ? 1 : 0}>
          <SectionImages
            sections={sections}
            features={features}
            activeFeature={state.activeFeature}
            activeSection={state.activeSection}
            previousActiveSection={previousActiveSection}
            positionTop="280px"
          />
        </Column>
        <Column width={[1 / 2]} order={alignment === 'right' ? 0 : 1}>
          {features.map((feature, i) => (
            <React.Fragment key={i.toString()}>
              <InView
                threshold={threshold}
                onChange={inView => {
                  if (!inView) return;

                  const newFeature = scrollDirection === 'up' && i === 0 ? 0 : i;

                  setState({
                    activeSection: features[newFeature].section,
                    activeFeature: newFeature,
                  });
                }}
              >
                <Box maxWidth="400px" mx="auto">
                  <Feature
                    name={feature.fields?.name?.value}
                    description={feature.fields?.description?.value}
                    cta={feature.fields?.ctaLink?.value}
                    ctaIcon={feature.fields?.ctaIcon?.fields?.value?.value}
                    gtmTitle={feature.fields?.gtmTitle?.value}
                    overlayImage={feature.fields?.overlayImage?.value}
                    overlayCopy={feature.fields?.overlayCopy?.value}
                    scrollDirection={scrollDirection}
                    isFirst={i === 0}
                    featureCategory={featureCategory}
                  />
                </Box>
              </InView>
            </React.Fragment>
          ))}
        </Column>
      </Row>
    </Box>
  );
};

export default Horizontal;
