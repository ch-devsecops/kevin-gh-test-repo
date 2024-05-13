import React, { useContext } from 'react';
import { Box, Copy, Icon } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';

import Link from '../../RoutableSitecoreLink';
import { getCurrentSelectedLink } from '../../../utils/urls';
import { stripMarkdown, stripMarkdownHeading } from '../../../utils/markdown';

import themeStyles from '../modelListFilter.styles';
import { ModelFiltersContext } from '../../ModelFiltersContext';

const Container = themeStyles.apply(Box, 'Container');
const NavLink = themeStyles.apply(Link, 'NavLink');
const NavLabel = themeStyles.apply(Copy, 'NavLabel');

const VehicleTypeNavItem = ({ vehicleTypeList, filterContainerWidth }) => {
  const modelFiltersContext = useContext(ModelFiltersContext);
  const { setLoadingOnNavigation } = modelFiltersContext || {};

  // If link is selected, prevent any further action.
  const onNavigationClick = isSelected => {
    if (!isSelected) {
      setLoadingOnNavigation(true);
    }
  };

  return vehicleTypeList.map(link => {
    const isSelected = getCurrentSelectedLink(link.href);
    return (
      <Container key={link.id} filterContainerWidth={filterContainerWidth}>
        <NavLink
          field={{
            value: {
              linktype: link?.linktype,
              href: link?.href,
              target: link?.target,
            },
          }}
          data-testid="cy-vehicle-type-link"
          isSelected={isSelected}
          aria-label={stripMarkdown(link.text)}
          onClick={() => onNavigationClick(isSelected)}
        >
          <NavLabel size="small">{compiler(stripMarkdownHeading(link.text))}</NavLabel>
          {!isSelected && <Icon mr="m" name="arrowRight" iconColor="black" />}
        </NavLink>
      </Container>
    );
  });
};

export default VehicleTypeNavItem;
