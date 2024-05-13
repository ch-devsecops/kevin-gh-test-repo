import React from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import { Tooltip, Link, Copy } from '@honda-canada/design-system-react';

const TooltipWithMarkdown = ({ content, children, styling, ...rest }) => {
  const color = styling === 'dark' ? 'typographyDefault' : 'white';
  const overrides = {
    a: {
      component: Link,
      props: {
        color,
        fontSize: 'sm',
      },
    },
  };

  return (
    <Tooltip
      content={
        <Copy color={color} size="tooltip">
          {compiler(content, { overrides })}
        </Copy>
      }
      styling={styling}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

TooltipWithMarkdown.propTypes = {
  styling: PropTypes.oneOf(['light', 'dark']),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.func,
};

export default TooltipWithMarkdown;
