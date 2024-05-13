import React from 'react';
import NotImplemented from '../NotImplemented';
import DealerBannerUI from './DealerBannerUI';
import useGetDealerHours from './utils/useGetDealerHours';
import { useAppName } from '../../utils/sitecoreContext';
import { ACURA_SITE_NAME, HONDA_SITE_NAME } from '../../utils/constants';
import { bannerConfigs } from './utils/constants';
import type { Hours } from './types/hours.interface';

type DealerBannerProps = {
  fields: {
    dealerName: string;
    dealerLink: string;
    dealerHours: Hours;
  };
};

const DealerBanner = ({ fields }: DealerBannerProps) => {
  const appName = useAppName();
  const dealerData = useGetDealerHours();

  // Dealer hours mock data from Sitecore fields only for local dev, to be updated
  const name = fields?.dealerName || dealerData.name;
  const link = fields?.dealerLink || dealerData.link;
  const hours = fields?.dealerHours || dealerData.hours;
  let configs = {
    icon: '',
    bgColor: '',
  };

  switch (appName) {
    case HONDA_SITE_NAME:
      configs = bannerConfigs[HONDA_SITE_NAME];
      break;
    case ACURA_SITE_NAME:
      configs = bannerConfigs[ACURA_SITE_NAME];
      break;
    default:
      return <NotImplemented name="Dealer Banner" />;
  }

  const { icon, bgColor } = configs;

  return (
    <DealerBannerUI
      dealerName={name}
      dealerLink={link}
      dealerHours={hours}
      dealerIcon={icon}
      bannerBackgroundColor={bgColor}
    />
  );
};

export default DealerBanner;
