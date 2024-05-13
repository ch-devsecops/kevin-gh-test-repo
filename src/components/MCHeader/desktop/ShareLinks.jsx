import React from 'react';
import styled from 'styled-components';
import { Copy, Box, Image } from '@honda-canada/design-system-react';

const Container = styled(Box)({
  '.share-popup': {
    display: 'none',
  },

  ':hover': {
    '.share-popup': {
      display: 'flex',
    },
    path: {
      fill: '#ffffff',
    },
  },
});

const ShareContainer = styled(Box)({
  cursor: 'pointer',

  ':hover': {
    span: {
      color: ({ theme }) => theme.colors.white,
    },
  },
});

const ShareLinks = ({ label, icons }) => (
  <Container tabIndex={0} position="relative" height="100%" display="flex" pr="s">
    <ShareContainer display="flex" alignItems="center" border="none" background="none" padding="0px">
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.6024 20.3284C22.009 20.3284 21.4779 20.5627 21.0719 20.9297L15.504 17.689C15.5431 17.5094 15.5743 17.3298 15.5743 17.1423C15.5743 16.9549 15.5431 16.7753 15.504 16.5957L21.0094 13.3862C21.4311 13.7767 21.9855 14.0187 22.6024 14.0187C23.8987 14.0187 24.9451 12.9723 24.9451 11.676C24.9451 10.3797 23.8987 9.33333 22.6024 9.33333C21.3061 9.33333 20.2597 10.3797 20.2597 11.676C20.2597 11.8634 20.291 12.0431 20.33 12.2227L14.8247 15.4322C14.403 15.0417 13.8485 14.7996 13.2316 14.7996C11.9353 14.7996 10.8889 15.846 10.8889 17.1423C10.8889 18.4386 11.9353 19.485 13.2316 19.485C13.8485 19.485 14.403 19.243 14.8247 18.8525L20.3847 22.1011C20.3456 22.2651 20.3222 22.4369 20.3222 22.6087C20.3222 23.8659 21.3452 24.8889 22.6024 24.8889C23.8597 24.8889 24.8827 23.8659 24.8827 22.6087C24.8827 21.3514 23.8597 20.3284 22.6024 20.3284Z"
          fill="#e60033"
        />
      </svg>
      <Copy as="span" ml="5px" color="grey.1" size="extraSmall" textTransform="uppercase">
        {label}
      </Copy>
    </ShareContainer>
    <Box
      className="share-popup"
      as="ul"
      position="absolute"
      top="29px"
      right="0"
      background="rgba(51, 51, 51, 0.86)"
      justifyContent="flex-end"
      p="13px"
    >
      {icons?.map((icon, i) => (
        <Box key={i.toString()} as="li" height="20px" mx="xxs">
          <Box as="a" rel="noreferrer" width="100%" {...icon?.fields?.url?.value}>
            <Image {...icon?.fields?.logo?.value} width="auto" />
          </Box>
        </Box>
      ))}
    </Box>
  </Container>
);

export default ShareLinks;
