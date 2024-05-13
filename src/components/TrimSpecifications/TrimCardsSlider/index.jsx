import React, { useRef, useEffect, useState, useContext } from 'react';
import { Row, Media, Column, Box, Copy as DsrCopy, Icon as DsrIcon, Optional } from '@honda-canada/design-system-react';
import MobilePagination from './MobilePagination';
import Slides from './Slides';
import DesktopSlider from './DesktopSlider';
import DesktopPagination from './DesktopPagination';
import MobileSlider from './MobileSlider';
import { ModelExplorationContext } from '../../ModelExplorationContext';

import Context from '../service/Context';
import { useDesktopTransitionState, useMobileTransitionState } from './hooks';
import themeStyles from './TrimCardsSlider.styles';
import { getGtmTagValue, gtmSpecificationsDownload } from '../../../utils/gtmEvents';
import getSpecificationsPDFFileName, { getTrimDetailsName, isDownloadCtaValid } from './utils';

const DownloadCTA = themeStyles.apply(Box, 'DownloadCTA');
const Icon = themeStyles.apply(DsrIcon, 'Icon');
const Copy = themeStyles.apply(DsrCopy, 'Copy');
const SliderMobilePagination = themeStyles.apply(MobilePagination, 'MobilePagination');

const minSlideWidth = 207;

