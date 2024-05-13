/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import groupBy from 'lodash/groupBy';
import { Box, H4 } from '@honda-canada/design-system-react';

import CardGridSection from '../CardGridSection';
import CAROUSEL_SCROLL_WIDTH from '../CardGridSection/constants';
import ModelCard from './ModelCard';
import getModelPrices from './utils/getModelPrices';
import type { Model } from './interfaces/Model.interfaces';
import type { Price } from './interfaces/Price.interfaces';
import inventoryVehicleListFilters, {
  getFilteredModels,
  setCurrentListTypeAction,
  setFilteredModelsAction,
  setNextStepUrl,
} from '../../core/reducers/inventoryVehicleListFilters';
import themeStyles from '../CardGridSection/CardGridSection.styles';

type Pricing = {
  price: Price;
  isFetchingPrice: boolean;
  hasPriceError: boolean;
};

type ModelCardGridUIProps = {
  modelCards: Model[];
  pricing: Pricing;
  componentName: string;
  params: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    injectedReducer: (injReducer: any, reducerPath: any) => void;
  };
  nextStepUrl: {
    href: string;
    linktype: string;
  };
  title: string;
};

const CardGridWrapper = themeStyles.apply(Box, 'CardGridWrapper');
const Title = themeStyles.apply(H4, 'ModalCardsGridTitle');

const ModelCardGridUI = ({ modelCards, pricing, componentName, params, nextStepUrl, title }: ModelCardGridUIProps) => {
  const dispatch = useDispatch();
  const filteredModels = useSelector(getFilteredModels);

  useEffect(() => {
    params?.injectedReducer?.(inventoryVehicleListFilters, 'inventoryVehicleListFilters');
    // @ts-ignore: Unreachable code error
    dispatch(setFilteredModelsAction(modelCards));
    // @ts-ignore: Unreachable code error
    dispatch(setCurrentListTypeAction('models'));
    // @ts-ignore: Unreachable code error
    dispatch(setNextStepUrl(nextStepUrl));
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  const modelsByVehicleTypes = groupBy(filteredModels, modelCard => modelCard.filters?.bodyType?.[0]);

  return (
    <CardGridWrapper data-testid="cy-model-cards-grid">
      <Title data-testid="cy-model-cards-grid-title">{title}</Title>
      {Object.keys(modelsByVehicleTypes).map(vehicleType => {
        const models = modelsByVehicleTypes[vehicleType];
        // remove cards without vehicle type
        if (!models || !vehicleType || vehicleType === 'undefined') return null;
        return (
          <CardGridSection
            componentName={componentName}
            title={vehicleType}
            items={models}
            itemWidth={CAROUSEL_SCROLL_WIDTH}
            render={(item: Model) => (
              <ModelCard model={item} modelPrices={getModelPrices(item.detKey, item.defaultTrim.detKey, pricing)} />
            )}
            key={vehicleType}
          />
        );
      })}
    </CardGridWrapper>
  );
};

export default ModelCardGridUI;
