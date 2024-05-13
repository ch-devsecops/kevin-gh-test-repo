import React from 'react';
import { Copy, Wrapper, Row, Column, Link } from '@honda-canada/design-system-react';
import { styledCompiler } from '../../utils/markdown';

const linkOverrides = {
  button: {
    component: Link,
    props: {
      color: 'primary',
      fontSize: 'inherit',
      borderBottomColor: 'primary',
      borderBottom: '1px solid !important',
    },
  },
};

const LegalDisclaimer = ({ children }) =>
  children ? (
    <Wrapper>
      <Row>
        <Column width={1}>
          <Copy size="legal" my={7}>
            {styledCompiler(children, linkOverrides)}
          </Copy>
        </Column>
      </Row>
    </Wrapper>
  ) : null;

export default LegalDisclaimer;
