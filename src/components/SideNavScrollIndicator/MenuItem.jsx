import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box, useThemeContext } from '@honda-canada/design-system-react';

const MenuItemBox = styled(Box)(({ isActive, isDark }) =>
  css({
    '> a:hover, a:focus': {
      borderBottom: 'none',
      color: isDark ? 'red' : 'blue',
    },
    '> a': {
      transition: 'none',
      borderBottom: 'none',
      color: isActive ? 'primary' : 'default',
    },
  }),
);

const handleClick = (id, offset, callback, e) => {
  if (typeof window === 'undefined') return undefined;
  const duration = 500;
  const el = document.getElementById(id);

  if (el) {
    e.preventDefault();
    el.style['padding-top'] = `${offset}px`;
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.log(`No element with id ${id} to scroll to`);
  }

  if (callback) {
    setTimeout(() => {
      callback();
    }, duration);
  }

  return undefined;
};

const MenuItem = ({ item, isActive, scrollCompletionCallback, isDark }) => {
  const header = useThemeContext('header');
  const scrollOffset = parseInt(header.desktop.stickyHeight || header.desktop.height, 10);

  return (
    <MenuItemBox
      isActive={isActive}
      isDark={isDark}
      onClick={e => handleClick(item.href.anchor, scrollOffset, scrollCompletionCallback, e)}
    >
      {item.link}
    </MenuItemBox>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    href: PropTypes.shape({
      anchor: PropTypes.string,
      class: PropTypes.string,
      href: PropTypes.string,
      linktype: PropTypes.string,
      text: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    }),
    link: PropTypes.element,
  }),
  isActive: PropTypes.bool,
  scrollCompletionCallback: PropTypes.func,
};

export default MenuItem;
