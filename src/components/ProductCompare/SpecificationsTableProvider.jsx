import React from 'react';
import PropTypes from 'prop-types';

import SpecificationsProvider from '../SpecificationsProvider';

import SpecificationsTable from './SpecificationsTable';
import { getEnginesGroupedBySpecifications } from './utils';

const SpecificationsTableProvider = ({ items, isSticky }) => (
  <SpecificationsProvider trims={items?.map(trim => trim.detIdentifier)}>
    {({ specifications, isFetching: isSpecificationsFetching }) => {
      if (!specifications || isSpecificationsFetching) return null;

      const enginesSpecifications = getEnginesGroupedBySpecifications(specifications, items);

      return (
        <SpecificationsTable
          labels={enginesSpecifications.labels}
          values={enginesSpecifications.specs}
          items={items}
          isSticky={isSticky}
        />
      );
    }}
  </SpecificationsProvider>
);

SpecificationsTableProvider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  isSticky: PropTypes.bool,
};

export default SpecificationsTableProvider;
