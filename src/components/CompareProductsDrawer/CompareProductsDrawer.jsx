import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Optional, AlertModal } from '@honda-canada/design-system-react';
import CompareDrawer from './CompareDrawer';
import { gtmCompareDetails } from '../../utils/gtmEvents';
import usePrevious from '../../utils/hooks/usePrevious';
import CompareDrawerToggle from './CompareDrawerToggle';
import LocalStorageContext from '../LocalStorageContext/LocalStorageContext';
import themeStyles from './CompareDrawer.styles';
import BottomElementContext from '../Footer/BottomElementProvider/BottomElementContext';
import Context from './service/Context';

const DrawerContainer = themeStyles.apply(Box, 'DrawerContainer');

const CompareProductsDrawerUI = ({ productCatalogData, rendering, getModels }) => {
  const { t } = useTranslation();
  const [compareProductsList, setCompareProductsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { toCompareProducts, isCompareDrawerOpen, toggleCompareDrawer, deleteToCompareProducts } =
    useContext(LocalStorageContext);
  const { shouldUpdateIntersectingElement, bottomElementHeight, isHidden } = useContext(BottomElementContext);
  const previousCompareProductsList = usePrevious(compareProductsList);

  const { styles } = useContext(Context) || {};
  const { compareDrawerHeading } = styles || {};

  useEffect(() => {
    const currentCompareProductsList = getModels(toCompareProducts, productCatalogData);
    setCompareProductsList(currentCompareProductsList);

    if (previousCompareProductsList?.length < currentCompareProductsList?.length) {
      gtmCompareDetails(rendering?.componentName);
    }
  }, [toCompareProducts]);

  if (!productCatalogData.length) {
    return null;
  }
  const compareCount = toCompareProducts?.length;

  if (!compareCount) {
    return null;
  }

  const title = t(compareDrawerHeading, { count: compareCount || 0 });

  const SecondaryButtonHandler = () => {
    setShowModal(false);
    deleteToCompareProducts();
  };

  const CloseModalButtonHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <Optional when={!showModal}>
        <DrawerContainer
          isVisible={isCompareDrawerOpen}
          isIntersected={shouldUpdateIntersectingElement}
          bottomElementHeight={bottomElementHeight}
          isBackToTopHidden={isHidden}
          data-testid="compare-product-drawer-container"
        >
          <CompareDrawerToggle isDrawerOpen={isCompareDrawerOpen} toggleDrawer={toggleCompareDrawer} cta={{ title }} />
          <CompareDrawer
            isDrawerOpen={isCompareDrawerOpen}
            compareProducts={compareProductsList}
            setShowModal={setShowModal}
            gtmComponentName={rendering?.componentName}
          />
        </DrawerContainer>
      </Optional>
      <Optional when={showModal}>
        <AlertModal
          showModal={showModal}
          setShowModal={setShowModal}
          iconConfig={{ name: 'warning', filled: true, iconColor: 'black', iconSize: 'xLarge' }}
          title={t('Shared.Common.compareAlertHeading')}
          warningMessage={t('Shared.Common.compareAlertFirstText')}
          promptMessage={t('Shared.Common.compareAlertSecondText')}
          primaryButtonConfig={{
            label: t('Shared.Common.cancelButton'),
            props: {
              styling: 'primary',
              onClick: CloseModalButtonHandler,
              dataTestid: 'dsr-alerModal-button-primary',
            },
          }}
          secondaryButtonConfig={{
            label: t('Shared.Common.clearAllButton'),
            props: {
              styling: 'secondary',
              onClick: SecondaryButtonHandler,
              dataTestid: 'dsr-alerModal-button-secondary',
            },
          }}
          closeModalHandler={CloseModalButtonHandler}
        />
      </Optional>
    </>
  );
};

CompareProductsDrawerUI.propTypes = {
  productCatalogData: PropTypes.arrayOf(PropTypes.shape({})),
  getModels: PropTypes.func.isRequired,
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

export default CompareProductsDrawerUI;
