import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import isSSR from '../../utils/isSSR';

const Link = ({ to, children, ...rest }) => {
  // Handler to scroll to the top of the page
  const scrollToTop = () => {
    if (!isSSR()) {
      window.scrollTo(0, 0);
    }
  };

  if (to.startsWith('/')) {
    return (
      <RouterLink to={to} {...rest} onClick={scrollToTop}>
        {children}
      </RouterLink>
    );
  }
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
};

export default Link;
