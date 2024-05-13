import { Box } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import css from '@styled-system/css';

const BuildTrimSection = styled(Box)(({ isResized, areDelaysApplied }) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    opacity: isResized ? 0 : 1,
    transition: 'opacity .2s',
    transitionDelay: areDelaysApplied ? '.4s' : 'unset',
  }),
);

export default BuildTrimSection;
