import React from 'react';
import ModelCardGridUI from './ModelCardGridUI';
import formatCardGridData from './utils/formatCardGridData';
import usePrice from './usePrice';

const ModelCardGrid = ({ fields, params }) => {
  const catalog = fields?.data?.value?.catalog?.fields?.models?.[0]?.items;
  const nextStepUrl = fields?.data?.value?.nextStepBaseUrl?.item?.value || {};
  const title = fields?.data?.value?.title?.value;

  const pricing = usePrice(catalog);

  if (!Array.isArray(catalog) || !catalog?.length) return null;

  const modelCards = formatCardGridData(catalog);

  return (
    <ModelCardGridUI
      modelCards={modelCards}
      pricing={pricing}
      params={params}
      nextStepUrl={nextStepUrl}
      title={title}
    />
  );
};

export default ModelCardGrid;
