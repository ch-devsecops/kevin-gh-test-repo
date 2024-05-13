import React from 'react';
import { cleanup, jssRender, MockFields, MockRendering, within } from 'test-utils';
import CarouselCardsContainer from '..';
import { getCarouselPagesNumber, getResponsiveCardsPerPage } from '../utils';

afterEach(cleanup);

describe('<CarouselCardsContainer>', () => {
  it('should render title when provided', () => {
    const mockFields = new MockFields();
    mockFields.add('items', []);
    const mockRendering = new MockRendering('CarouselCardsContainer');
    mockRendering.add('placeholders', { 'carousel-cards-content': [] });
    const params = { cardsPerPage: 'Two' };

    const renderMock = () =>
      jssRender(<CarouselCardsContainer fields={mockFields} rendering={mockRendering} params={params} />);

    const { container } = renderMock();
    const H3 = container.querySelector('h3');
    const title = within(H3).queryByText(mockFields.contentTitle.value);

    expect(title).toBeInTheDocument();
  });

  it('should render no title when null', () => {
    const mockFields = new MockFields();
    const titleValue = mockFields.contentTitle.value;
    mockFields.add('items', []);

    mockFields.contentTitle.value = '';
    const mockRendering = new MockRendering('CarouselCardsContainer');
    mockRendering.add('placeholders', { 'carousel-cards-content': [] });
    const params = { cardsPerPage: 'Two' };

    const { queryByText } = jssRender(
      <CarouselCardsContainer fields={mockFields} rendering={mockRendering} params={params} />,
    );

    expect(queryByText(titleValue)).not.toBeInTheDocument();
  });

  it('should render correct pages and cards', () => {
    let allCards = 6;
    let cardsPerPage = 2;
    let carouselPagesNumber = getCarouselPagesNumber(allCards, cardsPerPage);
    let renderedCardsPerPage = getResponsiveCardsPerPage(allCards, cardsPerPage, false, false);
    expect(carouselPagesNumber).toEqual(3);
    expect(renderedCardsPerPage).toEqual(2);

    allCards = 16;
    cardsPerPage = 4;
    carouselPagesNumber = getCarouselPagesNumber(allCards, cardsPerPage);
    renderedCardsPerPage = getResponsiveCardsPerPage(allCards, cardsPerPage, false, false);
    expect(carouselPagesNumber).toEqual(4);
    expect(renderedCardsPerPage).toEqual(4);

    allCards = 16;
    cardsPerPage = 3;
    carouselPagesNumber = getCarouselPagesNumber(allCards, cardsPerPage);
    renderedCardsPerPage = getResponsiveCardsPerPage(allCards, cardsPerPage, false, false);
    expect(carouselPagesNumber).toEqual(6);
    expect(renderedCardsPerPage).toEqual(3);
  });

  it('should limit cardsPerPage to 1 for mobile', () => {
    const cardsNumber = getResponsiveCardsPerPage(16, 2, true, false);
    expect(cardsNumber).toEqual(1);
  });

  it('should limit cardsPerPage for tablet to 3 when cardsPerPage string is FOUR', () => {
    const cardsNumber = getResponsiveCardsPerPage(16, 4, false, true);
    expect(cardsNumber).toEqual(3);
  });

  it('should render carousel container with CM/author given background color', () => {
    const mockFields = new MockFields();
    mockFields.add('items', []);

    mockFields.contentTitle.value = '';
    const mockRendering = new MockRendering('CarouselCardsContainer');
    mockRendering.add('placeholders', { 'carousel-cards-content': [] });
    const params = { cardsPerPage: 'Two', bgColour: 'red' };

    const { getByTestId } = jssRender(
      <CarouselCardsContainer fields={mockFields} rendering={mockRendering} params={params} />,
    );
    const element = getByTestId('carousel-cards-container');
    expect(element).toHaveStyle('background-color : rgb(218, 44, 46)');
  });
});
