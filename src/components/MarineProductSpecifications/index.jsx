import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Box } from '@honda-canada/design-system-react';
import upperFirst from 'lodash/upperFirst';
import getValueByKey from '../../utils/getValueByKey';
import SpecificationsProvider from '../SpecificationsProvider';
import NestedAccordionTitle from '../../utils/components/NestedAccordionTitle';
import ProductSpecificationsItem from '../ProductSpecifications/ProductSpecificationsItem';

const specificationAccordionFormatter = (specifications = []) => {
  const styles = {
    containerStyles: {
      mt: 's',
      mb: 'l',
    },
    firstColumnStyles: { pl: ['s', 's', 'l'] },
    rowStyles: { maxHeight: 'unset !important' },
  };
  const categorySpecs = specifications?.map(specs => ({
    title: <NestedAccordionTitle>{upperFirst(specs?.name)}</NestedAccordionTitle>,
    key: specs?.name,
    content: <ProductSpecificationsItem styles={styles} key={specs?.trimId} specs={specs?.specs} />,
  }));
  return categorySpecs;
};

const MarineProductSpecifications = ({ fields, rendering }) => {
  if (!fields) return null;

  const gtmTags = {
    type: rendering?.componentName,
  };

  const trimId = getValueByKey(fields, 'model')[0]?.fields?.detIdentifier?.value;
  if (!trimId) return null;

  return (
    <SpecificationsProvider trims={[trimId]}>
      {({ specifications, isFetching: isFetchingSpecifications }) => {
        if (!specifications || isFetchingSpecifications) return null;
        const spec = specificationAccordionFormatter(specifications);
        return (
          <Box data-testid="cy-product-spec-wrapper">
            <Accordion
              gtmTags={gtmTags}
              items={spec}
              iconPosition="left"
              iconName="animatedArrowRightDown"
              iconColorOverride="primary"
              panelBackgroundColor="grey.3"
              borderColor="transparent"
              isCompact
              contentContainerStyles={{
                padding: 0,
                marginBottom: ['xs', 's'],
              }}
            />
          </Box>
        );
      }}
    </SpecificationsProvider>
  );
};

MarineProductSpecifications.propTypes = {
  fields: PropTypes.shape({
    detIdentifier: PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

export default MarineProductSpecifications;
