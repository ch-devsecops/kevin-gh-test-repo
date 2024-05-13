import React, { useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Label } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import themeStyles from './ProductCard.styles';
import LocalStorageContext from '../LocalStorageContext/LocalStorageContext';
import { compareProducts } from '../../utils/constants';
import { ADDED_COMPARISON_ITEM, REMOVED_COMPARISON_ITEM } from './utils';

const Container = themeStyles.apply(Box, 'Container');
const CompareLabel = themeStyles.apply(Label, 'CompareLabel');
const CheckboxInput = styled('input').attrs({ type: 'checkbox', tabIndex: '-1', autoComplete: 'off' })(
  themeStyles.get('CheckboxInput'),
);
const ToggleWrapper = styled('label')(themeStyles.get('ToggleWrapper'));
const StyledCheckmark = styled('span')(
  ({ disabled, checked, theme }) => `
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;

  &::before {
    content: '';
    position: absolute;
    display: block;
    background-color: ${disabled ? theme.colors.grey[0] : theme.colors.red};
    transition: 0.4s all;
    bottom: 4px;
    left: 35%;
    width: 5%;
    height: 55%;
    border: solid ${disabled ? theme.colors.grey[0] : theme.colors.red};
    border-width: 0.1px;
    transition: 0.4s all;
    -ms-transform: rotate(${checked ? '45deg' : '180deg'});
    transform: rotate(${checked ? '45deg' : '180deg'});
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    background-color: ${disabled ? theme.colors.grey[0] : theme.colors.red};
    transition: 0.4s all;
    bottom: 4px;
    left: 35%;
    width: 5%;
    height: 55%;
    border: solid ${disabled ? theme.colors.grey[0] : theme.colors.red};
    border-width: 0.1px;
    transition: 0.4s all;
    -ms-transform: rotate(${checked ? '135deg' : '90deg'});
    transform: rotate(${checked ? '135deg' : '90deg'});
  }

  ${CheckboxInput}:disabled + & {
    border-color: ${theme.colors.grey[1]};
  }
`,
);

const CompareToggleButton = ({
  id,
  ariaLabel,
  compareLabelFontSize,
  compareLabelLineHeight,
  gtmTags,
  detId,
  ...rest
}) => {
  const { toCompareProducts, setToCompareProducts, removeFromCompareProducts } = useContext(LocalStorageContext);
  const [gtmTitle, setGtmTitle] = useState(ADDED_COMPARISON_ITEM);
  const { t } = useTranslation();

  const isCompared = useMemo(() => toCompareProducts.includes(detId), [toCompareProducts, detId]);

  useEffect(() => {
    if (isCompared) {
      setGtmTitle(REMOVED_COMPARISON_ITEM);
    } else {
      setGtmTitle(ADDED_COMPARISON_ITEM);
    }
  }, [isCompared]);

  const onCompareChange = () => {
    if (isCompared) {
      removeFromCompareProducts(detId);
    } else {
      setToCompareProducts(detId);
    }
  };

  const compareIconLabel = isCompared
    ? t('Shared.Common.removeFromCompareButton')
    : t('Shared.Common.addToCompareButton');

  const isDisabled = toCompareProducts.length >= compareProducts.limit && !isCompared ? 'disabled' : undefined;

  const stopPropagationHandler = event => {
    event.stopPropagation();
  };

  return (
    <Container mt="0" onClick={stopPropagationHandler}>
      <ToggleWrapper
        data-testid="product-card-compare-btn"
        data-testvalue={!!isCompared}
        {...gtmTags}
        data-gtm-title={gtmTitle}
      >
        <CheckboxInput
          id={id}
          containerSize="small"
          checked={isCompared}
          disabled={isDisabled}
          onChange={onCompareChange}
          aria-checked={isCompared}
          aria-disabled={isDisabled}
          aria-label={ariaLabel}
          {...gtmTags}
          data-gtm-title={gtmTitle}
          {...rest}
        />
        <StyledCheckmark disabled={isDisabled} checked={isCompared} data-testid="cy-compare-toggle" />
        <CompareLabel
          disabled={isDisabled}
          htmlFor={id}
          compareLabelFontSize={compareLabelFontSize}
          compareLabelLineHeight={compareLabelLineHeight}
        >
          {compareIconLabel}
        </CompareLabel>
      </ToggleWrapper>
    </Container>
  );
};
CompareToggleButton.defaultProps = {
  compareLabelFontSize: '14px',
  compareLabelLineHeight: '16px',
};

CompareToggleButton.propTypes = {
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  compareLabelFontSize: PropTypes.string,
  compareLabelLineHeight: PropTypes.string,
  gtmTags: PropTypes.shape({
    'data-gtm-interaction-type': PropTypes.string,
    'data-gtm-category': PropTypes.string,
    'data-gtm-component-type': PropTypes.string,
    'data-gtm-body-style': PropTypes.string,
    'data-gtm-model': PropTypes.string,
  }),
  detId: PropTypes.string.isRequired,
};

export default CompareToggleButton;
