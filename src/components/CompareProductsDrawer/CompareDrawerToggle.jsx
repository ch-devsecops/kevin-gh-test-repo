import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, Icon, Box, Copy } from '@honda-canada/design-system-react';
import themeStyles from './CompareDrawer.styles';
import BottomElementContext from '../Footer/BottomElementProvider/BottomElementContext';
import Context from './service/Context';

const SemiHexagonButton = themeStyles.apply(Link, 'SemiHexagonButton');
const SemiHexagonTitle = themeStyles.apply(Box, 'SemiHexagonTitle');
const CompareDrawerToggle = ({ cta, isDrawerOpen, toggleDrawer }) => {
  const { shouldUpdateIntersectingElement, bottomElementHeight, isHidden } = useContext(BottomElementContext);

  const { styles } = useContext(Context) || {};
  const { semiHexagonTitleIconColor } = styles || {};

  return (
    <SemiHexagonButton
      as="button"
      isVisible={isDrawerOpen}
      isIntersected={shouldUpdateIntersectingElement}
      bottomElementHeight={bottomElementHeight}
      isBackToTopHidden={isHidden}
      ariaExpanded={isDrawerOpen}
      onKeyDown={!isDrawerOpen ? toggleDrawer : undefined}
      aria-label={cta?.title}
      aria-labelledby={cta?.title}
      disableHover
      tabIndex={0}
      data-testid="compare-drawer-toggle"
    >
      <SemiHexagonTitle onClick={toggleDrawer} tabIndex={-1} isVisible={isDrawerOpen}>
        <Copy fontFamily="bold">{cta?.title}</Copy>
        <Icon ml="s" iconColor={semiHexagonTitleIconColor} name="arrowDown" tabIndex={0} />
      </SemiHexagonTitle>
    </SemiHexagonButton>
  );
};

CompareDrawerToggle.propTypes = {
  cta: PropTypes.shape({
    title: PropTypes.string,
  }),
  isDrawerOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};

export default CompareDrawerToggle;
