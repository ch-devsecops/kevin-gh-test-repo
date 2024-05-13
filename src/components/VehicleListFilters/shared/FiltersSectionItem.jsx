import React from 'react';
import { Copy, Optional } from '@honda-canada/design-system-react';
import { useDispatch, useSelector } from 'react-redux';
import { compiler } from 'markdown-to-jsx';
import kebabCase from 'lodash/kebabCase';

import {
  addSelectedFilterItemAction,
  getEnabledFilterItems,
  getSelectedItems,
  removeSelectedFilterItemAction,
} from '../../../core/reducers/inventoryVehicleListFilters';
import isSSR from '../../../utils/isSSR';
import themeStyles from '../VehicleListFilters.styles';

const ImageButton = themeStyles.apply('button', 'ImageButton');
const Image = themeStyles.apply('img', 'Image');
const ImageLabel = themeStyles.apply(Copy, 'ImageLabel');
const Label = themeStyles.apply(Copy, 'Label');

const FiltersSectionItem = ({ item, parentTestId }) => {
  const { icon, label, key } = item;
  const [, filterValue] = item.key.split('|');
  const { src, alt } = icon || {};
  const hasImage = !!src;
  const formatLabelTestId = kebabCase(label);

  const dispatch = useDispatch();
  const isSelected = useSelector(getSelectedItems(key));
  const enabledFilterItems = useSelector(getEnabledFilterItems);
  const isDisabled = !enabledFilterItems.some(enabledFilterItem => {
    const parts = enabledFilterItem.split('|');
    return parts[1] === filterValue;
  });
  const tabIndexValue = isDisabled ? -1 : 0;

  const handlerClickFilterItem = () => {
    if (isDisabled) {
      return;
    }
    if (isSelected) {
      dispatch(removeSelectedFilterItemAction(key));
      return;
    }
    dispatch(addSelectedFilterItemAction(key));
    if (!isSSR()) window.scrollTo(0, 0);
  };

  return (
    <>
      <Optional when={hasImage && label}>
        <ImageButton
          active={isSelected}
          disabled={isDisabled}
          onClick={handlerClickFilterItem}
          data-testid={`cy-${formatLabelTestId}-tag`}
          tabIndex={tabIndexValue}
        >
          <Image src={src} alt={alt} />
          <ImageLabel size="small" data-testid={`cy-${parentTestId}-${formatLabelTestId}-image-label`}>
            {compiler(label)}
          </ImageLabel>
        </ImageButton>
      </Optional>
      <Optional when={!hasImage && label}>
        <Label
          as="button"
          size="small"
          active={isSelected}
          disabled={isDisabled}
          onClick={handlerClickFilterItem}
          data-testid={`cy-${formatLabelTestId}-tag`}
          tabIndex={tabIndexValue}
        >
          {compiler(label)}
        </Label>
      </Optional>
    </>
  );
};

export default FiltersSectionItem;
