import React, { useRef } from 'react';
import { H5, Box, Image } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import Link from './Link';
import themeStyles from './TrimCard.styles';

const StyledH5 = themeStyles.apply(H5, 'StyledH5');
const TrimCardImageLink = themeStyles.apply(Link, 'TrimCardImageLink');

const TrimName = ({ name, modelYear, showModelYear }) => (
  <>
    {showModelYear && <Box data-testid="cy-trim-model-year">{compiler(modelYear)}</Box>}
    <Box data-testid="cy-trim-specification-card-name">{compiler(name)}</Box>
  </>
);

const TitleComponent = ({ detailsPath, name, modelYear, nameBadge, isDark, gtmTags, showModelYear }) => {
  const styledH5Ref = useRef();

  return nameBadge?.src ? (
    <Box height="24px" py="xxs">
      {detailsPath ? (
        <TrimCardImageLink {...gtmTags} to={detailsPath}>
          <Image {...nameBadge} />
        </TrimCardImageLink>
      ) : (
        <Image {...nameBadge} />
      )}
    </Box>
  ) : (
    <StyledH5 ref={styledH5Ref} color={isDark ? 'white' : undefined}>
      {detailsPath ? (
        <TrimCardImageLink {...gtmTags} to={detailsPath}>
          <TrimName name={name} modelYear={modelYear} showModelYear={showModelYear} />
        </TrimCardImageLink>
      ) : (
        <TrimName name={name} modelYear={modelYear} showModelYear={showModelYear} />
      )}
    </StyledH5>
  );
};

export default TitleComponent;
