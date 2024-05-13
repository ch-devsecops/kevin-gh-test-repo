import React, { useContext } from 'react';
import { Box, Button } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import themeStyles from './CompareDrawer.styles';
import DrawerCards from './DrawerCards';
import LocalStorageContext from '../LocalStorageContext/LocalStorageContext';
import { getComparePageUrl } from './service/utils';
import ScrollableDrawerCards from './ScrollableDrawerCards';
import Context from './service/Context';
import { gtmCompareDetails } from '../../utils/gtmEvents';

const ButtonGroup = themeStyles.apply(Box, 'ButtonGroup');
const SecondaryButton = themeStyles.apply(Button, 'Button');
const PrimaryButton = themeStyles.apply(Button, 'Button');
const DrawerWrapper = themeStyles.apply(Box, 'DrawerWrapper');

const CompareDrawer = ({ compareProducts, isDrawerOpen, setShowModal, gtmComponentName }) => {
  const { deleteToCompareProducts } = useContext(LocalStorageContext);
  const { t } = useTranslation();

  const { styles, hasDifferentProductLines } = useContext(Context) || {};
  const { isScrollable, buttonFontSize } = styles || {};

  const compareButtonHandler = event => {
    gtmCompareDetails(gtmComponentName);
    if (!hasDifferentProductLines) return;

    if (!getComparePageUrl(compareProducts) && typeof setShowModal === 'function') {
      event.preventDefault();
      setShowModal(true);
    }
  };

  const compareCount = compareProducts?.length;

  const compareBtnLabel = t('Shared.Common.drawerCompareButton', { count: compareCount || 0 });

  return (
    <DrawerWrapper data-testid="compare-drawer-products" isVisible={isDrawerOpen}>
      {isScrollable ? (
        <ScrollableDrawerCards compareProducts={compareProducts} />
      ) : (
        <DrawerCards compareProducts={compareProducts} />
      )}
      <ButtonGroup>
        <PrimaryButton
          as="a"
          href={hasDifferentProductLines ? t(getComparePageUrl(compareProducts)) : t('Shared.Common.comparePageUrl')}
          styling="primary"
          data-testid="compare-button"
          data-testvalue={compareCount}
          onClick={event => compareButtonHandler(event)}
          fontSize={buttonFontSize}
        >
          {compareBtnLabel}
        </PrimaryButton>
        <SecondaryButton
          data-testid="clear-button"
          styling="secondary"
          onClick={deleteToCompareProducts}
          fontSize={buttonFontSize}
        >
          {t('Shared.Common.clearAllButton')}
        </SecondaryButton>
      </ButtonGroup>
    </DrawerWrapper>
  );
};

CompareDrawer.propTypes = {
  compareProducts: PropTypes.arrayOf(PropTypes.shape({})),
  isDrawerOpen: PropTypes.bool,
  setShowModal: PropTypes.func,
  gtmComponentName: PropTypes.string,
};

export default CompareDrawer;
