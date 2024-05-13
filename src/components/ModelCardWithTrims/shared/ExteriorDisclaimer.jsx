import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Icon, IconWrapper, Copy } from '@honda-canada/design-system-react';
import Context from '../service/Context';
import themeStyles from '../ModelCardWithTrims.styles';

const Container = themeStyles.apply(Box, 'ExteriorDisclaimerContainer');
const Label = themeStyles.apply(Copy, 'ExteriorDisclaimerLabel');
const DisclaimerIconWrapper = themeStyles.apply(IconWrapper, 'ExteriorIconWrapper');

const ExteriorDisclaimer = memo(() => {
  const { t } = useTranslation();
  const { exteriorDisclaimerMarginTop, successIconProps } = useContext(Context);

  return (
    <Container exteriorDisclaimerMarginTop={exteriorDisclaimerMarginTop}>
      <DisclaimerIconWrapper data-testid="cy-model-card-color-disclaimer-icon">
        <Icon {...successIconProps} />
      </DisclaimerIconWrapper>
      <Label data-testid="cy-model-card-color-disclaimer-text">{t('Shared.Common.exteriorDisclaimerLabel')}</Label>
    </Container>
  );
});

ExteriorDisclaimer.displayName = 'ExteriorDisclaimer';

export default ExteriorDisclaimer;