const TrimCardsSlider = ({ ctaLink, trims, specificationRefs, componentName }) => {
  const [isMounted, setIsMounted] = useState(false);
  const sliderRef = useRef();
  const desktopPaginationRef = useRef();
  const trimsDesktopTitleRef = useRef();
  const trimsRef = useRef();
  const [desktopPaginationHeight, setDesktopPaginationHeight] = useState(0);
  const [trimsDesktopHeight, setTrimsDesktopHeight] = useState(0);
  const [desktopPaginationOffsetTop, setDesktopPaginationOffsetTop] = useState(153);
  const [isChangingOffset, setIsChangingOffset] = useState(false);

  const modelExplorationContext = useContext(ModelExplorationContext) || {};

  const { navItems } = modelExplorationContext;
  const trimDetailsPath = navItems?.filter(item => item.name === 'trims');
  const trimDetailsBaseURL = getTrimDetailsName(trimDetailsPath);

  // if pagination is not available, use the margin bottom value
  const desktopPaginationOffsetHeight =
    desktopPaginationRef?.current?.children?.[0]?.offsetHeight || desktopPaginationRef?.current?.offsetHeight;
  const trimsDesktopTitleOffsetHeight = trimsDesktopTitleRef?.current?.slides?.[0]?.offsetHeight;

  const configurationProvider = useContext(Context);
  const { isDark, slidePerPage, setSlidePerPage, currentSlide, isMobile, showMobilePagination, hasBapURL } =
    configurationProvider || {};

  const { showDesktopSlider, isPaginationSticky, shouldCTAsFade, shouldAnimateImage } = useDesktopTransitionState({
    sliderRef,
    desktopPaginationRef,
    isMobile,
    desktopPaginationOffsetTop,
  });

  const { showMobileSlider, showFooterPagination } = useMobileTransitionState({
    isMobile,
    sliderRef,
    trimsRef,
  });
  const trimsLength = trims?.length;

  // Activate sliders on mount; prevents splide refs from updating
  // the current slide when there's a trim in the querystring.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (trimsRef?.current && isMounted) {
      trimsRef.current.splide.go(currentSlide);
      specificationRefs.current.forEach(specElem => {
        specElem.current.splide.go(currentSlide);
      });
    }

    if (trimsDesktopTitleRef?.current && isMounted) {
      trimsDesktopTitleRef.current.splide.go(currentSlide);
    }
  }, [currentSlide]);

  useEffect(() => {
    if (typeof window !== 'undefined' && trimsRef?.current && !isMobile) {
      const handleCardSize = () => {
        const trackWidth = trimsRef.current?.splideRef?.current.offsetWidth;

        if (trackWidth / slidePerPage < minSlideWidth) {
          setSlidePerPage(slidePerPage - 1);
        } else if (trackWidth / (slidePerPage + 1) > minSlideWidth && slidePerPage < trimsLength) {
          setSlidePerPage(slidePerPage + 1);
        }
      };

      handleCardSize();

      window.addEventListener('resize', handleCardSize);
      return () => window.removeEventListener('resize', handleCardSize);
    }

    return () => {};
  }, [isMobile, slidePerPage, setSlidePerPage, trimsLength]);

  useEffect(() => {
    if (trimsLength < slidePerPage && !isMobile) {
      setSlidePerPage(trimsLength);
    }
  }, [trimsLength]);

  // this useEffect changes the position of the pagination if the text of the trim names get to 2 lines or greater,
  // to ensure that no text is cutoff
  useEffect(() => {
    if (desktopPaginationOffsetHeight && trimsDesktopTitleOffsetHeight) {
      setIsChangingOffset(true);
      setDesktopPaginationHeight(
        desktopPaginationRef?.current?.children?.[0]?.offsetHeight || desktopPaginationRef?.current?.offsetHeight,
      );
      setTrimsDesktopHeight(trimsDesktopTitleRef?.current?.slides?.[0]?.offsetHeight);
      const desktopPaginationOffsetValue = Math.max(desktopPaginationHeight + trimsDesktopHeight, 153);
      setDesktopPaginationOffsetTop(desktopPaginationOffsetValue);
      const paginationTransition = setTimeout(() => {
        setIsChangingOffset(false);
      }, 1000);
      return () => clearTimeout(paginationTransition);
    }
  }, [desktopPaginationOffsetHeight, trimsDesktopTitleOffsetHeight]);

  const CTAgtmTags = {
    'data-gtm-interaction-type': 'cta: download',
    'data-gtm-title': 'specifications',
    src: getGtmTagValue(ctaLink?.href),
    'data-gtm-component-type': getGtmTagValue(componentName),
  };

  const DownloadCTAComponent = isDownloadCtaValid(ctaLink) ? (
    <DownloadCTA
      as="a"
      {...ctaLink?.item?.value}
      data-testid="cy-download-cta"
      {...CTAgtmTags}
      onClick={() => gtmSpecificationsDownload(getSpecificationsPDFFileName(ctaLink?.item?.value?.href))}
    >
      <Icon name="save" />
      <Copy>{ctaLink?.item?.value?.text}</Copy>
    </DownloadCTA>
  ) : null;

  return (
    <>
      {showDesktopSlider && (
        <DesktopSlider
          downloadCTA={DownloadCTAComponent}
          trimsTitleRef={trimsDesktopTitleRef}
          trims={trims}
          isPaginationSticky={isPaginationSticky}
        />
      )}

      {showMobileSlider && <MobileSlider trims={trims} showFooterPagination={showFooterPagination} />}

      <Slides
        downloadCTA={DownloadCTAComponent}
        trims={trims}
        shouldAnimateImage={shouldAnimateImage}
        shouldCTAsFade={shouldCTAsFade}
        sliderRef={sliderRef}
        trimsRef={trimsRef}
        isHidden={showDesktopSlider || showMobileSlider}
        hasBapURL={hasBapURL}
        componentName={componentName}
        trimDetailsBaseURL={trimDetailsBaseURL}
      />
      <Optional when={showMobilePagination}>
        <Media at="mobile">
          <SliderMobilePagination isDark={isDark} length={trimsLength} />
        </Media>
      </Optional>

      <Media greaterThan="mobile">
        {(mediaClassNames, renderChildren) =>
          renderChildren ? (
            <Row
              ref={desktopPaginationRef}
              position="sticky"
              top={desktopPaginationOffsetTop}
              pb="xl"
              className={mediaClassNames}
              backgroundColor={isDark ? 'black' : 'white'}
              zIndex="modal"
              transition={isChangingOffset ? 'top 1s' : 'none'}
            >
              <Column width={1 / 6} />
              <Column width={5 / 6} pl="zero">
                <DesktopPagination length={trimsLength} />
              </Column>
            </Row>
          ) : null
        }
      </Media>
    </>
  );
};

export default TrimCardsSlider;
