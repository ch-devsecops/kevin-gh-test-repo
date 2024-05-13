import React from 'react';
import { Icon, IconWrapper } from '@honda-canada/design-system-react';
import css from '@styled-system/css';
import styled from 'styled-components';

const ToggleButton = styled.button(
  css({
    border: 'none',
    background: 'transparent',
    backgroundImage: 'none',
    p: 'zero',
    m: 'zero',
    display: 'flex',
    alignItems: 'center',
  }),
);

const Arrow = styled(Icon)(({ rotated, theme }) =>
  css({
    transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: `transform ${theme.transitionTimingFunction.default} ${theme.transitionDuration.t6}`,
  }),
);

export const Label = styled.span(({ color }) =>
  css({
    fontWeight: 'normal',
    fontFamily: 'bold',
    fontSize: '14px',
    color,
    letterSpacing: '0.5px',
  }),
);

const Toggle = ({ setIsOpen, label, isOpen, useToggle = true, backgroundColor }) => {
  if (useToggle) {
    return (
      <ToggleButton onClick={setIsOpen} color={backgroundColor === 'black' ? 'white' : 'black'}>
        {label && <Label color={backgroundColor === 'black' ? 'white' : 'black'}>{label}</Label>}
        <IconWrapper pl="xs" style={{ width: 'auto' }} color="white">
          <Arrow
            name="arrowDown"
            width="13px"
            height="6px"
            rotated={isOpen}
            color={backgroundColor === 'black' ? 'white' : 'black'}
          />
        </IconWrapper>
      </ToggleButton>
    );
  }
  return label ? <Label color={backgroundColor === 'black' ? 'white' : 'black'}>{label}</Label> : null;
};

export default Toggle;
