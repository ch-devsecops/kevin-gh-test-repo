/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Link, Icon } from '@honda-canada/design-system-react';
import { getGtmTagValue } from '../../../utils/gtmEvents';
import { getDetailsCtaGtmTagsByVariant } from '../service/utils';
import Context from '../service/Context';
import RoutableSitecoreLink from '../../RoutableSitecoreLink';

const Buttons = ({ bapPath, detailsPath, gtmModelName, gtmTrimName, gtmBodyStyle, modelYear, pspTrimCardGtmTags }) => {
  const { t } = useTranslation();
  const gtmInteractionType = 'cta: explore';
  const gtmTitle = 'vehicle tile';

  const { variant, detailsCtaLabel, isModelDetailsButton } = useContext(Context);
  const detailsLink = detailsPath && !isModelDetailsButton;
  const detailsButton = detailsPath && isModelDetailsButton;
  const ctaGtmTags = {
    'data-gtm-model': getGtmTagValue(gtmModelName),
    'data-gtm-trim': getGtmTagValue(gtmTrimName),
    'data-gtm-body-style': getGtmTagValue(gtmBodyStyle),
    'data-gtm-interaction-type': gtmInteractionType,
    'data-gtm-title': gtmTitle,
  };

  const detailsGtmTags = getDetailsCtaGtmTagsByVariant(
    variant,
    pspTrimCardGtmTags,
    detailsCtaLabel,
    modelYear,
    gtmModelName,
    gtmTrimName,
    ctaGtmTags,
  );

  return (
    <>
      {bapPath && (
        <Button
          as={RoutableSitecoreLink}
          styling="secondary"
          mb="s"
          gtmTags={{
            'aria-label': `${t('Shared.Common.buildAndPriceButton')} ${modelYear} ${gtmModelName} ${gtmTrimName}`,
            ...ctaGtmTags,
          }}
          field={{
            value: {
              linktype: 'external',
              href: bapPath,
              text: t('Shared.Common.buildAndPriceButton'),
            },
          }}
        />
      )}
      {detailsLink && (
        <Link
          as={RoutableSitecoreLink}
          field={{
            value: {
              linktype: detailsPath.startsWith('/') ? 'internal' : 'external',
              href: detailsPath,
            },
          }}
          styling="primary"
          gtmTags={{
            'aria-label': `${detailsCtaLabel} ${modelYear} ${gtmModelName} ${gtmTrimName}`,
            ...ctaGtmTags,
          }}
        >
          {detailsCtaLabel}
          <Icon ml="xs" height="10px" iconColor="primary" name="arrowRight" />
        </Link>
      )}
      {detailsButton && (
        <Button
          as={RoutableSitecoreLink}
          field={{
            value: {
              linktype: detailsPath.startsWith('/') ? 'internal' : 'external',
              href: detailsPath,
            },
          }}
          styling="secondary"
          gtmTags={detailsGtmTags}
        >
          {detailsCtaLabel}
        </Button>
      )}
    </>
  );
};

export default Buttons;
