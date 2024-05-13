import { Box, Column, Copy, Media, Row, CarouselContent as CarouselSlider } from '@honda-canada/design-system-react';
import React from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import { stripMarkdownHeading } from '../../../utils/markdown';
import themeStyles from '../styles/ProductCompare.styles';

const ProductCompareRow = themeStyles.apply(Row, 'ProductCompareRow');
const ProductCompareColumn = themeStyles.apply(Column, 'ProductCompareColumn');
const TableContainer = themeStyles.apply(Box, 'TableContainer');
const SpecificationTitle = themeStyles.apply(Copy, 'SpecificationTitle');
const SpecificationDescription = themeStyles.apply(Box, 'SpecificationDescription');

const SpecificationsTable = ({ labels, values, items, isSticky, carouselControl }) => {
  const { currentSlide, bindDrag } = carouselControl;

  return (
    <TableContainer className="specifications-table" data-testid="specifications-table" isSticky={isSticky}>
      <Media greaterThan="smallDesktop" style={{ width: '100%' }}>
        {labels.map((item, labelIndex) => (
          <ProductCompareRow key={`${labelIndex.toString()}`}>
            <ProductCompareColumn width={1 / 5}>
              <SpecificationTitle data-testid="specifications-name">{item.label}</SpecificationTitle>
            </ProductCompareColumn>
            {values?.map((specification, specIndex) => (
              <ProductCompareColumn
                width={1 / 5}
                bg={!items[specIndex] || specIndex % 2 ? 'white' : 'grey.5'}
                key={`${labelIndex.toString()}-${specIndex.toString()}`}
              >
                <SpecificationDescription data-testid="specifications-description">
                  {compiler(stripMarkdownHeading(specification[labelIndex]?.value))}
                </SpecificationDescription>
              </ProductCompareColumn>
            ))}
          </ProductCompareRow>
        ))}
      </Media>
      <Media lessThan="desktop">
        {labels.map((item, labelIndex) => (
          <ProductCompareRow key={`${labelIndex.toString()}`} width="100vw" overflow="hidden">
            <ProductCompareColumn width={1 / 2} bg="white">
              <SpecificationTitle data-testid="specifications-name">{item.label}</SpecificationTitle>
            </ProductCompareColumn>
            <ProductCompareColumn width={1 / 2} bg="grey.5">
              <CarouselSlider
                items={values?.map((specification, specIndex) => (
                  <SpecificationDescription
                    key={`spec-${labelIndex}-${specIndex.toString()}`}
                    data-testid="specifications-description"
                  >
                    {compiler(stripMarkdownHeading(specification[labelIndex]?.value))}
                  </SpecificationDescription>
                ))}
                currentSlide={currentSlide}
                bindDrag={bindDrag}
                equalHeight
                slideAnimation
              />
            </ProductCompareColumn>
          </ProductCompareRow>
        ))}
      </Media>
    </TableContainer>
  );
};

export default SpecificationsTable;

SpecificationsTable.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      displayOrder: PropTypes.number,
    }),
  ),
  values: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        displayOrder: PropTypes.number,
        name: PropTypes.string,
        label: PropTypes.string,
        tip: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  ),
  items: PropTypes.arrayOf(PropTypes.shape({ isEmpty: PropTypes.bool })),
  carouselControl: PropTypes.shape({
    currentSlide: PropTypes.number,
    bindDrag: PropTypes.func,
  }).isRequired,
  isSticky: PropTypes.bool,
};
