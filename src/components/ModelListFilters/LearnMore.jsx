import React, { useState } from 'react';
import { Link, Box, Modal } from '@honda-canada/design-system-react';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { useSitecoreLayoutService } from '../../apiHooks';

const StyledButton = styled(Link)(({ expanded }) =>
  css({
    visibility: expanded ? 'visible' : 'hidden',
  }),
);

const LearnMore = ({ url, text, sitecoreContext, expanded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    response: layoutServiceRespone,
    placeholderName,
    isFetching,
    hasError,
  } = useSitecoreLayoutService(url.value, sitecoreContext);
  const { t } = useTranslation();

  if (!layoutServiceRespone || isFetching || hasError) return null;

  return (
    <Box display="flex" mb="xs" justifyContent="flex-end">
      <StyledButton as="button" styling="primary" expanded={expanded} onClick={() => setIsModalOpen(true)}>
        {text}
      </StyledButton>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        closeAriaLabel={t('Shared.Gallery.exitModalAria')}
        styling="fullOverlay"
        allowClose
      >
        {() => (
          <Placeholder
            name={placeholderName}
            fields={{ reduceWidth: layoutServiceRespone?.sitecore?.route?.fields?.reduceWidth }}
            rendering={layoutServiceRespone?.sitecore?.route}
          />
        )}
      </Modal>
    </Box>
  );
};

export default withSitecoreContext()(LearnMore);
