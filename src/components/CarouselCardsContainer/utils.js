export const cardsPerPageParam = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};

export const getCarouselPagesNumber = (itemsCount, itemsPerPage) => {
  const quotient = Math.floor(itemsCount / itemsPerPage);
  const remainder = itemsCount % itemsPerPage;
  return quotient + (remainder > 0 ? 1 : 0);
};

export const getResponsiveCardsPerPage = (itemsCount, cardsPerPage, isMobile, isTablet) => {
  let cards = cardsPerPage;
  cards = isMobile ? 1 : cards;
  cards = isTablet && cards > 3 ? 3 : cards;

  return itemsCount < cards ? itemsCount : cards;
};

export default { getCarouselPagesNumber, getResponsiveCardsPerPage };
