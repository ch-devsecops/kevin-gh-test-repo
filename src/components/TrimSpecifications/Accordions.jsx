import React, { useState, useEffect, createRef, useContext } from 'react';
import {
  useAccordion,
  Copy,
  Accordion,
  AccordionExpandAll,
  Box,
  Column,
  Row,
  useMediaQueries,
} from '@honda-canada/design-system-react';
import { SplideSlide, Splide } from '@splidejs/react-splide';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Context from './service/Context';

import themeStyles, {
  AccordionsCopy,
  AccordionsDisclaimersCopy,
  AccordionsItemTitle,
} from './TrimSpecifications.styles';

const StyledBox = themeStyles.apply(Box, 'AccordionsBox');
const AccordionsWrapper = themeStyles.apply(Box, 'AccordionsWrapper');
const AccordionsContent = themeStyles.apply(Box, 'AccordionsContent');
const AccordionsContentRow = themeStyles.apply(Row, 'AccordionsContentRow');
const AccordionsContentColumn = themeStyles.apply(Column, 'AccordionsContentColumn');
const AccordionsContentBox = themeStyles.apply(Box, 'AccordionsContentBox');
const StyledSplide = themeStyles.apply(SplideSlide, 'AccordionsSplide');
const ExpandAllCopy = themeStyles.apply(Copy, 'ExpandAllCopy');

