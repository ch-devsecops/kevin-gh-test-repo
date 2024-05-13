import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup, screen } from 'test-utils';

import { UserLocationContext } from '@honda-canada/user-location';
import CompareTrims from '../CompareTrims';
import { trims } from '../mockData';

const hydratedTrims = trims.map((trim, i) => ({
  specs: [
    {
      category: 'ENGINE',
      items: [
        {
          label: 'My Label',
          value: `value-${i}`,
        },
      ],
    },
  ],
  legalDisclaimers: {
    category: 'LEGAL CATEGORY',
    items: ['disclaimer 1', 'disclaimer 2'],
  },
  ...trim,
}));

jest.mock('../../../apiHooks', () => ({
  useTrimPayment: () => ({
    payment: {
      amount: 999,
    },
    isFetching: false,
  }),
}));

jest.mock('../PrintComparison', () => ({
  __esModule: true,
  A: true,
  default: 'print',
}));

afterEach(cleanup);

const sitecoreContext = { provinces: [{ name: 'QC', provinceCode: 'QC', showMsrpPrice: false, showSellingPrice: true }] };

describe('<CompareTrims>', () => {
  const renderMock = () =>
    jssRender(
      <CompareTrims
        trims={hydratedTrims}
        title="My Title"
        firstTrim={hydratedTrims[0]}
        secondTrim={hydratedTrims[1]}
        legalDisclaimer="My disclaimer"
        minHeight="auto"
        language="en"
        provinces={[]}
      />,
    );

  test('Should render the provided title', () => {
    renderMock();
    const title = screen.getByText('My Title');

    expect(title).toBeInTheDocument();
  });

  test('Should render links to current-state BAP with selected trims', () => {
    renderMock();
    const buildCtas = screen.getAllByText('Shared.CompareTrims.buildThisTrimLabel');

    expect(buildCtas[0]).toHaveAttribute('href', expect.stringContaining('mdx_10259'));
    expect(buildCtas[1]).toHaveAttribute('href', expect.stringContaining('tech_10260'));
  });

  test('Should render the provided first and second trim', () => {
    renderMock();
    const firstTrimName = screen.getByText(hydratedTrims[0].name);
    const secondTrimName = screen.getByText(hydratedTrims[1].name);

    expect(firstTrimName).toBeInTheDocument();
    expect(secondTrimName).toBeInTheDocument();
  });

  // eslint-disable-next-line prettier/prettier
  test('Should show the category, label and each trim\'s value for a given spec', () => {
    renderMock();
    const category = screen.getByText('ENGINE');
    const label = screen.getByText('My Label');
    const firstValue = screen.getByText('value-0');
    const secondValue = screen.getByText('value-1');

    expect(category).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(firstValue).toBeInTheDocument();
    expect(secondValue).toBeInTheDocument();
  });

  test('Should show the legal disclaimers as an accordion with the single-line items (not label/value pairs)', () => {
    renderMock();
    const category = screen.getByText('LEGAL CATEGORY');
    const label = screen.getByText('disclaimer 1');

    expect(category).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label.innerHTML).toBe('disclaimer 1');
  });

  test('Should render legal disclaimer text', () => {
    jssRender(
      <UserLocationContext.Provider value={{ city: 'toronto', provinceCode: 'ON', provinceName: 'Ontario' }}>
        <CompareTrims
          trims={hydratedTrims}
          title="My Title"
          firstTrim={hydratedTrims[0]}
          secondTrim={hydratedTrims[1]}
          legalDisclaimer="test"
          provinces={[
            { name: 'QC', displayName: 'Quebec', showMsrpPrice: false, showSellingPrice: true },
            { name: 'ON', displayName: 'Ontario', showMsrpPrice: true, showSellingPrice: false },
          ]}
        />
      </UserLocationContext.Provider>,
      { context: { sitecoreContext } },
    );

    expect(screen.queryByText('test')).toBeInTheDocument();
  });

  test('Should not render legal disclaimer text', () => {
    jssRender(
      <UserLocationContext.Provider value={{ city: 'Montreal', provinceCode: 'QC', provinceName: 'Quebec' }}>
        <CompareTrims
          trims={hydratedTrims}
          title="My Title"
          firstTrim={hydratedTrims[0]}
          secondTrim={hydratedTrims[1]}
          legalDisclaimer="test"
          provinces={[
            { name: 'QC', displayName: 'Quebec', showMsrpPrice: false, showSellingPrice: true },
            { name: 'ON', displayName: 'Ontario', showMsrpPrice: true, showSellingPrice: false },
          ]}
        />
      </UserLocationContext.Provider>,
      { context: { sitecoreContext } },
    );

    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });
});
