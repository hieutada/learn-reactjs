import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';
import { formatPrice } from '../../../utils';

ProductItem.propTypes = {
  product: PropTypes.object,
};

function ProductItem({ product }) {
  const history = useHistory();

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : `${THUMBNAIL_PLACEHOLDER}?text=${product.id}`;

  const handleClick = () => {
    // .../products/:productId
    history.push(`/products/${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight={250}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>

      <Typography variant="body1">{product.name}</Typography>
      <Typography variant="body2" >
        <Box component="span" fontSize="16px" fontWeight="bold">
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default ProductItem;
