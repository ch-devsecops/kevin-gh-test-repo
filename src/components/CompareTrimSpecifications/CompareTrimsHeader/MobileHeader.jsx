import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Wrapper, Box, Column } from '@honda-canada/design-system-react';
import { useContainerResize } from '../../../utils/hooks/useContainerResize';

const Header = styled(Box)(({ isResized }) =>
  css({
    overflowY: 'hidden',
    transition: 'height .7s ease',
    height: isResized ? '200px' : '456px',
  }),
);

const HeaderInner = styled(Box)(({ isResized }) =>
  css({
    height: '456px',
    pb: 5,
    pt: isResized ? 5 : 7,
    transition: 'padding-top .7s ease',
  }),
);

const MobileHeader = ({ heading, trimSelector, isSticky }) => {
  const resizeAfter = 20;
  const scrollable = typeof window !== 'undefined' && window;
  const { isResized, areDelaysApplied } = useContainerResize(resizeAfter, scrollable);

  return (
    <Header
      isResized={isResized}
      position={isSticky && 'sticky'}
      top="45px"
      bg="grey.5"
      width="100%"
      zIndex={210}
      boxShadow={isResized ? 'box.subNav' : 'none'}
    >
      <HeaderInner isResized={isResized}>
        <Wrapper height="100%" gutters={[false, false]}>
          <Column
            width={1}
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            {heading}
            <Box flex="1 0 auto" display="flex" flexDirection="column" width={1} mt="xs">
              {trimSelector(isResized, areDelaysApplied)}
            </Box>
          </Column>
        </Wrapper>
      </HeaderInner>
    </Header>
  );
};

MobileHeader.propTypes = {
  trimSelector: PropTypes.func,
  heading: PropTypes.element,
  isSticky: PropTypes.bool,
};

export default MobileHeader;
