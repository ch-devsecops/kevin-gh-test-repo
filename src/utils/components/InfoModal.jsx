import React from 'react';
import { Box, Button, Copy, Icon, IconWrapper, Modal } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { stripMarkdownHeading, styledCompiler } from '../markdown';

const ModalContent = ({ content, showClose, closeModal }) => (
  <Box>
    <Box mb="l" mx={['s', 'xl']}>
      <Copy size="regular" data-testid="cy-modal-content">
        {styledCompiler(stripMarkdownHeading(content))}
      </Copy>
    </Box>

    {showClose && (
      <Box display="flex" justifyContent="center" mt="l">
        <Button onClick={closeModal}>Close Modal</Button>
      </Box>
    )}
  </Box>
);

const InfoModal = ({ content, isDark, showModal, setShowModal }) => {
  const { t } = useTranslation();
  return (
    <>
      <IconWrapper
        data-testid="IconModal"
        onClick={e => {
          e.stopPropagation();
          setShowModal(prevState => !prevState);
        }}
        cursor="pointer"
        size="iconWrapper.s"
        ml="xxs"
        role="button"
        style={{
          width: 'auto',
          alignItems: 'start',
        }}
        aria-label={t('Shared.Common.showTooltipPopupAria')}
      >
        <Icon name="information" filled={false} inverted={isDark} />
      </IconWrapper>
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        allowClose
        closeAriaLabel={t('Shared.Common.pressToClosePopupAria')}
        role="button"
      >
        {({ closeModal }) => <ModalContent content={content} closeModal={closeModal} />}
      </Modal>
    </>
  );
};

export default InfoModal;
