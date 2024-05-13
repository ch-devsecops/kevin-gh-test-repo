import React, { useContext, useEffect, useRef } from 'react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { compiler } from 'markdown-to-jsx';
import { Modal, Fade, Box, Image } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

import isSSR from '../../utils/isSSR';
import Context from './service/Context';
import { useLanguage } from '../../utils/sitecoreContext';

import themeStyles from './Accessories.styles';
import AccessoryCardImage from './shared/AccessoryCardImage';
import { SHOW_MODAL } from './service/reducer';

const DetailsContainer = themeStyles.apply(Box, 'DetailsContainer');
const DetailsImage = themeStyles.apply(Image, 'DetailsImage');
const DetailsTextGroup = themeStyles.apply(Box, 'DetailsTextGroup');
const DetailsTextTitle = themeStyles.apply(Box, 'DetailsTextTitle');
const DetailsTextNumber = themeStyles.apply(Box, 'DetailsTextNumber');
const DetailsTextPrice = themeStyles.apply(Box, 'DetailsTextPrice');
const DetailsTextDescription = themeStyles.apply(Box, 'DetailsTextDescription');

const AccessoriesDetailsCard = () => {
  const language = useLanguage();
  const { t } = useTranslation();
  const windowHeight = useRef('100%');

  const { isDark, hasPriceLabel, hasComingSoon, selectedAccessory, isModalOpen, dispatch, dictionary } =
    useContext(Context);

  useEffect(() => {
    if (isSSR()) return undefined;
    windowHeight.current = `${window?.innerHeight}px`;
  }, []);

  const handlerModalClose = () => dispatch({ type: SHOW_MODAL, payload: false });
  return (
    <Modal
      isOpen={isModalOpen}
      closeModal={handlerModalClose}
      ariaLabel={selectedAccessory?.accessoryName}
      styling="fullOverlay"
      allowClose
      closeAriaLabel={t('Shared.Common.pressToClosePopupAria')}
      closeBtnStyling={!isDark ? 'default' : 'circularWhite'}
      iconSize="default"
      backgroundColor={isDark ? 'black' : 'white'}
      data-testid="cy-accessory-details"
    >
      {() => (
        <Fade shouldAnimate initialOpacity={0}>
          <DetailsContainer>
            <AccessoryCardImage accessory={selectedAccessory} Component={DetailsImage} accessoryModal />
            <DetailsTextGroup>
              <DetailsTextTitle data-testid="cy-accessory-card-title">
                {selectedAccessory?.accessoryName}
              </DetailsTextTitle>
              <DetailsTextNumber data-testid="cy-accessory-card-number">
                {`${dictionary.partNumberLabel} ${selectedAccessory?.accessoryNumber}`}
              </DetailsTextNumber>
              <DetailsTextPrice data-testid="cy-accessory-card-price">
                {(selectedAccessory?.accessoryProvincialPrice &&
                  `${hasPriceLabel ? `${dictionary.pspMsrpLabel} ` : ''}${formatPrice(
                    selectedAccessory?.accessoryProvincialPrice,
                    language,
                    2,
                  )}`) ||
                  (hasComingSoon && !selectedAccessory?.accessoryProvincialPrice && dictionary.comingSoonLabel)}
              </DetailsTextPrice>
              <DetailsTextDescription data-testid="cy-accessory-card-description">
                {compiler(selectedAccessory?.accessoryDescription)}
              </DetailsTextDescription>
            </DetailsTextGroup>
          </DetailsContainer>
        </Fade>
      )}
    </Modal>
  );
};

export default AccessoriesDetailsCard;
