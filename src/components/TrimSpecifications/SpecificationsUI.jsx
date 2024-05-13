import React, { useContext } from 'react';
import { Box } from '@honda-canada/design-system-react';

import Accordions from './Accordions';
import useSpecifications from '../../utils/hooks/useSpecifications';

import { getCategorizedSpecifications, getPageCount } from './service/utils';
import Context from './service/Context';

const SpecificationsUI = ({ trims, expandLabel, collapseLabel, specificationRefs, year }) => {
  const configurationProvider = useContext(Context);
  const { slidePerPage, selectedTrim, currentSlide, setCurrentSlide, splideOptions, isMobile, vehicleType } =
    configurationProvider || {};

  // Adjust accordion "offset" (i.e. sticky position of category title)
  // based on presence of pagination.
  const pageCount = getPageCount(trims, isMobile, slidePerPage);

  const multiPageOffsetDesktopHeight = 240;
  const multiPageOffsetMobileHeight = 115;
  const singlePageOffsetDesktopHeight = 200;
  const singlePageOffsetMobileHeight = 70;

  const multiPageOffset = !isMobile ? multiPageOffsetDesktopHeight : multiPageOffsetMobileHeight;
  const singlePageOffset = !isMobile ? singlePageOffsetDesktopHeight : singlePageOffsetMobileHeight;
  const accordionOffset = pageCount > 1 ? multiPageOffset : singlePageOffset;

  const { specifications, isFetching } = useSpecifications({
    trims: trims?.map(trim => trim?.detIdentifier?.value),
    vehicleType,
  });

  if (!specifications || isFetching) {
    return null;
  }

  const categorizedSpecifications = getCategorizedSpecifications(specifications, trims);

  return (
    <Box className="trim-specifications-accordion">
      <Accordions
        refs={specificationRefs}
        onDrag={(_, slide) => {
          setCurrentSlide(slide.index);
        }}
        splideOptions={splideOptions}
        specifications={categorizedSpecifications}
        collapseLabel={collapseLabel?.value}
        expandLabel={expandLabel?.value}
        selectedTrim={selectedTrim}
        currentSlide={currentSlide}
        offset={accordionOffset}
        year={year}
      />
    </Box>
  );
};

export default SpecificationsUI;
