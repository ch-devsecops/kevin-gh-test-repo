import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Tabs, Row, Column, Copy } from '@honda-canada/design-system-react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import NotImplemented from '../NotImplemented';
import PaymentDetails from './PaymentDetails';
import TrimPaymentCheckbox from '../TrimPaymentCheckbox';
import themeStyles from './styles/TrimPayment.styles';
import { ACURA_SITE_NAME, HONDA_SITE_NAME } from '../../utils/constants';
import { paymentConfigs, paymentTabs, DEFAULT_ACTIVE_TAB } from '../TrimUtils/constants';
import { setPaymentOptions } from '../../core/reducers/inventoryVehicleDetails';
import { useAllVehicleEffects } from '../TrimUtils';
import { useAppName } from '../../utils/sitecoreContext';

const Title = themeStyles.apply(Copy, 'Title');

const TrimPayment = ({ rendering, params, fields }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appName = useAppName();
  const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB);
  useAllVehicleEffects(params, paymentTabs[activeTab].method);

  // data from redux store
  let paymentMethod;
  let paymentFrequency;

  switch (appName) {
    case HONDA_SITE_NAME:
    case ACURA_SITE_NAME:
      paymentMethod = paymentTabs[activeTab].method;
      paymentFrequency = paymentConfigs[appName]?.[paymentMethod]?.frequency;
      break;
    default:
      break;
  }

  useEffect(() => {
    dispatch(
      setPaymentOptions({
        paymentOptions: {
          paymentMethod: paymentTabs[activeTab].method,
          paymentFrequency: paymentConfigs[appName]?.[paymentMethod]?.frequency,
        },
      }),
    );
  }, [activeTab]);

  if (!paymentMethod || !paymentFrequency) {
    return <NotImplemented name="Trim Payment" />;
  }

  const title = fields?.data?.value?.title?.value;

  const tabItems = paymentTabs.map(tab => ({
    key: tab.method,
    label: tab.label,
    content: <PaymentDetails />,
  }));

  const renderTab = ({ key, label, index, isActive, ariaLabel }) => (
    <Tabs.Tab key={key} label={t(label)} index={index} isActive={isActive} ariaLabel={ariaLabel} />
  );

  const renderPanel = ({ key, content, index, isActive, ariaLabel }) => (
    <Tabs.TabPanel key={key} isActive={isActive} index={index} ariaLabel={ariaLabel}>
      {content}
    </Tabs.TabPanel>
  );

  return (
    <Row data-component-name={rendering?.componentName} data-testid="cy-trim-payment">
      <Column width={[1, 1 / 2]}>
        <Title data-testid="cy-trim-payment-title">{title}</Title>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          renderTab={renderTab}
          renderPanel={renderPanel}
          ariaLabel="trim-payment"
        />
      </Column>
      <Column width={[1, 1 / 2]}>
        <TrimPaymentCheckbox />
      </Column>
    </Row>
  );
};

TrimPayment.propTypes = {
  fields: PropTypes.shape({}),
};

export default TrimPayment;
