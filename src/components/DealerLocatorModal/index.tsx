// eslint-disable-next-line import/no-extraneous-dependencies
import DealerLocator from '@honda-canada/react-subapp-dealer-locator/lib/components/DealerLocator';
import React, { useEffect, useState } from 'react';
import { Fade, Modal, useMediaQueries } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

import type { DealerLocatorModalProps } from './types';
import { useDarkFromRoute } from '../../utils/sitecoreContext';

const DealerLocatorModal = ({ mode, customCloseValue, ariaLabel }: DealerLocatorModalProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSmallDesktop, isDesktop } = useMediaQueries();
  const isMobile = !(isSmallDesktop || isDesktop);
  const isDark = useDarkFromRoute();

  const handlerModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    setIsModalOpen(customCloseValue);
  }, [customCloseValue]);

  return (
    <Modal
      isOpen={isModalOpen}
      closeModal={handlerModalClose}
      ariaLabel={ariaLabel}
      styling="fullOverlay"
      allowClose
      closeAriaLabel={t('Shared.Common.pressToClosePopupAria')}
      closeBtnStyling={isMobile && !isDark ? 'default' : 'circularWhite'}
      iconSize="default"
      backgroundColor={isDark ? 'black' : 'white'}
    >
      <Fade shouldAnimate initialOpacity={0}>
        <DealerLocator mode={mode} />
      </Fade>
    </Modal>
  );
};

export default DealerLocatorModal;
