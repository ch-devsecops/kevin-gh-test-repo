/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Box, Link, Icon } from '@honda-canada/design-system-react';
import RoutableSitecoreLink from '../RoutableSitecoreLink';
import CTA from '../CTA';

const CTAs = ({ isShort, exploreCta, buildCta, gtmTitle }) =>
  isShort ? (
    <Box mt="s">
      {buildCta?.value?.href && (
        <span>
          <Link
            color="white"
            as={RoutableSitecoreLink}
            field={buildCta} // TODO: will this work in EE?
            data-gtm-title={gtmTitle?.value}
          />
          <Icon ml="xs" height="10px" iconColor="white" name="arrowRight" />
        </span>
      )}
      {exploreCta?.value?.href && (
        <span>
          <Link
            color="white"
            as={RoutableSitecoreLink}
            field={exploreCta} // TODO: will this work in EE?
            data-gtm-title={gtmTitle?.value}
            ml="m"
          />
          <Icon ml="xs" height="10px" iconColor="white" name="arrowRight" />
        </span>
      )}
    </Box>
  ) : (
    <>
      {buildCta?.value?.href && (
        <CTA linkField={buildCta} typeField={{ value: 'NsxPrimary' }} data-gtm-title={gtmTitle?.value} mb="m" />
      )}
      {exploreCta?.value?.href && (
        <CTA linkField={exploreCta} typeField={{ value: 'NsxSecondary' }} data-gtm-title={gtmTitle?.value} />
      )}
    </>
  );

export default CTAs;
