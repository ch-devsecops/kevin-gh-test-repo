/**
 * @param {*} performanceMetrics array of performanceMetrics fields
 * @param {*} features array of features fields
 * @param {*} isMobile is the current viewport mobile
 * @returns If isMobile, an array of performanceMetrics in groups of 2, and features in groups of 1.
 *          Otherwise, an array of performanceMetrics and features.
 */

const getRows = (performanceMetrics = [], features = [], isMobile) => {
  if (isMobile) {
    const array = [...performanceMetrics];
    const mobilePerformanceMetrics = [];

    while (array.length) {
      mobilePerformanceMetrics.push({
        items: array.splice(0, 2).map(item => ({ ...item, type: 'performanceMetric' })),
      });
    }
    const mobileFeatures = features.map(row => ({
      items: [row].map(item => ({ ...item, type: 'feature' })),
    }));

    return [
      ...mobilePerformanceMetrics,
      ...mobileFeatures,
      { isLast: true }, // extra empty item to prevent premature un-sticking
    ];
  }

  return [
    {
      items: performanceMetrics,
    },
    {
      items: features,
    },
    { isLast: true }, // extra empty item to prevent premature un-sticking
  ];
};

export default getRows;
