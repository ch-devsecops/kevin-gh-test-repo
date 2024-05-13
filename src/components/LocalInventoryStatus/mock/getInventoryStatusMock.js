import hrvMock from './hr_v.json';
import crvMock from './cr-v.json';

// HR-V: 'in stock', CR-V: 'on its way'
const modelMockLookup = Object.freeze({
  hr_v: hrvMock,
  'cr-v': crvMock,
});

const getInventoryStatusMock = queryParams => {
  const modelCode = queryParams?.modelCode;
  const intColor = queryParams?.intColor;
  const extColor = queryParams?.extColor;
  return (
    // fallback status is 'pre-order'
    modelMockLookup[modelCode] ?? [
      {
        dealerCode: 2345,
        inventory: [
          {
            modelCode,
            availableStatus: 'preOrder',
            colors: [
              {
                extColor,
                intColor,
              },
            ],
          },
        ],
      },
    ]
  );
};

export default getInventoryStatusMock;
