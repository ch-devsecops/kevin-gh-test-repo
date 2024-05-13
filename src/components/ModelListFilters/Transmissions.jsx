import React from 'react';
import { Copy, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import FilterItem from './FilterItem';
import { isFilterItemDisabled } from './service/utils';
import themeStyles from './modelListFilter.styles';

const FilterLabel = themeStyles.apply(Copy, 'FilterLabel');

const Transmissions = ({ transmissions, filter, dispatchFilter, modelData, expanded, showLabel }) => {
  const { t } = useTranslation();
  const { values } = filter;
  return (
    <>
      <Optional when={showLabel}>
        <FilterLabel size="small">{t('Pages.Models.Exploration.transmissionLabel')}</FilterLabel>
      </Optional>

      {transmissions.map(item => (
        <FilterItem
          key={item}
          isSelected={values.transmissionName.includes(item)}
          expanded={expanded}
          disabled={isFilterItemDisabled(filter, 'transmissionName', item, modelData)}
          onClick={() =>
            dispatchFilter({
              type: values.transmissionName.includes(item) ? 'REMOVE_ITEM' : 'ADD_ITEM',
              payload: {
                item: 'transmissionName',
                value: item,
              },
            })
          }
        >
          {item}
        </FilterItem>
      ))}
    </>
  );
};

export default Transmissions;
