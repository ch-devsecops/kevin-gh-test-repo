import React from 'react';
import { Button } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import themeStyles from '../SimilarProducts.styles';
import Link from '../../TrimCard/Link';

const StyledButton = themeStyles.apply(Button, 'CTAButton');

const CTAButton = ({ trim }) => {
  const { t } = useTranslation();
  return (
    <Link to={trim?.detailsPath}>
      <StyledButton data-testid="cy-trimCTA" styling="secondary">
        {t('Pages.Models.Exploration.viewModelDetailsButton')}
      </StyledButton>
    </Link>
  );
};

export default CTAButton;
