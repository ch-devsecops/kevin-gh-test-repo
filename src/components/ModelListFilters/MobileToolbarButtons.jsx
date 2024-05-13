import styled from 'styled-components';
import css from '@styled-system/css';
import { Button } from '@honda-canada/design-system-react';

export const MobileResetButton = styled(Button)(({ disabled }) =>
  css({
    textAlign: 'center',
    minHeight: '45px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    maxWidth: 'none',
    border: 'none',
    borderRadius: 0,
    width: '50%',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: disabled ? 'grey.1' : 'black',
  }),
);

export const MobileViewButton = styled(Button)(({ disabled }) =>
  css({
    textAlign: 'center',
    minHeight: '45px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    maxWidth: 'none',
    border: 'none',
    borderRadius: 0,
    width: '50%',
    justifyContent: 'center',
    backgroundColor: disabled ? 'disabled' : 'success',
    color: 'white',
  }),
);

export default { MobileResetButton, MobileViewButton };
