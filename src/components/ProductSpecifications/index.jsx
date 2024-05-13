import React from 'react';
import PropTypes from 'prop-types';
import ProductSpecificationsItem from './ProductSpecificationsItem';
import SpecificationsProvider from '../SpecificationsProvider';

function mapSpecifications(specifications = [], name) {
  const specCategory = specifications?.find(specs => specs.name === name)?.specs || [];
  return specCategory?.sort((firstItem, secondItem) => firstItem.displayOrder - secondItem.displayOrder);
}

const ProductSpecifications = ({ trimId, gtmTags }) => {
  if (!trimId?.length) {
    return null;
  }

  return (
    <SpecificationsProvider trims={[trimId]}>
      {({ specifications, isFetching: isFetchingSpecifications }) => {
        if (!specifications || isFetchingSpecifications) return null;
        const spec = mapSpecifications(specifications, 'specifications');
        return <ProductSpecificationsItem key={trimId} specs={spec} gtmTags={gtmTags} />;
      }}
    </SpecificationsProvider>
  );
};

ProductSpecifications.propTypes = {
  trimId: PropTypes.arrayOf(PropTypes.string),
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
  }),
};

export default ProductSpecifications;
