import styled from 'styled-components';
import { css } from '@styled-system/css';
import { Box } from '@honda-canada/design-system-react';

const Container = styled(Box)(
  css({
    width: '100%',
    display: 'flex',
    '& div': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '>div': {
      position: 'absolute',
      bottom: 0,
    },
    backgroundSize: 'cover',
    position: 'relative',
  }),
  ({ isShort }) =>
    css({
      height: isShort ? ['345px', '810px'] : ['180px', '810px'],
      flexDirection: 'column-reverse',
    }),
);

export default Container;
