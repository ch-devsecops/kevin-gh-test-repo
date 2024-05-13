import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Copy, Box } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { useTranslation } from 'react-i18next';
import { stripMarkdown } from '../../utils/markdown';
import themeStyles, { FilterItemButton } from './modelListFilter.styles';

const Container = themeStyles.apply(Box, 'Container');

const FilterItem = ({ children, isSelected, expanded, filterContainerWidth, ...props }) => {
  const { t } = useTranslation();

  return (
    <Container filterContainerWidth={filterContainerWidth}>
      {children ? (
        <FilterItemButton
          data-testid="category-filters"
          expanded={expanded}
          isSelected={isSelected}
          aria-label={`${isSelected ? t('Shared.Common.removeAria') : t('Shared.Common.selectAria')} ${stripMarkdown(
            children,
          )}`}
          {...props}
        >
          <Copy size="small" fontFamily="bold" ml="m" maxWidth="85%" textAlign="left">
            {compiler(children)}
          </Copy>
          {isSelected && <Icon mr="m" name="close" iconColor="white" />}
        </FilterItemButton>
      ) : null}
    </Container>
  );
};
FilterItem.propTypes = {
  children: PropTypes.node,
  isSelected: PropTypes.bool,
};

export default FilterItem;
