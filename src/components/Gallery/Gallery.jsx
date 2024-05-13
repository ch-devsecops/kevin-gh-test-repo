import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Icon,
  IconWrapper,
  useCarouselControl,
  useMediaQueries,
  Wrapper,
} from '@honda-canada/design-system-react';
import GalleryCarousel from './GalleryCarousel';
import GalleryTabs from './GalleryTabs';
import Thumbnails from './Thumbnails';
import ThumbnailControls from './ThumbnailControls';
import FullScreenMode from './FullScreenMode/FullScreenMode';
import themeStyles from './Gallery.styles';
import { getGtmTagValue } from '../../utils/gtmEvents';

const FullScreenButton = themeStyles.apply(IconWrapper, 'FullScreenButton');

const Gallery = ({ gallery = [], strings = {}, gtmTags = {}, isDark, isShort, ...otherProps }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const activeGallery = gallery[activeCategoryIndex]?.images; // images + content
  const activeImages = activeGallery?.map(item => item.image); // get only the images

  const { isDesktop, isMobile } = useMediaQueries();
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [currentPage, setPage] = useState(1); // thumbnail state
  const carouselControls = useCarouselControl(activeImages?.length, false);
  const isFullScreenMobile = fullScreenMode && isMobile;
  const { currentSlide, setCurrentSlide } = carouselControls;
  const activeContent = activeGallery[currentSlide]?.content;

  const thumbnailsNum = isDesktop ? 6 : 4;
  const thumbnailPages = Math.ceil(activeImages.length / thumbnailsNum) || 0;
  const thumbnailsId = `thumbnails-${thumbnailPages}`;
  const tabs =
    gallery?.map(category => ({
      title: gallery.length === 1 ? gallery[0].title : category.title,
      gtmTitle: gallery.length === 1 ? gallery[0].gtmTitle : category.gtmTitle,
      modelName: gtmTags.modelName,
      bodyStyle: gtmTags.bodyType,
      interactionType: 'gallery - image filter',
    })) || [];

  useEffect(() => {
    // when switching category, if current image is not found, reset current image
    if (currentSlide > activeImages.length - 1) {
      setCurrentSlide(0);
    }
  }, [activeCategoryIndex, activeImages.length]);

  useEffect(() => {
    // when switching category, if thumbnail page is not found, reset thumbnail page
    if (currentPage > thumbnailPages) setPage(1);
  }, [currentPage, thumbnailPages]);

  useEffect(() => {
    // when active carousel slide changes, check if it is within range of active thumbnail page
    const max = currentPage * thumbnailsNum;
    const min = max - thumbnailsNum + 1;

    const activeSlide = currentSlide + 1;
    const withinRange = activeSlide <= max && activeSlide >= min;

    if (!withinRange) {
      const updatedThumbnailPage = Math.ceil((currentSlide + 1) / thumbnailsNum);
      setPage(updatedThumbnailPage);
    }
  }, [currentSlide]);

  const GalleryTabsComponent = (
    <GalleryTabs
      tabs={tabs}
      setActiveTab={setActiveCategoryIndex}
      activeTab={activeCategoryIndex}
      isDark={isDark}
      isFullScreenMobile={isFullScreenMobile}
    />
  );

  const ThumbnailsComponent = (
    <Thumbnails
      images={activeImages}
      setActiveImageIndex={setCurrentSlide}
      activeImageIndex={currentSlide}
      currentPage={currentPage}
      thumbnailPages={thumbnailPages}
      id={thumbnailsId}
      isDark={isDark}
      isFullScreenMobile={isFullScreenMobile}
    />
  );

  const ThumbnailControlsComponent = (
    <ThumbnailControls
      pages={thumbnailPages}
      currentPage={currentPage}
      setPage={setPage}
      controlId={thumbnailsId}
      strings={strings}
      isDark={isDark}
      isFullScreenMobile={isFullScreenMobile}
    />
  );

  return (
    <Wrapper
      data-gtm-category={getGtmTagValue(gtmTags?.category)}
      data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
      px="0 !important"
      {...otherProps}
      backgroundColor={isDark ? 'black' : 'white'}
    >
      {GalleryTabsComponent}
      <Box position="relative" height={isShort ? null : '100%'}>
        <FullScreenButton
          as="button"
          onClick={() => setFullScreenMode(true)}
          aria-label={strings.fullscreenModeAria}
          backgroundColor={isDark ? 'black' : 'white'}
        >
          <Icon name="expand" color={isDark ? 'white' : 'black'} />
        </FullScreenButton>
        <GalleryCarousel
          slides={activeImages}
          setFullScreenMode={setFullScreenMode}
          controls={carouselControls}
          gtmTags={{
            modelName: gtmTags.modelName,
            bodyStyle: gtmTags.bodyType,
            title: tabs[activeCategoryIndex]?.gtmTitle,
          }}
          strings={strings}
          height={['180px', '432px', '702px']}
          mobileLandscapeHt="280px"
          isDark={isDark}
          isShort={isShort}
        />
      </Box>

      {ThumbnailsComponent}
      {ThumbnailControlsComponent}

      <FullScreenMode
        onClose={() => setFullScreenMode(false)}
        isOpen={fullScreenMode}
        images={activeImages}
        content={activeContent}
        setActiveImageIndex={setCurrentSlide}
        controls={carouselControls}
        strings={strings}
        thumbnails={ThumbnailsComponent}
        thumbnailControls={ThumbnailControlsComponent}
        isDark={isDark}
        tabs={tabs}
        setActiveTab={setActiveCategoryIndex}
        activeTab={activeCategoryIndex}
        isFullScreenMobile={isFullScreenMobile}
      />
    </Wrapper>
  );
};

Gallery.propTypes = {
  /**
   * images and content
   */
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.element,
      content: PropTypes.shape({
        title: PropTypes.element,
        bodyText: PropTypes.element,
        ctas: PropTypes.element,
      }),
    }),
  ),
  /**
   * labels and aria labels
   */
  strings: PropTypes.shape({
    galleryModalAria: PropTypes.string,
    exitModalAria: PropTypes.string,
    fullscreenModeAria: PropTypes.string,
    nextImageAria: PropTypes.string,
    prevImageAria: PropTypes.string,
    nextThumbnailPageAria: PropTypes.string,
    prevThumbnailPageAria: PropTypes.string,
    hideAria: PropTypes.string,
    hideLabel: PropTypes.string,
    mobileLandscapeInfoLabel: PropTypes.string,
    learnMoreLabel: PropTypes.string,
    learnMoreAria: PropTypes.string,
    viewAllImagesLabel: PropTypes.string,
    viewAllImagesAria: PropTypes.string,
  }),
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    modelName: PropTypes.string,
    bodyType: PropTypes.string,
  }),
  isDark: PropTypes.bool,
  isShort: PropTypes.bool,
};

export default Gallery;
