import React, { useContext } from 'react';
import { Copy } from '@honda-canada/design-system-react';

import Link from '../../RoutableSitecoreLink';
import type { TitleProps } from '../types';
import Context from '../service/Context';

import themeStyles from '../styles/Card.styles';

const TitleNavLink = themeStyles.apply(Link, 'CardLink');
const TitleNav = themeStyles.apply(Copy, 'CardLink');
const TitleCopy = themeStyles.apply(Copy, 'TitleCopy');

const Title = (titleProps: TitleProps) => {
  const { title: titleContext, cta } = useContext(Context) || {};

  const { alignment = 'center', title, href, linktype, target, label } = { ...titleContext, ...cta, ...titleProps };
  const TitleNavWrapper = href ? TitleNavLink : TitleNav;

  return (
    <TitleNavWrapper
      field={{
        value: {
          linktype,
          href,
          target,
        },
      }}
      aria-label={label}
      data-testid="cy-uni-card-title"
    >
      <TitleCopy alignment={alignment}>{title}</TitleCopy>{' '}
    </TitleNavWrapper>
  );
};

export default Title;
