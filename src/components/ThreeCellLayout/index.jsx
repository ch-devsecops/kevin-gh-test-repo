import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Column, Wrapper, Row } from '@honda-canada/design-system-react';

const ThreeCellLayout = ({ rendering, fields }) => {
  if (!rendering) return null;

  const names = Object.keys(rendering.placeholders) || [];
  const areTwoRows = names.length === 6;

  return (
    <Wrapper id={fields?.anchorId?.value}>
      <Row>
        {names.map((name, i) => {
          let mb = name !== 'cell-three' ? ['l', 0] : 0;
          if (areTwoRows) {
            mb = ['l', 'columnGapFull.1'];
          }

          return (
            <Column key={i.toString()} width={[1 / 2, 1 / 3]} height="100%" mb={mb}>
              <Placeholder name={name} rendering={rendering} />
            </Column>
          );
        })}
      </Row>
    </Wrapper>
  );
};

export default ThreeCellLayout;
