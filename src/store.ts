/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  combineSlices,
  configureStore,
  createAction,
  createReducer,
  createDynamicMiddleware,
  type Middleware,
  type Slice,
  type Reducer,
} from '@reduxjs/toolkit';
import camelcaseKeys from 'camelcase-keys';

type coreProps = {
  timeStamp: number;
};

const updateTimeAction = createAction?.('core/updateTime');
const dynamicMiddleware = createDynamicMiddleware?.();

// @ts-ignore
const core = createReducer?.({ timeStamp: Date.now() }, builder =>
  builder.addCase(updateTimeAction, (state: coreProps) => {
    // eslint-disable-next-line no-param-reassign
    state.timeStamp = Date.now();
  }),
);

export const rootReducer = combineSlices?.({ core })?.withLazyLoadedSlices?.();

export const injectedSlice = (injSliceApi: Slice) => rootReducer?.inject?.(injSliceApi);

// @ts-ignore
export const injectedApi = injSliceApi => {
  dynamicMiddleware.addMiddleware(injSliceApi.middleware);
  rootReducer?.inject?.(injSliceApi);
};
export const injectedReducer = (injReducer: Reducer, reducerPath: string) => {
  rootReducer.inject({ reducerPath, reducer: injReducer }, { overrideExisting: false });
};

export const responseHandlerMiddleware: Middleware = () => next => (action: any) => {
  if (action?.meta?.requestStatus === 'fulfilled') {
    return next({ ...action, payload: camelcaseKeys(action.payload, { deep: true }) });
  }
  return next(action);
};

export const getStore = () => {
  const globalStore = configureStore?.({
    reducer: rootReducer,
    // @ts-ignore
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware?.({
        serializableCheck: false,
      })
        .concat([responseHandlerMiddleware])
        .prepend(dynamicMiddleware?.middleware),
  });

  return globalStore;
};

export const store = getStore();

export type RootState = any;
