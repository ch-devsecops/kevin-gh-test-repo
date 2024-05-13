import React from 'react';
import { css } from '@styled-system/css';
import styled from 'styled-components';
import { Media, SwatchPicker, Row, Box, Image } from '@honda-canada/design-system-react';
import CarouselSwatch from './CarouselSwatch';

const SwatchColumn = styled(Box)(
  css({
    ':last-child': {
      mr: 'zero',
    },
  }),
);

const StyledSwatchPicker = styled(SwatchPicker)(({ theme }) =>
  css({
    '&:focus-visible': {
      outline: `solid 8px ${theme.colors.aodaFocused}`,
    },
  }),
);

const gtmData = (gtmTags, color) => ({
  'data-gtm-model': gtmTags.modelName,
  'data-gtm-trim': gtmTags.trimName,
  'data-gtm-body-style': gtmTags.bodyStyle,
  'data-gtm-interaction-type': gtmTags.interactionType,
  'data-gtm-title': color,
});

const ColorDisplaySwatches = ({ swatches = [], selected = 0, setSelected, maxLength = 7, gtmTags, isDark }) => {
  const activeSwatches = [...swatches].map(swatch => {
    if (swatch.image?.src) {
      // eslint-disable-next-line no-param-reassign
      swatch.image = <Image {...swatch.image} />;
    }
    return swatch;
  });

  const RowSwatches = (
    <Row as="ul" width="100%">
      {swatches.map((swatch, i) => (
        <SwatchColumn as="li" key={i.toString()} mr={['m', 'xs']}>
          <StyledSwatchPicker
            swatch={swatch}
            onClick={() => setSelected(i)}
            isDark={isDark}
            icon={selected === i && 'checkmark'}
            {...gtmData(gtmTags, swatch.gtmName)}
          />
        </SwatchColumn>
      ))}
    </Row>
  );

  return (
    <>
      <Media greaterThan="mobile">
        {swatches.length > maxLength ? (
          <CarouselSwatch
            selected={selected}
            setSelected={setSelected}
            swatches={activeSwatches}
            length={maxLength}
            isDark={isDark}
          />
        ) : (
          RowSwatches
        )}
      </Media>
      <Media at="mobile">
        {swatches.length > 4 ? (
          <CarouselSwatch selected={selected} setSelected={setSelected} swatches={activeSwatches} isDark={isDark} />
        ) : (
          RowSwatches
        )}
      </Media>
    </>
  );
};

export default ColorDisplaySwatches;
