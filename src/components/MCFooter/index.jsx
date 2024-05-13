import React from 'react';
import { Media } from '@honda-canada/design-system-react';
import DesktopFooter from './DesktopFooter';
import MobileFooter from './MobileFooter';
import ProvinceSelector from './ProvinceSelector';

const MCFooter = ({ fields }) => {
  const categories = fields?.items.find(field => field.displayName === 'NavigationSection')?.fields;
  const socials = fields?.items.find(field => field.displayName === 'SocialMediaSection')?.fields;
  const infoLinks = fields?.items.find(field => field.displayName === 'InfoLinksSection')?.fields;
  const brandLogos = fields?.items.find(field => field.displayName === 'BrandSection')?.fields;
  const legal = fields?.items.find(field => field.displayName === 'LegalSection');
  const findYourRide = fields?.items.find(field => field.displayName === 'ShoppersSection');
  const locationField = fields?.items.find(field => field.displayName === 'LocationSection');

  const provinces = locationField.fields?.items?.map(item => item.fields);
  const legalText = legal?.fields?.copyRightText?.value || '';
  const legalLinks = legal?.fields?.items;

  const ProvinceSelectorComponent = (
    <ProvinceSelector
      provinces={provinces}
      title={locationField.fields?.title.value}
      description={locationField.fields?.bannerDescription.value}
      placeholder={locationField.fields?.placeholder.value}
      bannerTitle={locationField.fields?.bannerTitle.value}
      bannerPlaceholder={locationField.fields?.bannerTogglePlaceholder.value}
      buttonLabel={locationField.fields?.ctaLink.value?.text}
    />
  );

  return (
    <>
      <Media lessThan="desktop">
        <MobileFooter
          socials={socials}
          infoLinks={infoLinks}
          legalText={legalText}
          legalLinks={legalLinks}
          provinceSelector={ProvinceSelectorComponent}
        />
      </Media>
      <Media greaterThan="smallDesktop">
        <DesktopFooter
          categories={categories}
          socials={socials}
          brandLogos={brandLogos}
          findYourRide={findYourRide}
          infoLinks={infoLinks}
          legalText={legalText}
          legalLinks={legalLinks}
          locationTitle={locationField.fields?.title.value}
          provinceSelector={ProvinceSelectorComponent}
        />
      </Media>
    </>
  );
};

export default MCFooter;
