import React from 'react';
import { jssRender, fireEvent, cleanup, axe } from 'test-utils';
import BottomPaginator from '..';

const prevSlideMock = jest.fn();
const nextSlideMock = jest.fn();
const setCurrentSlideMock = jest.fn();

const mockData = {
  pages: 3,
  currentSlide: 0,
  prevSlide: prevSlideMock,
  nextSlide: nextSlideMock,
  setCurrentSlide: setCurrentSlideMock,
};

afterEach(cleanup);

describe('<ProductDetailsCard>', () => {
  test('it should render correctly', () => {
    const { container } = jssRender(<BottomPaginator {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('it should have no accessibility violations', async () => {
    const { container } = jssRender(<BottomPaginator {...mockData} />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render buttons with correct functionality', async () => {
    const { getByTestId } = jssRender(<BottomPaginator {...mockData} />);

    const leftButton = getByTestId('arrow-left');
    fireEvent.click(leftButton);
    expect(prevSlideMock).toHaveBeenCalled();

    const rightButton = getByTestId('arrow-right');
    fireEvent.click(rightButton);
    expect(nextSlideMock).toHaveBeenCalled();
  });

  it('should render all 3 pagination steps', () => {
    const { getByTestId } = jssRender(<BottomPaginator {...mockData} />);
    expect(getByTestId('step1')).toBeVisible();
    expect(getByTestId('step2')).toBeVisible();
    expect(getByTestId('step3')).toBeVisible();
  });
});
