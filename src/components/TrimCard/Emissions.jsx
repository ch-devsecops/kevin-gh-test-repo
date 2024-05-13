import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Copy, Box, Icon, FloaterTooltip, Link } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

const Rating = styled(Copy)(
  css({
    '> em': {
      display: 'block',
    },
    '> strong': {
      fontFamily: 'bold',
      fontSize: '18px',
      display: 'block',
    },
  }),
);

const Emissions = ({ rating, segmentAverage, isDark, url, name, modelYear }) => {
  const { t } = useTranslation();
  const emissionAriaLabel = t('Shared.Common.emissionsForAria');

  return (
    <>
      {rating && (
        <Box display="flex" mt="default" width="100%" maxWidth="220px" mx="auto">
          <Box width="42px">
            <Link target="_blank" href={url} aria-label={`${emissionAriaLabel} ${modelYear} ${name}`} disableHover>
              <Icon name="emissions" iconSize="large" background="#97C154" color="white" />
            </Link>
          </Box>
          <FloaterTooltip
            content={t('Pages.Models.Exploration.emissionsRatingsTooltipLabel')}
            styling={isDark ? 'dark' : 'light'}
            ariaLabel={t('Shared.Common.showTooltipPopupAria')}
            closeAriaLabel={t('Shared.Common.pressToClosePopupAria')}
            ml="xs"
          >
            {({ active }) => <Icon name="information" filled={active} inverted={isDark} />}
          </FloaterTooltip>
          <Rating size="extraSmall" ml="xs">
            <em>{t('Pages.Models.Exploration.emissionsRatingsAsLowAsLabel')}</em>
            <strong>{rating}</strong>
          </Rating>
        </Box>
      )}
      {segmentAverage && (
        <Box
          borderTop="1px solid"
          borderTopColor="grey.2"
          mt="xs"
          pt="xs"
          width="100%"
          maxWidth="220px"
          display="flex"
          justifyContent="space-between"
        >
          <Copy size="extraSmall" maxWidth="50%">
            {t('Pages.Models.Exploration.emissionsSegmentAverageLabel')}
          </Copy>
          <Box display="flex">
            <Copy size="extraSmall" fontWeight="bold" mr="xxs">
              {segmentAverage}
            </Copy>
            <FloaterTooltip
              mt={['-4px', 'zero']}
              content={t('Pages.Models.Exploration.emissionsSegmentAverageTooltipLabel')}
              styling={isDark ? 'dark' : 'light'}
              ariaLabel={t('Shared.Common.showTooltipPopupAria')}
              closeAriaLabel={t('Shared.Common.pressToClosePopupAria')}
              contentWidth={200}
            >
              {({ active }) => <Icon name="information" filled={active} inverted={isDark} />}
            </FloaterTooltip>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Emissions;
