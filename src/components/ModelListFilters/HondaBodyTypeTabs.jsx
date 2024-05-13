import React, { useContext } from 'react';
import { Tab, Box, Copy, Media } from '@honda-canada/design-system-react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useTranslation } from 'react-i18next';
import { ModelFiltersContext } from '../ModelFiltersContext';
import { getFilterableComponentsFromSitecoreRoute } from './service/utils';

const StyledBox = styled(Box)(({ hasLongLabels }) =>
  css({
    minHeight: '45px',
    px: hasLongLabels ? 'm' : 'l',
    mb: 'default',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: hasLongLabels ? 'flex-center' : 'flex-start',
    alignItems: 'center',
    columnGap: hasLongLabels ? 'default' : 'xl',
  }),
);
const GtmInteractionType = 'filter by vehicle type';

const BodyTypeTabs = ({ sitecoreContext }) => {
  const { allBodyTypes, dispatchFilter, filter } = useContext(ModelFiltersContext);
  const { language } = sitecoreContext;
  // we expect French labels to be longer than English, enough to warrant a different layout
  const hasLongLabels = language === 'fr';
  const showFutureVehiclesItem = getFilterableComponentsFromSitecoreRoute(sitecoreContext.route, 'FutureVehicleCard');
  const activeBodyType = filter?.values.bodyType[0];
  const { t } = useTranslation();

  return (
    <Media greaterThan="smallDesktop">
      <StyledBox hasLongLabels={hasLongLabels} data-gtm-gategory="vehicle list" data-gtm-component-type="tab nav">
        <Tab
          isActive={filter?.values.bodyType.length === 0 && !filter?.onlyFutureVehicles}
          onClick={() => {
            if (filter?.onlyFutureVehicles) {
              dispatchFilter({ type: 'RESET' });
            } else if (activeBodyType) {
              dispatchFilter({ type: 'REMOVE_ITEM', payload: { item: 'bodyType', value: activeBodyType } });
            }
          }}
          minHeight={hasLongLabels ? '48px' : 'auto'}
          data-gtm-title={t('Pages.Models.Exploration.filterAllModelsLabel', 'en').toLowerCase()}
          data-gtm-interaction-type={GtmInteractionType}
        >
          <Copy fontWeight="bold" size="small">
            {t('Pages.Models.Exploration.filterAllModelsLabel')}
          </Copy>
        </Tab>
        {allBodyTypes.map(bodyType => (
          <Tab
            isActive={filter?.values.bodyType.length === 1 && filter?.values.bodyType[0] === bodyType.key}
            onClick={() => {
              if (activeBodyType) {
                dispatchFilter({ type: 'REMOVE_ITEM', payload: { item: 'bodyType', value: activeBodyType } });
              }
              dispatchFilter({ type: 'ADD_ITEM', payload: { item: 'bodyType', value: bodyType.key } });
            }}
            minHeight={hasLongLabels ? '48px' : 'auto'}
            key={bodyType.key}
            data-gtm-title={bodyType.key.toLowerCase()}
            data-gtm-interaction-type={GtmInteractionType}
          >
            <Copy fontWeight="bold" size="small">
              {bodyType.value}
            </Copy>
          </Tab>
        ))}
        {showFutureVehiclesItem && (
          <Tab
            isActive={filter?.onlyFutureVehicles}
            onClick={() => {
              dispatchFilter({ type: 'SET_ONLY_FUTURE_VEHICLES', payload: !filter?.onlyFutureVehicles });
            }}
            minHeight={hasLongLabels ? '48px' : 'auto'}
            data-gtm-title={t('Pages.Models.Exploration.filterFutureVehiclesLabel', 'en').toLowerCase()}
            data-gtm-interaction-type={GtmInteractionType}
          >
            <Copy fontWeight="bold" size="small">
              {t('Pages.Models.Exploration.filterFutureVehiclesLabel')}
            </Copy>
          </Tab>
        )}
      </StyledBox>
    </Media>
  );
};

export default withSitecoreContext()(BodyTypeTabs);
