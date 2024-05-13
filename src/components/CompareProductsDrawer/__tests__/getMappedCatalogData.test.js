import { getPspMappedCatalogData } from '../service/utils';
import mockPSPFields from '../../../../sample-mock-data/routes/psp-compare-drawer/en.json';

describe('Data mapping function for Product Drawer component', () => {
    it('getPspMappedCatalogData should return expected output', () => {
        const result = getPspMappedCatalogData(mockPSPFields.fields.data);
        expect(result).toMatchSnapshot();
    });
});
