import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';

ProductItem.propTypes = {
  product: PropTypes.object,
};

function ProductItem({ product }) {
  return (
    <Box padding={2} minHeight={250}>
      <img
        src={
          product.thumbnail
            ? `${STATIC_HOST}/${product.thumbnail.url}`
            : THUMBNAIL_PLACEHOLDER
        }
        alt={product.name}
        width="100%"
      />

      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default ProductItem;
