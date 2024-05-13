import React from 'react';
import { Modal, Row, Column, Box, Image, H3, Copy, Markdown } from '@honda-canada/design-system-react';

const OverlayModal = ({ image, featureCategory, title, copy, isOpen, setIsOpen, closeBtnStyling, isDarkMode }) => (
  <Modal
    isOpen={isOpen}
    closeModal={() => setIsOpen(false)}
    allowClose
    styling="fullOverlay"
    closeBtnStyling={closeBtnStyling}
    backgroundColor={isDarkMode ? 'black' : 'default'}
  >
    {() => (
      <Row>
        <Column width={[1, 55 / 100]} pl="zero" pr="zero">
          {image && <Image {...image} style={{ maxWidth: '100%' }} height={['50vh', '100vh']} />}
        </Column>
        <Column width={[1, 45 / 100]} pl={['default', 'zero']} pr={['default', 'zero']} pt={['default', 'zero']}>
          <Box
            height={['50vh', '100vh']}
            maxWidth={['100%', '52%']}
            mx="auto"
            display={['block', 'flex']}
            flexDirection="column"
            justifyContent="center"
          >
            {featureCategory && (
              <Copy color="primary" fontFamily="heading" mb="m">
                {featureCategory}
              </Copy>
            )}
            {title && (
              <H3 mb="m" color={isDarkMode ? 'white' : 'default'}>
                {title}
              </H3>
            )}
            {copy && <Markdown color={isDarkMode ? 'white' : 'default'}>{copy}</Markdown>}
          </Box>
        </Column>
      </Row>
    )}
  </Modal>
);

export default OverlayModal;
