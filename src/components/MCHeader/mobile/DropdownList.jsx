import React from 'react';
import styled from 'styled-components';
import { Box, Copy, Icon, Image } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { stripMarkdownHeading } from '../../../utils/markdown';

export const Button = styled(Box)({
  border: 'none',
  width: '100%',
  backgroundColor: 'transparent',
  outline: 'none',
});

export const Link = styled(Box)({
  textDecoration: 'none',
});

// TODO: remove letterspacing on text components when mc design system is up
const NavLink = ({ link }) => {
  const isIcon = link?.fields?.logo;

  return (
    <Link as="a" rel="noreferrer" {...link.fields?.url?.value} py={isIcon ? '13px' : '20px'} px="20px" display="block">
      {isIcon ? (
        <Box height="36px">
          <Image {...link?.fields?.logo?.value} width="auto" />
        </Box>
      ) : (
        <Copy size="small" letterSpacing="0 !important" textTransform="uppercase" fontWeight="700" color="white">
          {compiler(stripMarkdownHeading(link.fields.url.value.text))}
        </Copy>
      )}
    </Link>
  );
};

const NavButton = ({ label, ...otherProps }) => (
  <Button as="button" p="20px" display="flex" justifyContent="space-between" alignItems="center" {...otherProps}>
    <Copy size="small" color="primary" textTransform="uppercase">
      {label}
    </Copy>
    <Box pr="xs" height="100%">
      <Icon name="arrowRight" iconColor="white" />
    </Box>
  </Button>
);

const DropdownList = ({ links, subNav = [], utilityLinks, setSubNav }) => (
  <Box as="ul" overflow="scroll">
    {links?.fields?.items?.map((link, i) => (
      <Box key={i.toString()} as="li" borderBottom="1px solid black">
        <NavLink link={link} />
      </Box>
    ))}

    {utilityLinks?.fields?.items?.map(link => (
      <Box key={link.id} as="li" borderBottom="1px solid black">
        <NavLink link={link} />
      </Box>
    ))}

    {subNav?.map(subNavItem => (
      <Box key={subNavItem?.name} as="li" borderBottom="1px solid black">
        <NavButton label={subNavItem?.fields?.title?.value} onClick={() => setSubNav(subNavItem)} />
      </Box>
    ))}
  </Box>
);

export default DropdownList;
