import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row, Column, Wrapper } from '@honda-canada/design-system-react';

const TwoCardUpLayout = ({ rendering, fields }) => {
  if (!rendering) return null;

  const names = Object.keys(rendering.placeholders) || [];

  return (
    <Wrapper id={fields?.anchorId?.value}>
      <Row flexDirection={['column', 'row']}>
        <Column width={[1, 2 / 3]} mb={['l', 'columnGapFull.1']} height={['100%', 'auto']}>
          <Placeholder name={names[0]} rendering={rendering} />
        </Column>
        <Row display="flex" flexDirection={['row', 'column']} width={[1, 1 / 3]} justifyContent="center">
          <Column mb={['l', 'default']} width={[1 / 2, 1]} height={['100%', 'auto']}>
            <Placeholder name={names[1]} rendering={rendering} />
          </Column>
          <Column width={[1 / 2, 1]} mb={['l', 'columnGapFull.1']} height={['100%', 'auto']}>
            <Placeholder name={names[2]} rendering={rendering} />
          </Column>
        </Row>
      </Row>
    </Wrapper>
  );
};

export default TwoCardUpLayout;
