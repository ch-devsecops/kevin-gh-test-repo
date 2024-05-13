import React, { useMemo } from 'react';
import { Box, Button, Copy } from '@honda-canada/design-system-react';
import { useSelector } from 'react-redux';
import { getDealerInfo } from '../../core/reducers/inventoryDealerDetails';
import { getTrimDetails } from '../../core/reducers/inventoryVehicleDetails';
import useFetchInventoryStatus from '../LocalInventoryStatus/useFetchInventoryStatus';
import themeStyles from './CtaCard.styles';
import type { CtaCardProps } from './types';
import { gtmContactDealer, getGtmTagValue } from '../../utils/gtmEvents';
import RoutableSitecoreLink from '../RoutableSitecoreLink';
import { InventoryAvailabilityStatus } from '../../utils/constants';

const Container = themeStyles.apply(Box, 'Container');
const CtaButton = themeStyles.apply(Button, 'CtaButton');
const MainText = themeStyles.apply(Copy, 'MainText');
const SubText = themeStyles.apply(Copy, 'SubText');

const CtaCard = ({ fields, rendering }: CtaCardProps) => {
  const gtmComponentType = getGtmTagValue(rendering?.componentName);

  const { dealerName = '', dealerCode = '' } = useSelector(getDealerInfo) || {};
  const { modelYear = '', modelKey = '', trimKey: gtmTrim } = useSelector(getTrimDetails) || {};

  const result = useFetchInventoryStatus({
    dealer: dealerCode,
    status: '',
  });

  const inventoryStatus = result?.data;

  const { href: hrefTemplate, linktype: linkType, target } = fields?.ctaLink.value || {};

  const href = useMemo(() => {
    if (!hrefTemplate || !dealerCode) {
      return '';
    }
    return hrefTemplate
      .replace('{{modelKey}}', modelKey)
      .replace('{{modelYear}}', modelYear)
      .replace('{{dealerCode}}', dealerCode);
  }, [hrefTemplate, dealerCode, modelKey, modelYear]);

  const ctaText = fields?.ctaLink.value.text;
  const title = fields?.title.value || '';
  const subTitleTemplate = fields?.subtitle.value || '';
  // Note: backend dynamic key DealerName starts with the capital D
  const subTitle = subTitleTemplate.replace('{{DealerName}}', dealerName);

  const onClickHandler = () => {
    gtmContactDealer({
      dealerName,
      linkUrl: href,
      componentType: gtmComponentType,
      model: modelKey,
      trim: gtmTrim,
      bodyStyle: fields.gtmBodyStyle.value,
      availabilityFlag: inventoryStatus
        ? inventoryStatus[0]?.inventory[0]?.availableStatus
        : InventoryAvailabilityStatus.preOrder,
    });
  };

  if (!fields) return null;

  return (
    <Container data-testid="cy-contact-dealer">
      <MainText>{title}</MainText>
      <SubText data-testid="cy-dealer-name">{subTitle}</SubText>
      <CtaButton
        as={RoutableSitecoreLink}
        onClick={onClickHandler}
        field={{
          value: {
            linkType,
            href,
            target,
          },
        }}
      >
        {ctaText}
      </CtaButton>
    </Container>
  );
};

export default CtaCard;
