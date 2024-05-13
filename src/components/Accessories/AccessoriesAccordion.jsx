import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { AccessoryCard, Accordion, Column, Copy, H6 } from '@honda-canada/design-system-react';

import { stripMarkdownHeading, getTitleComponent } from '../../utils/markdown';
import { useLanguage } from '../../utils/sitecoreContext';
import Context from './service/Context';

import themeStyles from './Accessories.styles';
import CardWrapper from './shared/CardWrapper';
import AccessoryCardImage from './shared/AccessoryCardImage';
import { ACCESSORIES_CARD_INTERACTION_TYPE, gtmType } from './service/constants';
import { getGtmTagValue } from '../../utils/gtmEvents';

const PriceCopy = themeStyles.apply(Copy, 'PriceCopy');
const AccordionTitle = themeStyles.apply(Copy, 'AccordionTitle');

const AccessoriesAccordion = ({ tabs, onSelectAccessory, gtmTags }) => {
  const language = useLanguage();

  const { isDark, selectedAccessory, accessories, styles } = useContext(Context);

  const accordionItems = tabs?.map((tab, packageIndex) => {
    const Title = getTitleComponent(tab.title, AccordionTitle);
    const Accessories = (
      <CardWrapper type="accordion" tabKey={tab.key.toString()} gtmTags={gtmTags}>
        {accessories?.[tab.key]?.map(accessory => {
          const accessoryCardPrice = (
            <PriceCopy isDark={isDark}>{formatPrice(accessory?.accessoryProvincialPrice, language, 2)}</PriceCopy>
          );
          const handlerAccessoryCardClick = () =>
            onSelectAccessory({
              packageKey: tab.key,
              ...accessory,
            });

          return (
            <Column key={accessory?.accessoryKey}>
              <AccessoryCard
                as="button"
                key={accessory?.accessoryKey}
                image={<AccessoryCardImage accessory={accessory} />}
                bg={styles.accessoryCardBg}
                title={<H6 color={isDark ? 'white' : 'default'}>{accessory?.accessoryName}</H6>}
                price={accessoryCardPrice}
                selected={
                  selectedAccessory?.packageKey === tab.key &&
                  selectedAccessory?.accessoryKey === accessory?.accessoryKey
                }
                onClick={handlerAccessoryCardClick}
                data-gtm-interaction-type={ACCESSORIES_CARD_INTERACTION_TYPE}
                data-gtm-title={getGtmTagValue(accessory?.accessoryGtmName)}
                {...gtmTags}
              />
            </Column>
          );
        })}
      </CardWrapper>
    );

    return {
      key: packageIndex,
      title: (
        <Title size="small" data-test={tab.title} isDark={isDark}>
          {compiler(stripMarkdownHeading(tab.title))}
        </Title>
      ),
      content: Accessories,
    };
  });

  return (
    <Accordion
      items={accordionItems}
      itemsHaveTopBorder
      isCompact
      borderColor="white"
      colorStyling={isDark ? 'special' : 'dark'}
    />
  );
};

AccessoriesAccordion.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({})),
  gtmTags: gtmType,
  onSelectAccessory: PropTypes.func,
};

export default AccessoriesAccordion;