const Accordions = ({ refs, onDrag, specifications, expandLabel, collapseLabel, offset, year }) => {
  const [contentHeights, setContentHeights] = useState([]);
  const { isSmallDesktop, isDesktop } = useMediaQueries();
  const { t } = useTranslation();

  const configurationProvider = useContext(Context);
  const { isDark, accordion, selectedTrim, currentSlide, splideOptions } = configurationProvider || {};

  const categories = specifications?.filter(({ name }) => name !== 'legal_disclaimers_');
  const legalDisclaimers = specifications?.find(({ name }) => name === 'legal_disclaimers_');
  const isMobile = !(isSmallDesktop || isDesktop);
  const itemLabelClass = 'spec-item-label';
  const itemValueClass = 'spec-item-value';
  // eslint-disable-next-line no-param-reassign
  refs.current = categories?.map((_, i) => refs.current[i] || createRef());

  const accordionItems = categories.map((category, specIndex) => ({
    key: category.name,
    expandAriaLabel: `${category.label} ${t('Shared.Common.expandAria')}`,
    collapseAriaLabel: `${category.label} ${t('Shared.Common.collapseAria')}`,
    title: (
      <AccordionsItemTitle
        size="accordionLarge"
        data-testid="cy-product-specification"
        isDark={isDark}
        dangerouslySetInnerHTML={{ __html: category.label }}
      />
    ),
    content: (
      <AccordionsContentRow isDark={isDark}>
        <AccordionsContentColumn width={[1 / 2, 1 / 6]}>
          {category?.specificationLabels?.map((item, i) => (
            <StyledBox
              height={contentHeights?.[specIndex]?.[i]}
              className={`${itemLabelClass}-${specIndex}-${i}-${year}`}
              key={item.label}
            >
              <AccordionsCopy isDark={isDark} size="small" dangerouslySetInnerHTML={{ __html: item.label }} />
            </StyledBox>
          ))}
        </AccordionsContentColumn>
        <AccordionsContentColumn width={[1 / 2, 5 / 6]}>
          <Splide
            options={{
              ...splideOptions,
              slideFocus: false,
            }}
            ref={refs?.current[specIndex]}
            onActive={onDrag}
          >
            {category?.specifications?.map((specification, trimIndex) => {
              const selected = isMobile
                ? currentSlide === trimIndex
                : selectedTrim === specification.trimId?.toString();
              return (
                <StyledSplide key={specification.trimId}>
                  <AccordionsContentBox selected={selected} isDark={isDark}>
                    {category?.specificationLabels?.map((item, i) => (
                      <StyledBox
                        key={`${specification.trimId}-${item.label}`}
                        height={contentHeights?.[specIndex]?.[i]}
                        className={`${itemValueClass}-${specIndex}-${i}-${year}`}
                        textAlign={item?.value === '•' ? 'center' : 'left'}
                      >
                        <AccordionsCopy
                          size="small"
                          textAlign="center"
                          isDark={isDark}
                          isSingleColumn={category.specifications?.length === 1}
                          dangerouslySetInnerHTML={{ __html: specification.specs?.[i]?.value }}
                        />
                      </StyledBox>
                    ))}
                  </AccordionsContentBox>
                </StyledSplide>
              );
            })}
          </Splide>
        </AccordionsContentColumn>
      </AccordionsContentRow>
    ),
  }));

  const legalDisclaimersAccordionItem = legalDisclaimers && {
    key: 'legal_disclaimers_',
    title: (
      <AccordionsDisclaimersCopy size="accordionLarge" isDark={isDark}>
        {legalDisclaimers.label}
      </AccordionsDisclaimersCopy>
    ),
    content: legalDisclaimers?.specificationLabels?.map(disclaimer => (
      <Row backgroundColor={isDark ? 'black' : 'white'} key={disclaimer.label}>
        <Column width={1} pl="0">
          <StyledBox>
            <AccordionsCopy
              color={isDark ? 'white' : 'default'}
              isDark={isDark}
              size="small"
              dangerouslySetInnerHTML={{ __html: disclaimer?.label }}
            />
          </StyledBox>
        </Column>
      </Row>
    )),
  };

  const allAccordionItems = legalDisclaimersAccordionItem
    ? [...accordionItems, legalDisclaimersAccordionItem]
    : accordionItems;

  const accordionBehaviour = useAccordion(allAccordionItems);
  const { isAllExpanded, toggleAllItems, collapseAllItems } = accordionBehaviour;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // Resets expand/collapse state on year change
    collapseAllItems();

    // Set height of each row based on height of its tallest column
    const specsArr = categories?.map((category, specIndex) =>
      category?.specificationLabels?.map((_, itemIndex) => {
        const itemLabel = document.querySelector(`.${itemLabelClass}-${specIndex}-${itemIndex}-${year}`);
        const itemValues = document.querySelectorAll(`.${itemValueClass}-${specIndex}-${itemIndex}-${year}`);

        let height = itemLabel?.offsetHeight;
        itemValues.forEach(itemElem => {
          if (itemElem.offsetHeight > height) {
            height = itemElem.offsetHeight;
          }
        });

        return `${height}px`;
      }),
    );

    setContentHeights(specsArr);
    return undefined;
  }, [year]);

  return (
    <AccordionsWrapper isDark={isDark} data-testid="cy-product-spec-wrapper">
      <AccordionExpandAll
        data-testid="cy-expand-all"
        toggleItem={toggleAllItems}
        isActive={isAllExpanded}
        onKeyDown={keypressCallback(keyCodes.ENTER, toggleAllItems)}
        colorStyling={isDark ? 'dark' : 'default'}
        justifyContent="flex-end"
        pt="s"
        pb="s"
        borderTop={['solid 1px', 'none']}
        borderColor="grey.3"
        iconColorOverride={accordion?.iconColorOverride}
        ariaLabel={isAllExpanded ? t('Shared.CompareTrims.collapseAllLabel') : t('Shared.CompareTrims.expandAllLabel')}
      >
        <ExpandAllCopy
          color={accordion?.labelColor}
          aria-label={
            isAllExpanded ? t('Shared.CompareTrims.collapseAllLabel') : t('Shared.CompareTrims.expandAllLabel')
          }
        >
          {isAllExpanded ? collapseLabel : expandLabel}
        </ExpandAllCopy>
      </AccordionExpandAll>
      <AccordionsContent isDark={isDark}>
        <Accordion
          ariaExpanded="false"
          behaviour={accordionBehaviour}
          items={allAccordionItems}
          isCompact
          itemsHaveTopBorder
          isTitleSticky
          titleOffset={offset}
          colorStyling={isDark ? 'dark' : 'default'}
        />
      </AccordionsContent>
    </AccordionsWrapper>
  );
};

Accordions.propTypes = {
  refs: PropTypes.shape({}),
  onDrag: PropTypes.func,
  specifications: PropTypes.arrayOf(PropTypes.shape({})),
  expandLabel: PropTypes.string,
  collapseLabel: PropTypes.string,
  offset: PropTypes.number,
  year: PropTypes.string,
};

export default Accordions;
