import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import categoriesApi from '../../../../api/categoriesApi';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',

      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.main,
      },
    },
  },
}));

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  
  const classes = useStyles();

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoriesApi.getAll();

        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch categories list', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>

      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
