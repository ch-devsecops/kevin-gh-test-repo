import React from 'react';
import flatten from 'lodash/flatten';
import PropTypes from 'prop-types';
import SpecificationsProvider from '../../SpecificationsProvider';
import SpecificationsTableUI from './SpecificationsTable';
import { useCarouselSlider } from '../ProductCompareContextProvider';
import { PRODUCT_COMPARE_ID_KEY } from '../../../utils/constants';
import { getEnginesGroupedBySpecifications } from '../utils';

const SpecificationsTable = ({ selectedModels, isSticky }) => {
  // remove null elements from selectModels
  const trimIds = flatten(
    selectedModels.map(item => {
      const id = item?.[PRODUCT_COMPARE_ID_KEY];
      return id ? [id] : [];
    }),
  );

  // carousel control state
  const { currentSlide, bindDrag } = useCarouselSlider();
  return (
    <SpecificationsProvider trims={trimIds}>
      {({ specifications, isFetching: isSpecificationsFetching }) => {
        if (!specifications || isSpecificationsFetching) return null;

        const enginesSpecifications = getEnginesGroupedBySpecifications(specifications, selectedModels);

        return (
          <SpecificationsTableUI
            labels={enginesSpecifications.labels}
            values={enginesSpecifications.specs}
            items={selectedModels}
            carouselControl={{ currentSlide, bindDrag }}
            isSticky={isSticky}
          />
        );
      }}
    </SpecificationsProvider>
  );
};

SpecificationsTable.propTypes = {
  selectedModels: PropTypes.arrayOf(PropTypes.shape({})),
  isSticky: PropTypes.bool,
};

export default SpecificationsTable;
