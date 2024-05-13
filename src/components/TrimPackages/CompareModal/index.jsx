import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, H4, Box, Tab, Copy, Optional } from '@honda-canada/design-system-react';

import CompareTrimsTab from './CompareTrimsTab';
import FeaturesTab from './FeaturesTab';

import themeStyles from './CompareModal.styles';

const CompareContainer = themeStyles.apply(Box, 'CompareContainer');
const CompareTitle = themeStyles.apply(H4, 'CompareTitle');
const CompareContent = themeStyles.apply(Box, 'CompareContent');
const CompareTab = themeStyles.apply(Tab, 'CompareTab');
const CompareTabLabel = themeStyles.apply(Copy, 'CompareTabLabel');

const CompareModal = ({
  closeModal,
  financial,
  isOpen,
  modelName,
  selectedTrim,
  selectTrim,
  showInformationalApr,
  trims,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Modal
      isOpen={isOpen}
      closeAriaLabel={t('Shared.Gallery.exitModalAria')}
      allowClose
      closeModal={() => {
        closeModal();
        setActiveTab(0);
      }}
      styling="fullOverlay"
    >
      {() => (
        <CompareContainer>
          <CompareTitle>{t('Pages.Models.Exploration.trimPackagesCompareHeading', { modelName })}</CompareTitle>
          <CompareContent>
            <CompareTab isActive={activeTab === 0} onClick={() => setActiveTab(0)}>
              <CompareTabLabel>{t('Pages.Models.Exploration.trimPackagesAllTrimsLabel')}</CompareTabLabel>
            </CompareTab>
            <CompareTab isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
              <CompareTabLabel>{t('Pages.Models.Exploration.trimPackagesCompareTrimsLabel')}</CompareTabLabel>
            </CompareTab>
          </CompareContent>
          <Optional when={activeTab === 0}>
            <FeaturesTab trims={trims} selectTrim={selectTrim} closeModal={closeModal} />
          </Optional>
          <Optional when={activeTab === 1}>
            <CompareTrimsTab
              financial={financial}
              selectedTrim={selectedTrim}
              showInformationalApr={showInformationalApr}
              trims={trims}
            />
          </Optional>
        </CompareContainer>
      )}
    </Modal>
  );
};

export default CompareModal;
