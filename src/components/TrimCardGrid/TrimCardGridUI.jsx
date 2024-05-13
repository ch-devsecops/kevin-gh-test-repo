import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, H4 } from '@honda-canada/design-system-react';
import themeStyles from '../CardGridSection/CardGridSection.styles';
import TrimCard from './TrimCard';
import CardGridSection from '../CardGridSection';
import CAROUSEL_SCROLL_WIDTH from '../CardGridSection/constants';
import useLayoutService from './utils/useLayoutService';
import getSelectedModelId from './utils/getSelectedModelId';
import usePrice from './usePrice';
import inventoryVehicleListFilters, {
  setSelectedModelKeyAction,
  setSelectedModelYearAction,
  setFilteredTrimsAction,
  setCurrentListTypeAction,
  getFilteredTrims,
  setNextStepUrl,
} from '../../core/reducers/inventoryVehicleListFilters';
import safelyStringifyJSON from '../../utils/safelyStringifyJSON';
import BackButton from '../TrimOverview/BackButton';

const CardGridWrapper = themeStyles.apply(Box, 'CardGridWrapper');
const Title = themeStyles.apply(H4, 'TrimCardsGridTitle');
const TitleWrapper = themeStyles.apply(Box, 'TitleWrapper');

const getTrimPrices = (modelKey, pricing) => {
  const { price, isFetchingPrice, hasPriceError } = pricing || {};

  const trimPrices = price?.models?.find(model => model.modelKey === modelKey);

  return {
    price: trimPrices,
    isFetchingPrice,
    hasPriceError,
  };
};

const TrimCardGrid = ({ models, params, title, backStepUrl, nextStepUrl }) => {
  const dispatch = useDispatch();

  const selectedModelYear = useSelector(state => state?.inventoryVehicleListFilters?.selectedModelYear);
  const selectedModelKey = useSelector(state => state?.inventoryVehicleListFilters?.selectedModelKey);
  const selectedModelId = getSelectedModelId(selectedModelKey, models);
  const { trims } = useLayoutService(selectedModelId, selectedModelYear);
  const filteredTrims = useSelector(getFilteredTrims) || [];
  const stringifiedTrimIds = trims.map(trim => trim.trimKey);
  const pricing = usePrice(selectedModelYear, selectedModelKey);

  useEffect(() => {
    params?.injectedReducer?.(inventoryVehicleListFilters, 'inventoryVehicleListFilters');
    dispatch(setCurrentListTypeAction('trims'));

    const searchParams = new URLSearchParams(window.location.search);
    const selectedModelKeyFromUrl = searchParams.get('modelKey');
    const selectedModelYearFromUrl = searchParams.get('modelYear');

    dispatch(setSelectedModelYearAction(selectedModelYearFromUrl));
    dispatch(setSelectedModelKeyAction(selectedModelKeyFromUrl));
    dispatch(setNextStepUrl(nextStepUrl));
  }, []);

  useEffect(() => {
    if (trims.length) {
      dispatch(setFilteredTrimsAction({ trims, key: `${selectedModelKey}|${selectedModelYear}` }));
    }
  }, [selectedModelKey, selectedModelYear, safelyStringifyJSON(stringifiedTrimIds)]);

  const backUrl = backStepUrl?.href;
  const backLabel = backStepUrl?.text;

  const backButtonField = {
    text: backLabel,
    href: backUrl,
  };

  return (
    <CardGridWrapper data-testid="cy-trim-cards-grid">
      <TitleWrapper>
        <BackButton backStepUrlField={backButtonField} />
        <Title data-testid="cy-trim-cards-grid-title">{title}</Title>
      </TitleWrapper>
      <CardGridSection
        items={filteredTrims}
        itemWidth={CAROUSEL_SCROLL_WIDTH}
        render={trim => (
          <TrimCard key={trim.transmissionKey} trim={trim} prices={getTrimPrices(selectedModelKey, pricing)} />
        )}
      />
    </CardGridWrapper>
  );
};

export default TrimCardGrid;
