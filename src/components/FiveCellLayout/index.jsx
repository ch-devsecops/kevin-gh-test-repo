import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Column, Wrapper, Row } from '@honda-canada/design-system-react';

const FiveCellLayout = ({ rendering, fields }) => {
  if (!rendering) return null;

  const names = Object.keys(rendering.placeholders) || [];

  return (
    <Wrapper id={fields?.anchorId?.value}>
      <Row>
        {names.map((name, i) => {
          const width = name === 'cell-one' ? [1, 2 / 3] : [1 / 2, 1 / 3];

          return (
            <Column key={i.toString()} width={width} height="100%" mb={['l', 'columnGapFull.1']}>
              <Placeholder name={name} rendering={rendering} />
            </Column>
          );
        })}
      </Row>
    </Wrapper>
  );
};

export default FiveCellLayout;
