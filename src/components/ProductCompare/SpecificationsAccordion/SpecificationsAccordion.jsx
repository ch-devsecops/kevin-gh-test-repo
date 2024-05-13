import React, { Fragment } from 'react';
import {
  useAccordion,
  Copy,
  CarouselContent as CarouselSlider,
  Accordion,
  AccordionExpandAll,
  Box,
  Column,
  Row,
  Media,
  useMediaQueries,
} from '@honda-canada/design-system-react';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import { stripMarkdownHeading } from '../../../utils/markdown';
import { SPECS_ACCORDION_EMPTY_CONTENT, MAX_COMPARE_ELEMENTS } from '../../../utils/constants';
import themeStyles from '../styles/SpecificationsAccordion.styles';
import useConfiguration from '../config';

const ExpandAllButton = themeStyles.apply(AccordionExpandAll, 'ExpandAllButton');
const Wrapper = themeStyles.apply(Box, 'Wrapper');
const Content = themeStyles.apply(Box, 'Content');
const ContentRow = themeStyles.apply(Row, 'ContentRow');
const ContentColumn = themeStyles.apply(Column, 'ContentColumn');
const ExpandAllCopy = themeStyles.apply(Copy, 'ExpandAllCopy');
const ContentCopy = themeStyles.apply(Copy, 'ContentCopy');
const Title = themeStyles.apply(Copy, 'Title');

const SpecificationsAccordionUI = ({
  specifications,
  trimIds,
  expandLabel,
  collapseLabel,
  carouselControl,
  variant,
}) => {
  const { currentSlide, bindDrag } = carouselControl;
  const { isSmallDesktop, isDesktop } = useMediaQueries();
  const { t } = useTranslation();
  const { specificationAccordionOffset } = useConfiguration(variant);

  const isMobile = !(isSmallDesktop || isDesktop);
  function getAccordionOffset(hasLastModelSelected) {
    if (isMobile) {
      return hasLastModelSelected
        ? specificationAccordionOffset.MOBILE.ALL_MODELS_SELECTED
        : specificationAccordionOffset.MOBILE.NOT_ALL_MODELS_SELECTED;
    }
    return hasLastModelSelected
      ? specificationAccordionOffset.DESKTOP.ALL_MODELS_SELECTED
      : specificationAccordionOffset.DESKTOP.NOT_ALL_MODELS_SELECTED;
  }

  const accordionOffset = getAccordionOffset(trimIds.at(-1));

  const accordionItems = specifications.map(category => ({
    key: category?.name,
    roleLabel: 'none',
    expandAriaLabel: `${category?.label} ${t('Shared.Common.expandAria')}`,
    collapseAriaLabel: `${category?.label} ${t('Shared.Common.collapseAria')}`,
    title: (
      <Title size="accordionLarge" data-testid="cy-product-specification">
        {category?.label}
      </Title>
    ),
    content: category?.specifications?.map(specification => {
      const specItemsArr = specification?.specs;
      let specItemsWithPlaceholder = specItemsArr;
      /*
      When num of spec items is less than MAX_COMPARE_ELEMENTS,
      match item according to the position of trimId and fill empty one
      */
      if (Array.isArray(specItemsArr) && specItemsArr.length < MAX_COMPARE_ELEMENTS) {
        specItemsWithPlaceholder = trimIds.map(trimId => {
          const matchingSpecItem = specItemsArr?.find(specItem => specItem?.trimId === trimId);
          // when a match is found, return item, if not, matchingSpecItem is undefined
          return matchingSpecItem;
        });
      }

      const specItems = specItemsWithPlaceholder?.map((item, itemIndex) => (
        <ContentColumn
          width={[1, 1, 1 / 5]}
          key={`${specification?.name}-${item?.trimId ?? itemIndex}`}
          /*
          even number column with selected model/trim will be highlighted with a grey bg in desktop viewport
          */
          highlighted={isMobile || (!(itemIndex % 2) && trimIds?.[itemIndex])}
        >
          <ContentCopy
            size="small"
            textAlign={item?.value === SPECS_ACCORDION_EMPTY_CONTENT ? 'center' : 'left'}
            isSingleColumn={category.specifications?.length === 1}
          >
            {compiler(stripMarkdownHeading(item?.value))}
          </ContentCopy>
        </ContentColumn>
      ));

      return (
        <Fragment key={specification?.name}>
          <Media greaterThan="smallDesktop">
            <ContentRow>
              <ContentColumn width={1 / 5}>
                <ContentCopy size="small" fontFamily="bold">
                  {compiler(stripMarkdownHeading(specification?.label))}
                </ContentCopy>
              </ContentColumn>
              {specItems}
            </ContentRow>
          </Media>
          <Media lessThan="desktop">
            <ContentRow>
              <ContentColumn width={1 / 2}>
                <ContentCopy data-testid="cy-product-specification-name" size="small" fontFamily="bold">
                  {compiler(stripMarkdownHeading(specification?.label))}
                </ContentCopy>
              </ContentColumn>
              <CarouselSlider
                currentSlide={currentSlide}
                bindDrag={bindDrag}
                items={specItems}
                equalHeight
                slideAnimation
                data-testid="cy-product-specification-value"
              />
            </ContentRow>
          </Media>
        </Fragment>
      );
    }),
  }));

  const accordionBehaviour = useAccordion(accordionItems);
  const { isAllExpanded, toggleAllItems } = accordionBehaviour;

  return (
    <Wrapper data-testid="cy-product-spec-wrapper">
      <ExpandAllButton
        data-testid="cy-expand-all"
        toggleItem={toggleAllItems}
        isActive={isAllExpanded}
        onKeyDown={keypressCallback(keyCodes.ENTER, toggleAllItems)}
        iconColorOverride="primary"
        ariaLabel={isAllExpanded ? t('Shared.CompareTrims.collapseAllLabel') : t('Shared.CompareTrims.expandAllLabel')}
      >
        <ExpandAllCopy
          aria-label={
            isAllExpanded ? t('Shared.CompareTrims.collapseAllLabel') : t('Shared.CompareTrims.expandAllLabel')
          }
        >
          {isAllExpanded ? collapseLabel : expandLabel}
        </ExpandAllCopy>
      </ExpandAllButton>
      <Content>
        <Accordion
          ariaExpanded="false"
          behaviour={accordionBehaviour}
          items={accordionItems}
          isCompact
          itemsHaveTopBorder
          isTitleSticky
          titleOffset={accordionOffset}
          colorStyling="default"
        />
      </Content>
    </Wrapper>
  );
};

SpecificationsAccordionUI.propTypes = {
  trimIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  specifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  expandLabel: PropTypes.string,
  collapseLabel: PropTypes.string,
  variant: PropTypes.string,
};

export default SpecificationsAccordionUI;
