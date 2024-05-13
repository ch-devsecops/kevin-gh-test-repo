import React, { useContext } from 'react';
import {
  SwatchPicker,
  Row as DsrRow,
  Box,
  Copy,
  Media,
  Toast,
  Accordion,
  Optional,
} from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { ErrorStatus } from '../service/constants';
import { getGtmTagValue } from '../../../utils/gtmEvents';

import themeStyles from './ColorSwatches.styles';
import Context from '../service/Context';

const ContentCopy = themeStyles.apply(Copy, 'ContentCopy');
const SwatchName = themeStyles.apply(Copy, 'SwatchesContent');
const Swatch = themeStyles.apply(Box, 'Swatch');
const InteriorColorError = themeStyles.apply(Copy, 'InteriorColorError');
const Row = themeStyles.apply(DsrRow, 'Row');

const ColourSwatches = ({
  gtmBodyStyle,
  gtmInteractionType,
  gtmModelName,
  gtmTrimName,
  hasColorsAccordion,
  isDark,
  setSelected,
  setShowInteriorError,
  showInteriorError,
  swatches = [],
  title,
}) => {
  const { t } = useTranslation();
  const selectedSwatchName = swatches.find(s => s.isSelected)?.name;
  const { colorSwatchAlignment } = useContext(Context);

  const handleToastClose = () => {
    if (setShowInteriorError) {
      setShowInteriorError(ErrorStatus.DISMISSED);
    }
  };

  const titleContent = (
    <ContentCopy size="small" isDark={isDark} hasColorsAccordion={hasColorsAccordion} data-testid="cy-colours-label">
      {title}
    </ContentCopy>
  );

  const swatchesContent = (
    <>
      <SwatchName
        size="extraSmall"
        data-testid="cy-colour-name"
        colorSwatchAlignment={colorSwatchAlignment}
        isDark={isDark}
      >
        {selectedSwatchName}
      </SwatchName>
      <Row as="ul" colorSwatchAlignment={colorSwatchAlignment}>
        {swatches.map((swatch, i) => (
          <Swatch
            as="li"
            key={i.toString()}
            onMouseEnter={() => !swatch.isValid && setShowInteriorError(ErrorStatus.TRUE)}
            onMouseLeave={handleToastClose}
            data-testid="cy-colour-swatch"
          >
            <SwatchPicker
              data-testid="cy-swatchpicker-container"
              data-gtm-model={getGtmTagValue(gtmModelName)}
              data-gtm-trim={getGtmTagValue(gtmTrimName)}
              data-gtm-body-style={getGtmTagValue(gtmBodyStyle)}
              data-gtm-interaction-type={getGtmTagValue(gtmInteractionType)}
              data-gtm-title={getGtmTagValue(swatch.gtmName)}
              swatch={swatch}
              isDark={isDark}
              onClick={() => setSelected(swatch.key)}
              icon={!swatch.isValid ? 'warning' : swatch.isSelected && 'checkmark'}
            />
          </Swatch>
        ))}
      </Row>
    </>
  );
  return (
    <>
      <Media greaterThanOrEqual="desktop">
        {titleContent}
        {swatchesContent}
        {showInteriorError === ErrorStatus.TRUE && (
          <Box mx="zero">
            <Toast styleProps={{ height: 'auto' }} onClose={handleToastClose} styling={isDark ? 'dark' : 'light'}>
              <InteriorColorError size="small" isDark={isDark} isDesktop>
                {t('Pages.Models.Exploration.interiorColourErrorLabel')}
              </InteriorColorError>
            </Toast>
          </Box>
        )}
      </Media>
      <Media lessThan="desktop">
        <Optional when={hasColorsAccordion}>
          <Accordion
            items={[
              {
                title: titleContent,
                content: swatchesContent,
              },
            ]}
            borderColor="white"
            colorStyling="dark"
          />
        </Optional>
        <Optional when={!hasColorsAccordion}>
          {titleContent}
          {swatchesContent}
        </Optional>
        {showInteriorError === ErrorStatus.TRUE && (
          <Box mx="s">
            <Toast styleProps={{ height: 'auto' }} onClose={handleToastClose} styling={isDark ? 'dark' : 'light'}>
              <InteriorColorError size="small" isDark={isDark}>
                {t('Pages.Models.Exploration.interiorColourErrorLabel')}
              </InteriorColorError>
            </Toast>
          </Box>
        )}
      </Media>
    </>
  );
};

export default ColourSwatches;
