import React, { useContext } from 'react';
import { Button } from '@honda-canada/design-system-react';

import type { CTAProps } from '../types';
import Context from '../service/Context';
import RoutableSitecoreLink from '../../RoutableSitecoreLink';

const CTA = (cta: CTAProps) => {
  const { cta: ctaContext } = useContext(Context) || {};
  const { text, href, linktype, target } = { ...ctaContext, ...cta };

  if (!href) return null;

  return (
    <Button
      styling="secondary"
      as={RoutableSitecoreLink}
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

export default CTA;
