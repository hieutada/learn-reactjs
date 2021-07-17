import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import productsApi from '../../../api/productsApi';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  pagination: {
    display: 'flex',
    flexrow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '15px',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 12,
    page: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 12,
    _page: 1,
    _sort: 'salePrice:ASC',
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productsApi.getAll(filters);
        console.log(pagination);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Falled to fetch product list: ', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  // Phan trang
  const handlePageChange = (event, page) => {
    setFilters((prevFilters) => ({ ...prevFilters, _page: page }));
  };

  // Sap xep
  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, _sort: newSortValue }));
  };

  // Phan loai
  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <Container>
      <Grid container spacing={1}>
        {/* Left Column*/}
        <Grid item className={classes.left}>
          <Paper elevation={1}>
            <ProductFilters filters={filters} onChange={handleFiltersChange} />
          </Paper>
        </Grid>

        {/* Right Column*/}
        <Grid item className={classes.right}>
          <Paper elevation={1}>
            {/* Sap xep */}
            <ProductSort
              currentSort={filters._sort}
              onChange={handleSortChange}
            />

            {/* Loading */}
            {loading ? (
              <ProductSkeletonList length={12} />
            ) : (
              <ProductList data={productList} />
            )}

            {/* Phan trang */}
            <Box className={classes.pagination}>
              <Pagination
                color="primary"
                count={Math.ceil(pagination.total / pagination.limit)}
                page={pagination.page}
                onChange={handlePageChange}
              ></Pagination>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ListPage;
