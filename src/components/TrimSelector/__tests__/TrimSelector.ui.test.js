import 'jest-styled-components';
import React from 'react';
import { jssRender, fireEvent, cleanup } from 'test-utils';
import TrimSelector from '../index';
import { mockFields, mockFieldsNoTrim, toggleContentData } from '../mockTestData';

afterEach(cleanup);

const { year, model, trim } = toggleContentData.toggleLabels;
const ctaText = mockFields.ctaLabel.value;
const yearSelect = year.placeholder;
const modelSelect = model.placeholder;
const trimSelect = trim.placeholder;
const yearOption1 = '2018';
const modelOption1 = 'Fit';
const trimOption1 = 'FIT NAVI';
const yearError = year.error;
const modelError = model.error;
const trimError = trim.error;

describe('<TrimSelector>', () => {
  test('should render 3 dropdowns', () => {
    const { queryByText } = jssRender(<TrimSelector fields={mockFields} params={{ bgColour: 'Grey' }} />);

    expect(queryByText(yearSelect)).toBeInTheDocument();
    expect(queryByText(modelSelect)).toBeInTheDocument();
    expect(queryByText(trimSelect)).toBeInTheDocument();
    expect(queryByText('Title')).toBeInTheDocument();
    expect(queryByText('BodyText')).toBeInTheDocument();
  });

  test('should render disabled dropdowns (model and year)', () => {
    const { queryAllByRole } = jssRender(<TrimSelector fields={mockFields} params={{ bgColour: 'Grey' }} />);

    const yearSelectBtn = queryAllByRole('button')[0];
    const modelSelectBtn = queryAllByRole('button')[1];
    const trimSelectBtn = queryAllByRole('button')[2];

    expect(yearSelectBtn).not.toHaveAttribute('disabled');
    expect(modelSelectBtn).toHaveAttribute('disabled');
    expect(trimSelectBtn).toHaveAttribute('disabled');
  });

  test('dropdown cascading functionality', () => {
    const { queryByText, getByText, queryAllByRole } = jssRender(
      <TrimSelector fields={mockFields} params={{ bgColour: 'Grey' }} />,
    );

    // model and trim options should not be loaded yet
    expect(queryByText(modelOption1)).not.toBeInTheDocument();
    expect(queryByText(trimOption1)).not.toBeInTheDocument();

    // select a year
    fireEvent.click(getByText(yearSelect));
    fireEvent.mouseDown(queryByText(yearOption1));

    // model options are loaded and disabled state removed
    expect(getByText(modelOption1)).toBeInTheDocument();
    expect(queryAllByRole('button')[1]).not.toHaveAttribute('disabled');

    // select a model
    fireEvent.click(getByText(modelSelect));
    fireEvent.mouseDown(getByText(modelOption1));

    // trim options are loaded and disabled state removed
    expect(getByText(trimOption1)).toBeInTheDocument();
    expect(queryAllByRole('button')[2]).not.toHaveAttribute('disabled');
  });

  test('CTA href should be valid, and not encoded, only when all 3 options are selected', () => {
    const { queryByText, getByText } = jssRender(<TrimSelector fields={mockFields} params={{ bgColour: 'Grey' }} />);
    const cta = getByText(ctaText);
    expect(cta).not.toHaveAttribute('href');

    // select a year
    fireEvent.click(getByText(yearSelect));
    fireEvent.mouseDown(queryByText(yearOption1));
    expect(cta).not.toHaveAttribute('href');

    // select a model
    fireEvent.click(getByText(modelSelect));
    fireEvent.mouseDown(getByText(modelOption1));
    expect(cta).not.toHaveAttribute('href');

    // select a trim
    fireEvent.click(getByText(trimSelect));
    fireEvent.mouseDown(getByText(trimOption1));
    expect(cta).toHaveAttribute('href', 'url2?year=2018&model=Fit&trim=FIT NAVI');
  });

  test('error state when all options are not selected on CTA click', () => {
    const { queryByText, getByText } = jssRender(<TrimSelector fields={mockFields} params={{ bgColour: 'Grey' }} />);

    // error not present on initial load
    expect(queryByText(yearError)).not.toBeInTheDocument();

    const cta = getByText(ctaText);
    fireEvent.click(cta);

    // all errors are rendered
    expect(getByText(yearError)).toBeInTheDocument();
    expect(getByText(modelError)).toBeInTheDocument();
    expect(getByText(trimError)).toBeInTheDocument();

    // select a year
    fireEvent.click(getByText(yearSelect));
    fireEvent.mouseDown(queryByText(yearOption1));

    // clear only year error
    expect(queryByText(yearError)).not.toBeInTheDocument();
    expect(getByText(modelError)).toBeInTheDocument();
    expect(getByText(trimError)).toBeInTheDocument();

    // select a model
    fireEvent.click(getByText(modelSelect));
    fireEvent.mouseDown(getByText(modelOption1));

    // clear model error
    expect(queryByText(yearError)).not.toBeInTheDocument();
    expect(queryByText(modelError)).not.toBeInTheDocument();
    expect(getByText(trimError)).toBeInTheDocument();

    // select a trim
    fireEvent.click(getByText(trimSelect));
    fireEvent.mouseDown(getByText(trimOption1));

    // clear all errors
    expect(queryByText(yearError)).not.toBeInTheDocument();
    expect(queryByText(modelError)).not.toBeInTheDocument();
    expect(queryByText(trimError)).not.toBeInTheDocument();
  });

  test('container should have gtmTags', () => {
    const { container, getByText } = jssRender(
      <TrimSelector fields={mockFields} params={{ bgColour: 'Grey' }} rendering={{ componentName: 'TrimSelector' }} />,
    );

    const mainContainer = container.querySelectorAll('div')[0];
    const cta = getByText('CTA Label');

    expect(mainContainer).toHaveAttribute('data-gtm-category', 'Others');
    expect(mainContainer).toHaveAttribute('data-gtm-component-type', 'TrimSelector');
    expect(cta).toHaveAttribute('data-gtm-title', 'gtm title');
  });
});

