import React, { useState, useRef, useEffect } from 'react';
import { Box, Fade, Slide, H3, Copy } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { InView } from 'react-intersection-observer';
import usePrevious from '../../utils/hooks/usePrevious';
import ModalButton from './ModalButton';
import Watermark from './Watermark';
import SectionImages from './SectionImages';
import Modal from './Modal';
import { stripMarkdownHeading } from '../../utils/markdown';

const threshold = 0.5;
const duration = '0.15s';

const getFadeProps = (inView, intersectionRatio, scrollDirection) => {
  // exiting
  if (intersectionRatio > 0 && intersectionRatio < threshold) {
    return {
      initialOpacity: 1,
      direction: 'out',
    };
  }

  // entering
  return {
    shouldAnimate: inView || intersectionRatio >= threshold,
    initialOpacity: 0,
    direction: 'in',
    // delay fade in when scrolling up, so the other feature's
    // slide and fade out can finish first.
    delay: scrollDirection === 'up' ? duration : '0s',
  };
};

const getSlideProps = (inView, intersectionRatio, scrollDirection) => {
  // exiting
  if (intersectionRatio > 0 && intersectionRatio < threshold) {
    return {
      direction: scrollDirection === 'down' ? 'up' : 'down',
      slideIn: scrollDirection === 'down',
    };
  }

  // entering
  return {
    shouldAnimate: inView || intersectionRatio >= threshold,
    direction: 'up',
    slideIn: inView,
  };
};

const Vertical = ({ sections, features, watermark, featureCategory, scrollDirection, isDesktop, isDarkMode }) => {
  const positionTop = '90px';
  const [watermarkFadeDirection, setWatermarkFadeDirection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [state, setState] = useState({
    activeFeature: 0,
    activeSection: 0,
  });
  const previousActiveSection = usePrevious(state.activeSection);

  const hasContentAbove = useRef();
  const boxRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !boxRef.current) return;

    const distanceFromTop = window.pageYOffset + boxRef.current.getBoundingClientRect().top;
    if (distanceFromTop > window.innerHeight) {
      hasContentAbove.current = true;
    }
  }, []);

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
    <InView
      onChange={inView => {
        setShowImages(inView);
      }}
    >
      <Box
        my={hasContentAbove.current && !isDesktop ? '100vh' : null}
        mb={hasContentAbove.current && !isDesktop ? null : '200vh'}
        ref={boxRef}
        height={`calc(${features.length} * 150vh)`}
        position="sticky"
        style={{ pointerEvents: showImages ? 'all' : 'none' }}
        backgroundColor={isDarkMode ? 'black' : 'default'}
      >
        {watermark && showImages && (
          <Watermark
            image={watermark?.value}
            fadeDirection={watermarkFadeDirection}
            positionTop={positionTop}
            position={!isDesktop && 'fixed'}
          />
        )}
        <Fade initialOpacity={showImages ? 0 : 1} direction={showImages ? 'in' : ' out'} duration="0.1s">
          <SectionImages
            sections={sections}
            features={features}
            activeFeature={state.activeFeature}
            activeSection={state.activeSection}
            previousActiveSection={previousActiveSection}
            position="fixed"
            positionTop={watermark ? '144px' : positionTop}
            height={['40vh', '50vh']}
            maxWidth={['auto', '1248px']}
            mx="auto"
          />
        </Fade>
        {features.map((feature, i) => {
          const hasModal = feature.fields?.ctaLink?.value?.text;

          return (
            <InView
              key={i.toString()}
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
              {({ inView, ref, entry }) => {
                const fadeProps = getFadeProps(inView, entry?.intersectionRatio, scrollDirection);
                const slideProps = getSlideProps(inView, entry?.intersectionRatio, scrollDirection);

                return (
                  <Box height={['370px', '50vh']} ref={ref} mb="100vh">
                    <Fade
                      duration={duration}
                      position="fixed"
                      top={['60vh', `calc(55vh + ${positionTop})`]}
                      maxWidth={['auto', '1248px']}
                      style={{ pointerEvents: showImages && i === state.activeFeature ? 'all' : 'none' }}
                      width="100%"
                      px="default"
                      backgroundColor={isDarkMode ? 'black' : 'white'}
                      pt="s"
                      {...fadeProps}
                    >
                      <Slide
                        duration={duration}
                        distance="100%"
                        maxWidth={['auto', '824px']}
                        mx="auto"
                        textAlign={['left', 'center']}
                        backgroundColor={isDarkMode ? 'black' : 'default'}
                        {...slideProps}
                      >
                        <H3 mb="s" color={isDarkMode ? 'white' : 'default'}>
                          {compiler(stripMarkdownHeading(feature.fields?.name?.value))}
                        </H3>
                        <Copy
                          fontSize={['14px', '16px']}
                          lineHeight={['22px', '26px']}
                          mb="m"
                          color={isDarkMode ? 'white' : 'default'}
                        >
                          {compiler(stripMarkdownHeading(feature.fields?.description?.value))}
                        </Copy>
                        {hasModal && (
                          <>
                            <ModalButton
                              icon={feature.fields?.ctaIcon?.fields?.value?.value}
                              data-gtm-title={feature.fields?.gtmTitle?.value}
                              onClick={() => {
                                setIsModalOpen(true);
                              }}
                              isDarkMode={isDarkMode}
                            >
                              {feature.fields?.ctaLink?.value?.text}
                            </ModalButton>
                            {isModalOpen && inView && (
                              <Modal
                                image={feature.fields?.overlayImage?.value}
                                featureCategory={compiler(stripMarkdownHeading(featureCategory))}
                                title={compiler(stripMarkdownHeading(feature.fields?.name?.value))}
                                copy={feature.fields?.overlayCopy?.value}
                                isOpen={isModalOpen}
                                setIsOpen={setIsModalOpen}
                                closeBtnStyling="circularWhite"
                                isDarkMode={isDarkMode}
                              />
                            )}
                          </>
                        )}
                      </Slide>
                    </Fade>
                  </Box>
                );
              }}
            </InView>
          );
        })}
      </Box>
    </InView>
  );
};

export default Vertical;
