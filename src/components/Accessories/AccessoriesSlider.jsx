import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AccessoryCard, Box, Column, Copy, Optional } from '@honda-canada/design-system-react';

import Context from './service/Context';
import { ACCESSORIES_CARD_INTERACTION_TYPE, ACCESSORY_TYPE_LABEL_ALL, gtmType } from './service/constants';

import themeStyles from './Accessories.styles';
import CardWrapper from './shared/CardWrapper';
import AccessoryCardImage from './shared/AccessoryCardImage';
import AccessoryCardTitle from './shared/AccessoryCardTitle';
import AccessoryCardPrice from './shared/AccessoryCardPrice';
import AccessoryCardDescription from './shared/AccessoryCardDescription';
import { getGtmTagValue } from '../../utils/gtmEvents';

const DisclaimerContainer = themeStyles.apply(Box, 'DisclaimerContainer');
const DisclaimerCopy = themeStyles.apply(Copy, 'DisclaimerCopy');

const AccessoriesSlider = ({ onSelectAccessory, gtmTags }) => {
  const {
    showTabs,
    selectedAccessory,
    submittedAccessoryType,
    defaultTab,
    accessories,
    priceDisclaimerPosition,
    dictionary,
    styles,
    sizing,
  } = useContext(Context);

  const allAccessoryTypes =
    submittedAccessoryType === ACCESSORY_TYPE_LABEL_ALL
      ? Object.keys(accessories || {})?.reduce((acc, key) => [...acc, ...accessories[key]], [])
      : accessories?.[submittedAccessoryType];

  const selectedAccessoryItem = showTabs ? accessories?.[defaultTab] : allAccessoryTypes;

  if (!selectedAccessoryItem) return null;

  return (
    <>
      <CardWrapper
        type="slider"
        gtmTags={gtmTags}
        pb="zero"
        justifyContent={selectedAccessoryItem.length > 1 ? 'flex-start' : 'center'}
      >
        {selectedAccessoryItem.map(accessory => {
          const handlerAccessoryCardClick = () =>
            onSelectAccessory({
              packageKey: accessory?.id,
              ...accessory,
            });
          return (
            <Column key={accessory?.accessoryKey}>
              <AccessoryCard
                as="button"
                bg={styles.accessoryCardBg}
                width={styles.accessoryCardWidth}
                image={<AccessoryCardImage accessory={accessory} />}
                title={<AccessoryCardTitle accessory={accessory} />}
                price={<AccessoryCardPrice accessory={accessory} />}
                description={<AccessoryCardDescription accessory={accessory} />}
                selected={selectedAccessory?.accessoryKey === accessory?.accessoryKey}
                onClick={handlerAccessoryCardClick}
                data-gtm-interaction-type={ACCESSORIES_CARD_INTERACTION_TYPE}
                data-gtm-title={getGtmTagValue(accessory?.accessoryGtmName)}
                {...gtmTags}
                data-testid="cy-accessory-card"
                sizing={sizing}
              />
            </Column>
          );
        })}
      </CardWrapper>
      <Optional when={priceDisclaimerPosition === 'bottom'}>
        <DisclaimerContainer>
          <DisclaimerCopy data-testid="cy-accessory-price-disclaimer">{dictionary.priceDisclaimerLabel}</DisclaimerCopy>
        </DisclaimerContainer>
      </Optional>
    </>
  );
};

AccessoriesSlider.propTypes = {
  gtmTags: gtmType,
  onSelectAccessory: PropTypes.func,
};

export default AccessoriesSlider;
