import React from 'react';
import { Column, SubNavigationBar, SubNavigationItem, Wrapper } from '@honda-canada/design-system-react';
import { Text, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { compiler } from 'markdown-to-jsx';
import { getRouteItems, getSectionNav } from './utils';
import AcuraZindexWorkaround from '../../utils/AcuraZindexWorkaround';
import { getTitleComponent, stripMarkdownHeading } from '../../utils/markdown';
import { ACURA_SITE_NAME } from '../../utils/constants';

const StyledNavItem = styled(SubNavigationItem)(
  ({ theme, size }) => ({
    height: !size === 'extraLarge' && `${theme.header.desktop.height}`,
  }),
  ({ isLast }) =>
    isLast && {
      marginRight: '0px',
    },
);

const DesktopSectionNav = ({ fields, params, sitecoreContext }) => {
  const { pageName, language } = params;
  const history = useHistory();
  const appName = sitecoreContext?.site?.name;

  if (!fields?.items?.length) {
    return null;
  }

  const { filteredItems, isInitialPage, parentPath } = getSectionNav(fields.items, pageName);

  if (!filteredItems?.length) {
    return null;
  }

  const handleRoute = itemRoute => {
    if (history?.location?.pathname?.toLowerCase() !== itemRoute?.toLowerCase()) {
      history.push(itemRoute);
    }
  };

  return (
    <>
      {appName === ACURA_SITE_NAME && <AcuraZindexWorkaround />}
      <SubNavigationBar styling="secondary" layout="custom" className="acura-z-index-workaround">
        <Wrapper>
          <Column display="flex" justifyContent="flex-end">
            {filteredItems?.map((item, i) => {
              const { isActive, path } = getRouteItems(item, i, pageName, isInitialPage, parentPath, language);
              const TextComponent = getTitleComponent(item.fields?.sectionNavLabel?.value, Text);

              return (
                <StyledNavItem
                  isPointable
                  key={i.toString()}
                  // FIXME: This is only required to support the ATVSXS super-tall header
                  // from the current-state site. Remove it if the Sitecore implementation
                  // is shorter.
                  isCustom={appName !== 'atvsxs'}
                  size={appName === 'atvsxs' && 'extraLarge'}
                  isLast={i === filteredItems.length - 1}
                  isActive={isActive}
                  onClick={() => handleRoute(path)}
                  aria-label={item.displayName}
                  role="link"
                  // remove focus outline on mouse action
                  onMouseDown={e => e.preventDefault()}
                >
                  <TextComponent field={item.fields?.sectionNavLabel}>
                    {compiler(stripMarkdownHeading(item.fields?.sectionNavLabel?.value))}
                  </TextComponent>
                </StyledNavItem>
              );
            })}
          </Column>
        </Wrapper>
      </SubNavigationBar>
    </>
  );
};

export default withSitecoreContext()(DesktopSectionNav);
