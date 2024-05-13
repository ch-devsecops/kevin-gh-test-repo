import React, { createContext, useMemo, useReducer, useContext } from 'react';
import { useCarouselControl } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';
import { MAX_COMPARE_ELEMENTS } from '../../utils/constants';

const initialState = {
  activeProducts: [],
};

const ActiveProductsContext = createContext([]);
const ActiveProductsUpdaterContext = createContext({});
const CarouselSliderContext = createContext({});

// hook for exposing activeProducts and update functions
export const useActiveProducts = () => {
  const activeProducts = useContext(ActiveProductsContext);
  const updaters = useContext(ActiveProductsUpdaterContext);

  return [activeProducts, updaters];
};

// hook for exposing carousel state and update functions
export const useCarouselSlider = () => {
  const carouselBehavior = useContext(CarouselSliderContext);

  return carouselBehavior;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_products':
      return { ...state, activeProducts: action.payload };

    case 'add_active_product': {
      const newProduct = action.payload;
      const { activeProducts } = state;
      if (activeProducts.length < MAX_COMPARE_ELEMENTS) {
        return { ...state, activeProducts: [...activeProducts, newProduct] };
      }
      return { ...state, activeProducts: [...activeProducts.slice(0, MAX_COMPARE_ELEMENTS - 1), newProduct] };
    }

    case 'on_product_selected': {
      const selectedProductId = action.payload;
      const { activeProducts } = state;

      const found = activeProducts.find(productId => productId === selectedProductId);
      if (!found) {
        if (activeProducts.length < MAX_COMPARE_ELEMENTS) {
          return { ...state, activeProducts: [...activeProducts, selectedProductId] };
        }
        return { ...state, activeProducts: [...activeProducts.slice(0, MAX_COMPARE_ELEMENTS), selectedProductId] };
      }
      return state;
    }

    case 'remove_product': {
      const productId = action.payload;
      const { activeProducts } = state;
      const update = activeProducts.filter(id => id !== productId);
      return { ...state, activeProducts: update };
    }

    default:
      return state;
  }
};

const ProductCompareContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Carousel state and update functions
  const carouselBehavior = useCarouselControl(MAX_COMPARE_ELEMENTS, false);

  const activeProductsUpdater = useMemo(() => {
    const setProducts = products => {
      dispatch({ type: 'set_products', payload: products });
    };

    const addActiveProduct = newItem => {
      dispatch({ type: 'add_active_product', payload: newItem });
    };

    const removeProduct = product => {
      dispatch({ type: 'remove_product', payload: product });
    };

    const onProductSelected = selectedProduct => {
      dispatch({ type: 'on_product_selected', payload: selectedProduct });
    };

    return {
      addActiveProduct,
      removeProduct,
      setProducts,
      onProductSelected,
    };
  }, []);

  return (
    <ActiveProductsContext.Provider value={state.activeProducts}>
      <ActiveProductsUpdaterContext.Provider value={activeProductsUpdater}>
        <CarouselSliderContext.Provider value={carouselBehavior}>{children}</CarouselSliderContext.Provider>
      </ActiveProductsUpdaterContext.Provider>
    </ActiveProductsContext.Provider>
  );
};

ProductCompareContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ProductCompareContextProvider;
