import React from 'react';
import TrimCardGridUI from './TrimCardGridUI';

const TrimCardGrid = ({ fields, params }) => {
  const models = fields?.data?.value?.catalog?.fields?.models?.[0]?.items;
  const nextStepUrl = fields?.data?.value?.nextStepBaseUrl?.item?.value || {};
  const backStepUrl = fields?.data?.value?.backStepBaseUrl?.item?.value || {};
  const title = fields?.data?.value?.title?.value;

  if (!Array.isArray(models) || !models?.length) return null;

  return (
    <TrimCardGridUI models={models} params={params} title={title} backStepUrl={backStepUrl} nextStepUrl={nextStepUrl} />
  );
};

export default TrimCardGrid;
