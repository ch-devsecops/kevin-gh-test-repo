import styled from 'styled-components';
import css from '@styled-system/css';

const MobileFilterOpen = styled.button(
  css({
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    padding: '0',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
  }),
);

export default MobileFilterOpen;
