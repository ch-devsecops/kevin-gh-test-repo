import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import PropTypes from 'prop-types';

import themeStyles, { SaveCopy } from './PriceComponent.styles';
import { useLanguage } from '../../utils/sitecoreContext';

const Container = themeStyles.apply(Box, 'SaveContainer');

const SaveLabel = ({ value, saveStyles }) => {
  const { t } = useTranslation();
  const language = useLanguage();
  return (
    <Container data-testid="pricing-save" {...saveStyles?.container}>
      <SaveCopy data-testid="price-save-label" size={saveStyles?.copy?.size} styles={saveStyles?.copy?.styles}>
        {t('Shared.Common.saveLabel')}
      </SaveCopy>
      <SaveCopy data-testid="price-save-value" size={saveStyles?.copy?.size} styles={saveStyles?.copy?.styles}>
        {formatPrice(value, language)}
      </SaveCopy>
    </Container>
  );
};

SaveLabel.propTypes = {
  value: PropTypes.string,
  saveStyles: PropTypes.shape({
    container: PropTypes.shape({}),
    copy: PropTypes.shape({}),
  }),
};

export default SaveLabel;
