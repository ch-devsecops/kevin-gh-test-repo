/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Box, Copy } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import Link from '../../RoutableSitecoreLink';

const UtilityNavLink = styled(Box)(
  ({ theme }) => ({
    marginLeft: theme.space.s,
    a: {
      textDecoration: 'none',
    },
    p: {
      color: theme.colors.headerFooterGrey && theme.colors.headerFooterGrey[1],
    },
    ':hover ': {
      p: {
        color: theme.colors.white,
      },
    },
  }),
  ({ theme, isDealerLink }) =>
    isDealerLink && {
      p: {
        fontWeight: 700,
        color: theme.colors.white,
      },
    },
);

const UtilityNav = ({ utilityLinks }) => {
  if (!utilityLinks?.fields) return null;

  const { items: utilityItems } = utilityLinks?.fields || {};

  return utilityItems?.map((link, i) => (
    <UtilityNavLink key={i.toString()} isDealerLink={i === 0}>
      <Link rel="noreferrer" field={link?.fields?.url?.value}>
        <Copy size="extraSmall">{link?.fields?.url?.value?.text}</Copy>
      </Link>
    </UtilityNavLink>
  ));
};

export default UtilityNav;
