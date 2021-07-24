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
  // thay doi loai san pham
  const handleCategoryChange = (newCategory) => {

    if (!onChange) return;

    const newFilters = {
      'category.id': newCategory.id,
      'category.name': newCategory.name,
    };

    onChange(newFilters);
  };

  // thay doi khoang gia
  const handlePriceChange = (values) => {
    if (onChange) onChange(values);
  };

  // thay doi dich vu
  const handleServiceChange = (values) => {
    if (onChange) onChange(values);
  };

  return (
    <div>
      <Box>
        <FilterByCategory onChange={handleCategoryChange} />
        <FilterByPrice onChange={handlePriceChange} />
        <FilterByService filters={filters} onChange={handleServiceChange}/>
      </Box>
    </div>
  );
}

export default ProductFilters;
