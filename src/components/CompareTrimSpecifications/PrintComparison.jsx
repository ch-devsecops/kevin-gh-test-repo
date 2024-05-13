/* eslint-disable react/jsx-key */
import React from 'react';
import { Table, Copy, Box } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { styledCompiler } from '../../utils/markdown';
import StyledMarkdown from './StyledMarkdown';

const getSecondTrimValue = (secondTrim, category, i) => {
  const specs = secondTrim.specs.find(s => s.category === category);
  return specs?.items[i]?.value || null;
};

const PrintComparison = ({ firstTrim, secondTrim, legalDisclaimer }) => {
  const { t } = useTranslation();

  if (!firstTrim || !secondTrim) return null;

  const keyFeaturesColumns = [
    null,
    <>
      <StyledMarkdown>{firstTrim.name}</StyledMarkdown>
      <StyledMarkdown>{`${firstTrim.pricingLabel} ${formatPrice(firstTrim.price)}`}</StyledMarkdown>
    </>,
    <>
      <StyledMarkdown>{secondTrim.name}</StyledMarkdown>
      <StyledMarkdown>{`${secondTrim.pricingLabel} ${formatPrice(secondTrim.price)}`}</StyledMarkdown>
    </>,
  ];

  const keyFeaturesRow = [
    <StyledMarkdown fontWeight="bold" textAlign="left">
      {t('Shared.CompareTrims.keyFeaturesLabel')}
    </StyledMarkdown>,
    <StyledMarkdown>{firstTrim.keyFeatures}</StyledMarkdown>,
    <StyledMarkdown>{secondTrim.keyFeatures}</StyledMarkdown>,
  ];

  const columns = category => [
    <StyledMarkdown textAlign="left">{category}</StyledMarkdown>,
    <StyledMarkdown>{firstTrim.name}</StyledMarkdown>,
    <StyledMarkdown>{secondTrim.name}</StyledMarkdown>,
  ];

  const categories = firstTrim.specs.map(spec => spec.category);

  return (
    <>
      <Box mb="xl">
        <Table columns={keyFeaturesColumns} rows={[keyFeaturesRow]} />
      </Box>
      {categories.map((category, i) => (
        <Box mb="xl" key={i.toString()}>
          <Table
            columns={columns(category)}
            rows={firstTrim.specs[i].items.map(spec => [
              <StyledMarkdown textAlign="left">{spec.label}</StyledMarkdown>,
              <StyledMarkdown>{spec.value}</StyledMarkdown>,
              <StyledMarkdown>{getSecondTrimValue(secondTrim, category, i)}</StyledMarkdown>,
            ])}
          />
        </Box>
      ))}
      {legalDisclaimer && (
        <Copy size="legal" my={7}>
          {styledCompiler(legalDisclaimer)}
        </Copy>
      )}
    </>
  );
};

export default PrintComparison;
