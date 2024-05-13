/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, H1, Icon, Link, Media, Wrapper as DesignSystemWrapper } from '@honda-canada/design-system-react';

import CompareLayout from './CompareLayout';
import useSyncUrlAndLocalStorage from './useSyncUrlAndLocalStorage';
import { useActiveProducts } from './ProductCompareContextProvider';
import { useProductCompareData } from './ProductCompareDataContextProvider';
import isIos from '../../utils/isIos';

import themeStyles from './styles/ProductCompare.styles';

const Wrapper = themeStyles.apply(DesignSystemWrapper, 'Wrapper');
const Title = themeStyles.apply(H1, 'Title');
const Container = themeStyles.apply(Box, 'MainContainer');

const MainContainer = ({ gtmTags, sectionHeadingTitle, goBackButton, variant }) => {
  const [activeProducts, { setProducts }] = useActiveProducts();

  const { urlParamName } = useProductCompareData();

  const {
    onRemoveModel,
    onSelectModel,
    onBackClick,
    resetUrlAndLocalStorage: onUpdate,
  } = useSyncUrlAndLocalStorage(activeProducts, setProducts, urlParamName);

  return (
    <Wrapper data-gtm-component-type={gtmTags?.type} data-testid="cy-product-compare" isIos={isIos}>
      <Container>
        <Title data-testid="compare-title">{sectionHeadingTitle}</Title>
        <Media lessThan="desktop">
          <Link
            href="#"
            styling="primary"
            onClick={onBackClick}
            color="typographyDefault"
            data-testid="mobile-go-back-button"
          >
            <Icon mr={1} height="10px" name="arrowLeft" iconColor="primary" />
            {goBackButton}
          </Link>
        </Media>
        <Media greaterThanOrEqual="desktop">
          <Button styling="secondary" onClick={onBackClick} px="zero" style={{ minWidth: '140px' }}>
            {goBackButton}
          </Button>
        </Media>
      </Container>
      <CompareLayout
        onRemove={onRemoveModel}
        onSelect={onSelectModel}
        gtmTags={gtmTags}
        onUpdate={onUpdate}
        variant={variant}
      />
    </Wrapper>
  );
};

MainContainer.propTypes = {
  sectionHeadingTitle: PropTypes.string.isRequired,
  goBackButton: PropTypes.string.isRequired,
  gtmTags: PropTypes.shape({
    'data-gtm-component-type': PropTypes.string,
    'data-gtm-interaction-type': PropTypes.string,
    'data-gtm-title': PropTypes.string,
  }),
};

export default MainContainer;
