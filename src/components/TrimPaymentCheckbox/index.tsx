import React from 'react';
import { Box, Checkbox, Copy, Label } from '@honda-canada/design-system-react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import themeStyles from './TrimPaymentCheckbox.styles';
import { getTrimInfo, setIncludeFees, setIsSellingPriceProvince } from '../../core/reducers/inventoryVehicleDetails';

const Title = themeStyles.apply(Copy, 'Title');
const Container = themeStyles.apply(Box, 'Container');
const Wrapper = themeStyles.apply(Box, 'Wrapper');

const TrimPaymentCheckbox = ({ componentName }: any) => {
  const { includeFees, isSellingPriceProvince } = useSelector(getTrimInfo);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Container data-component-name={`${componentName}-checkbox`} data-testid="cy-trim-payment-checkbox">
      <Title size="regular" fontWeight="bold">
        {t('Shared.Common.viewPricingLabel')}
      </Title>
      <Wrapper mb="m" data-testid="cy-trim-payment-checkbox-fee">
        <Label htmlFor="fee" ml={2}>
          {t('Shared.Common.includeFreightCheckboxLabel')}
        </Label>
        <Checkbox
          id="fee"
          containerSize="small"
          ariaLabel="aria label for checkbox"
          value="fee"
          name="fee"
          checked={isSellingPriceProvince}
          onChange={(value: boolean) => {
            dispatch(setIsSellingPriceProvince({ isSellingPriceProvince: value }));
            if (!value && includeFees) {
              dispatch(setIncludeFees({ includeFees: false }));
            }
          }}
        />
      </Wrapper>
      <Wrapper data-testid="cy-trim-payment-checkbox-tax">
        <Label htmlFor="tax" ml={2}>
          {t('Shared.Common.includeTaxesCheckboxLabel')}
        </Label>
        <Checkbox
          containerSize="small"
          id="tax"
          ariaLabel="aria label for checkbox"
          value="tax"
          name="tax"
          checked={includeFees}
          onChange={(value: boolean) => {
            if (value) {
              dispatch(setIsSellingPriceProvince({ isSellingPriceProvince: value }));
            }
            dispatch(setIncludeFees({ includeFees: value }));
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default TrimPaymentCheckbox;
