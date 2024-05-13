import React, { useContext, useEffect, useRef } from 'react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { compiler } from 'markdown-to-jsx';
import {
  Media,
  Modal,
  Fade,
  Box,
  Copy,
  H3,
  Button,
  useMediaQueries,
  Optional,
} from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

import isSSR from '../../utils/isSSR';
import Context from './service/Context';
import { useLanguage } from '../../utils/sitecoreContext';

import themeStyles from './Accessories.styles';
import AccessoryCardImage from './shared/AccessoryCardImage';
import { SHOW_MODAL } from './service/reducer';

const OverlayContainer = themeStyles.apply(Box, 'OverlayContainer');
const OverlayContent = themeStyles.apply(Box, 'OverlayContent');
const OverlayImage = themeStyles.apply(Box, 'OverlayImage');
const OverlayTextGroup = themeStyles.apply(Box, 'OverlayTextGroup');
const Price = themeStyles.apply(Copy, 'OverlayTextGroupPrice');
const Description = themeStyles.apply(Copy, 'OverlayTextGroupDescription');
const Title = themeStyles.apply(H3, 'OverlayTextGroupTitle');
const ContentTitle = themeStyles.apply(Copy, 'OverlayTextContentTitle');
const OverlayTextContent = themeStyles.apply(Box, 'OverlayTextContent');
const ButtonOk = themeStyles.apply(Button, 'ButtonOk');

const AccessoriesOverlay = ({ onClose }) => {
  const { isMobile } = useMediaQueries();
  const language = useLanguage();
  const { t } = useTranslation();
  const windowHeight = useRef('100%');

  const { isDark, selectedAccessory, isModalOpen, dispatch } = useContext(Context);

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
      closeBtnStyling={isMobile && !isDark ? 'default' : 'circularWhite'}
      iconSize="default"
      backgroundColor={isDark ? 'black' : 'white'}
      data-testid="cy-accessory-overlay"
    >
      {() => (
        <Fade shouldAnimate initialOpacity={0}>
          <Media greaterThan="mobile">
            <OverlayContainer>
              <AccessoryCardImage accessory={selectedAccessory} />
              <OverlayTextContent isDark={isDark}>
                <ContentTitle size="small">
                  {`${selectedAccessory?.accessoryName} - ${formatPrice(
                    selectedAccessory?.accessoryProvincialPrice,
                    language,
                    2,
                  )}`}
                </ContentTitle>
              </OverlayTextContent>
            </OverlayContainer>
          </Media>

          <Media at="mobile">
            <OverlayContainer type="mobile" maxHeight={windowHeight.current}>
              <OverlayContent>
                <OverlayImage>
                  <AccessoryCardImage accessory={selectedAccessory} />
                </OverlayImage>
                <OverlayTextGroup>
                  <Title isDark={isDark} data-testid="cy-accessory-card-title">
                    {selectedAccessory?.accessoryName}
                  </Title>
                  <Price data-testid="cy-accessory-card-price">
                    {formatPrice(selectedAccessory?.accessoryProvincialPrice, language, 2)}
                  </Price>
                  <Optional when={selectedAccessory?.accessoryDescription}>
                    <Description size="extraSmall">{compiler(selectedAccessory?.accessoryDescription)}</Description>
                  </Optional>
                </OverlayTextGroup>
              </OverlayContent>
              <ButtonOk styling={isDark ? 'special' : 'secondary'} onClick={onClose}>
                {t('Shared.Common.okayButton')}
              </ButtonOk>
            </OverlayContainer>
          </Media>
        </Fade>
      )}
    </Modal>
  );
};

export default AccessoriesOverlay;
