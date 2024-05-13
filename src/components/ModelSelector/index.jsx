import React from 'react';
import styled from 'styled-components';
import camelcaseKeys from 'camelcase-keys';
import { Box, Column, Copy, H3, Image, Row } from '@honda-canada/design-system-react';
import CTA from '../CTA';
import { modelSelector as data, accessoriesCtaData } from './mockData';

const ImagesContainer = styled(Box)`
  max-width: 380px;
  position: relative;
  &:hover .secondary-img {
    transition: opacity 0.4s;
    opacity: 1;
  }
  &:hover .primary-img {
    opacity: 0;
  }
`;

const StyledImagePrimary = styled(Image)`
  transition: opacity 0.4s;
`;

const StyledImageSecondary = styled(Image)`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`;

const CTAWrapper = styled(Box)`
  position: absolute;
  justify-content: center;
  display: flex;
  bottom: 7px;
  left: 33%;
`;

const ModelSelectorCard = ({ modelKey, year, nameBadge }) => {
  // TODO - this will change depending where the accessories cta data is coming from
  const accData = {
    value: {
      ...accessoriesCtaData.value,
      url: `${accessoriesCtaData.value.url}${modelKey}`,
      href: `${accessoriesCtaData.value.url}${modelKey}`,
    },
  };
  const frontImage = year.trim.primaryThumbnail;
  const backImage = year.trim.secondaryThumbnail;

  return (
    <Column
      key={modelKey}
      width={['1', '1/2', '1/3']} // FIXME
      pb="l"
      my="xl"
      textAlign="center"
      position="relative"
    >
      <Box>
        <Image height={['23px', '27px', '27px']} display="inline" width="auto" src={nameBadge} disableObjectFit />
        <Copy mt="xs" size="small" fontFamily="heading">
          {year.tagline}
        </Copy>
      </Box>
      <ImagesContainer mb="m">
        <StyledImagePrimary className="primary-img" src={frontImage.src} alt={frontImage.alt} />
        <StyledImageSecondary className="secondary-img" src={backImage.src} alt={backImage.alt} />
      </ImagesContainer>
      <CTAWrapper>
        <CTA
          linkField={accData}
          typeField={{ value: 'Primary' }}
          icon="arrow-right"
          data-gtm-title={accData.value.title}
        >
          {accData.value.text}
        </CTA>
      </CTAWrapper>
    </Column>
  );
};

const ModelSelectorJSS = () => {
  const models = camelcaseKeys(data, { deep: true }).models.map(model => (
    <ModelSelectorCard key={model.modelKey} {...model} />
  ));

  return (
    <Box pt="big">
      <H3 style={{ textTransform: 'none' }} textAlign="center" pb="s">
        {data.title}
      </H3>
      <Box>
        <Copy size="regular" maxWidth="660px" textAlign="center" mb="m" mx="auto">
          {data.bodyText}
        </Copy>
      </Box>
      <Row display="flex" justifyContent="center" flexWrap="wrap">
        {models}
      </Row>
    </Box>
  );
};

export default ModelSelectorJSS;
