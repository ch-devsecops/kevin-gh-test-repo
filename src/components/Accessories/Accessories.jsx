import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Media, Button, Box, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';

import { getGtmTagValue, gtmSelectTrimForAccessories } from '../../utils/gtmEvents';
import { isEmpty } from '../../utils/object';
import isSSR from '../../utils/isSSR';
import { mapGTMCategory } from '../../utils/sitecoreFields';

import {
  SELECT_TRIM,
  SUBMIT_TRIM,
  SELECT_ACCESSORY,
  SHOW_MODAL,
  SUBMIT_TRANSMISSION,
  SELECT_TRANSMISSION,
  SELECT_ACCESSORY_TYPE,
  SUBMIT_ACCESSORY_TYPE,
} from './service/reducer';
import AccessoriesConfigurationProvider from './service/Provider';
import AccessoriesAccordion from './AccessoriesAccordion';
import AccessoriesOverlay from './AccessoriesOverlay';
import AccessoriesTabs from './AccessoriesTabs';
import Context from './service/Context';
import DropdownSelectors from '../DropdownSelectors';
import { ACCESSORY_TYPE_LABEL_ALL, ALL_TAB, TRIM_DROPDOWN_KEY } from './service/constants';
import AccessoriesSlider from './AccessoriesSlider';

import themeStyles from './Accessories.styles';
import LoadingState from './shared/LoadingState';
import ErrorState from './shared/ErrorState';
import AccessoriesDetailsCard from './AccessoriesDetailsCard';

const Container = themeStyles.apply(Box, 'Container');

