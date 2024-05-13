import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Optional,
  Wrapper,
  Row,
  Column,
  Tab,
  Markdown,
  AccessoryCard,
  Copy,
} from '@honda-canada/design-system-react';

import { stripMarkdownHeading } from '../../utils/markdown';
import Context from './service/Context';
import { SELECT_ACCESSORY } from './service/reducer';
import { ACCESSORIES_WRAPPER_INTERACTION_TYPE, ACCESSORY_TYPE_LABEL_ALL, gtmType } from './service/constants';

import themeStyles from './Accessories.styles';
import AccessoryCardDescription from './shared/AccessoryCardDescription';
import AccessoryCardImage from './shared/AccessoryCardImage';
import AccessoryCardTitle from './shared/AccessoryCardTitle';
import AccessoryCardPrice from './shared/AccessoryCardPrice';
import { getGtmTagValue, gtmAccessoryTile } from '../../utils/gtmEvents';

const Content = themeStyles.apply(Box, 'Content');
const CardContainer = themeStyles.apply(Row, 'CardContainer');
const CardBottom = themeStyles.apply(Box, 'CardBottom');
const CardItem = themeStyles.apply(Column, 'CardItem');
const TabContainer = themeStyles.apply(Row, 'TabContainer');
const TabItem = themeStyles.apply(Column, 'TabItem');
const DisclaimerCopy = themeStyles.apply(Copy, 'DisclaimerCopy');
const TabTitle = themeStyles.apply(Markdown, 'TabTitle');

const AccessoriesTabs = ({ tabs = [], onSelectAccessory, gtmTags }) => {
  const {
    isDark,
    showTabs,
    dispatch,
    selectedAccessory,
    submittedAccessoryType,
    defaultTab,
    accessories,
    priceDisclaimerPosition,
    dictionary,
    styles,
    sizing,
    gtmInteractionType,
  } = useContext(Context);
  const initialTab = tabs?.[0]?.key || defaultTab;
  const [activeTab, setActiveTab] = useState(initialTab);

  const setSelectedAccessory = accessory => dispatch({ type: SELECT_ACCESSORY, payload: accessory });

  useEffect(() => {
    setSelectedAccessory({});
  }, [activeTab]);

  const allAccessoryTypes =
    submittedAccessoryType === ACCESSORY_TYPE_LABEL_ALL
      ? Object.keys(accessories || {})?.reduce((acc, key) => [...acc, ...accessories[key]], [])
      : accessories?.[submittedAccessoryType];

  const selectedAccessoryItem = showTabs ? accessories?.[activeTab] : allAccessoryTypes;

  if (!selectedAccessoryItem) return null;

  return (
    <Content isDark={isDark}>
      <Optional when={showTabs}>
        <TabContainer isDark={isDark} data-testid="cy-accessory-card-tabs">
          {tabs.map(({ title, key }) => (
            <TabItem key={key.toString()}>
              <Tab
                isActive={activeTab === key}
                onClick={() => setActiveTab(key)}
                bg={isDark ? 'black' : 'white'}
                data-gtm-interaction-type={ACCESSORIES_WRAPPER_INTERACTION_TYPE}
                data-gtm-title={getGtmTagValue(key.toString())}
                {...gtmTags}
              >
                <TabTitle styles={styles} size="small" isDark={isDark}>
                  {stripMarkdownHeading(title)}
                </TabTitle>
              </Tab>
            </TabItem>
          ))}
        </TabContainer>
      </Optional>
      <Wrapper data-testid="cy-accessory-card-wrapper">
        <CardContainer hasBottomDisclaimer={priceDisclaimerPosition === 'bottom'}>
          {selectedAccessoryItem.map(accessory => {
            const handlerAccessoryCardClick = () => {
              onSelectAccessory({
                packageKey: accessory?.id,
                ...accessory,
              });
              gtmAccessoryTile(accessory?.accessoryGtmName, gtmTags?.['data-gtm-component-type'], window.location.href);
            };

            return (
              <CardItem key={accessory?.accessoryKey}>
                <AccessoryCard
                  as="button"
                  key={accessory?.accessoryKey}
                  bg={styles.accessoryCardBg}
                  image={<AccessoryCardImage accessory={accessory} />}
                  title={<AccessoryCardTitle accessory={accessory} />}
                  price={<AccessoryCardPrice accessory={accessory} />}
                  description={<AccessoryCardDescription accessory={accessory} />}
                  selected={selectedAccessory?.accessoryKey === accessory?.accessoryKey}
                  onClick={handlerAccessoryCardClick}
                  data-gtm-interaction-type={gtmInteractionType}
                  data-gtm-title={getGtmTagValue(accessory?.accessoryGtmName)}
                  {...gtmTags}
                  data-testid="cy-accessory-card"
                  sizing={sizing}
                />
              </CardItem>
            );
          })}
        </CardContainer>
        <Optional when={priceDisclaimerPosition === 'bottom'}>
          <CardBottom>
            <DisclaimerCopy data-testid="cy-accessory-price-disclaimer">
              {dictionary.priceDisclaimerLabel}
            </DisclaimerCopy>
          </CardBottom>
        </Optional>
      </Wrapper>
    </Content>
  );
};

AccessoriesTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({})),
  gtmTags: gtmType,
  onSelectAccessory: PropTypes.func,
};

export default AccessoriesTabs;
