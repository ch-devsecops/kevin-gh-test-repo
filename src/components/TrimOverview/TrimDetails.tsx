import React from 'react';
import { Box, H4, H6 } from '@honda-canada/design-system-react';
import type { TrimDetailsProps } from './types';
import useModelDetails from './service/useModelDetails';
import themeStyles from './TrimOverview.styles';

const StyledTrimDetails = themeStyles.apply(Box, 'StyledTrimDetails');
const StyledContent = themeStyles.apply(Box, 'StyledContent');
const StyledH4 = themeStyles.apply(H4, 'StyledH4');

const TrimDetails = ({ transmissionKey, models }: TrimDetailsProps) => {
  const { model, year, trim, transmission } = useModelDetails(transmissionKey, models);

  return (
    <StyledTrimDetails>
      <StyledH4 data-testid="cy-model-name">{model?.name}</StyledH4>
      <StyledContent>
        <H6 data-testid="cy-year-name">{year?.name}</H6>
        <H6 data-testid="cy-transmission-name">{transmission?.name}</H6>
        <H6 data-testid="cy-trim-name">{trim?.name}</H6>
      </StyledContent>
    </StyledTrimDetails>
  );
};

export default TrimDetails;
