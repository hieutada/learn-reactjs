import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumbnail({ product }) {

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : `${THUMBNAIL_PLACEHOLDER}?text=${product.id}`;

  return (
    <div>
      <Box>
        <img src={thumbnailUrl} alt="product.name" width="100%"/>
      </Box>
    </div>
  );
}

export default ProductThumbnail;
