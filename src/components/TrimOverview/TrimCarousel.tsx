import React, { useEffect, useState } from 'react';
import { Image, Carousel, Optional, Box, useCarouselControl } from '@honda-canada/design-system-react';
import useTrimCarouselImages from './service/useTrimCarouselImages';
import ImageNotFound from '../UniCard/shared/ImageNotFound';
import type { assetTypeState, TrimCarouselImagesData, TrimCarouselProps, TrimImage } from './types';
import TrimToggle, { EXTERIOR } from './TrimToggle';
import themeStyles from './TrimOverview.styles';
import useModelDetails from './service/useModelDetails';

const StyledTrimCarousel = themeStyles.apply(Box, 'StyledTrimCarousel');
const TrimToggleContent = themeStyles.apply(Box, 'TrimToggleContent');

const TrimCarousel = ({ transmissionKey, models }: TrimCarouselProps) => {
  const [images, setImages] = useState<TrimImage[]>([]);
  const [savedExteriorPage, setSavedExteriorPage] = useState(0);
  const [savedInteriorPage, setSavedInteriorPage] = useState(0);

  const [selectedType, setSelectedType] = useState(EXTERIOR);

  const { transmission } = useModelDetails(transmissionKey, models);

  const { exteriorImagesData, interiorImagesData } = useTrimCarouselImages(transmission?.id) as TrimCarouselImagesData;

  const behavior = useCarouselControl(images?.length);
  const { currentSlide, setCurrentSlide } = behavior;

  useEffect(() => {
    if (selectedType === EXTERIOR && exteriorImagesData?.length) {
      setSavedInteriorPage(currentSlide);
      setCurrentSlide(savedExteriorPage);
      setImages(exteriorImagesData);
    } else {
      setSavedExteriorPage(currentSlide);
      setCurrentSlide(savedInteriorPage);
      setImages(interiorImagesData);
    }
  }, [selectedType, exteriorImagesData, interiorImagesData]);

  const generateImagesArray = (imagesDataArray: TrimImage[]) => {
    const result = imagesDataArray?.map(imageData => {
      if (imageData?.fields?.src) {
        return (
          <Image
            key={imageData.id}
            src={imageData?.fields?.src}
            alt={imageData.fields?.Alt?.value}
            data-testid="cy-trim-carousel-image"
          />
        );
      }
      return <ImageNotFound key={imageData.id} altTextContent="Image is not available" />;
    });

    return result || [];
  };

  const onAssetTypeChange = (type: assetTypeState) => setSelectedType(type);

  if (!exteriorImagesData?.length && !interiorImagesData?.length)
    return <ImageNotFound altTextContent="Image is not available" />;

  return (
    <StyledTrimCarousel isPaginationVisible={images?.length > 1}>
      <Optional when={exteriorImagesData?.length && interiorImagesData?.length}>
        <TrimToggleContent>
          <TrimToggle onAssetTypeChange={onAssetTypeChange} />
        </TrimToggleContent>
      </Optional>
      <Carousel items={generateImagesArray(images)} equalHeight gridBase={14} behavior={behavior} />
    </StyledTrimCarousel>
  );
};

export default TrimCarousel;
