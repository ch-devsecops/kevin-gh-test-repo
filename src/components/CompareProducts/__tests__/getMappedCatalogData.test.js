import { getPspMappedCatalogData, getEngineMappedCatalogData, getMarineMappedCatalogData } from '../utils';
import mockPspFields from '../../../../sample-mock-data/routes/psp-compare-product/en.json';
import mockEngineFields from '../../../../sample-mock-data/routes/engine-compare/en.json';
import mockMarineFields from '../../../../sample-mock-data/routes/marine-compare-product/en.json';

describe('Data mapping function for Product Compare component', () => {
  it('getEngineMappedCatalogData should return expected output', () => {
    const result = getEngineMappedCatalogData(mockEngineFields.fields.data.item.series).flattenDataByHeight();
    expect(result).toMatchSnapshot();
  });

  it('getMarineMappedCatalogData should return expected output', () => {
    const result = getMarineMappedCatalogData(mockMarineFields.fields?.data?.item?.outboards).flattenDataByHeight();
    expect(result).toMatchSnapshot();
  });

  it('getPspMappedCatalogData should return expected output', () => {
    const mockVehicleTypes = mockPspFields.fields.data.value.productLine.fields.vehicleTypes;
    const result = getPspMappedCatalogData(mockVehicleTypes).flattenDataByHeight();
    expect(result).toMatchSnapshot();
  });
});
