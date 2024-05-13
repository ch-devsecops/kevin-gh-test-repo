import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Icon, IconWrapper, Fade, Slide, useMediaQueries } from '@honda-canada/design-system-react';
import GalleryTabs from '../GalleryTabs';
import GalleryCarousel from '../GalleryCarousel';
import { ControlPanel, PanelContainer } from './Panels';
import themeStyles from '../Gallery.styles';
import {
  reducer,
  SHOW_CONTENT,
  SHOW_CONTROLS,
  SHOW_THUMBNAILS,
  RESET_STATE,
  ENABLE_ANIMATIONS,
  ENABLE_EVENTS,
} from './reducer';

const CloseButton = themeStyles.apply(IconWrapper, 'CloseButton');
const FullScreenContainer = themeStyles.apply(Box, 'FullScreenContainer');
const SlideContainer = themeStyles.apply(Box, 'SlideContainer');

const initialState = {
  showThumbnails: false,
  showContent: false,
  showControls: false,
  shouldAnimate: false,
  enableEvents: false,
};

// TODO: functional ui tests!
const FullScreenMode = ({
  isOpen,
  onClose,
  images,
  controls,
  content,
  strings,
  thumbnails,
  thumbnailControls,
  isDark,
  tabs,
  setActiveTab,
  activeTab,
  isFullScreenMobile,
}) => {
  const [touchEnabled, setTouchEnabled] = useState(false); // state for touch points

  const [state, dispatch] = useReducer(reducer, initialState);
  const { showControls, showContent, showThumbnails, shouldAnimate, enableEvents } = state;

  const { isDesktop, isSmallDesktop, isMobile } = useMediaQueries();
  const isDarkDesktop = isDark && !isMobile;
  const responsiveImages = images.map((imageComponent, index) => (
    <SlideContainer key={index}>{imageComponent}</SlideContainer>
  ));

  useEffect(() => {
    if (navigator?.maxTouchPoints > 0 || !isDesktop) {
      setTouchEnabled(true);
    }
  }, []);

  useEffect(() => {
    // after initial load
    // enable event listening to make sure all element reference are not undefined
    if (isOpen) {
      dispatch({ type: ENABLE_EVENTS, payload: true });
    } else {
      dispatch({ type: ENABLE_EVENTS, payload: false });
      dispatch({ type: ENABLE_ANIMATIONS, payload: false });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isDesktop || isSmallDesktop) {
      let timer;

      const arrowRight = document.getElementById('gallery-fullscreen-right');
      const arrowLeft = document.getElementById('gallery-fullscreen-left');
      const fullScreenContainer = document.getElementById(`${controls.carouselId}-fullscreen`);

      const handleClick = () => {
        clearTimeout(timer);
        // hide controls after 2 secs of click inactivity in the target element
        timer = setTimeout(() => {
          dispatch({ type: SHOW_CONTROLS, payload: false });
        }, 2000);
      };

      const handleMouseMove = () => {
        clearTimeout(timer);
        // show controls on mouse move
        dispatch({ type: SHOW_CONTROLS, payload: true });
        if (!shouldAnimate) dispatch({ type: ENABLE_ANIMATIONS, payload: true });

        // hide controls after 2 secs of mouse inactivity in the target element
        timer = setTimeout(() => {
          dispatch({ type: SHOW_CONTROLS, payload: false });
        }, 2000);
      };

      if (enableEvents && fullScreenContainer) {
        clearTimeout(timer);
        // on initial load, wait for 1/2 sec before listening to mouse move
        if (!shouldAnimate) {
          setTimeout(() => {
            fullScreenContainer.addEventListener('mousemove', handleMouseMove);
          }, 500);
        } else {
          fullScreenContainer.addEventListener('mousemove', handleMouseMove);
        }

        arrowRight.addEventListener('click', handleClick);
        arrowLeft.addEventListener('click', handleClick);
      }

      if (!enableEvents && fullScreenContainer) {
        clearTimeout(timer);
        arrowRight.removeEventListener('click', handleClick);
        arrowLeft.removeEventListener('click', handleClick);
        fullScreenContainer.removeEventListener('mousemove', handleMouseMove);
      }

      return () => {
        clearTimeout(timer);
        if (fullScreenContainer) {
          fullScreenContainer.removeEventListener('mousemove', handleMouseMove);
          arrowRight.removeEventListener('click', handleClick);
          arrowLeft.removeEventListener('click', handleClick);
        }
      };
    }
  }, [enableEvents]);

  useEffect(() => {
    if (touchEnabled) {
      const fullScreenContainer = document.getElementById(`${controls.carouselId}-fullscreen`);

      let touchStart;

      const handleTouchStart = e => {
        touchStart = e.touches[0].clientX;
        e.preventDefault(); // prevents component to trigger mouse events when screen is touched
      };

      const handleTouchEnd = e => {
        const touchEnd = e.changedTouches[0].clientX;
        const touches = Math.abs(touchStart - touchEnd);

        if (touches < 5) {
          dispatch({ type: SHOW_CONTROLS, payload: !showControls });
          if (!shouldAnimate) dispatch({ type: ENABLE_ANIMATIONS, payload: true });
        } else {
          dispatch({ type: SHOW_CONTROLS, payload: false });
        }
      };

      if (fullScreenContainer) {
        fullScreenContainer.addEventListener('touchend', handleTouchEnd);
        fullScreenContainer.addEventListener('touchstart', handleTouchStart);
      }

      if (!enableEvents && fullScreenContainer) {
        fullScreenContainer.removeEventListener('touchstart', handleTouchStart);
        fullScreenContainer.removeEventListener('touchend', handleTouchEnd);
      }

      return () => {
        if (fullScreenContainer) {
          fullScreenContainer.removeEventListener('touchstart', handleTouchStart);
          fullScreenContainer.removeEventListener('touchend', handleTouchEnd);
        }
      };
    }
  }, [enableEvents, showControls]);

  return (
    <Modal
      isOpen={isOpen}
      closeBtnStyling="circularWhite"
      styling="fullOverlay"
      closeModal={onClose}
      ariaLabel={strings.galleryModalAria}
      closeAriaLabel={strings.exitModalAria}
      scrollElement="hidden"
    >
      {({ closeModal }) => (
        <Fade duration="t5">
          <FullScreenContainer height="100vh">
            <Fade
              shouldAnimate={shouldAnimate}
              duration="t5"
              initialOpacity={!shouldAnimate || showControls ? 0 : 1}
              direction={showControls ? 'in' : 'out'}
              position="fixed"
              top={['s', 's', 'l']}
              right={['s', 's', 'l']}
              zIndex={2}
            >
              <CloseButton
                as="button"
                onClick={() => {
                  closeModal();
                  dispatch({ type: RESET_STATE });
                }}
                aria-label={strings.exitModalAria}
                disabled={!showControls}
              >
                <Icon name="close" />
              </CloseButton>
            </Fade>

            <GalleryCarousel
              slides={responsiveImages}
              controls={controls}
              strings={strings}
              showControls={showControls}
              shouldAnimate={shouldAnimate}
              maxHeight="100%"
              height="100%"
              isDark={isDark}
              inFullScreen
            />

            <Slide
              shouldAnimate={showControls}
              distance="71px"
              slideIn={showControls}
              duration="t5"
              overflow={!showControls ? 'hidden' : 'initial'}
              position="absolute"
              bottom={0}
              left={0}
              width="100%"
              zIndex={!showControls ? -1 : 0}
            >
              <ControlPanel
                isDark={isDarkDesktop}
                strings={strings}
                toggleContent={() => dispatch({ type: SHOW_CONTENT, payload: true })}
                toggleThumbnails={() => dispatch({ type: SHOW_THUMBNAILS, payload: true })}
              />
            </Slide>

            <Fade
              shouldAnimate={showContent}
              duration="t5"
              position="absolute"
              bottom={0}
              left={0}
              width="100%"
              zIndex={!showContent ? -1 : 0}
            >
              <PanelContainer
                closeAriaLabel={strings.hideAria}
                label={strings.hideLabel}
                onClose={() => dispatch({ type: SHOW_CONTENT, payload: false })}
                isDark={!isMobile && isDark}
              >
                <Box p={['m', 'm', 'zero']}>
                  {content?.title && (
                    <Box mt={['zero', 'zero', 's']} mb="s">
                      {content.title}
                    </Box>
                  )}
                  {content?.bodyText && <Box maxWidth="1060px">{content.bodyText}</Box>}
                  {content?.ctas && <Box mt={['m', 'l']}>{content.ctas}</Box>}
                </Box>
              </PanelContainer>
            </Fade>

            <Fade
              shouldAnimate={showThumbnails}
              duration="t5"
              position="absolute"
              bottom={0}
              left={0}
              width="100%"
              zIndex={!showThumbnails ? -1 : 0}
            >
              <PanelContainer
                closeAriaLabel={strings.hideAria}
                label={strings.hideLabel}
                isDark={isDarkDesktop}
                onClose={() => dispatch({ type: SHOW_THUMBNAILS, payload: false })}
              >
                <Box ml={['m', 'm', 'zero']}>
                  <GalleryTabs
                    tabs={tabs}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                    isDark={isDark}
                    isFullScreenMobile={isFullScreenMobile}
                  />
                </Box>
                {thumbnails}
                {thumbnailControls}
              </PanelContainer>
            </Fade>
          </FullScreenContainer>
        </Fade>
      )}
    </Modal>
  );
};

FullScreenMode.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.element),
  controls: PropTypes.shape(),
  content: PropTypes.shape({
    title: PropTypes.element,
    bodyText: PropTypes.element,
    ctas: PropTypes.element,
  }),
  strings: PropTypes.shape(),
  thumbnails: PropTypes.element,
  thumbnailControls: PropTypes.element,
  isDark: PropTypes.bool,
};

export default FullScreenMode;
