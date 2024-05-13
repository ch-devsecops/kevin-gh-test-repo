import React, { useContext } from 'react';
import PaymentUI from './Payment';
import { useAppName } from '../../../../utils/sitecoreContext';
import Context from '../../service/Context';
import { ACURA_SITE_NAME, HONDA_SITE_NAME, PSP_SITE_NAME } from '../../../../utils/constants';

const Payment = ({ vehicleType, ...rest }) => {
  const appName = useAppName();
  const { showPaymentInfoTooltip, showDisclaimerDetails } = useContext(Context);

  switch (appName) {
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
      return <PaymentUI showPaymentInfoTooltip={showPaymentInfoTooltip} {...rest} />;
    case PSP_SITE_NAME:
      return (
        <PaymentUI
          vehicleType={vehicleType}
          showPaymentInfoTooltip={showPaymentInfoTooltip}
          showDisclaimerAnchor={showDisclaimerDetails}
          {...rest}
        />
      );
    default:
      return <PaymentUI vehicleType={vehicleType} {...rest} />;
  }
};

export default Payment;