describe('<TrimSelector> NO Trims Dropdown', () => {
  test('should render 2 dropdowns', () => {
    const { queryByText } = jssRender(<TrimSelector fields={mockFieldsNoTrim} params={{ bgColour: 'Grey' }} />);

    expect(queryByText(yearSelect)).toBeInTheDocument();
    expect(queryByText(modelSelect)).toBeInTheDocument();
    expect(queryByText(trimSelect)).not.toBeInTheDocument();
  });

  test('trim options are not rendered when model is selected', () => {
    const { queryByText, getByText } = jssRender(
      <TrimSelector fields={mockFieldsNoTrim} params={{ bgColour: 'Grey' }} />,
    );

    // model should NOT be loaded yet
    expect(queryByText(modelOption1)).not.toBeInTheDocument();

    // select a year
    fireEvent.click(getByText(yearSelect));
    fireEvent.mouseDown(queryByText(yearOption1));
    // select a model
    fireEvent.click(getByText(modelSelect));
    fireEvent.mouseDown(getByText(modelOption1));

    // trim options is NOT loaded
    expect(queryByText(trimOption1)).not.toBeInTheDocument();
  });

  test('CTA href is valid, and not encoded, when year and model are selected', () => {
    const { queryByText, getByText } = jssRender(
      <TrimSelector fields={mockFieldsNoTrim} params={{ bgColour: 'Grey' }} />,
    );
    const cta = getByText(ctaText);
    expect(cta).not.toHaveAttribute('href');

    // select a year
    fireEvent.click(getByText(yearSelect));
    fireEvent.mouseDown(queryByText(yearOption1));
    expect(cta).not.toHaveAttribute('href');

    // select a model
    fireEvent.click(getByText(modelSelect));
    fireEvent.mouseDown(getByText(modelOption1));
    expect(cta).toHaveAttribute('href', 'url2?year=2018&model=Fit');
  });
});
