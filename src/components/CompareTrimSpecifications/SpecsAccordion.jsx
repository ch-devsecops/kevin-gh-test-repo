import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionExpandAll,
  Box,
  Copy,
  SwipeContainer,
  useMediaQueries,
  Wrapper,
  Row,
  Column,
  PresenceIndicator,
  useAccordion,
  Markdown,
  useThemeContext,
} from '@honda-canada/design-system-react';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import { HONDA_THEME_NAME } from '../../utils/constants';

const ItemTitle = ({ category }) => (
  <Copy size="accordionLarge" fontWeight="bold" pl={5} py={6} dangerouslySetInnerHTML={{ __html: category }} />
);

const ItemLabel = styled(Copy)(
  css({
    a: {
      color: 'typographyDefault',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  }),
);

const processedLabel = (label, gtmTags) => {
  if (label.indexOf('<a href=') > -1 && label.indexOf('<sup>ⓘ</sup>') > -1) {
    return label.replace(
      '<a href=',
      `<a data-gtm-model='${gtmTags.model?.toLowerCase()}'
      data-gtm-trim='${gtmTags.trim?.toLowerCase()}'
      data-gtm-body-style='${gtmTags.bodyStyle?.toLowerCase()}' 
      data-gtm-interaction-type='${gtmTags.interactionType}'
      data-gtm-title='${gtmTags.title?.toLowerCase()}' href=`,
    );
  }
  return label;
};

const ItemContentValue = ({ value }) => {
  let content;

  // current-state API provides some unusual values
  switch (value) {
    case '•':
      content = <PresenceIndicator />;
      break;
    case '&nbsp;':
      content = null;
      break;
    default:
      content = (
        <Copy textAlign="center" size="small" width="100%">
          {value}
        </Copy>
      );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex="1"
      height={['100%', 'auto']}
      bg={['none', 'grey.5']}
      p={5}
      minWidth="0"
      wordBreak="break-word"
    >
      {content}
    </Box>
  );
};

const ItemContent = ({
  label,
  firstTrimValue,
  secondTrimValue,
  currentItem,
  updateCurrentItem,
  isMobile,
  isGroupSwipe,
  updateIsGroupSwipe,
  gtmTags,
}) => {
  let items = [
    <ItemContentValue key="first" value={firstTrimValue} />,
    <ItemContentValue key="second" value={secondTrimValue} />,
  ];

  if (isMobile) {
    items = (
      <Box display="flex" flex="1" bg="grey.5" wordBreak="break-word">
        <SwipeContainer
          enableShadows
          disableSideDrags
          currentItem={currentItem}
          updateCurrentItem={updateCurrentItem}
          isGroupSwipe={isGroupSwipe} // TODO: remove this, and from design-system component
          onSwipe={isSwipping => updateIsGroupSwipe(isSwipping)}
        >
          {items}
        </SwipeContainer>
      </Box>
    );
  }
  return (
    <Box display="flex" borderBottom="1px solid" borderColor="grey.2" alignItems="stretch">
      <Box flex="1">
        <Row p={5} bg="white" wordBreak="break-word">
          <ItemLabel size="small" dangerouslySetInnerHTML={{ __html: processedLabel(label, gtmTags) }} />
        </Row>
      </Box>
      {items}
    </Box>
  );
};

const KeyFeaturesSection = ({
  firstTrim,
  secondTrim,
  isGroupSwipe,
  currentItem,
  updateCurrentItem,
  updateIsGroupSwipe,
  isMobile,
}) => {
  const { t } = useTranslation();

  const featuresBulletList = (trim, key) => (
    <Box
      key={key}
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100%"
      py={5}
      pl={2}
      pr="20px"
    >
      {trim.keyFeatures && (
        <Markdown
          style={{ wordBreak: 'break-word', wordWrap: 'break-word' }}
          options={{
            overrides: {
              li: {
                component: ({ children, type, ...props }) => {
                  const Elem = type;
                  return (
                    <Elem {...props} style={{ listStylePosition: 'outside', marginLeft: '1rem' }}>
                      {children}
                    </Elem>
                  );
                },
                props: {
                  type: 'li',
                },
              },
            },
          }}
        >
          {trim.keyFeatures}
        </Markdown>
      )}
    </Box>
  );

  const withSwipeContainer = items => {
    if (!isMobile) {
      return items;
    }

    return (
      <Box flex="1">
        <SwipeContainer
          enableShadows
          disableSideDrags
          currentItem={currentItem}
          updateCurrentItem={updateCurrentItem}
          isGroupSwipe={isGroupSwipe}
          onSwipe={updateIsGroupSwipe}
        >
          {items}
        </SwipeContainer>
      </Box>
    );
  };

  return (
    <Box
      bg="grey.5"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderY="1px solid"
      borderColor="grey.2"
    >
      <Box flex="1">
        <Copy size="accordionLarge" fontWeight="bold" pl={5}>
          {t('Shared.CompareTrims.keyFeaturesLabel')}
        </Copy>
      </Box>
      {withSwipeContainer([featuresBulletList(firstTrim, 'first'), featuresBulletList(secondTrim, 'second')])}
    </Box>
  );
};

const getSecondTrimValue = (secondTrim, category, i) => {
  const specs = secondTrim.specs.find(s => s.category === category);
  return specs?.items[i]?.value || null;
};

const SpecsAccordion = ({ firstTrim, secondTrim, currentItem, updateCurrentItem, gtmTags }) => {
  const [isGroupSwipe, updateIsGroupSwipe] = useState(false);
  const { t } = useTranslation();
  const { isMobile } = useMediaQueries();
  // primitives for useEffect dependencies
  const firstTrimKey = firstTrim?.trimKey;
  const secondTrimKey = secondTrim?.trimKey;
  const theme = useThemeContext('name');

  const getAccordionItems = () => {
    if (!firstTrim.specs || !secondTrim.specs) return [];
    return firstTrim.specs?.map(spec => {
      const { category } = spec;
      return {
        key: category,
        expandAriaLabel: `${category} ${t('Shared.Common.expandAria')}`,
        collapseAriaLabel: `${category} ${t('Shared.Common.collapseAria')}`,
        title: <ItemTitle category={category} />,
        content: spec.items.map((item, i) => (
          <ItemContent
            key={i.toString()}
            label={item.label}
            firstTrimValue={item.value}
            secondTrimValue={getSecondTrimValue(secondTrim, category, i)}
            isMobile={isMobile}
            currentItem={currentItem}
            updateCurrentItem={updateCurrentItem}
            isGroupSwipe={isGroupSwipe}
            updateIsGroupSwipe={updateIsGroupSwipe}
            gtmTags={{ ...gtmTags, title: category }}
          />
        )),
      };
    });
  };

  const getLegalDisclaimers = ({ category, items }) =>
    items
      ? {
          key: 'legalDisclaimers',
          title: <ItemTitle category={category} />,
          content: items.map(item => (
            <Box key={item} display="flex" borderBottom="1px solid" borderColor="grey.2" alignItems="stretch">
              <Box flex="1">
                <Row p={5} bg="white" wordBreak="break-word">
                  <ItemLabel size="small" dangerouslySetInnerHTML={{ __html: item }} />
                </Row>
              </Box>
            </Box>
          )),
        }
      : null;

  const items = getAccordionItems();
  const legalDisclaimers = firstTrim.legalDisclaimers && getLegalDisclaimers(firstTrim.legalDisclaimers);
  const allAccordionItems = legalDisclaimers ? [...items, legalDisclaimers] : items;
  const accordionBehaviour = useAccordion(allAccordionItems);
  const { isAllExpanded, toggleAllItems, collapseAllItems } = accordionBehaviour;
  const accordionTitleOffset = isMobile ? 245 : 342;

  useEffect(() => {
    // closes accordion items when trims are changed
    collapseAllItems();
  }, [firstTrimKey, secondTrimKey]);

  const accordionContent = (
    <>
      <AccordionExpandAll
        py={5}
        tabIndex={0}
        justifyContent="flex-end"
        toggleItem={toggleAllItems}
        isActive={isAllExpanded}
        onKeyDown={keypressCallback(keyCodes.ENTER, toggleAllItems)}
        colorStyling="default"
        iconColorOverride={theme === HONDA_THEME_NAME ? 'primary' : 'black'}
      >
        <Copy size="small" color={theme === HONDA_THEME_NAME ? 'black' : 'primary'} fontWeight="bold">
          {isAllExpanded ? t('Shared.CompareTrims.collapseAllLabel') : t('Shared.CompareTrims.expandAllLabel')}
        </Copy>
      </AccordionExpandAll>
      <KeyFeaturesSection
        firstTrim={firstTrim}
        secondTrim={secondTrim}
        isGroupSwipe={isGroupSwipe}
        currentItem={currentItem}
        updateCurrentItem={updateCurrentItem}
        updateIsGroupSwipe={updateIsGroupSwipe}
        isMobile={isMobile}
      />
      <Accordion
        items={allAccordionItems}
        behaviour={accordionBehaviour}
        activeTitleHasBorder
        itemsHaveTopBorder
        isCompact
        isTitleSticky
        titleOffset={accordionTitleOffset}
        hideBorderOnLastItem={false}
        borderColor="grey.2"
      />
    </>
  );

  if (isMobile) {
    return accordionContent;
  }

  return (
    <Wrapper>
      <Row>
        <Column width={1}>{accordionContent}</Column>
      </Row>
    </Wrapper>
  );
};

export default SpecsAccordion;
