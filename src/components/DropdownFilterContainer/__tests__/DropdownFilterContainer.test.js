import 'jest-styled-components';
import React from 'react';
import { jssRender, fireEvent, cleanup } from 'test-utils';
import DropdownFilterContainer from '../index';
import { fields, rendering } from '../mock';

afterEach(cleanup);

const containerTitle = 'SELECT A VEHICLE';
const dropdown1Label = 'Model';
const dropdown2Label = 'Trim';
const dropdown1Placeholder = 'Select a model...';
const dropdown2Placeholder = 'Select a trim...';
const error1 = 'Error with item 1 occured';
const error2 = 'Error with item 2 occured';
const selectedOption1 = 'Option 1';
const selectedOption2 = 'Option 1.1';
const ctaText = 'View Vehicle';

describe('<DropdownFilterContainer> with 2 dropdowns', () => {
  test('should render 2 dropdowns', () => {
    const { getByText } = jssRender(<DropdownFilterContainer fields={fields} rendering={rendering} />);

    expect(getByText(containerTitle)).toBeInTheDocument();
    expect(getByText(dropdown1Label)).toBeInTheDocument();
    expect(getByText(dropdown2Label)).toBeInTheDocument();
    expect(getByText(dropdown1Placeholder)).toBeInTheDocument();
    expect(getByText(dropdown2Placeholder)).toBeInTheDocument();
  });

  test('2 dropdowns cascading functionality', () => {
    const { queryByText, getByText, getAllByRole } = jssRender(
      <DropdownFilterContainer fields={fields} rendering={rendering} />,
    );

    const sectionDropdown = getAllByRole('button')[0];
    const contentDropdown = getAllByRole('button')[1];

    expect(sectionDropdown).not.toHaveAttribute('disabled');
    expect(contentDropdown).toHaveAttribute('disabled');

    fireEvent.click(sectionDropdown);
    fireEvent.mouseDown(getByText(selectedOption1));

    expect(contentDropdown).not.toHaveAttribute('disabled');
    fireEvent.click(contentDropdown);
    fireEvent.mouseDown(getByText(selectedOption2));

    expect(queryByText(dropdown2Placeholder)).not.toBeInTheDocument();
    expect(queryByText(dropdown1Placeholder)).not.toBeInTheDocument();
  });

  test('handles error state when cta is clicked without selected section filter', () => {
    const { queryByText, getByText } = jssRender(<DropdownFilterContainer fields={fields} rendering={rendering} />);

    fireEvent.click(getByText(ctaText));
    expect(queryByText(error1)).toBeInTheDocument();
    expect(queryByText(error2)).toBeInTheDocument();
  });

  test('handles error state when cta is clicked without selected content filter', () => {
    const { queryByText, getByText, getAllByRole } = jssRender(
      <DropdownFilterContainer fields={fields} rendering={rendering} />,
    );

    const sectionDropdown = getAllByRole('button')[0];
    const contentDropdown = getAllByRole('button')[1];

    fireEvent.click(sectionDropdown);
    fireEvent.mouseDown(getByText(selectedOption1));
    fireEvent.click(getByText(ctaText));

    expect(queryByText(error1)).not.toBeInTheDocument();
    expect(queryByText(error2)).toBeInTheDocument();

    // clear content error state when a content dropdown value is selected
    fireEvent.click(contentDropdown);
    fireEvent.mouseDown(getByText(selectedOption2));
    expect(queryByText(error1)).not.toBeInTheDocument();
    expect(queryByText(error2)).not.toBeInTheDocument();
  });

  test('container should have gtmTags', () => {
    const { container, getByText } = jssRender(<DropdownFilterContainer fields={fields} rendering={rendering} />);

    const mainContainer = container.querySelectorAll('section')[0];
    const cta = getByText('View Vehicle');

    expect(mainContainer).toHaveAttribute('data-gtm-category', 'Others');
    expect(mainContainer).toHaveAttribute('data-gtm-component-type', 'DropdownFilterContainer');
    expect(cta).toHaveAttribute('data-gtm-title', 'gtm title');
  });
});
