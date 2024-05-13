import React from 'react';
import { Box, Wrapper, Row, useThemeContext, Image, Copy } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import styled from 'styled-components';
import Link from '../../RoutableSitecoreLink';
import { stripMarkdownHeading } from '../../../utils/markdown';

const MainNavItem = styled(Box)(({ theme }) => ({
  borderBottom: '4px solid #000000',
  cursor: 'pointer',

  ':hover': {
    p: {
      color: theme.colors.primary,
    },

    borderBottom: `4px solid ${theme.colors.primary}`,
  },
}));

const MainNavLink = styled(Box)({
  textDecoration: 'none',
});

const InfoLink = styled(Box)({
  textDecoration: 'none',
});

const TopNavItem = styled(Box)(({ theme }) => ({
  cursor: 'pointer',

  p: {
    color: theme.colors.headerFooterGrey && theme.colors.headerFooterGrey[0],
  },

  ':hover ': {
    p: {
      color: theme.colors.white,
    },
  },

  ':last-child': {
    marginRight: '0px',
  },
}));

// TODO: remove letterspacing on text components when mc design system is up
const MainNav = ({ mainNav, infoLinks, siteLogo, siteLogoLink, langToggle }) => {
  const { header } = useThemeContext();

  return (
    <Wrapper as="header" height={header.desktop.height} backgroundColor="trueBlack">
      <Row height="100%" justifyContent="center">
        <Row height="100%" width="996px" justifyContent="space-between">
          <Box width="227px" height="100%">
            {siteLogo?.value?.src && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <Link field={siteLogoLink}>
                <Image {...siteLogo.value} />
              </Link>
            )}
          </Box>

          <Box as="nav" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
            <Box as="ul" pt="s" pr="s" display="flex" justifyContent="flex-end">
              {infoLinks?.fields?.items?.map(link => (
                <TopNavItem key={link.fields.url.value.text} as="li" mx="xxs">
                  <InfoLink as="a" rel="noreferrer" {...link.fields.url.value}>
                    <Copy size="extraSmall" letterSpacing="0 !important">
                      {compiler(stripMarkdownHeading(link.fields.url.value.text))}
                    </Copy>
                  </InfoLink>
                </TopNavItem>
              ))}
              <TopNavItem mx="xxs">
                <InfoLink as="a" href={langToggle.url}>
                  <Copy size="extraSmall">{langToggle.code.toUpperCase()}</Copy>
                </InfoLink>
              </TopNavItem>
            </Box>

            <Box width="100%" as="ul" display="flex" justifyContent="flex-end">
              {mainNav?.fields?.items?.map(link => (
                <MainNavItem key={link?.fields?.url?.value?.text} as="li" px="s" pb="xxs" borderColor="primary">
                  <MainNavLink as="a" rel="noreferrer" {...link.fields.url.value}>
                    <Copy size="small" letterSpacing="0 !important" fontFamily="heading" color="white">
                      {compiler(stripMarkdownHeading(link.fields.url.value.text))}
                    </Copy>
                  </MainNavLink>
                </MainNavItem>
              ))}
            </Box>
          </Box>
        </Row>
      </Row>
    </Wrapper>
  );
};

export default MainNav;
