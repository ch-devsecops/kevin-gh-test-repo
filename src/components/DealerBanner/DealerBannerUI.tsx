import React from 'react';
import {
  Accordion,
  Box,
  Icon,
  IconWrapper,
  Link,
  Media,
  useThemeContext,
  useAccordion,
} from '@honda-canada/design-system-react';
import DealerHours from './DealerHours';
import themeStyles from './styles/DealerBanner.styles';
import type { Hours } from './types/hours.interface';

type DealerBannerUIProps = {
  dealerName: string;
  dealerIcon: string;
  dealerLink: string;
  dealerHours: Hours;
  bannerBackgroundColor: string;
};

const Container = themeStyles.apply(Box, 'Container');
const StickyMedia = themeStyles.apply(Media, 'StickyMedia');
const AccordionTitleContainer = themeStyles.apply(Box, 'AccordionTitleContainer');
const AccordionContentContainer = themeStyles.apply(Box, 'AccordionContentContainer');

const DealerBannerUI = ({
  dealerName,
  dealerIcon,
  dealerLink,
  dealerHours,
  bannerBackgroundColor,
}: DealerBannerUIProps) => {
  // convert color string to hex value
  const themeColor = useThemeContext('colors', bannerBackgroundColor);

  const iconAndDealerName = (
    <>
      <IconWrapper data-testid="cy-dealer-hour-icon" size="iconWrapper.sm">
        <Icon name={dealerIcon} color="white" logoColor={themeColor} />
      </IconWrapper>
      <Link href={dealerLink} styling="white" data-testid="cy-dealer-name" as="button">
        {dealerName}
      </Link>
    </>
  );

  const accordionItem = [
    {
      key: 'dealer-hours',
      title: <AccordionTitleContainer>{iconAndDealerName}</AccordionTitleContainer>,
      content: (
        <AccordionContentContainer>
          <DealerHours {...dealerHours} />
        </AccordionContentContainer>
      ),
    },
  ];
  const behaviour = useAccordion(accordionItem);

  return (
    <>
      <StickyMedia greaterThanOrEqual="desktop">
        <Container backgroundColor={bannerBackgroundColor}>
          {iconAndDealerName}
          <DealerHours {...dealerHours} />
        </Container>
      </StickyMedia>
      <StickyMedia lessThan="desktop">
        <Accordion
          behaviour={behaviour}
          items={accordionItem}
          iconColorOverride="white"
          panelBackgroundColor={bannerBackgroundColor}
          iconName="animatedArrowUpDown"
          itemsHaveBorders={false}
          contentContainerStyles={{ padding: '2px 0px 2px 11px', backgroundColor: bannerBackgroundColor }}
        />
      </StickyMedia>
    </>
  );
};

export default DealerBannerUI;
