import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import productsApi from '../../../api/productsApi';
import FilterViewer from '../components/FilterViewer';
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

  const history = useHistory();
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 12,
    page: 1,
  });

  //todo: get data khi filters thay doi
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productsApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Falled to fetch product list: ', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  //todo: Thay doi phan trang
  const handlePageChange = (event, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  //todo: Thay doi thu tu sap xep
  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  //todo: Thay doi trong filters
  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  //todo: Thay doi hien thi filter list
  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Container>
      <Grid container spacing={1}>
        {/* Left Column*/}
        <Grid item className={classes.left}>
          <Paper elevation={1}>
            <ProductFilters
              filters={queryParams}
              onChange={handleFiltersChange}
            />
          </Paper>
        </Grid>

        {/* Right Column*/}
        <Grid item className={classes.right}>
          <Paper elevation={1}>
            {/* Sap xep */}
            <ProductSort
              currentSort={queryParams._sort}
              onChange={handleSortChange}
            />

            {/* Hien thi filter list*/}
            <FilterViewer filters={queryParams} onChange={setNewFilters} />

            {/* Loading - Hien thi danh sach */}
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
