/**
 * returns the responsive number of cards per page
 * @param {number} itemsCount count of items
 * @param {number} cardsPerPage number of cards to show per page based on sitecore params
 * @param {boolean} isMobile true for mobile
 * @returns number of cards per page based on viewport or device
 */
const getResponsiveCardsPerPage = (itemsCount, cardsPerPage, isMobile) => {
  const cards = isMobile ? 1 : cardsPerPage;

  return itemsCount < cards ? itemsCount : cards;
};

export default getResponsiveCardsPerPage;
