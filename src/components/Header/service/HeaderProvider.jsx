import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import HeaderContext from './HeaderContext';

const HeaderProvider = ({ children, config }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [subMenuList, setSubMenuList] = useState({});
  const [activeMenu, setActiveMenu] = useState(null);

  const contextValue = useMemo(
    () => ({
      config,
      styles: config.styles,
      isOpenMenu,
      setIsOpenMenu,
      subMenuList,
      setSubMenuList,
      activeMenu,
      setActiveMenu,
    }),
    [isOpenMenu, subMenuList, activeMenu, config],
  );

  return <HeaderContext.Provider value={contextValue}>{children}</HeaderContext.Provider>;
};

HeaderProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default HeaderProvider;
