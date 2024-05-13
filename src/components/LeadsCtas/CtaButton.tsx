import React from 'react';
import { Button as DesignSystemButton } from '@honda-canada/design-system-react';
import { pushLeadsCtaEvent } from '../../utils/gtmEvents';
import RoutableSitecoreLink from '../RoutableSitecoreLink';
import type { CtaProps } from './types';

import themeStyles from './LeadsCtas.styles';

const Button = themeStyles.apply(DesignSystemButton, 'Button');

const CtaButton = (props: CtaProps) => {
  const { linktype, href, target, text } = { ...props?.cta };
  const ctaType = props?.type;

  if (!href) return null;

  const onClickHandler = () => {
    pushLeadsCtaEvent(props?.gtmPayload);
  };

  return (
    <Button
      styling={ctaType}
      as={RoutableSitecoreLink}
      onClick={onClickHandler}
      field={{
        value: {
          linktype,
          href,
          target,
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CtaButton;
