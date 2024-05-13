/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Link, Icon } from '@honda-canada/design-system-react';
import RoutableSitecoreLink from '../RoutableSitecoreLink';

const Buttons = ({ transmission }) => {
  const { t } = useTranslation();

  return (
    <>
      {transmission.bapPath && (
        <Button
          as={RoutableSitecoreLink}
          styling="secondary"
          mb="s"
          field={{
            value: {
              linktype: 'internal',
              href: transmission.bapPath,
              text: t('Shared.ModelCardWithTrims.buildAndPriceLabel'),
            },
          }}
        />
      )}
      {transmission.specsPath && (
        <Link
          as={RoutableSitecoreLink}
          field={{
            value: {
              linktype: 'internal',
              href: transmission.specsPath,
            },
          }}
          styling="alternatePrimary"
        >
          {t('Shared.ModelCardWithTrims.viewTrimSpecsLabel')}
          <Icon ml="xs" height="10px" iconColor="primary" name="arrowRight" />
        </Link>
      )}
    </>
  );
};

export default Buttons;
