import { useEffect, useState } from 'react';

export const useDesktopTransitionState = ({
  isMobile,
  sliderRef,
  desktopPaginationRef,
  desktopPaginationOffsetTop,
}) => {
  const [showDesktopSlider, setShowDesktopSlider] = useState(false);
  const [isPaginationSticky, setIsPaginationSticky] = useState(false);
  const [shouldCTAsFade, setShouldCTAsFade] = useState(false);
  const [shouldPriceFade, setShouldPriceFade] = useState(false);
  const [shouldAnimateImage, setShouldAnimateImage] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isMobile && sliderRef?.current && desktopPaginationRef?.current) {
      const handleDesktopScroll = () => {
        const paginationTop = desktopPaginationRef.current.getBoundingClientRect().top;
        const sliderBottom = sliderRef.current.getBoundingClientRect().bottom;
        const trimAccordion = document.querySelector('.trim-specifications-accordion');
        const accordionBottom = trimAccordion?.getBoundingClientRect().bottom;

        const inImagePosition = sliderBottom - paginationTop > 70;
        if (inImagePosition && !shouldAnimateImage) {
          setShouldAnimateImage(true);
        } else if (!inImagePosition && shouldAnimateImage) {
          setShouldAnimateImage(false);
        }

        const inPricePosition = sliderBottom - paginationTop > 175;
        if (inPricePosition && !shouldPriceFade) {
          setShouldPriceFade(true);
        } else if (!inPricePosition && shouldPriceFade) {
          setShouldPriceFade(false);
        }

        const inCTAPosition = sliderBottom - paginationTop > 15;
        if (inCTAPosition && !shouldCTAsFade) {
          setShouldCTAsFade(true);
        } else if (!inCTAPosition && shouldCTAsFade) {
          setShouldCTAsFade(false);
        }

        const isAccordionOut = accordionBottom <= 80;
        const isPaginationFixed = paginationTop <= 205;
        if (!isAccordionOut && isPaginationFixed && !showDesktopSlider) {
          setShowDesktopSlider(true);
        } else if ((isAccordionOut || !isPaginationFixed) && showDesktopSlider) {
          setShowDesktopSlider(false);
        }

        const isPaginationInStickyPosition = paginationTop <= desktopPaginationOffsetTop;
        if (isPaginationInStickyPosition && !isPaginationSticky) {
          setIsPaginationSticky(true);
        } else if (!isPaginationInStickyPosition && isPaginationSticky) {
          setIsPaginationSticky(false);
        }
      };

      handleDesktopScroll();
      window.addEventListener('scroll', handleDesktopScroll);

      return () => {
        window.removeEventListener('scroll', handleDesktopScroll);
      };
    }

    return () => {};
  }, [
    isPaginationSticky,
    desktopPaginationOffsetTop,
    shouldAnimateImage,
    shouldCTAsFade,
    shouldPriceFade,
    showDesktopSlider,
    isMobile,
    sliderRef,
    desktopPaginationRef,
  ]);

  return {
    showDesktopSlider,
    isPaginationSticky,
    shouldCTAsFade,
    shouldPriceFade,
    shouldAnimateImage,
  };
};

export const useMobileTransitionState = ({ isMobile, sliderRef, trimsRef }) => {
  const [shouldMobilePriceFade, setShouldMobilePriceFade] = useState(false);
  const [showMobileSlider, setShowMobileSlider] = useState(false);
  const [showFooterPagination, setShowFooterPagination] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && isMobile && sliderRef?.current && trimsRef?.current) {
      const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
      const handleMobileScroll = () => {
        // Refresh splide on initial scroll. Helps Safari with splide transforms.
        if (isSafari && window.scrollY < 190) {
          trimsRef.current.splide.refresh();
        }

        const trimAccordion = document.querySelector('.trim-specifications-accordion');
        const accordionTop = trimAccordion?.getBoundingClientRect().top;
        const accordionBottom = trimAccordion?.getBoundingClientRect().bottom;

        const priceInFadePosition = accordionTop < 190;
        if (priceInFadePosition && !shouldMobilePriceFade) {
          setShouldMobilePriceFade(true);
        } else if (!priceInFadePosition && shouldMobilePriceFade) {
          setShouldMobilePriceFade(false);
        }

        const isAccordionOut = accordionBottom <= 90;
        const isAccordionInHeaderPosition = accordionTop < 110;
        if (!isAccordionOut && isAccordionInHeaderPosition && !showMobileSlider) {
          setShowMobileSlider(true);
        } else if ((isAccordionOut || !isAccordionInHeaderPosition) && showMobileSlider) {
          setShowMobileSlider(false);
        }

        if (isAccordionOut && showFooterPagination) {
          setShowFooterPagination(false);
        } else if (!isAccordionOut && !showFooterPagination) {
          setShowFooterPagination(true);
        }
      };

      handleMobileScroll();
      window.addEventListener('scroll', handleMobileScroll);

      return () => {
        window.removeEventListener('scroll', handleMobileScroll);
      };
    }

    return () => {};
  }, [isMobile, shouldMobilePriceFade, showMobileSlider, sliderRef, trimsRef, showFooterPagination]);

  return {
    shouldMobilePriceFade,
    showMobileSlider,
    showFooterPagination,
  };
};
