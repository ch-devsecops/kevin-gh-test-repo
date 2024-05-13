import React from 'react';
import { Box, Copy, Optional } from '@honda-canada/design-system-react';
import CtaButton from './CtaButton';
import { type LeadsCtasPropsUIProps } from './types';
import { InventoryAvailabilityStatus } from '../../utils/constants';
import themeStyles from './LeadsCtas.styles';
import { getGtmPayload } from './utils';

const Wrapper = themeStyles.apply(Box, 'Wrapper');
const Title = themeStyles.apply(Copy, 'TitleCopy');

const LeadsCtasUI = ({
  fields,
  title,
  inventoryAvailabilityStatus,
  dealerName,
  model,
  trim,
  bodyStyle,
  componentType,
}: LeadsCtasPropsUIProps) => (
  <Wrapper data-testid="cy-leads-ctas">
    <Title>{title}</Title>
    <Optional when={inventoryAvailabilityStatus !== InventoryAvailabilityStatus.preOrder}>
      <CtaButton
        cta={fields?.bookAppointmentCta}
        type={fields?.bookAppointmentCtaType}
        gtmPayload={getGtmPayload(
          dealerName,
          fields?.bookAppointmentCta,
          model,
          trim,
          bodyStyle,
          inventoryAvailabilityStatus,
          componentType,
        )}
      />
      <CtaButton
        cta={fields?.bookTestDriveCta}
        type={fields?.bookTestDriveCtaType}
        gtmPayload={getGtmPayload(
          dealerName,
          fields?.bookTestDriveCta,
          model,
          trim,
          bodyStyle,
          inventoryAvailabilityStatus,
          componentType,
        )}
      />
    </Optional>
    <Optional when={inventoryAvailabilityStatus === InventoryAvailabilityStatus.preOrder}>
      <CtaButton
        cta={fields?.contactDealerCta}
        type={fields?.contactDealerCtaType}
        gtmPayload={getGtmPayload(
          dealerName,
          fields?.contactDealerCta,
          model,
          trim,
          bodyStyle,
          inventoryAvailabilityStatus,
          componentType,
        )}
      />
    </Optional>
  </Wrapper>
);
export default LeadsCtasUI;
