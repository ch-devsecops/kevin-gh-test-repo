import styled from 'styled-components';
import css from '@styled-system/css';
import { IconWrapper } from '@honda-canada/design-system-react';

const ResetButton = styled(IconWrapper)(({ isDisabled, theme }) =>
  css({
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    padding: '0',
    outline: 'none',
    cursor: isDisabled ? 'no-drop' : 'pointer',
    width: 'auto',

    'p, span': {
      color: isDisabled ? 'grey.0' : 'black',
      fontSize: 'default',
      lineHeight: '24px',
    },

    '&:focus-visible': {
      outline: `solid 8px ${theme.colors.aodaFocused}`,
    },
    '&:focus': {
      border: 'transparent',
    },
  }),
);

export default ResetButton;
