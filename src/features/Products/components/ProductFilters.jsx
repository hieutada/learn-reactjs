import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';


ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;

    const newFilters = {
      'category.id': newCategoryId,
    };

    onChange(newFilters);
  };

  const handlePriceChange = (values) => {
    if (onChange) onChange(values);
  };

  const handleChange = (values) => {
    if (onChange) onChange(values);
  };

  return (
    <div>
      <Box>
        <FilterByCategory onChange={handleCategoryChange} />
        <FilterByPrice onChange={handlePriceChange} />
        <FilterByService filters={filters} onChange={handleChange}/>
      </Box>
    </div>
  );
}

export default ProductFilters;