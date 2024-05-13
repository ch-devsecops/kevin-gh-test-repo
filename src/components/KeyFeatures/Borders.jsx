import React from 'react';
import styled from 'styled-components';
import { Fade } from '@honda-canada/design-system-react';

const Border = styled(Fade)`
  position: absolute;
  left: ${({ column }) => `${column * 25}%`};
  top: 0;
  display: block;
  height: 148px;
  width: 1px;
  background-color: #d5d5d5;
`;

const Borders = ({ shouldAnimate, isReversing }) => (
  <>
    {[1, 2, 3].map(column => (
      <Border
        shouldAnimate={shouldAnimate}
        as="span"
        direction={isReversing ? 'out' : 'in'}
        key={column}
        column={column}
        delay="0.2s"
        initialOpacity={isReversing || !shouldAnimate ? 1 : 0}
      />
    ))}
  </>
);

export default Borders;
