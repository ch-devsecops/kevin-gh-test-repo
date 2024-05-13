import React from 'react';
import { Link, DropdownNavigation } from '@honda-canada/design-system-react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { NavLink } from 'react-router-dom';
import { compiler } from 'markdown-to-jsx';
import { getSectionNav, getRouteItems } from './utils';
import { stripMarkdownHeading, getTitleComponent } from '../../utils/markdown';

const MobileSectionNav = ({ fields, params }) => {
  const { pageName, language } = params;

  if (!fields?.items?.length) {
    return null;
  }

  const { filteredItems, isInitialPage, parentPath } = getSectionNav(fields.items, pageName);

  if (!filteredItems?.length) {
    return null;
  }

  const navItems = filteredItems.map((item, i) => {
    const { isActive, path } = getRouteItems(item, i, pageName, isInitialPage, parentPath, language);
    const TextComponent = getTitleComponent(item.fields?.sectionNavLabel?.value, Text);
    return {
      isActive,
      component: (
        <Link as={NavLink} to={path} disableHover>
          <TextComponent field={item.fields?.sectionNavLabel}>
            {compiler(stripMarkdownHeading(item.fields?.sectionNavLabel?.value))}
          </TextComponent>
        </Link>
      ),
    };
  });

  const ActiveNavTextComponent = getTitleComponent(params?.routeLabel?.value, Text);

  return (
    <DropdownNavigation
      activeNav={
        <ActiveNavTextComponent field={params?.routeLabel}>
          {compiler(stripMarkdownHeading(params?.routeLabel?.value))}
        </ActiveNavTextComponent>
      }
      items={navItems}
    />
  );
};

export default MobileSectionNav;
