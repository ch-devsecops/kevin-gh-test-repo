import React from 'react';
import { Box, Icon, Link } from '@honda-canada/design-system-react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { useTranslation } from 'react-i18next';
import OffersProvider from '../../OffersProvider';
import { getOffersStringVariables } from '../../../utils/urls';
import { OFFERS_URL } from '../../../utils/constants';
import useSharedApps from '../../../utils/sitecoreContext/useSharedApps';

const Offers = ({ modelKey, modelYear, transmissionKey, isDark }) => {
  const { t } = useTranslation();
  const offersBaseUrl = useSharedApps(OFFERS_URL);

  const offersUrlParams = getOffersStringVariables(modelKey, modelYear);
  return (
    <OffersProvider transmissionKey={transmissionKey}>
      {({ hasOffers }) => {
        if (!hasOffers) return null;
        return (
          <Box textAlign={['center', 'center', 'left']} mb="l">
            <Link
              color={isDark ? 'primary' : 'blue'}
              href={`${offersBaseUrl}${offersUrlParams}`}
              disableHover // TODO: update Link component to support disablehover (lowercase)
            >
              <Icon mr="xxs" name="specialOffer" iconColor={isDark ? 'lightRed' : 'blue'} />
              {t('Pages.Models.Exploration.viewOffersLabel')}
            </Link>
          </Box>
        );
      }}
    </OffersProvider>
  );
};

export default withSitecoreContext()(Offers);
