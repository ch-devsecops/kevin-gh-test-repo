import React, { useMemo } from 'react';
import { Box, Copy } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import flatten from 'lodash/flatten';
import themeStyles from '../styles/SpecificationsAccordion.styles';
import useSpecsWithVehicleTypes from './useSpecsWithVehicleTypes';
import { useCarouselSlider } from '../ProductCompareContextProvider';
import SpecificationsAccordionUI from './SpecificationsAccordion';
import { styledCompiler } from '../../../utils/markdown';
import { useProductCompareData } from '../ProductCompareDataContextProvider';
import { PRODUCT_COMPARE_ID_KEY } from '../../../utils/constants';
import { getPSPCategorizedSpecifications } from '../utils';

const LegalDisclaimer = themeStyles.apply(Copy, 'LegalDisclaimer');

const SpecificationsAccordion = ({ selectedModels, variant }) => {
  const trimsByVehicleTypes = useMemo(() => {
    // remove null elements from selectModels
    const trimIdsWithVehicleTypes = flatten(
      selectedModels.map(item => {
        const id = item?.[PRODUCT_COMPARE_ID_KEY];
        const vehicleType = item?.vehicleType;
        return id ? [{ id, vehicleType }] : [];
      }),
    );
    // Group trimIds by vehicleType for fetching specs data
    const trimsByVehicleType = groupBy(trimIdsWithVehicleTypes, item => item?.vehicleType);
    return Object.entries(trimsByVehicleType).map(entry => ({
      vehicleType: entry?.[0],
      trimIds: entry?.[1]?.map(item => item?.id),
    }));
  }, [selectedModels]);

  const { specifications, isFetching, hasError } = useSpecsWithVehicleTypes(trimsByVehicleTypes);

  const { t } = useTranslation();
  const { legalDisclaimer } = useProductCompareData();

  // carousel control state
  const { currentSlide, bindDrag } = useCarouselSlider();

  if (isFetching || hasError || !specifications) return null;

  const trimIds = selectedModels.map(item => item?.[PRODUCT_COMPARE_ID_KEY]);
  const categorizedSpecifications = getPSPCategorizedSpecifications(specifications);

  if (!categorizedSpecifications || !categorizedSpecifications?.length) return null;

  return (
    <Box>
      <SpecificationsAccordionUI
        specifications={categorizedSpecifications}
        collapseLabel={t('Shared.CompareTrims.collapseAllLabel')}
        expandLabel={t('Shared.CompareTrims.expandAllLabel')}
        carouselControl={{ currentSlide, bindDrag }}
        trimIds={trimIds}
        variant={variant}
      />

      <LegalDisclaimer data-testid="cy-legal-disclaimer" size="legal">
        {styledCompiler(legalDisclaimer)}
      </LegalDisclaimer>
    </Box>
  );
};

SpecificationsAccordion.propTypes = {
  selectedModels: PropTypes.arrayOf(PropTypes.shape({})),
  variant: PropTypes.string,
};

export default SpecificationsAccordion;
