import React, { useContext } from 'react';
import {
  Box,
  Image,
  Label,
  Markdown,
  MediaItem,
  MarkdownHeading,
  useMediaQueries,
  useThemeContext,
} from '@honda-canada/design-system-react';
import { ModelFiltersContext } from '../ModelFiltersContext';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import CTA from '../CTA';
import { HONDA_THEME_NAME } from '../../utils/constants';

const FutureVehicleCard = ({ fields, rendering }) => {
  const { isMobile } = useMediaQueries();
  const theme = useThemeContext();
  const modelFiltersContext = useContext(ModelFiltersContext);
  const { filterHasValues, filter } = modelFiltersContext || {};

  // This component is filterable. See ModelListFilters/reducer.js
  if (!fields || filterHasValues || filter.onlyNsx) return null;

  const gtmCategory = fields?.gtmCategory?.value;
  const { anchorId, title, bodyText, ctaLink, ctaType, ctaIcon, bannerLabel, gtmTitle, gtmInteractionType } = fields;
  const image = isMobile ? fields?.mobileImage : fields?.desktopImage;
  return (
    <Box
      data-gtm-category={mapGTMCategory(gtmCategory)}
      data-gtm-component-type={rendering?.componentName}
      pb={['m', 'l']}
      mb="m"
      id={anchorId?.value}
      backgroundColor="white"
    >
      <Box>
        {bannerLabel?.value && (
          <Box
            width="100%"
            height={['28px', '38px']}
            backgroundColor="blue"
            zIndex="100"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            textAlign="center"
          >
            <Label color="white" fontFamily="bold" fontSize={['16px', '18px']}>
              {bannerLabel?.value}
            </Label>
          </Box>
        )}
        <MediaItem image={<Image {...image?.value} />} containerSize="100%" />
      </Box>

      <Box mt={['l', 'xl']}>
        <Box my="m">
          {title?.value && (
            <MarkdownHeading
              headingOverride="h5"
              textAlign="center"
              mb={theme.name === HONDA_THEME_NAME ? 'xs' : ['s', 'm']}
              mx="m"
              fontFamily="bold"
            >
              {title?.value}
            </MarkdownHeading>
          )}
          <Markdown mx={['l', 0]} textAlign="center" mb={0} letterSpacing="0.5px">
            {bodyText?.value}
          </Markdown>
        </Box>
        <Box textAlign="center">
          {ctaLink?.value?.href && (
            <CTA
              linkField={ctaLink}
              typeField={ctaType}
              iconField={ctaIcon}
              gtmTags={{
                'data-gtm-interaction-type': gtmInteractionType?.value || 'cta: click',
                'data-gtm-title': gtmTitle?.value,
                'aria-label': ctaLink?.value?.title,
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default FutureVehicleCard;
