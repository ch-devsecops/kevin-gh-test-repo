import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Fade, useCarouselControl, CarouselContent, HeroNavBar } from '@honda-canada/design-system-react';
import { getVideoProps, mapGTMCategory } from '../../utils/sitecoreFields';
import { wrapJSSFields } from '../../utils/wrapJSSFields';

import getSlides from './getSlides';
import { stripMarkdownHeading, styledCompiler } from '../../utils/markdown';
import CarouselHeroPropTypes from './ICarouselHero';

const CarouselHero = ({ fields, rendering }) => {
  const { t } = useTranslation();
  const items = fields?.items;
  const gtmCategory = fields?.gtmCategory;
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const containerGtmTags = {
    category: mapGTMCategory(gtmCategory),
    type: rendering?.componentName,
  };
  const slides = items
    ? getSlides({
        items,
        shouldAnimate,
        containerGtmTags,
      })
    : [];

  const { prevSlide, nextSlide, setCurrentSlide, currentSlide, prevSlideIndex, nextSlideIndex, bindDrag, carouselId } =
    useCarouselControl(slides?.length);

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  if (items?.length === 0 || !items) {
    return null;
  }
  const firstSlide = items?.length > 0 ? wrapJSSFields(items[0]?.fields) : null;
  const navBarAnimationDelay = firstSlide?.ctaUrl?.value?.href ? '2.5s' : '2s';

  const slideNav = items?.map(item => {
    const { thumbnailTitle, thumbnailImage, title, videoUrl } = wrapJSSFields(item?.fields);
    return {
      id: item.id,
      heading: styledCompiler(stripMarkdownHeading(thumbnailTitle?.value ? thumbnailTitle?.value : title?.value)),
      video: getVideoProps(videoUrl?.value?.href, videoUrl?.value?.title, 'close video modal', videoUrl?.value?.text),
      ariaLabel: thumbnailImage?.getProp('alt'),
      thumbnailImageSource: thumbnailImage?.getProp('src'),
    };
  });

  return (
    <div data-gtm-category={containerGtmTags?.category} data-gtm-component-type={containerGtmTags?.type}>
      {slides.length > 0 && (
        <>
          <CarouselContent
            items={slides}
            currentSlide={currentSlide}
            bindDrag={bindDrag}
            carouselId={carouselId}
            height={['416px', '710px']}
          />
          {typeof window !== 'undefined' && (
            <Fade delay={navBarAnimationDelay} initialOpacity={0}>
              <HeroNavBar
                items={slideNav}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                setCurrentSlide={index => {
                  setCurrentSlide(index);
                  setShouldAnimate(false);
                }}
                currentSlide={currentSlide}
                prevSlideIndex={prevSlideIndex}
                nextSlideIndex={nextSlideIndex}
                carouselId={carouselId}
                globalAriaLabels={{
                  nextSlide: t('Shared.Common.nextSlideAria'),
                  previousSlide: t('Shared.Common.previousSlideAria'),
                  play: t('Shared.Common.playVideoAria'),
                }}
              />
            </Fade>
          )}
        </>
      )}
    </div>
  );
};

CarouselHero.propTypes = CarouselHeroPropTypes;

export default CarouselHero;
