import React from 'react';
import { jssRender, axe } from 'test-utils';
import Categories from '../Categories';
import { modelListFilters } from '../../ModelFiltersContext/reducer';
import PriceFilter from '../PriceFilter';
import ModelListFilters from '../ModelListFilters';
import { getModelDataFromSitecoreRoute } from '../service/utils';

const routeData = require('../../../../sample-mock-data/routes/model-list-filters/en.json');
const mockHideFilterData = require('../../../../sample-mock-data/routes/model-list-filters/en-hide-price-filters.json');
const modelData = getModelDataFromSitecoreRoute(routeData);

describe('ModelListFilters Categories', () => {
  const renderMock = () => {
    return jssRender(
      <Categories
        years={['2021', '2022']}
        modelNames={['RDX', 'MDX']}
        filter={modelListFilters}
        hideModelFilter={{
          item: {
            value: true,
          },
        }}
        hideYearFilter={{
          item: {
            value: true,
          },
        }}
      />,
    );
  };

  const renderPriceFilterMock = () => {
    return jssRender(<ModelListFilters {...mockHideFilterData} />);
  };

  it('should render expanded categories', () => {
    const { container } = jssRender(
      <Categories years={['2021', '2022']} expandedCategories={['years']} filter={modelListFilters} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render provided filterTypes', () => {
    const { container } = jssRender(
      <Categories
        filter={modelListFilters}
        filterTypes={[
          {
            filterCategory: {
              fields: {
                name: 'bodyType',
                filterCategoryName: {
                  value: 'Body Type',
                },
                items: [
                  {
                    name: 'Sedan',
                    filterName: {
                      value: 'Sedan',
                    },
                  },
                  {
                    name: 'SUV',
                    filterName: {
                      value: 'SUV',
                    },
                  },
                  {
                    name: 'Liftback',
                    filterName: {
                      value: 'Liftback',
                    },
                  },
                ],
              },
            },
          },
          {
            filterCategory: {
              fields: {
                name: 'comfortConvenience',
                filterCategoryName: {
                  value: 'Comfort Convenience',
                },
                items: [
                  {
                    name: 'AcuraLink App',
                    filterName: {
                      value: 'AcuraLink App',
                    },
                  },
                  {
                    name: 'Heated Front Seats',
                    filterName: {
                      value: 'Heated Front Seats',
                    },
                  },
                  {
                    name: 'Surround View Camera',
                    filterName: {
                      value: 'Surround View Camera',
                    },
                  },
                ],
              },
            },
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render model names', () => {
    const { container } = jssRender(<Categories modelNames={['RDX', 'MDX']} filter={modelListFilters} />);

    expect(container).toMatchSnapshot();
  });

  it('should render exterior colors with design features', () => {
    const { container } = jssRender(
      <Categories
        filterTypes={[
          {
            filterCategory: {
              fields: {
                name: 'designFeatures',
                filterCategoryName: {
                  value: 'Design Features',
                },
                items: [],
              },
            },
          },
        ]}
        exteriorColors={[
          {
            colorName: {
              value: 'Lunar Silver Metallic',
            },
            detKey: {
              value: 'nh_830mlunar_silver_metallic',
            },
            hexValue: {
              value: '#8d919a',
            },
          },
        ]}
        filter={modelListFilters}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders disabled filter items based on filter values and model data', () => {
    const { container } = jssRender(
      <>
        <Categories
          years={['2021', '2022']}
          expandedCategories={['years']}
          filter={{
            ...modelListFilters,
            values: {
              ...modelListFilters.values,
              year: ['2021'],
            },
          }}
          modelData={modelData}
        />
      </>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should hide the models filter when set to false from sitecore', () => {
    const { queryByTestId } = renderMock();
    const modelCategoryId = queryByTestId('model-list-filter-categories-models');
    expect(modelCategoryId).toBeNull();
  });

  it('should hide the years filter when set to false from sitecore', () => {
    const { queryByTestId } = renderMock();
    const modelCategoryYear = queryByTestId('model-list-filter-categories-year');
    expect(modelCategoryYear).toBeNull();
  });

  it('should render the price filter correctly', () => {
    const { container } = jssRender(<PriceFilter />);
    expect(container).toMatchSnapshot();
  });

  it('should return null the price filter when set to false from sitecore', () => {
    const { queryByTestId } = renderPriceFilterMock();
    const filterContainer = queryByTestId('price-filter-container');
    expect(filterContainer).toBeNull();
  });

  it('should have no accessibility violations', async () => {
    const { container } = jssRender(
      <PriceFilter
        hidePriceFilter={{
          item: {
            value: false,
          },
        }}
      />,
    );

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