const AccessoriesUI = ({ fields, componentName }) => {
  const { gtmTitle, gtmCategory, categories, modelYear } = fields || {};
  const { t } = useTranslation();

  const {
    accessories,
    accessoriesLength,
    defaultTabs,
    dictionary,
    dispatch,
    dropdownDescription,
    dropdownDescriptionStyles,
    dropdownKeys,
    dropdownList,
    hasError,
    isDark,
    isFetching,
    optionTrimValuePath,
    priceDisclaimerPosition,
    disclaimerMargins,
    selectedAccessoryType,
    selectedOptions,
    selectedTrim,
    showAccordion,
    showDetailsCard,
    showOverlay,
    showSlider,
    submittedTrim,
    trimKeyParam,
    trimPathKey,
    trimTransmissionPathKey,
  } = useContext(Context);

  const getTrim = key => modelYear?.trims?.find(tr => get(tr, trimPathKey) === key);

  const getTrimInfo = key => {
    const trim = getTrim(key);
    return {
      name: trim?.name?.toLowerCase() || '',
      bodyType:
        trim?.bodyType?.item
          ?.map(item => item?.name)
          ?.toString()
          ?.toLowerCase() || '',
    };
  };

  const gtmTags = {
    'data-gtm-model': getGtmTagValue(modelYear?.model?.name?.toLowerCase()),
    'data-gtm-trim': getGtmTagValue(getTrimInfo(submittedTrim)?.name),
    'data-gtm-body-style': getGtmTagValue(getTrimInfo(submittedTrim)?.bodyType),
    'data-gtm-component-type': getGtmTagValue(componentName),
  };

  useEffect(() => {
    if (isSSR()) return;

    const defaultTrim = modelYear?.trims?.find(trim => trim?.detIdentifier === modelYear?.defaultTrim?.detIdentifier);

    const transmissionId = get(defaultTrim, trimPathKey);
    const trimTransmissionId = get(defaultTrim, trimTransmissionPathKey);

    if (trimKeyParam || transmissionId) {
      dispatch({
        type: SELECT_TRIM,
        payload: trimKeyParam || transmissionId,
      });
      dispatch({
        type: SUBMIT_TRIM,
        payload: trimKeyParam || transmissionId,
      });
      dispatch({
        type: SELECT_TRANSMISSION,
        payload: trimKeyParam || trimTransmissionId,
      });
      dispatch({
        type: SUBMIT_TRANSMISSION,
        payload: trimKeyParam || trimTransmissionId,
      });
    }
  }, [modelYear?.year, trimKeyParam]);

  // Re-arrange tabs based on the order of 'categories' returned from LS
  const tabs = categories
    ?.map(cat => defaultTabs?.find(tab => tab?.key === cat?.name?.toLowerCase()))
    .filter(itm => itm);

  if (!fields) return null;

  const onSelectAccessory = accessory => {
    dispatch({ type: SELECT_ACCESSORY, payload: accessory });
    dispatch({ type: SHOW_MODAL, payload: true });
  };

  const getOptions = {
    trim: () =>
      modelYear?.trims?.map(trim => ({
        text: trim?.trimName,
        value: get(trim, optionTrimValuePath),
      })),
    transmission: () =>
      selectedTrim
        ? modelYear?.trims
            ?.find(trim => trim?.detIdentifier === selectedTrim)
            ?.transmissions?.[0]?.items?.map(transmission => ({
              text: transmission?.transmissionName,
              value: transmission?.detIdentifier,
            }))
        : [],
    accessoryType: () => {
      if (accessories && !isEmpty(accessories) && selectedTrim) {
        const ret = [
          ...Object.keys(accessories).map(key => {
            if (accessories?.[key]?.[0]?.accessoryCategory?.name) {
              return {
                text: `${accessories?.[key]?.[0]?.accessoryCategory?.name} (${accessories?.[key]?.length})`,
                value: key,
                order: accessories?.[key]?.[0]?.accessoryCategory?.displayOrder || 0,
              };
            }
            return null;
          }),
        ]
          .sort((a, b) => parseInt(a.order, 10) - parseInt(b.order, 10))
          .filter(i => i);
        ret.unshift({
          text: `${t('Pages.Models.Exploration.accessoriesAllLabel')} (${accessoriesLength})`,
          value: ALL_TAB,
        });
        return ret;
      }
      return [];
    },
  };

  const handlerDropdownChange = (val, key) => {
    if (val === selectedOptions[key]) return;

    dispatch({
      type: `SELECT_${key.toUpperCase()}`,
      payload: val,
    });

    if (key === TRIM_DROPDOWN_KEY) {
      const trimObj = getTrim(val);
      const trimTransmissionId = get(trimObj, trimTransmissionPathKey);
      dispatch({
        type: SELECT_TRANSMISSION,
        payload: trimTransmissionId,
      });
      dispatch({
        type: SUBMIT_TRANSMISSION,
        payload: trimTransmissionId,
      });
      dispatch({
        type: SELECT_ACCESSORY_TYPE,
        payload: ACCESSORY_TYPE_LABEL_ALL,
      });
      dispatch({
        type: SUBMIT_ACCESSORY_TYPE,
        payload: ACCESSORY_TYPE_LABEL_ALL,
      });
    }
  };

  const dropdownSelectorsCta = (
    <Button
      styling={isDark ? 'special' : 'primary'}
      data-gtm-title={gtmTitle}
      data-testid="cy-accessories-submit-button"
      onClick={() => {
        gtmSelectTrimForAccessories(getTrimInfo(selectedTrim).name);
        dispatch({ type: SUBMIT_TRIM, payload: selectedTrim });
        dispatch({
          type: SUBMIT_ACCESSORY_TYPE,
          payload: selectedAccessoryType,
        });
      }}
    >
      {dictionary.buttonLabel}
    </Button>
  );

  const optionsObject = dropdownKeys.reduce((acc, key) => {
    acc[key] = getOptions[key]();
    return acc;
  }, {});

  return (
    <Container data-gtm-category={mapGTMCategory(gtmCategory)} data-gtm-component-type={componentName} isDark={isDark}>
      <DropdownSelectors
        bodyTextPosition={priceDisclaimerPosition === 'top' && 'bottom'}
        bgColour={isDark ? 'black' : 'Grey'}
        textColour={isDark ? 'white' : 'default'}
        title={t('Pages.Models.Exploration.accessoriesHeading')}
        description={dropdownDescription}
        descriptionStyles={dropdownDescriptionStyles}
        bodyText={priceDisclaimerPosition === 'top' && dictionary.priceDisclaimerLabel}
        dropdowns={dropdownList}
        options={optionsObject}
        selectedOptions={selectedOptions}
        onChange={handlerDropdownChange}
        cta={dropdownSelectorsCta}
        errors={{ accessoryType: hasError }}
        inputProps={{ 'data-testid': 'cy-accessories-dropdown-select' }}
        disclaimerMargins={disclaimerMargins}
      />
      <Optional when={isFetching}>
        <LoadingState />
      </Optional>
      <Optional when={hasError || accessoriesLength === 0}>
        <ErrorState />
      </Optional>
      <Optional when={!isFetching && !hasError && accessoriesLength !== 0}>
        <Optional when={showDetailsCard}>
          <AccessoriesDetailsCard />
        </Optional>
        <Optional when={showOverlay}>
          <AccessoriesOverlay />
        </Optional>
        <Media greaterThan="mobile">
          <AccessoriesTabs onSelectAccessory={onSelectAccessory} tabs={tabs} gtmTags={gtmTags} />
        </Media>
        <Media at="mobile">
          <Optional when={showAccordion}>
            <AccessoriesAccordion onSelectAccessory={onSelectAccessory} tabs={tabs} gtmTags={gtmTags} />
          </Optional>
          <Optional when={showSlider}>
            <AccessoriesSlider onSelectAccessory={onSelectAccessory} gtmTags={gtmTags} />
          </Optional>
        </Media>
      </Optional>
    </Container>
  );
};

AccessoriesUI.propTypes = {
  fields: PropTypes.shape({}),
  componentName: PropTypes.string,
};

const Accessories = ({ variant, vehicleType, ...restProps }) => (
  <AccessoriesConfigurationProvider variant={variant} vehicleType={vehicleType}>
    <AccessoriesUI {...restProps} />
  </AccessoriesConfigurationProvider>
);

Accessories.propTypes = {
  fields: PropTypes.shape({}),
  componentName: PropTypes.string,
  variant: PropTypes.string,
  vehicleType: PropTypes.string,
};

export default Accessories;
